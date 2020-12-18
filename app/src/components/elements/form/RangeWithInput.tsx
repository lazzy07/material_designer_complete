import React, { Component } from "react";
import Range from "./Range";
import Inputbox from "./Inputbox";

interface RangeWithInputProps {
  min: number;
  max: number;
  values: number[];
  title?: string;
  step?: number;
  minTitle?: string;
  maxTitle?: string;
  onChange: (value: number[]) => void;
  onAfterChange?: (value: number[]) => void;
}

export default class RangeWithInput extends Component<
  RangeWithInputProps,
  any
> {
  render() {
    let values = this.props.values;

    for (let i = 0; i < values.length; i++) {
      if (values[i] < this.props.min) {
        values[i] = this.props.min;
      } else if (values[i] > this.props.max) {
        values[i] = this.props.max;
      }
    }

    return (
      <div style={{ paddingTop: "25px" }}>
        {this.props.title}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <div style={{ flex: 2, paddingRight: "15px" }}>
            <Inputbox
              value={this.props.values[0].toString()}
              type="number"
              name="min"
              label={this.props.minTitle || "Min"}
              onChange={(type, value) => {
                this.props.onChange([parseInt(value), this.props.values[1]]);
                this.props.onAfterChange
                  ? this.props.onAfterChange([
                      parseInt(value),
                      this.props.values[1]
                    ])
                  : undefined;
              }}
            />
          </div>
          <div style={{ flex: 3 }}>
            <Range
              step={this.props.step}
              min={this.props.min}
              values={values}
              max={this.props.max}
              onChange={this.props.onChange}
              onAfterChange={this.props.onAfterChange}
            />
          </div>
          <div style={{ flex: 2, paddingLeft: "15px" }}>
            <Inputbox
              value={this.props.values[1].toString()}
              type="number"
              name="max"
              label={this.props.maxTitle || "Max"}
              onChange={(type, value) => {
                this.props.onChange([this.props.values[0], parseInt(value)]);
                this.props.onAfterChange
                  ? this.props.onAfterChange([
                      this.props.values[0],
                      parseInt(value)
                    ])
                  : undefined;
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
