import * as React from "react";
import { ChakraProvider } from "@chakra-ui/core";
import { initialState, reducer, StateProvider } from "../utils/state";
import theme from "../theme";
import {
  ContextProvider,
  initialContext,
  reducer as contextReducer,
} from "../utils/context";

function App({ Component, pageProps }) {
  console.log("theme: ", theme);
  return (
    <ChakraProvider theme={theme}>
      <ContextProvider initialState={initialContext} reducer={contextReducer}>
        <StateProvider initialState={initialState} reducer={reducer}>
          <Component {...pageProps} />
        </StateProvider>
      </ContextProvider>
    </ChakraProvider>
  );
}

export default App;
