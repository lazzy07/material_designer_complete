import React, { Component } from "react";
import ChromePicker from "./ChromePicker";

interface ColorPickerProps {
  defaultColor: string;
  // handleColor: (color) => void;
  height?: number;
  enableAlpha?: boolean;
  width?: number;
  color: any;
  onChangeComplete: (color) => void;
  onChange?: any;
}

class ColorPicker extends Component<ColorPickerProps, any> {
  render() {
    return (
      <div>
        <ChromePicker
          disableAlpha={this.props.enableAlpha ? false : true}
          color={this.props.color}
          onChangeComplete={this.props.onChangeComplete}
          onChange={this.props.onChange}
          styles={{
            default: {
              body: {
                padding: 10,
                margin: 0,
                boxShadow: "0px 0px"
              }
            }
          }}
        />

        {/* <div
          style={{
            height: this.props.height ? this.props.height : 200,
            position: "relative"
          }}
        >
          <Saturation
            {...this.props}
            color={this.props.color}
            onChange={color => {
              this.props.onChangeComplete(color);
            }}
          />
        </div>
        <div
          style={{
            height: this.props.height ? this.props.height - 180 : 20,
            position: "relative"
          }}
        >
          <Hue
            color={this.props.color}
            {...this.props}
            onChange={color => {
              this.props.onChangeComplete(color);
            }}
            direction={"horizontal"}
          />
        </div> */}
      </div>
    );
  }
}

export default ColorPicker;
