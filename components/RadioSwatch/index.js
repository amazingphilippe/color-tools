import { Box, useRadio } from "@chakra-ui/react";
import chroma from "chroma-js";

export const RadioSwatch = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  // What between white or black will contrast enough to display information on the swatch bg color
  const bw =
    chroma.valid(props.color) && chroma.contrast(props.color, "#000") > 7
      ? "black"
      : "white";

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        boxSize={12}
        borderRadius="full"
        border="2px"
        borderColor="black"
        bg={props.color}
        color={bw}
        ml={2}
        p={1}
        d="flex"
        alignItems="center"
        justifyContent="center"
        _checked={{
          transform: "translateY(1rem)",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        _hover={{ boxShadow: "0 0 0 4px #00000044" }}
      >
        {props.children}
      </Box>
    </Box>
  );
};
