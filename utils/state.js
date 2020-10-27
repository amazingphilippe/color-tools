import { createContext, useContext, useReducer } from "react";

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);

const swatchModel = { saturation: 1, hue: 210, lightness: 50 };
const scaleModel = { dark: 1, light: 2, contrast: 3 };

export const initialState = {
  swatches: {
    baseColor: {
      ...swatchModel,
    },
  },
  scales: {
    baseColor: {
      ...scaleModel,
    },
  },
};

export const addSwatch = (name) => {
  return {
    swatches: { ...state.swatches, [name]: { ...swatchModel } },
    scales: { ...state.scales, [name]: { ...scaleModel } },
  };
};

export function reducer(state, action) {
  switch (action.type) {
    case "changeValue":
      return {
        ...state,
        ...action.data,
      };
    case "addSwatch":
      return {
        swatches: { ...state.swatches, [action.data]: { ...swatchModel } },
        scales: { ...state.scales, [action.data]: { ...scaleModel } },
      };
    case "renameSwatch":
      let swatchData = state.swatches[action.data.old];
      delete state.swatches[action.data.old];
      return {
        ...state,
        swatches: { ...state.swatches, [action.data.new]: swatchData },
      };
    case "removeSwatch":
      delete state.swatches[action.data];
      return { ...state };
    default:
      return state;
  }
}
