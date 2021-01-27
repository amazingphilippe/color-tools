import { theme } from "@chakra-ui/react";

const hoverColor = theme.colors.black;
const focusColor = theme.colors.orange[300];

export default {
  parts: ["container", "thumb", "track", "filledTrack"],
  baseStyle: {
    thumb: {
      boxShadow: "none",
      border: "2px",
      borderColor: "black",
      transition: "width 0.2s, height 0.2s",
      transformOrigin: "center",
      transform: "translateY(-50%)",
      _hover: {
        boxShadow: `0 0 0 1px ${hoverColor}`,
      },
      _active: {
        boxShadow: "none !important",
      },
      _focus: {
        boxShadow: `0 0 0 1px ${hoverColor}, 0 0 0 4px ${focusColor}`,
      },
    },
    track: {
      overflow: "visible",
      borderRadius: 0,
      clipPath: "inset(1px -20px)",
      bg: "gray.200",
      color: "gray.200",
      boxShadow: "20px 0 0 currentColor",
    },
    filledTrack: {
      bg: "black",
      color: "black",
      boxShadow: "-20px 0 0 20px currentColor",
    },
  },
};
