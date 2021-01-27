import { Flex, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import chroma from "chroma-js";
import { BWCheck } from "../BWCheck";
import {
  RiErrorWarningLine,
  RiSeedlingLine,
  RiSipLine,
  RiSunLine,
} from "react-icons/ri";
import { useStateValue } from "../../utils/state";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { SAPCContrast } from "../../utils/APCAsRGB.98";

const Swatch = (props) => {
  const [state] = useStateValue();

  const color = props.color;

  let calcContrast = 0;
  // If the swatch is not the last one, check its contrast relative to the next color in the scale.
  props.index < props.scale.length - 1 &&
    (calcContrast = chroma.contrast(props.color, props.scale[props.index + 1]));

  // Fix the contrast to the nearest 1 decimal. Most WCAG tools only use a single decimal
  // The "+" makes sure we get a number and not a string. Cleaner than calling Number() ?
  calcContrast = +calcContrast.toFixed(1);

  // A color clips when it can't reach the contrast value specified in the scale parameters
  let clips = calcContrast < props.swatch.scale.parameters.contrast;

  // To display luminance value on the swatch
  let luminance = +chroma(color).luminance().toFixed(2);

  // What between white or black will contrast enough to display information on the swatch bg color
  const bw =
    chroma.valid(color) && chroma.contrast(color, "#000") > 7
      ? "black"
      : "white";

  return (
    <VStack
      bg={color}
      align="start"
      justifyContent="space-between"
      boxSize="100%"
      h={255}
      p={2}
      spacing={0}
    >
      {color === props.swatch.hex && <RiSeedlingLine color={bw} size="2em" />}

      {!state.settings.zen && clips && props.index !== props.scale.length - 1 && (
        <HStack m={0} align="center">
          <Flex color={bw} align="center" justify="center" boxSize={5}>
            <RiErrorWarningLine color={bw} />
          </Flex>
          <Text fontSize="xs" fontFamily="mono" fontWeight="bold" color={bw}>
            {calcContrast}&thinsp;&#8758;&thinsp;1
          </Text>
        </HStack>
      )}

      <VStack
        className={`${color}-info`}
        spacing="3"
        align="stretch"
        w="100%"
        mt="auto"
      >
        {!state.settings.zen && (
          <HStack m={0} align="center">
            <Flex color={bw} align="center" justify="center" boxSize={5}>
              <RiSunLine />
            </Flex>
            <Text fontSize="xs" fontFamily="mono" fontWeight="bold" color={bw}>
              {luminance}
            </Text>
          </HStack>
        )}
        <CopyToClipboard text={color}>
          <HStack
            m={0}
            mr="auto"
            align="center"
            color={bw}
            textDecoration="underline"
          >
            <Flex
              color={"currentcolor"}
              rounded="full"
              align="center"
              justify="center"
              boxSize={5}
            >
              <RiSipLine />
            </Flex>
            <Text
              fontSize="xs"
              fontFamily="mono"
              fontWeight="bold"
              color={"currentcolor"}
              textTransform="uppercase"
            >
              {color}
            </Text>
          </HStack>
        </CopyToClipboard>
        {state.settings.showTests && (
          <>
            <BWCheck
              color={color}
              against={
                (chroma.valid(state.settings.onLight) &&
                  state.settings.onLight) ||
                "white"
              }
            />
            <BWCheck
              color={color}
              against={
                (chroma.valid(state.settings.onDark) &&
                  state.settings.onDark) ||
                "black"
              }
            />
          </>
        )}
      </VStack>
    </VStack>
  );
};

export default Swatch;

/** 
 * 
  const colorIndex = state[props.swatch].scale.hex.indexOf(color);

  const colorDarker = state[props.swatch].scale.hex[colorIndex - 1] || false;
  const colorLighter = state[props.swatch].scale.hex[colorIndex + 1] || false;
 * 
 * <Flex w="100%">
          {colorDarker && (
            <Box
              w="50%"
              h={5}
              bg={colorDarker}
              fontSize="xs"
              fontWeight="bold"
              color={bw}
              d="flex"
              px={1}
              alignItems="center"
              mr="auto"
            >
              <Text>
                {Number(chroma.contrast(color, colorDarker).toFixed(1))}
                &thinsp;&#8758;&thinsp;1
              </Text>
            </Box>
          )}
          {colorLighter && (
            <Box
              w="50%"
              h={5}
              bg={colorLighter}
              p={1}
              fontSize="xs"
              fontWeight="bold"
              color={bw}
              d="flex"
              alignItems="center"
              ml="auto"
            >
              <Text>
                {Number(chroma.contrast(color, colorLighter).toFixed(1))}
                &thinsp;&#8758;&thinsp;1
              </Text>
            </Box>
          )}
        </Flex> */
