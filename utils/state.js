import { createContext, useContext, useReducer } from "react";
import merge from "deepmerge";
import { createSwatch } from "./creator";

export const StateContext = createContext({});

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);

const overwriteMerge = (destinationArray, sourceArray, options) => sourceArray;

export const initialState = {
  controls: "color",
  settings: {
    onLight: "#FFFFFF",
    onDark: "#000000",
    mode: "lch",
    showTests: true,
  },
  swatches: {
    color: {
      hex: "#263648",
      name: "Canada Blue",
      values: {
        l: 22,
        c: 13,
        h: 266,
      },
      scale: {
        hex: ["#121a23", "#263648", "#495665"],
        parameters: {
          dark: "1",
          light: "1",
          contrast: "1.6",
        },
      },
    },
  },
  forceUpdate: () => {},
};

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

export function reducer(state, action) {
  switch (action.type) {
    case "changeValue":
      console.log(action.type, { ...state, ...action.data });
      return { ...state, ...action.data };
    case "mergeValue":
      //console.log("Merge: ", state, action.data);
      const mergedStateValues = merge(state, action.data, {
        arrayMerge: overwriteMerge,
      });
      console.log(action.type, state.swatches);
      return mergedStateValues;
    case "addSwatch":
      const newSwatch = createSwatch(state.settings.mode);
      const addedSwatch = merge(state, {
        swatches: {
          [action.data]: newSwatch,
        },
      });
      //console.log(action.type, Object.keys(state.swatches));
      return addedSwatch;
    case "renameSwatch":
      state.swatches[action.data.old].name = action.data.new;
      return {
        ...state,
      };
    case "removeSwatch":
      delete state.swatches[action.data];
      return { ...state };
    case "setControls":
      return { ...state, controls: action.data };
    default:
      console.log(action.type, Object.keys(state.swatches));
      return state;
  }
}
