export default {
  parts: ["track", "thumb"],
  defaultProps: {
    size: "xl",
  },
  baseStyle: {
    track: {
      bg: "white",
      borderRadius: 0,
      color: "black",
      border: "2px",
      padding: 0,
      //boxShadow: "inset 0 0 0 2px currentColor",
      boxSizing: "border-box",
      _checked: {
        bg: "black",
      },
    },
    thumb: {
      border: "2px",
    },
  },
  sizes: {
    xl: {
      track: {
        h: 10,
        w: 16,
      },
      thumb: {
        boxSize: 9,
        _checked: {
          transform: "translateX(1.5rem)",
        },
      },
    },
  },
};
