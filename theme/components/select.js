import { theme } from "@chakra-ui/core";

const focusColor = theme.colors.orange[300];
const hoverColor = theme.colors.black;
const errorColor = [theme.colors.red[500], theme.colors.black];

export default {
  parts: ["field", "icon"],
  baseStyle: {
    field: {},
  },
  variants: {
    outline: {
      field: {
        pl: 2,
        border: "2px",
        borderRadius: 0,
        borderColor: "black",
        bg: "white",
        _hover: {
          borderColor: "black",
          boxShadow: "0 0 0 4px #00000044",
        },
        _focus: {
          borderColor: "black",
          boxShadow: `0 0 0 1px ${hoverColor}, 0 0 0 4px ${focusColor}`,
        },
        _invalid: {
          borderColor: errorColor[0],
          boxShadow: "none",
          _hover: {
            boxShadow: "0 0 0 4px #00000044",
          },
          _focus: {
            borderColor: "black",
            boxShadow: `0 0 0 1px ${errorColor[1]}, 0 0 0 4px ${errorColor[0]}`,
          },
        },
      },
    },
  },
};
