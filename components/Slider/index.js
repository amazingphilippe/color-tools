import React from "react";
import chroma from "chroma-js";
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
import { makeScale } from "../Scale";

export const Slider = (props) => {
  const [state, dispatch] = useStateValue();

  const mode = props.mode.join("");

  let values = state[props.swatch].values;

  /**Object.fromEntries(
    props.mode.map((x) => [
      x,
      chroma(state[props.swatch].hex).get(`${mode}.${x}`),
    ])
  ); */

  //make an array
  //loop into array when rendering the inputs

  //on change, recalculate the hex
  //send it to the sate

  const handleChangeValue = (key, e) => {
    let newValues = {
      ...values,
      [key]: parseFloat(e.target.value),
    };

    let newHex = chroma(newValues).hex();

    dispatch({
      type: "changeValue",
      data: { [props.swatch]: { hex: newHex, values: newValues } },
    });
  };

  const handleChangeValueSlider = (key, val) => {
    let newValues = {
      ...values,
      [key]: val,
    };

    let newHex = chroma(newValues).hex();

    let scale = makeScale(state[props.swatch].scale.parameters, newHex);

    let newScale = {
      scale: {
        hex: scale,
      },
    };

    dispatch({
      type: "changeValue",
      data: {
        [props.swatch]: {
          hex: newHex,
          values: newValues,
          ...newScale,
        },
      },
    });
  };

  return (
    <VStack>
      <FormControl id={`${props.swatch}-${mode}-group`}>
        <FormLabel>{props.name}</FormLabel>
        {props.mode.map((key, i) => {
          return (
            <FormControl key={key} id={`${props.swatch}-${key}`}>
              <HStack spacing={0}>
                <FormLabel>{key}</FormLabel>
                <FormHelperText>
                  {colorSpaces[mode][i][0]} - {colorSpaces[mode][i][1]}
                </FormHelperText>
              </HStack>

              <HStack spacing={0}>
                <Input
                  value={state[props.swatch].values[key]}
                  onChange={(e) => handleChangeValue(key, e)}
                  type="text"
                  w={100}
                  step="0.01"
                />
                <Box px={5} w="100%" d="flex" align="center">
                  <ChakraSlider
                    value={state[props.swatch].values[key]}
                    onChange={(val) => handleChangeValueSlider(key, val)}
                    step={0.01}
                    min={colorSpaces[mode][i][0]}
                    max={colorSpaces[mode][i][1]}
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
