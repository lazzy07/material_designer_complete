import React, { Component } from "react";
import { Range as Ran } from "rc-slider";
import "rc-slider/assets/index.css";
import { ACTIVE_COLOR, ACTIVE_COLOR_LIGHT } from "../../../constants";

interface RangeProps {
  values: number[];
  min: number;
  max: number;
  step?: number;
  title?: string;
  disabled?: boolean;
  color?: string;
  onChange?: (values: number[]) => void;
  onAfterChange?: (values: number[]) => void;
}

export default class Range extends Component<RangeProps, any> {
  render() {
    return (
      <div>
        {this.props.title}
        <Ran
          onChange={values =>
            this.props.onChange ? this.props.onChange(values) : undefined
          }
          onAfterChange={values =>
            this.props.onAfterChange
              ? this.props.onAfterChange(values)
              : undefined
          }
          value={[...this.props.values]}
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
          disabled={this.props.disabled}
          trackStyle={[
            {
              backgroundColor: !this.props.disabled
                ? this.props.color || ACTIVE_COLOR
                : undefined
            }
          ]}
          handleStyle={[
            {
              backgroundColor: !this.props.disabled
                ? this.props.color || ACTIVE_COLOR
                : undefined,
              borderColor: !this.props.disabled
                ? this.props.color || ACTIVE_COLOR
                : undefined
            },
            {
              backgroundColor: !this.props.disabled
                ? this.props.color || ACTIVE_COLOR
                : undefined,
              borderColor: !this.props.disabled
                ? this.props.color || ACTIVE_COLOR
                : undefined
            }
          ]}
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
