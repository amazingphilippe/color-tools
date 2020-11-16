export const colorSpaceNames = {
  hcl: "Hue-Chroma-Luminance",
  lch: "Luminance-Chroma-Hue",
  lab: "Luminance-a-b",
  hsl: "Hue-Saturation-Lightness",
  hsv: "Hue-Saturation-Value",
  rgb: "Red-Green-Blue",
};

export const colorSpaces = {
  hcl: [
    [0, 360],
    [0, 140],
    [0, 100],
  ],
  lch: [
    [0, 100],
    [0, 140],
    [0, 360],
  ],
  lab: [
    [0, 100],
    [-100, 100],
    [-100, 100],
  ],
  hsl: [
    [0, 360],
    [0, 1],
    [0, 1],
  ],
  hsv: [
    [0, 360],
    [0, 1],
    [0, 1],
  ],
  rgb: [
    [0, 255],
    [0, 255],
    [0, 255],
  ],
};
