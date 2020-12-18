import React, { Component } from "react";
import SliderWithInput from "../../../elements/form/SliderWithInput";

interface GammaCorrectionControllerProps {
  node: any;
  updateEngine: any;
}

export default class GammaCorrectionController extends Component<
  GammaCorrectionControllerProps,
  any
> {
  getData = () => {
    this.setState({
      ...this.props.node.data.parameters
    });
  };

  setParam = (key: string, value: any) => {
    this.setState({
      [key]: value
    });
    (this.props.node.data as any).parameters[key] = value;
  };

  onSetParamEnd = () => {
    this.props.node.update();
    this.props.updateEngine();
  };

  componentWillMount() {
    this.getData();
  }

  render() {
    return (
      <div>
        <div style={{ paddingTop: "10px" }}>
          <div>Gamma</div>
          <SliderWithInput
            min={0.01}
            max={10}
            step={0.01}
            value={this.state.gamma}
            onChange={value => this.setParam("gamma", value)}
            onAfterChange={this.onSetParamEnd}
          />
          <br />
        </div>
      </div>
    );
  }
}
