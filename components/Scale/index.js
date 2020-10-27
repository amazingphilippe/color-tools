import {
  Box,
  Text,
  HStack,
  Input,
  VStack,
  InputGroup,
  InputRightAddon,
  Flex,
  Badge,
} from "@chakra-ui/core";
import mix from "../../utils/mix";
import { useStateValue } from "../../utils/state";
import Swatch from "../Swatch";
import chroma from "chroma-js";

export const Scale = (props) => {
  const [state, dispatch] = useStateValue();

  //Loop for ammount darker
  //Original color
  //Loop for ammount lighter

  const darker = [
    mix({ type: "cubehelix", parameters: { ...state.swatches[props.seed] } }),
  ];
  const lighter = [
    mix({ type: "cubehelix", parameters: { ...state.swatches[props.seed] } }),
  ];
  const contrast = state.scales[props.seed].contrast;

  for (let i = 0; i < state.scales[props.seed].dark; i++) {
    let luminance = chroma(darker[0]).luminance();
    let reachContrast = (luminance + 0.05) / contrast - 0.0501;
    //normally 0.05, 0.0501 is used to ensure results get rounded to a passing criteria
    let scaleColor = chroma(darker[0]).luminance(reachContrast).hex();

    darker.unshift(scaleColor);
  }

  for (let i = 0; i < state.scales[props.seed].light; i++) {
    let luminance = chroma(lighter[0]).luminance();
    let reachContrast = contrast * (luminance + 0.05) - 0.0499;
    //normally 0.05, 0.0499 is used to ensure results get rounded to a passing criteria
    let scaleColor = chroma(lighter[0]).luminance(reachContrast).hex();

    lighter.unshift(scaleColor);
  }

  lighter.reverse().shift();

  const scale = darker.concat(lighter);

  const handleChangeValue = (e, parameter) => {
    let newScale = {
      [props.seed]: {
        ...state.scales[props.seed],
        ...{ [parameter]: e.target.value },
      },
    };
    console.log("changeScale: ", newScale);
    dispatch({
      type: "changeValue",
      data: { scales: { ...state.scales, ...newScale } },
    });
  };

  return (
    <VStack align="start">
      <HStack align="end">
        <label htmlFor="ammount-lighter">
          <Text lineHeight={1.25} fontWeight="bold">
            Ammount darker
          </Text>
          <Input
            type="number"
            defaultValue="1"
            id="ammount-darker"
            onChange={(e) => handleChangeValue(e, "dark")}
          />
        </label>
        <label htmlFor="ammount-lighter">
          <Text lineHeight={1.25} fontWeight="bold">
            Ammount lighter
          </Text>
          <Input
            type="number"
            defaultValue="2"
            id="ammount-lighter"
            onChange={(e) => handleChangeValue(e, "light")}
          />
        </label>
        <label htmlFor="ammount-lighter">
          <Text lineHeight={1.25} fontWeight="bold">
            Minimum contrast step
          </Text>
          <InputGroup>
            <Input
              type="number"
              defaultValue="3"
              id="step"
              step="any"
              onChange={(e) => handleChangeValue(e, "contrast")}
            />
            <InputRightAddon>:1</InputRightAddon>
          </InputGroup>
        </label>
      </HStack>
      <HStack spacing={0}>
        {scale.map((item, key) => {
          let calcContrast = null;
          key < scale.length - 1 &&
            (calcContrast = chroma.contrast(item, scale[key + 1]).toFixed(2));

          return (
            <>
              <Swatch color={item} key={key} />
              {calcContrast !== null && (
                <Badge
                  colorScheme={calcContrast >= contrast ? "gray" : "red"}
                  w={10}
                  d="flex"
                  alignItems="center"
                  justifyContent="center"
                  alignSelf="start"
                  mx={-10}
                  pos="relative"
                  left={-5}
                  top={5}
                  zIndex="9"
                >
                  {calcContrast}
                </Badge>
              )}
            </>
          );
        })}
      </HStack>
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
