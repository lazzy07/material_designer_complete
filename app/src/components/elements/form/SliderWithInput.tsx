import React, { Component } from "react";
import Slider from "./Slider";
import Inputbox from "./Inputbox";

interface SliderWithInputProps {
  min: number;
  max: number;
  value: number;
  step?: number;
  title?: string;
  inputTitle?: string;
  name?: string;
  onChange: (value: any) => void;
  onAfterChange?: (value: any) => void;
}

export default class SliderWithInput extends Component<
  SliderWithInputProps,
  any
> {
  render() {
    return (
      <div>
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
              value={this.props.value.toString()}
              type="number"
              name="value"
              label={this.props.inputTitle}
              onChange={(type, value) => {
                this.props.onChange(value);
                if (this.props.onAfterChange) this.props.onAfterChange(value);
              }}
            />
          </div>
          <div style={{ flex: 5 }}>
            <Slider
              min={this.props.min}
              value={this.props.value}
              max={this.props.max}
              step={this.props.step}
              onChange={value => this.props.onChange(value)}
              onAfterChange={value =>
                this.props.onAfterChange
                  ? this.props.onAfterChange(value)
                  : undefined
              }
            />
          </div>
        </div>
      </div>
    );
  }
}
