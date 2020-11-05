import { createContext, useContext, useReducer } from "react";
import merge from "deepmerge";

export const Context = createContext();

export const ContextProvider = ({ reducer, initialState, children }) => (
  <Context.Provider value={useReducer(reducer, initialState)}>
    {children}
  </Context.Provider>
);

export const useContextValue = () => useContext(Context);

export const initialContext = {
  onLight: "#FFFFFF",
  onDark: "#000000",
  colorSpace: "lch",
  showContrastTests: true,
};

export function reducer(state, action) {
  switch (action.type) {
    case "changeValue":
      return merge(state, action.data);
    default:
      return state;
  }
}
