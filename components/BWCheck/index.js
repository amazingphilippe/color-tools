import React from "react";
import chroma from "chroma-js";
import { Box, Badge, Spacer, HStack } from "@chakra-ui/core";

export default class BWCheck extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <HStack spacing={1}>
        <HStack spacing={-2}>
          <Box boxSize={5} bg={this.props.color} border="2px" rounded="full" />
          <Box
            boxSize={5}
            bg={this.props.against}
            border="2px"
            rounded="full"
          />
        </HStack>

        <Badge
          colorScheme={
            chroma.contrast(this.props.color, this.props.against) > 4.5
              ? "green"
              : "red"
          }
        >
          AA
        </Badge>
        <Badge
          colorScheme={
            chroma.contrast(this.props.color, this.props.against) > 7
              ? "green"
              : "red"
          }
        >
          AAA
        </Badge>
      </HStack>
    );
  }
}
