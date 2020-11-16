import React from "react";
import chroma from "chroma-js";
import merge from "deepmerge";
import { overwriteMerge } from "../../utils/helpers";
import { useStateValue } from "../../utils/state";
import { colorSpaces, colorSpaceNames } from "../../utils/spaces";
import {
  VStack,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  HStack,
  Box,
  useSlider,
} from "@chakra-ui/core";
import { createScale } from "../../utils/creator";
import styles from "../../theme/components/slider.module.scss";

export const Slider = (props) => {
  const [state, dispatch] = useStateValue();

  const { getInputProps } = useSlider(props);

  // Some constants to make the code a bit cleaner
  const mode = props.mode;
  const modeKeys = mode.split("");
  const controls = props.controls;
  const values = state.swatches[controls].values;

  //console.log(values);

  const controlsId = controls.replace(/\s+/g, "-").toLowerCase();

  // State handler
  const handleChangeValue = (key, val) => {
    //console.log(state.controls);
    let newValues = {
      ...values,
      [key]: val,
    };

    //console.log("new values", newValues);

    let newHex = chroma(newValues).hex();

    let newScale = createScale(
      state.swatches[state.controls].scale.parameters,
      newHex,
      state.settings.mode
    );

    let newSwatch = merge(
      state.swatches,
      {
        [state.controls]: {
          hex: newHex,
          values: newValues,
          scale: { hex: newScale },
        },
      },
      { arrayMerge: overwriteMerge }
    );

    //console.log("merged", newSwatch.color.values);

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
      <FormControl id={`${controlsId}-${mode}-group`}>
        <FormLabel>{colorSpaceNames[mode]}</FormLabel>
        {modeKeys.map((key, i) => {
          return (
            <FormControl key={key} id={`${controlsId}-${key}`}>
              <HStack spacing={0}>
                <FormLabel fontFamily="mono">{key}</FormLabel>
                <FormHelperText>{`${colorSpaces[mode][i][0]} - ${colorSpaces[mode][i][1]}`}</FormHelperText>
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
                <Box
                  px={5}
                  w="100%"
                  d="flex"
                  align="center"
                  className={styles.slider}
                >
                  <input
                    {...getInputProps()}
                    type="range"
                    id={`${controlsId}-${props.channel}-slider`}
                    value={values[key]}
                    onChange={(e) => {
                      handleChangeValue(key, Number(e.target.value));
                    }}
                    step={0.01}
                    min={colorSpaces[mode][i][0]}
                    max={colorSpaces[mode][i][1]}
                  />
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




                  <input
                    type="range"
                    value={values[key]}
                    onChange={(e) =>
                      handleChangeValue(key, Number(e.target.value))
                    }
                    step={0.01}
                    min={colorSpaces[state.settings.mode][i][0]}
                    max={colorSpaces[state.settings.mode][i][1]}
                  />
*/
