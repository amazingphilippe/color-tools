import { theme } from "@chakra-ui/core";

const focusColor = theme.colors.orange[300];

export default {
  parts: ["field", "addon"],
  baseStyle: {
    field: {},
  },
  variants: {
    outline: {
      addon: {
        border: "2px",
        borderRadius: 0,
        px: 2,
        borderColor: "gray.400",
        bg: "gray.100",
        color: "gray.600",
      },
      field: {
        px: 2,
        border: "2px",
        borderRadius: 0,
        borderColor: "gray.400",
        bg: "white",
        _hover: {
          borderColor: "gray.500",
        },
        _focus: {
          borderColor: "black",
          boxShadow: `0 0 0 4px ${focusColor}`,
        },
      },
    },
  },
};
