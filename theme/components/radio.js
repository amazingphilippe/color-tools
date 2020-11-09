export default {
  parts: ["control", "label"],
  baseStyle: {
    control: {
      boxSize: 12,
      borderRadius: "full",
      border: "2px",
      borderColor: "black",
      bg: "currentColor",
      ml: 2,
      p: 1,
      _checked: { transform: "translateY(1rem)", bg: "currentColor" },
      _hover: {
        boxShadow: "0 0 0 4px #00000044",
      },
    },
  },
};
