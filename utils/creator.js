import chroma from "chroma-js";
import namer from "color-namer";
import randomColor from "randomcolor";

export const createSwatch = (mode) => {
  // Generate a swatch using a single hex seed
  // https://github.com/davidmerfield/randomColor
  let hex = randomColor();
  let name = namer(hex).ntc[0].name;
  let channels = mode.split("");
  let values = Object.fromEntries(
    channels.map((x) => [x, chroma(hex).get(`${mode}.${x}`)])
  );

  //Generate a scale based on a default parameter preset
  let parameters = {
    dark: "1",
    darkSatShift: 0.3,
    darkHueShift: 0,
    light: "1",
    lightSatShift: 0,
    lightHueShift: 0.3,
    contrast: "1.6",
  };
  let scale = createScale(parameters, hex, mode);

  return {
    hex: hex,
    name: name,
    values: values,
    scale: {
      hex: scale,
      parameters: parameters,
    },
  };
};

export const updateValues = (hex, mode) => {
  let channels = mode.split("");
  let values = Object.fromEntries(
    channels.map((x) => [x, chroma(hex).get(`${mode}.${x}`)])
  );

  return values;
};

export const createScale = (parameters, seed, mode) => {
  let darker = [seed];
  let lighter = [seed];

  const contrast = parameters.contrast;

  /**
   * Contrast formula where L1 is always the lighter color:
   *         (L1 + 0.05)
   * ratio = ───────────
   *         (L2 + 0.05)
   *
   * To find a lighter color:
   *
   * Ligther color L1 = ratio * (L2 + 0.05) - 0.05
   *
   *
   * To find a darker color:
   *
   *                   (L1 + 0.05)
   * Darker color L2 = ───────────  - 0.05
   *                        3
   */

  /** When calculating luminance, Rounding the number to 2 decimals seems to work the best. Better than 3 decimals and better than 1 decimal. */

  for (let i = 0; i < parameters.dark; i++) {
    // Grab luminance. recursive as new values are placed in front
    let luminance = Number(chroma(darker[0]).luminance().toFixed(2));

    // Calculate luminance shift needed and round for consistent wcag tests
    let reachContrast = (luminance + 0.05) / contrast - 0.05;
    reachContrast = Number(reachContrast.toFixed(2));

    //Hue shift
    let hueDirection = Math.sign(parameters.darkHueShift) === -1 ? "" : "+";
    let scaleColor = chroma(darker[0])
      .set(
        "lch.h",
        `${hueDirection}${parameters.darkHueShift / parameters.dark}`
      )
      .hex();

    //Saturation shift
    scaleColor = chroma(scaleColor)
      .saturate(parameters.darkSatShift / parameters.dark)
      .hex();

    // Let chroma adjust luminance
    scaleColor = chroma(scaleColor).luminance(reachContrast, mode).hex();

    // Place darker color in front
    darker.unshift(scaleColor);
  }

  for (let i = 0; i < parameters.light; i++) {
    // Grab luminance. recursive as new values are placed in front
    let luminance = Number(chroma(lighter[0]).luminance().toFixed(2));

    // Calculate luminance shift needed and round for consistent wcag tests
    let reachContrast = contrast * (luminance + 0.05) - 0.05;
    reachContrast = Number(reachContrast.toFixed(2));

    //Hue shift
    let hueDirection = Math.sign(parameters.lightHueShift) === -1 ? "" : "+";
    let scaleColor = chroma(lighter[0])
      .set(
        "lch.h",
        `${hueDirection}${parameters.lightHueShift / parameters.light}`
      )
      .hex();

    //Saturation shift
    scaleColor = chroma(scaleColor)
      .saturate(parameters.lightSatShift / parameters.light)
      .hex();

    // Let chroma adjust luminance
    scaleColor = chroma(scaleColor).luminance(reachContrast, mode).hex();

    // Place lighter color in front
    lighter.unshift(scaleColor);
  }

  // Reverse lighter values and remove seed
  lighter.reverse().shift();

  // Concat with darker values, keeping the seed.
  // Returns an array containing the ordered color scale, including the seed.
  // Will clip balck and white if luminances can't be achieved
  return darker.concat(lighter);
};
