import { Flex, HStack, Text, VStack } from "@chakra-ui/core";
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
import { useContextValue } from "../../utils/context";

const Swatch = (props) => {
  const [state] = useStateValue();

  const [context] = useContextValue();

  const color = props.color;

  let calcContrast = 0;
  props.index < props.scale.length - 1 &&
    (calcContrast = chroma.contrast(props.color, props.scale[props.index + 1]));

  calcContrast = Number(calcContrast.toFixed(2));

  let clips = calcContrast < state[props.swatch].scale.parameters.contrast;

  let luminance = chroma(color).luminance();
  luminance = +luminance.toFixed(3);

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
      {color == state[props.swatch].hex && (
        <RiSeedlingLine color={bw} size="2em" />
      )}

      {clips && props.index !== props.scale.length - 1 && (
        <HStack m={0} align="center">
          <Flex color={bw} align="center" justify="center" boxSize={5}>
            <RiErrorWarningLine color={bw} />
          </Flex>
          <Text fontSize="xs" fontWeight="bold" color={bw}>
            {calcContrast}&thinsp;&#8758;&thinsp;1
          </Text>
        </HStack>
      )}

      <VStack spacing="3" align="stretch" w="100%" mt="auto">
        <HStack m={0} align="center">
          <Flex color={bw} align="center" justify="center" boxSize={5}>
            <RiSunLine />
          </Flex>
          <Text fontSize="xs" fontWeight="bold" color={bw}>
            {luminance}
          </Text>
        </HStack>
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
              fontWeight="bold"
              color={"currentcolor"}
              textTransform="uppercase"
            >
              {color}
            </Text>
          </HStack>
        </CopyToClipboard>
        <BWCheck
          color={color}
          against={
            (chroma.valid(context.onLight) && context.onLight) || "white"
          }
        />
        <BWCheck
          color={color}
          against={(chroma.valid(context.onDark) && context.onDark) || "black"}
        />
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
