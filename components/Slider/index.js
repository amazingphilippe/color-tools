import React, { useReducer, useState } from "react";
import HelperText from "../HelperText";
import Swatch from "../Swatch";
import chroma from "chroma-js";
import { initialState, reducer, useStateValue } from "../../utils/state";
import { HStack, Input, Text } from "@chakra-ui/core";
import precision from "../../utils/precision";

export const Slider = (props) => {
  const [state, dispatch] = useStateValue();
  const parameter = props.id.split("-")[1];

  const handleChangeValue = (e) => {
    let newSwatch = {
      [props.swatch]: {
        ...state.swatches[props.swatch],
        ...{ [parameter]: e.target.value },
      },
    };
    dispatch({
      type: "changeValue",
      data: { swatches: { ...state.swatches, ...newSwatch } },
    });
  };

  return (
    <div>
      <label htmlFor={props.id}>
        <Text fontWeight="bold">{props.label}</Text>
        <Text>{props.helpText}</Text>
        <HStack spacing={4}>
          <input
            id={props.id}
            value={state.swatches[props.swatch][parameter]}
            onChange={(e) => handleChangeValue(e)}
            type="range"
            min={props.min}
            max={props.max}
            step="0.01"
          />
          <Input
            value={state.swatches[props.swatch][parameter]}
            onChange={(e) => handleChangeValue(e)}
            type="text"
            w={100}
          />
        </HStack>
      </label>
    </div>
  );
};

/*
export class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.changeValue(
      event.target.value,
      this.props.id,
      this.props.swatch
    );
  }

  render() {
    const value = this.props.value;
    return (
      <div>
        <label htmlFor={this.props.id}>
          {this.props.label}
          <HelperText>{this.props.helpText}</HelperText>
          <input
            id={this.props.id}
            value={value}
            onChange={this.handleChange}
            type="range"
            min={this.props.min}
            max={this.props.max}
            step="any"
          />
        </label>
      </div>
    );
  }
}*/
