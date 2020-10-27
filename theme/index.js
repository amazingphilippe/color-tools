import { extendTheme } from "@chakra-ui/core";

import Input from "./components/input";
import Button from "./components/button";
import Editable from "./components/editable";

const overrides = {
  components: {
    Input,
    Button,
    Editable,
  },
};

export default extendTheme(overrides);
