import React, { Component } from "react";
import { Node } from "../../../../rete/src";
import SliderWithInput from "../../../elements/form/SliderWithInput";

interface PerlinNoiseNodeProps {
  node: Node;
  updateEngine: any;
}

export default class PerlinNoiseController extends Component<
  PerlinNoiseNodeProps,
  any
> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  getPerlinNoiseData = () => {
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

  renderControllers = () => {
    return (
      <div style={{ paddingTop: "10px" }}>
        <SliderWithInput
          title="Seed"
          min={0}
          max={100}
          step={1}
          value={this.state.seed}
          onChange={value => this.setParam("seed", parseInt(value))}
          onAfterChange={() => this.onSetParamEnd()}
        />
        <br />
        <SliderWithInput
          title="Ocataves"
          min={0}
          max={8}
          step={1}
          value={this.state.octaves}
          onChange={value => this.setParam("octaves", parseInt(value))}
          onAfterChange={() => this.onSetParamEnd()}
        />
        <br />
        <SliderWithInput
          title="Bias"
          min={0}
          max={4}
          step={0.2}
          value={this.state.bias}
          onChange={value => this.setParam("bias", value)}
          onAfterChange={() => this.onSetParamEnd()}
        />
      </div>
    );
  };

  componentWillMount() {
    this.getPerlinNoiseData();
  }

  render() {
    return <div>{this.renderControllers()}</div>;
  }
}
