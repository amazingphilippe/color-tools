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
    zen: true,
    contrastMode: "2.1",
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
          darkSatShift: 0.3,
          darkHueShift: 0,
          light: "1",
          lightSatShift: 0,
          lightHueShift: 0.3,
          contrast: "1.6",
        },
      },
    },
  },
  forceUpdate: () => {},
};

export function reducer(state, action) {
  switch (action.type) {
    case "changeValue":
      //console.log(action.type, { ...state, ...action.data });
      return { ...state, ...action.data };
    case "mergeValue":
      //console.log("Merge: ", state, action.data);
      const mergedStateValues = merge(state, action.data, {
        arrayMerge: overwriteMerge,
      });
      //console.log(action.type, state.swatches);
      return mergedStateValues;
    case "importSwatch":
      const importedSwatch = merge(state, {
        swatches: {
          ...action.data,
        },
      });

      console.log(importedSwatch);
      return importedSwatch;
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
      //console.log(action.type, Object.keys(state.swatches));
      return state;
  }
}
