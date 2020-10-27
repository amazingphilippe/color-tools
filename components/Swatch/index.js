import {
  Flex,
  Box,
  HStack,
  Text,
  VStack,
  Button,
  AspectRatio,
} from "@chakra-ui/core";
import React from "react";
import chroma from "chroma-js";
import BWCheck from "../BWCheck";
import { RiSunFill } from "react-icons/ri";
import mix from "../../utils/mix";

const Swatch = (props) => {
  const color = props.color;

  let luminance = chroma(color).luminance();
  luminance = +luminance.toFixed(3);
  return (
    <VStack bg="gray.200" align="start" spacing={0}>
      <AspectRatio ratio={1} w="100%">
        <Box bg={color} />
      </AspectRatio>
      <VStack spacing="3" align="start" p={4}>
        <HStack m={0} align="center">
          <Flex
            boxSize={5}
            bg="white"
            rounded="full"
            align="center"
            justify="center"
          >
            <RiSunFill />
          </Flex>

          <Text as="span" fontWeight="bold">
            {luminance}
          </Text>
        </HStack>
        <BWCheck color={color} against="white" />
        <BWCheck color={color} against="black" />
      </VStack>
    </VStack>
  );
};

export default Swatch;
