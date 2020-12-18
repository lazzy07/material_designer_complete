import React, { Component } from "react";
import Sl from "rc-slider";
import "rc-slider/assets/index.css";
import { ACTIVE_COLOR, ACTIVE_COLOR_LIGHT } from "../../../constants";

interface SliderProps {
  value: number;
  min: number;
  max: number;
  disabled?: boolean;
  title?: string;
  color?: string;
  step?: number;
  onChange?: (value: number) => void;
  onAfterChange?: (value: number) => void;
}

export default class Slider extends Component<SliderProps, any> {
  render() {
    return (
      <div>
        {this.props.title}
        <Sl
          onChange={value =>
            this.props.onChange ? this.props.onChange(value) : undefined
          }
          onAfterChange={value =>
            this.props.onAfterChange
              ? this.props.onAfterChange(value)
              : undefined
          }
          value={this.props.value}
          step={this.props.step}
          min={this.props.min}
          max={this.props.max}
          disabled={this.props.disabled}
          trackStyle={{
            backgroundColor: !this.props.disabled
              ? this.props.color || ACTIVE_COLOR
              : undefined
          }}
          handleStyle={{
            backgroundColor: !this.props.disabled
              ? this.props.color || ACTIVE_COLOR
              : undefined,
            borderColor: !this.props.disabled
              ? this.props.color || ACTIVE_COLOR
              : undefined
          }}
          activeDotStyle={{
            backgroundColor: !this.props.disabled
              ? this.props.color || ACTIVE_COLOR
              : undefined,
            borderColor: !this.props.disabled
              ? this.props.color || ACTIVE_COLOR_LIGHT
              : undefined
          }}
        />
      </div>
    );
  }
}
