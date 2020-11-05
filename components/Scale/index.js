import {
  Input,
  VStack,
  InputGroup,
  InputRightAddon,
  FormControl,
  FormLabel,
} from "@chakra-ui/core";
import { useStateValue } from "../../utils/state";
import chroma from "chroma-js";
import merge from "deepmerge";
import { useContextValue } from "../../utils/context";

export const makeScale = (parameters, base, context) => {
  //console.log("check: ", parameters, base);

  const darker = [base];
  const lighter = [base];

  const contrast = parameters.contrast;

  for (let i = 0; i < parameters.dark; i++) {
    let luminance = chroma(darker[0]).luminance();
    let reachContrast = (luminance + 0.05) / contrast - 0.05;
    //normally 0.05, 0.0501 is used to ensure results get rounded to a passing criteria
    let scaleColor = chroma(darker[0])
      .luminance(reachContrast, context.colorSpace)
      .hex();

    darker.unshift(scaleColor);
  }

  for (let i = 0; i < parameters.light; i++) {
    let luminance = chroma(lighter[0]).luminance();
    let reachContrast = contrast * (luminance + 0.05) - 0.05;
    //normally 0.05, 0.0499 is used to ensure results get rounded to a passing criteria
    let scaleColor = chroma(lighter[0])
      .luminance(reachContrast, context.colorSpace)
      .hex();

    lighter.unshift(scaleColor);
  }

  lighter.reverse().shift();

  const scale = darker.concat(lighter);

  return scale;
};

export const Scale = (props) => {
  const [state, dispatch] = useStateValue();
  const [context] = useContextValue();

  const handleChangeValue = (e, parameter) => {
    let newParameters = { [parameter]: e.target.value };

    let scale = makeScale(
      merge(state[props.swatch].scale.parameters, newParameters),
      state[props.swatch].hex,
      context
    );

    let newScale = {
      scale: {
        hex: scale,
        parameters: newParameters,
      },
    };

    dispatch({
      type: "changeValue",
      data: { [props.swatch]: newScale },
    });
  };

  return (
    <VStack align="start">
      <FormControl id={`${props.swatch}-contrast`}>
        <FormLabel>Minimum contrast step</FormLabel>
        <InputGroup>
          <Input
            type="number"
            value={state[props.swatch].scale.parameters.contrast}
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
          value={state[props.swatch].scale.parameters.dark}
          onChange={(e) => handleChangeValue(e, "dark")}
          w={20}
        />
      </FormControl>
      <FormControl id={`${props.swatch}-light`}>
        <FormLabel>Ammount lighter</FormLabel>
        <Input
          type="number"
          value={state[props.swatch].scale.parameters.light}
          onChange={(e) => handleChangeValue(e, "light")}
          w={20}
        />
      </FormControl>
    </VStack>
  );
};

/*  // find a lighter color based on set contrast step

      chroma('#eb5757').luminance();

      // calculate needed luminance to reach x contrast

      3 * (0.252 + 0.05) - 0.05 = 0.856
      7 * (0.252 + 0.05) - 0.05 = 2.064

      // if the result is above 1, no colors can attain the needed contrast

      chroma('#eb5757').luminance(0.856);
      chroma('#eb5757').luminance(2.064);
      chroma('#fdeaea').luminance();
      chroma.contrast('#fdeaea', '#eb5757')
      chroma.contrast('#ffffff', '#eb5757')
*/
