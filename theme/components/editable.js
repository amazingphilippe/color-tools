import { theme } from "@chakra-ui/core";

const focusColor = theme.colors.orange[300];

export default {
  parts: ["input"],
  baseStyle: {
    input: {
      maxW: 56, //224px
      _focus: {
        px: 1,
        border: "2px",
        borderColor: "black",
        bg: "white",
        boxShadow: `0 0 0 4px ${focusColor}`,
      },
    },
  },
};
