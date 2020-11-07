import chroma from "chroma-js";

export const hexToValues = (hex, mode) => {
  let channels = mode.split("");
  let values = Object.fromEntries(
    channels.map((x) => [x, chroma(hex).get(`${mode}.${x}`)])
  );

  return values;
};

export const overwriteMerge = (destinationArray, sourceArray, options) =>
  sourceArray;
