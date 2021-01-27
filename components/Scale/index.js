import {
  Input,
  VStack,
  HStack,
  InputGroup,
  InputRightAddon,
  FormControl,
  FormLabel,
  FormHelperText,
  Text,
  Divider,
  Box,
  Heading,
} from "@chakra-ui/react";
import { useStateValue } from "../../utils/state";
import { createScale } from "../../utils/creator";
import { ChannelSlider } from "../ChannelSlider";

export const Scale = (props) => {
  const [state, dispatch] = useStateValue();

  // State handler. Everytime a scale param changes, you need to recreate the scale from the same hex seed
  const handleChangeValue = (val, parameter) => {
    let newParameters = {
      ...state.swatches[props.swatch].scale.parameters,
      ...{ [parameter]: val },
    };

    let newScaleHex = createScale(
      newParameters,
      state.swatches[props.swatch].hex,
      state.settings.mode
    );

    let newScale = {
      scale: {
        hex: newScaleHex,
        parameters: newParameters,
      },
    };

    dispatch({
      type: "mergeValue",
      data: {
        swatches: {
          [props.swatch]: {
            ...newScale,
          },
        },
      },
    });
  };

  return (
    <VStack align="start" spacing={8} {...props}>
      <Heading as="h2" size="md">
        Scale
      </Heading>
      <FormControl id={`${props.swatch}-contrast`}>
        <FormLabel>Minimum contrast step</FormLabel>
        <InputGroup>
          <Input
            type="number"
            value={state.swatches[props.swatch].scale.parameters.contrast}
            step="any"
            onChange={(e) => handleChangeValue(e.target.value, "contrast")}
            min={1}
            max={21}
            w={20}
          />
          <InputRightAddon w={8}>:1</InputRightAddon>
        </InputGroup>
      </FormControl>

      <Box w="100%">
        <Text fontWeight="bold">Darker</Text>
        <FormControl id={`${props.swatch}-dark`}>
          <FormLabel>Amount</FormLabel>
          <Input
            type="number"
            value={state.swatches[props.swatch].scale.parameters.dark}
            onChange={(e) => handleChangeValue(e.target.value, "dark")}
            w={20}
          />
        </FormControl>
        <FormControl id={`${props.swatch}-dark-sat-shift`}>
          <HStack spacing={0}>
            <FormLabel>Saturation shift</FormLabel>
            <FormHelperText>&minus;3 to +3</FormHelperText>
          </HStack>
          <ChannelSlider
            min={-3}
            max={3}
            value={state.swatches[props.swatch].scale.parameters.darkSatShift}
            inputHandler={(e) =>
              handleChangeValue(Number(e.target.value), "darkSatShift")
            }
            sliderHandler={(val) => handleChangeValue(val, "darkSatShift")}
          />
        </FormControl>
        <FormControl id={`${props.swatch}-dark-hue-shift`}>
          <HStack spacing={0}>
            <FormLabel>Hue shift</FormLabel>
            <FormHelperText>&minus;360° to +360°</FormHelperText>
          </HStack>
          <ChannelSlider
            min={-360}
            max={360}
            value={state.swatches[props.swatch].scale.parameters.darkHueShift}
            inputHandler={(e) =>
              handleChangeValue(Number(e.target.value), "darkHueShift")
            }
            sliderHandler={(val) => handleChangeValue(val, "darkHueShift")}
          />
        </FormControl>
      </Box>

      <Box w="100%">
        <Text fontWeight="bold">Lighter</Text>
        <FormControl id={`${props.swatch}-light`}>
          <FormLabel>Amount</FormLabel>
          <Input
            type="number"
            value={state.swatches[props.swatch].scale.parameters.light}
            onChange={(e) => handleChangeValue(e.target.value, "light")}
            w={20}
          />
        </FormControl>
        <FormControl id={`${props.swatch}-light-sat-shift`}>
          <HStack spacing={0}>
            <FormLabel>Saturation shift</FormLabel>
            <FormHelperText>&minus;3 to +3</FormHelperText>
          </HStack>
          <ChannelSlider
            min={-3}
            max={3}
            value={state.swatches[props.swatch].scale.parameters.lightSatShift}
            inputHandler={(e) =>
              handleChangeValue(Number(e.target.value), "lightSatShift")
            }
            sliderHandler={(val) => handleChangeValue(val, "lightSatShift")}
          />
        </FormControl>
        <FormControl id={`${props.swatch}-light-hue-shift`}>
          <HStack spacing={0}>
            <FormLabel>Hue shift</FormLabel>
            <FormHelperText>&minus;360° to +360°</FormHelperText>
          </HStack>
          <ChannelSlider
            min={-360}
            max={360}
            value={state.swatches[props.swatch].scale.parameters.lightHueShift}
            inputHandler={(e) =>
              handleChangeValue(Number(e.target.value), "lightHueShift")
            }
            sliderHandler={(val) => handleChangeValue(val, "lightHueShift")}
          />
        </FormControl>
      </Box>
    </VStack>
  );
};
