import {
  Input,
  VStack,
  InputGroup,
  InputRightAddon,
  FormControl,
  FormLabel,
} from "@chakra-ui/core";
import { useStateValue } from "../../utils/state";
import { createScale } from "../../utils/creator";

export const Scale = (props) => {
  const [state, dispatch] = useStateValue();

  // State handler. Everytime a scale param changes, you need to recreate the scale from the same hex seed
  const handleChangeValue = (e, parameter) => {
    let newParameters = {
      ...state.swatches[props.swatch].scale.parameters,
      ...{ [parameter]: e.target.value },
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
    <VStack align="start">
      <FormControl id={`${props.swatch}-contrast`}>
        <FormLabel>Minimum contrast step</FormLabel>
        <InputGroup>
          <Input
            type="number"
            value={state.swatches[props.swatch].scale.parameters.contrast}
            step="any"
            onChange={(e) => handleChangeValue(e, "contrast")}
            min={1}
            max={21}
            w={20}
          />
          <InputRightAddon w={8}>:1</InputRightAddon>
        </InputGroup>
      </FormControl>
      <FormControl id={`${props.swatch}-dark`}>
        <FormLabel>Ammount darker</FormLabel>
        <Input
          type="number"
          value={state.swatches[props.swatch].scale.parameters.dark}
          onChange={(e) => handleChangeValue(e, "dark")}
          w={20}
        />
      </FormControl>
      <FormControl id={`${props.swatch}-light`}>
        <FormLabel>Ammount lighter</FormLabel>
        <Input
          type="number"
          value={state.swatches[props.swatch].scale.parameters.light}
          onChange={(e) => handleChangeValue(e, "light")}
          w={20}
        />
      </FormControl>
    </VStack>
  );
};
