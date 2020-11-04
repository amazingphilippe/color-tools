import { useStateValue } from "../utils/state";
import { useContextValue } from "../utils/context";
import chroma from "chroma-js";
import { useState } from "react";
import { makeScale, Scale } from "../components/Scale";
import Swatch from "../components/Swatch";
import { RiAddLine, RiDeleteBin2Line } from "react-icons/ri";
import { HexInput } from "../components/HexInput";

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
  Input,
  Code,
  Button,
  IconButton,
  Heading,
  Text,
  FormHelperText,
  Flex,
  Editable,
  EditablePreview,
  EditableInput,
} = require("@chakra-ui/core");
const { Slider } = require("../components/Slider");

export const ContrastColorTool = () => {
  // state containing the swatches and scale
  const [state, dispatch] = useStateValue();

  //context containing global settings
  const [context, contextDistpatch] = useContextValue();

  //tab index for when removing swatches
  const [tabIndex, setTabIndex] = useState(0);
  const [controls, setControls] = useState("baseColor");

  const scale = state[controls].scale.hex;

  const handleChangeBaseColor = (e) => {
    contextDistpatch({
      type: "changeValue",
      data: {
        [e.target.id]: e.target.value,
      },
    });
  };

  const handleChangeHex = (swatch, e) => {
    let newValues = state[swatch].values;

    chroma.valid(e.target.value) &&
      (newValues = Object.fromEntries(
        ["h", "c", "l"].map((x) => [x, chroma(e.target.value).get(`hcl.${x}`)])
      ));

    let newScale = chroma.valid(e.target.value) && {
      scale: {
        hex: makeScale(state[swatch].scale.parameters, e.target.value),
      },
    };

    dispatch({
      type: "changeValue",
      data: {
        [swatch]: { hex: e.target.value, values: newValues, ...newScale },
      },
    });
  };

  return (
    <VStack align="start" spacing={4} mx="auto" bg="gray.200">
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
                isInvalid={!chroma.valid(context.onLight)}
                value={context.onLight}
                onChange={(e) => handleChangeBaseColor(e)}
                type="text"
                w={100}
              />
            </FormControl>
            <FormControl width="auto" id="onDark">
              <FormLabel>Base text color</FormLabel>
              <HexInput
                isInvalid={!chroma.valid(context.onDark)}
                value={context.onDark}
                onChange={(e) => handleChangeBaseColor(e)}
                type="text"
                w={100}
              />
            </FormControl>
          </HStack>
        </FormControl>
      </VStack>
      <HStack alignSelf="stretch" spacing={0}>
        <Tabs
          variant="palette"
          width="75%"
          bg="gray.200"
          alignSelf="stretch"
          d="flex"
          flexDirection="column"
          index={tabIndex}
          onChange={(index) => {
            setTabIndex(index);
            setControls(Object.keys(state)[index]);
          }}
        >
          <TabList>
            {Object.keys(state).map((swatch, key) => {
              const tabContrastcolor =
                chroma.valid(state[swatch].hex) &&
                chroma.contrast(state[swatch].hex, "#000") > 7
                  ? "black"
                  : "white";
              return <Tab key={key} color={state[swatch].hex}></Tab>;
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
              onClick={() => {
                const endsWithNumber = /(.+)(\d+$)/;
                const swatches = Object.keys(state);
                const parts = swatches[swatches.length - 1].split(
                  endsWithNumber
                );
                const increment = parseInt(parts[2]) + 1;
                const incrementable = endsWithNumber.test(
                  swatches[swatches.length - 1]
                );

                const newSwatch = incrementable
                  ? `${parts[1]}${increment}`
                  : `${parts[0]} 1`;

                dispatch({
                  type: "addSwatch",
                  data: newSwatch,
                });
              }}
            />
          </TabList>

          <TabPanels flexGrow={1}>
            {Object.keys(state).map((swatch, key) => {
              const tabContrastcolor =
                chroma.valid(state[swatch].hex) &&
                chroma.contrast(state[swatch].hex, "#000") > 7
                  ? "black"
                  : "white";
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
          bg="gray.200"
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
                    value={controls}
                    flexGrow="1"
                    d="flex"
                    alignItems="center"
                    fontSize="2xl"
                    fontWeight="bold"
                  >
                    <EditablePreview />
                    <EditableInput
                      onChange={(e) => {
                        setControls(e.target.value);
                        dispatch({
                          type: "renameSwatch",
                          data: { old: controls, new: e.target.value },
                        });
                      }}
                    />
                  </Editable>
                  {Object.keys(state).length > 1 && (
                    <IconButton
                      ml={2}
                      size="lg"
                      colorScheme="red"
                      variant="ghost"
                      borderRadius={0}
                      aria-label="Delete swatch"
                      icon={<RiDeleteBin2Line size="1.5rem" />}
                      value={controls}
                      onClick={() => {
                        const swatches = Object.keys(state);
                        let index = swatches.indexOf(controls);
                        let moveControls =
                          index !== 0
                            ? swatches[index - 1]
                            : swatches[index + 1];

                        console.log(
                          "remove ",
                          swatches[index],
                          " from index: ",
                          index
                        );
                        console.log(swatches);
                        swatches.splice(index, 1);
                        console.log(swatches);
                        console.log(
                          "move to index : ",
                          swatches.indexOf(moveControls)
                        );
                        setTabIndex(swatches.indexOf(moveControls));
                        console.log("now controls: ", moveControls);
                        setControls(moveControls);
                        dispatch({
                          type: "removeSwatch",
                          data: controls,
                        });
                      }}
                    />
                  )}
                </Flex>
                <FormControl id={`${controls}-hex`}>
                  <FormLabel>Hex</FormLabel>
                  <HexInput
                    isInvalid={!chroma.valid(state[controls].hex)}
                    value={state[controls].hex}
                    onChange={(e) => handleChangeHex(controls, e)}
                    type="text"
                    w={100}
                  />
                </FormControl>
                <Box alignSelf="stretch">
                  <Slider
                    name="Hue-Chroma-Luminance"
                    swatch={controls}
                    mode={["h", "c", "l"]}
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
