import { theme } from "@chakra-ui/core";

const hoverColor = theme.colors.black;
const focusColor = theme.colors.orange[300];

export default {
  parts: ["errorText", "errorIcon", "requiredIndicator", "helperText"],
  baseStyle: {
    helperText: {
      color: "gray.800",
      fontWeight: "normal",
      fontSize: "base",
      mt: 0,
    },
  },
};
