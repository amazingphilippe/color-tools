import { createContext, useContext, useReducer } from "react";
import chroma from "chroma-js";
import { scale } from "../components/Scale";
import merge from "deepmerge";

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);

const overwriteMerge = (destinationArray, sourceArray, options) => sourceArray;

const swatchModel = {
  hex: "#26374a",
  values: { h: 266.19, c: 13.87, l: 22.43 },
  scale: {
    hex: [
      "#141d27",
      "#26374a",
      "#3e4d5e",
      "#556372",
      "#6e7a87",
      "#89939d",
      "#a7afb6",
      "#c9ced2",
      "#eff1f2",
    ],
    parameters: { dark: 1, light: 7, contrast: 1.4 },
  },
};

export const initialState = {
  baseColor: {
    ...swatchModel,
  },
  baseColor2: {
    ...swatchModel,
  },
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
      return merge(state, action.data, { arrayMerge: overwriteMerge });
    case "addSwatch":
      return merge(state, { [action.data]: swatchModel });
    case "renameSwatch":
      let swatchData = state[action.data.old];
      delete state[action.data.old];
      return {
        ...state,
        [action.data.new]: swatchData,
      };
    case "removeSwatch":
      delete state[action.data];
      return { ...state };
    default:
      return state;
  }
}
