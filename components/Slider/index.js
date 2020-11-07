import React from "react";
import chroma from "chroma-js";
import merge from "deepmerge";
import { overwriteMerge } from "../../utils/helpers";
import { colorSpaces, useStateValue } from "../../utils/state";
import {
  VStack,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Slider as ChakraSlider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  HStack,
  Box,
} from "@chakra-ui/core";
import { createScale } from "../../utils/creator";

export const Slider = (props) => {
  const [state, dispatch] = useStateValue();

  // Some constants to make the code a bit cleaner
  const mode = state.settings.mode.split("");
  const values = state.swatches[props.swatch].values;

  // State handler
  const handleChangeValue = (key, val) => {
    let newValues = {
      ...values,
      [key]: val,
    };

    let newHex = chroma(newValues).hex();

    let newScale = createScale(
      state.swatches[props.swatch].scale.parameters,
      newHex,
      state.settings.mode
    );

    let newSwatch = merge(
      state.swatches,
      {
        [props.swatch]: {
          hex: newHex,
          values: newValues,
          scale: { hex: newScale },
        },
      },
      { arrayMerge: overwriteMerge }
    );

    dispatch({
      type: "changeValue",
      data: {
        swatches: {
          ...newSwatch,
        },
      },
    });
  };

  return (
    <VStack>
      <FormControl id={`${props.swatch}-${mode}-group`}>
        <FormLabel>{props.name}</FormLabel>
        {mode.map((key, i) => {
          return (
            <FormControl key={key} id={`${props.swatch}-${key}`}>
              <HStack spacing={0}>
                <FormLabel fontFamily="mono">{key}</FormLabel>
                <FormHelperText>
                  {colorSpaces[state.settings.mode][i][0]} -{" "}
                  {colorSpaces[state.settings.mode][i][1]}
                </FormHelperText>
              </HStack>

              <HStack spacing={0}>
                <Input
                  value={values[key]}
                  onChange={(e) =>
                    handleChangeValue(key, Number(e.target.value))
                  }
                  type="text"
                  w={100}
                  step="0.01"
                />
                <Box px={5} w="100%" d="flex" align="center">
                  <ChakraSlider
                    value={values[key]}
                    onChange={(val) => handleChangeValue(key, val)}
                    step={0.01}
                    min={colorSpaces[state.settings.mode][i][0]}
                    max={colorSpaces[state.settings.mode][i][1]}
                    focusThumbOnChange={false}
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb boxSize={10} />
                  </ChakraSlider>
                </Box>
              </HStack>
            </FormControl>
          );
        })}
      </FormControl>
    </VStack>
  );
};
/*
<div>
      <label htmlFor={props.id}>
        <Text fontWeight="bold">{props.label}</Text>
        <Text>{props.helpText}</Text>
        <HStack spacing={4}>
          <input
            id={props.id}
            value={state.swatches[props.swatch][parameter]}
            onChange={(e) => handleChangeValue(e)}
            type="range"
            min={props.min}
            max={props.max}
            step="0.01"
          />
          <Input
            value={state.swatches[props.swatch][parameter]}
            onChange={(e) => handleChangeValue(e)}
            type="text"
            w={100}
          />
        </HStack>
      </label>
    </div>
*/
