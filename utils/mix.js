import chroma from "chroma-js";

const mix = (data) => {
  console.log("mix: ", data);
  let mix = "#ff0000";

  switch (data.type) {
    case "chroma":
      return chroma(data.parameters).hex();
    case "cubehelix":
      return chroma
        .cubehelix()
        .start(data.parameters.hue)
        .hue(data.parameters.saturation)
        .lightness(data.parameters.lightness)
        .rotations(0)
        .scale()
        .colors(1)[0];
    default:
      return "#ff0000";
  }
};

export default mix;
