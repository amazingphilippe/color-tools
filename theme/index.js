import { extendTheme } from "@chakra-ui/core";

import Input from "./components/input";
import Radio from "./components/radio";
import Select from "./components/select";
import Button from "./components/button";
import Editable from "./components/editable";
import Tabs from "./components/tabs";
import Slider from "./components/slider";
import FormLabel from "./components/formLabel";
import Form from "./components/form";

const overrides = {
  colors: {
    gray: {
      50: "#fbfbfb",
      100: "#d8d8d8",
      200: "#b9b9b9",
      300: "#9d9d9d",
      400: "#848484",
      500: "#6d6d6d",
      600: "#585858",
      700: "#434343",
      800: "#2e2e2e",
      900: "#121212",
    },
  },
  components: {
    Input,
    Radio,
    Select,
    Button,
    Editable,
    Tabs,
    Slider,
    FormLabel,
    Form,
  },
};

export default extendTheme(overrides);
