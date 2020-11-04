import { theme } from "@chakra-ui/core";

const focusColor = theme.colors.orange[300];
const hoverColor = theme.colors.black;
const errorColor = [theme.colors.red[500], theme.colors.black];

export default {
  parts: ["input", "preview"],
  baseStyle: {
    input: {
      px: 2,
      border: "2px",
      borderRadius: 0,
      borderColor: "black",
      bg: "white",
      _focus: {
        borderColor: "black",
        boxShadow: `0 0 0 1px ${hoverColor}, 0 0 0 4px ${focusColor}`,
      },
      _invalid: {
        borderColor: errorColor[0],
        _focus: {
          borderColor: "black",
          boxShadow: `0 0 0 1px ${errorColor[1]}, 0 0 0 4px ${errorColor[0]}`,
        },
      },
    },
    preview: {
      w: "100%",
      border: "2px",
      px: 2,
      borderRadius: 0,
      borderStyle: "dashed",
      borderColor: "gray.300",
    },
  },
};
