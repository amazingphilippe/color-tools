import { Box, useRadio } from "@chakra-ui/react";

export const RadioSwatch = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

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
        ml={2}
        p={1}
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
