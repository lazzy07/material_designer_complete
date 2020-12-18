import React, { Component } from "react";
import { Animated } from "react-animated-css";

interface PropertyProps {
  isVisible: boolean;
}

export default class Property extends Component<PropertyProps, any> {
  render() {
    return (
      <Animated
        animationIn="fadeIn"
        animationOut="fadeOut"
        animationInDuration={1}
        animationOutDuration={1}
        isVisible={this.props.isVisible}
      >
        {this.props.isVisible ? this.props.children : undefined}
      </Animated>
    );
  }
}
