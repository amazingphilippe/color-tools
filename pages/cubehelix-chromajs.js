import { Slider } from "../components/Slider";
import { useStateValue } from "../utils/state";
import {
  Flex,
  Button,
  VStack,
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  IconButton,
  Input,
} from "@chakra-ui/core";
import Swatch from "../components/Swatch";
import { RiDeleteBin2Line } from "react-icons/ri";
import { Scale } from "../components/Scale";
import mix from "../utils/mix";

const CubehelixChromajs = () => {
  const [state, dispatch] = useStateValue();
  return (
    <Box maxW="1000px" w="100%" mx="auto" px={4}>
      <VStack align="start" mx={-4} mt={16} px={4}>
        {Object.keys(state.swatches).map((swatch, i) => {
          // swatch = the color's key in the state object
          //
          const hexColor = mix({
            type: "cubehelix",
            parameters: { ...state.swatches[swatch] },
          });
          return (
            <Flex bg="gray.100" key={i}>
              <Swatch color={hexColor} />
              <Box p="4">
                <Flex align="center" maxW="100%">
                  <Editable
                    value={swatch}
                    flexGrow="1"
                    h={10}
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
                          data: { old: swatch, new: e.target.value },
                        });
                      }}
                    />
                  </Editable>
                  {Object.keys(state.swatches).length > 1 && (
                    <IconButton
                      colorScheme="red"
                      variant="ghost"
                      aria-label="Delete swatch"
                      icon={<RiDeleteBin2Line />}
                      onClick={() => {
                        dispatch({
                          type: "removeSwatch",
                          data: swatch,
                        });
                      }}
                    />
                  )}
                </Flex>
                <Input defaultValue={hexColor} />
                <Slider
                  swatch={swatch}
                  value={state.swatches[swatch].saturation}
                  label="Hue (Saturation)"
                  id={`${swatch}-saturation`}
                  helpText="0 to 11"
                  min={0}
                  max={11}
                />
                <Slider
                  swatch={swatch}
                  value={state.swatches[swatch].hue}
                  label="Start (Hue)"
                  id={`${swatch}-hue`}
                  helpText="0 to 360."
                  min={0}
                  max={360}
                  step="any"
                />
                <Slider
                  swatch={swatch}
                  value={state.swatches[swatch].lightness}
                  label="Lightness"
                  id={`${swatch}-lightness`}
                  helpText="0 to 150"
                  min={0}
                  max={1}
                />
              </Box>
            </Flex>
          );
        })}
        <Button
          colorScheme="yellow"
          onClick={() => {
            const endsWithNumber = /(.+)(\d+$)/;
            const swatches = Object.keys(state.swatches);
            const parts = swatches[swatches.length - 1].split(endsWithNumber);
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
        >
          Add swatch
        </Button>
        {Object.keys(state.swatches).map((swatch, i) => {
          return <Scale seed={swatch}></Scale>;
        })}
      </VStack>
    </Box>
  );
};

export default CubehelixChromajs;
