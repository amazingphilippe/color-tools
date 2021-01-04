import { HStack, Flex, Input } from "@chakra-ui/react";
import chroma from "chroma-js";
import { RiEmotionUnhappyLine } from "react-icons/ri";

export const HexInput = (props) => {
  const bw =
    chroma.valid(props.value) && chroma.contrast(props.value, "#000") > 7
      ? "#000000"
      : "#ffffff";
  return (
    <HStack>
      <HStack boxShadow="inset 0 -2px 0 black" mr="auto" spacing={2}>
        <Flex boxSize={10} border="2px" bg={bw} align="center" justify="center">
          <Flex
            boxSize={8}
            bg={props.value}
            color="black"
            rounded="full"
            align="center"
            justify="center"
          >
            {!chroma.valid(props.value) && <RiEmotionUnhappyLine size="2em" />}
          </Flex>
        </Flex>
        <Input {...props} textTransform="uppercase" />
      </HStack>
    </HStack>
  );
};
