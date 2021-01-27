import {
  Box,
  HStack,
  Input,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";

export const ChannelSlider = (props) => {
  return (
    <HStack spacing={0}>
      <Input
        defaultValue={props.value}
        onChange={props.inputHandler}
        type="text"
        w={100}
        step="0.01"
      />
      <Box px={5} w="100%" d="flex" align="center">
        <Slider
          value={props.value}
          onChange={props.sliderHandler}
          step={0.01}
          min={props.min}
          max={props.max}
          focusThumbOnChange={false}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb boxSize={10} />
        </Slider>
      </Box>
    </HStack>
  );
};

/**
 * Props:
 * - inputHandler
 * - value
 * - sliderHandler
 * - min
 * - max
 */
