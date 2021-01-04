import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { initialState, reducer, StateProvider } from "../utils/state";
import theme from "../theme";

function App({ Component, pageProps }) {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </StateProvider>
  );
}

export default App;
