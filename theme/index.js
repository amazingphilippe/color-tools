import { extendTheme } from "@chakra-ui/core";

import Input from "./components/input";
import Button from "./components/button";
import Editable from "./components/editable";
import Tabs from "./components/tabs";
import Slider from "./components/slider";
import FormLabel from "./components/formLabel";
import Form from "./components/form";

const overrides = {
  components: {
    Input,
    Button,
    Editable,
    Tabs,
    Slider,
    FormLabel,
    Form,
  },
};

export default extendTheme(overrides);
