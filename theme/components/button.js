export default {
  baseStyle: {
    borderRadius: "none",
  },
  variants: {
    palette: {
      boxSize: 12,
      borderRadius: "full",
      border: "2px",
      borderColor: "black",
      bg: "currentColor",
      ml: 2,
      p: 1,
      _selected: { transform: "translateY(1rem)" },
      _hover: {
        boxShadow: "0 0 0 4px #00000044",
      },
    },
  },
};
