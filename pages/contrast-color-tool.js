import { colorSpaceNames, colorSpaces, useStateValue } from "../utils/state";
import chroma from "chroma-js";
import { useState } from "react";
import { Scale } from "../components/Scale";
import Swatch from "../components/Swatch";
import { RiAddLine, RiArrowDownSFill, RiDeleteBin2Line } from "react-icons/ri";
import { HexInput } from "../components/HexInput";
import { createScale, updateValues } from "../utils/creator";
import { hexToValues } from "../utils/helpers";

const {
  VStack,
  HStack,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Box,
  FormControl,
  FormLabel,
  IconButton,
  Heading,
  Text,
  FormHelperText,
  Flex,
  Editable,
  EditablePreview,
  EditableInput,
  Select,
} = require("@chakra-ui/core");
const { Slider } = require("../components/Slider");

export const ContrastColorTool = () => {
  // State containing the settings and swatches
  const [state, dispatch] = useStateValue();

  // Tab index for when removing swatches. Initial control is set to random
  const [tabIndex, setTabIndex] = useState(0);
  const [controls, setControls] = useState("random");

  // To display the current scale and swatch in the current tab
  const swatch = state.swatches[controls];
  const scale = swatch.scale.hex;

  // State handlers
  const handleChangeSettingValue = (e) => {
    dispatch({
      type: "mergeValue",
      data: {
        settings: {
          [e.target.id]: e.target.value,
        },
      },
    });
  };

  const handleChangeHex = (id, e) => {
    // Use current swatch values to dispatch when hex is invalid
    const swatch = state.swatches[id];
    let newValues = swatch.values;
    let newScale = swatch.scale;

    if (chroma.valid(e.target.value)) {
      newValues = hexToValues(e.target.value, state.settings.mode);
      newScale.hex = createScale(
        swatch.scale.parameters,
        e.target.value,
        state.settings.mode
      );
    }

    dispatch({
      type: "mergeValue",
      data: {
        swatches: {
          [id]: {
            hex: e.target.value,
            values: newValues,
            scale: newScale,
          },
        },
      },
    });
  };

  const handleAddSwatch = () => {
    // Generates a new unique ID for a new swatche
    // Yes, it is overkill
    const endsWithNumber = /(.+)(\d+$)/;
    const swatches = Object.keys(state.swatches);
    const parts = swatches[swatches.length - 1].split(endsWithNumber);
    const increment = parseInt(parts[2]) + 1;
    const incrementable = endsWithNumber.test(swatches[swatches.length - 1]);

    const newSwatch = incrementable
      ? `${parts[1]}${increment}`
      : `${parts[0]} 1`;

    dispatch({
      type: "addSwatch",
      data: newSwatch,
    });
  };

  const handleRemoveSwatch = () => {
    const swatches = Object.keys(state.swatches);
    let index = swatches.indexOf(controls);
    let moveControls = index !== 0 ? swatches[index - 1] : swatches[index + 1];

    //console.log("remove ", swatches[index], " from index: ", index);
    //console.log(swatches);
    swatches.splice(index, 1);
    //console.log(swatches);
    //console.log("move to index : ", swatches.indexOf(moveControls));
    setTabIndex(swatches.indexOf(moveControls));
    //console.log("now controls: ", moveControls);
    setControls(moveControls);
    dispatch({
      type: "removeSwatch",
      data: controls,
    });
  };

  const handleChangeMode = (e) => {
    console.log("to: ", e.target.value);
    const swatches = Object.keys(state.swatches);

    let newSwatchValues = state.swatches;

    swatches.map((key, i) => {
      newSwatchValues[key].values = updateValues(
        state.swatches[key].hex,
        e.target.value
      );
    });

    dispatch({
      type: "changeValue",
      data: {
        settings: {
          ...state.settings,
          [e.target.id]: e.target.value,
        },
        swatches: {
          ...newSwatchValues,
        },
      },
    });

    console.log(newSwatchValues);
  };

  return (
    <VStack align="start" spacing={4} mx="auto" bg="gray.100">
      <VStack align="start" w="100%" p={4}>
        <Heading as="h1" size="xl">
          Color Design Scale (CDS)
        </Heading>
        <Text>
          Design color scales and palettes that respect specific contrast
          requirements.
        </Text>
      </VStack>
      <VStack align="start" w="100%" p={4}>
        <Heading as="h2" size="md">
          Color system settings
        </Heading>
        <FormControl>
          <FormLabel>Contrast limits</FormLabel>
          <FormHelperText>
            Usually white and black. You can change this value if you are
            designing with different base colors.
          </FormHelperText>
          <HStack mt={2}>
            <FormControl width="auto" id="onLight">
              <FormLabel>Base background color</FormLabel>
              <HexInput
                isInvalid={!chroma.valid(state.settings.onLight)}
                value={state.settings.onLight}
                onChange={(e) => handleChangeSettingValue(e)}
                type="text"
                w={100}
              />
            </FormControl>
            <FormControl width="auto" id="onDark">
              <FormLabel>Base text color</FormLabel>
              <HexInput
                isInvalid={!chroma.valid(state.settings.onDark)}
                value={state.settings.onDark}
                onChange={(e) => handleChangeSettingValue(e)}
                type="text"
                w={100}
              />
            </FormControl>
          </HStack>
        </FormControl>
        <FormControl width="auto" id="mode">
          <FormLabel>Color Space</FormLabel>
          <Select
            defaultValue={state.settings.mode}
            variant="outline"
            icon={<RiArrowDownSFill />}
            onChange={(e) => handleChangeMode(e)}
          >
            {Object.keys(colorSpaces).map((key, i) => {
              return (
                <option key={key} value={key}>
                  {key}
                </option>
              );
            })}
          </Select>
        </FormControl>
      </VStack>
      <HStack alignSelf="stretch" spacing={0}>
        <Tabs
          variant="palette"
          width="75%"
          bg="gray.100"
          alignSelf="stretch"
          d="flex"
          flexDirection="column"
          index={tabIndex}
          onChange={(index) => {
            setTabIndex(index);
            setControls(Object.keys(state.swatches)[index]);
          }}
        >
          <TabList>
            {Object.keys(state.swatches).map((swatch, key) => {
              return <Tab key={key} color={state.swatches[swatch].hex}></Tab>;
            })}
            <IconButton
              aria-label="Add swatch"
              size="lg"
              icon={<RiAddLine size="1.5rem" />}
              borderRadius="0"
              m={2}
              mt={0}
              ml="auto"
              colorScheme="yellow"
              onClick={() => handleAddSwatch()}
            />
          </TabList>

          <TabPanels flexGrow={1}>
            {Object.keys(state.swatches).map((swatch, key) => {
              const scale = state.swatches[swatch].scale.hex;
              return (
                <TabPanel key={key} p={0}>
                  <HStack
                    justifyContent="stretch"
                    height="100%"
                    spacing={0}
                    p={0}
                    flexWrap="wrap"
                  >
                    {scale.map((color, i) => {
                      console.log(scale);
                      return (
                        <Box
                          key={i}
                          h="100%"
                          flexBasis={24}
                          flexGrow={1}
                          flexShrink={0}
                        >
                          <Swatch
                            color={color}
                            index={i}
                            scale={scale}
                            swatch={swatch}
                          />
                        </Box>
                      );
                    })}
                  </HStack>
                </TabPanel>
              );
            })}
          </TabPanels>
        </Tabs>
        <Tabs
          width="25%"
          bg="gray.100"
          alignSelf="stretch"
          d="flex"
          flexDirection="column"
        >
          <TabList>
            <Tab>Swatch</Tab>
            <Tab>Scale</Tab>
          </TabList>

          <TabPanels bg="white" flexGrow={1}>
            <TabPanel>
              <VStack spacing={8} align="start">
                <Flex w="100%">
                  <Editable
                    value={swatch.name}
                    flexGrow="1"
                    d="flex"
                    alignItems="center"
                    fontSize="2xl"
                    fontWeight="bold"
                  >
                    <EditablePreview />
                    <EditableInput
                      onChange={(e) => {
                        dispatch({
                          type: "renameSwatch",
                          data: { old: controls, new: e.target.value },
                        });
                      }}
                    />
                  </Editable>
                  {Object.keys(state.swatches).length > 1 && (
                    <IconButton
                      ml={2}
                      size="lg"
                      colorScheme="red"
                      variant="ghost"
                      borderRadius={0}
                      aria-label="Delete swatch"
                      icon={<RiDeleteBin2Line size="1.5rem" />}
                      value={controls}
                      onClick={() => handleRemoveSwatch()}
                    />
                  )}
                </Flex>
                <FormControl id={`${controls}-hex`}>
                  <FormLabel>Hex</FormLabel>
                  <HexInput
                    isInvalid={!chroma.valid(swatch.hex)}
                    value={swatch.hex}
                    onChange={(e) => handleChangeHex(controls, e)}
                    type="text"
                    w={100}
                  />
                </FormControl>
                <Box alignSelf="stretch">
                  <Slider
                    name={colorSpaceNames[state.settings.mode]}
                    swatch={controls}
                    mode={colorSpaces[state.settings.mode]}
                  />
                </Box>
              </VStack>
            </TabPanel>
            <TabPanel>
              <Scale swatch={controls} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </HStack>
    </VStack>
  );
};

export default ContrastColorTool;

/**
 *
 *
 */
