import React, { Component } from "react";
import { Button as Btn, Icon } from "react-materialize";

interface ButtonProps {
  title: string;
  onClick?: () => void;
  icon?: string;
  left?: boolean;
  right?: boolean;
  disabled?: boolean;
}

export default class Button extends Component<ButtonProps, any> {
  render() {
    return (
      <div>
        <Btn
          waves="teal"
          onClick={this.props.onClick}
          style={{ marginRight: "5px" }}
          disabled={this.props.disabled}
        >
          {this.props.title}
          {this.props.icon ? (
            <Icon
              style={{ marginLeft: "0px" }}
              left={this.props.left}
              right={this.props.right}
            >
              {this.props.icon}
            </Icon>
          ) : null}
        </Btn>
      </div>
    );
  }
}
