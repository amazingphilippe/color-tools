export default {
  parts: ["tablist", "tab", "tabpanel"],
  baseStyle: {},
  defaultProps: { variant: "enclosed", colorScheme: "gray" },
  variants: {
    enclosed: {
      tablist: {
        borderBottom: 0,
        mb: 0,
      },
      tabpanel: {
        h: "100%",
      },
      tab: {
        transition: "none",
        clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 100%, 0 100%)",
        pr: 6,
        border: 0,
        borderRadius: 0,
        boxShadow: "inset 0 -4px 0 #00000025",
        mb: 0,
        bg: "gray.400",
        _selected: {
          color: "currentColor",
          bg: "white",
          boxShadow: "none",
        },
      },
    },
    palette: {
      tab: {
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
  },
};
