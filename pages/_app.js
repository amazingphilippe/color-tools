import * as React from "react";
import { ChakraProvider } from "@chakra-ui/core";
import { initialState, reducer, StateProvider } from "../utils/state";
import theme from "../theme";

function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <StateProvider initialState={initialState} reducer={reducer}>
        <Component {...pageProps} />
      </StateProvider>
    </ChakraProvider>
  );
}

export default App;
