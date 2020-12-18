import React, { Component } from "react";
import SliderWithInput from "../elements/form/SliderWithInput";
import { DEFAULT_COLOR, SECONDARY_COLOR } from "../../constants";
import { Animated } from "react-animated-css";
import Checkbox from "../elements/form/Checkbox";

export default class OptionsPane extends Component<any, any> {
  renderPane = (type: string) => {
    switch (type) {
      case "exposure":
        return (
          <SliderWithInput
            inputTitle={""}
            min={0}
            max={10}
            step={0.1}
            value={this.props.envExposure}
            onChange={value => {
              this.props.changeEnvmapExposure(value);
            }}
          />
        );

      case "subdivision":
        return (
          <SliderWithInput
            inputTitle={""}
            min={1}
            max={100}
            value={this.props.subdivision}
            onChange={value => {
              this.props.changeSubdivision(value);
            }}
          />
        );

      case "wireframe":
        return (
          <Checkbox
            title="Wireframe?"
            checked={this.props.wireframe}
            value={""}
            onClick={() => this.props.toggleWireframe()}
          />
        );
    }
  };

  render() {
    if (this.props.pane() === "") {
      return null;
    } else {
      return (
        <div
          style={{
            height: 37,
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            backgroundColor: DEFAULT_COLOR
          }}
        >
          <Animated
            animationIn="slideInUp"
            animationOut="slideOutDown"
            isVisible
          >
            <div
              style={{
                paddingLeft: 10,
                paddingRight: 10,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <span style={{ paddingBottom: 5 }}>
                {this.props
                  .pane()
                  .charAt(0)
                  .toUpperCase() + this.props.pane().slice(1)}
              </span>
              {this.renderPane(this.props.pane())}
              <span
                style={{
                  fontWeight: "bolder",
                  padding: 2,
                  paddingLeft: 5,
                  paddingRight: 5,
                  marginBottom: 10,
                  border: `2px ${SECONDARY_COLOR} solid`,
                  cursor: "pointer"
                }}
                onClick={this.props.close}
              >
                x
              </span>
            </div>
          </Animated>
        </div>
      );
    }
  }
}
