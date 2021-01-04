import React from "react";
import chroma from "chroma-js";
import { Box, Text, Flex, HStack } from "@chakra-ui/react";

export const BWCheck = (props) => {
  const contrast = chroma.contrast(props.color, props.against);

  const bw =
    chroma.valid(props.color) && chroma.contrast(props.color, "#000") > 7
      ? "#000000"
      : "#ffffff";

  return (
    <HStack align="center">
      <Flex boxSize={5} bg={props.against} align="center" justify="center">
        <Box boxSize={4} bg={props.color} rounded="full" />
      </Flex>
      <Text
        color={bw}
        fontSize="xs"
        fontFamily="mono"
        fontWeight="bold"
        textTransform="uppercase"
        whiteSpace="nowrap"
      >
        {Number(contrast.toFixed(2)) >= 7
          ? "AAA"
          : contrast >= 4.5
          ? "AA"
          : contrast >= 3
          ? "B"
          : "Fail"}
        &thinsp;&asymp;&thinsp;
        {Number(contrast.toFixed(2))}&thinsp;&#8758;&thinsp;1
      </Text>
    </HStack>
  );
};
