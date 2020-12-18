import React, { Component, ReactElement } from "react";
import { Node } from "./../../../../rete/src/node";
import { isConnected } from "../settings";
import ColorPicker from "./../../../common/ColorPicker";
import SliderWithInput from "../../../elements/form/SliderWithInput";
import Property from "../../../properties_editor/Property";
import { Vector2 } from "three";

export interface ViewerNodeProps {
  node: Node;
  updateEngine: any;
}

export default class ViewerController extends Component<ViewerNodeProps, any> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  getViewerData = () => {
    this.setState({
      ...this.props.node.data.parameters
    });
  };

  setBaseColor = color => {
    this.setState({
      baseColor: color
    });
    (this.props.node.data as any).parameters.baseColor = color;
    this.props.node.update();
    this.props.updateEngine();
  };

  setEmisiveColor = color => {
    this.setState({
      emissive: color
    });
    (this.props.node.data as any).parameters.emissive = color;
    this.props.node.update();
    this.props.updateEngine();
  };

  setParam = (key: string, value: any) => {
    this.setState({
      [key]: value
    });
    (this.props.node.data as any).parameters[key] = value;
    this.props.node.update();
    this.props.updateEngine();
  };

  setNormalIntensity = (value: number) => {
    let val = new Vector2(value, value);
    this.setState({
      normalScale: val
    });
    (this.props.node.data as any).parameters.normalScale = val;
    this.props.node.update();
    this.props.updateEngine();
  };

  renderControllers = () => {
    let connections = this.props.node.getConnections();
    let elements: ReactElement = (
      <div style={{ paddingTop: "10px" }}>
        <Property isVisible={!isConnected(connections, "viewer_base_color")}>
          <div>Base color</div>
          <div>
            <ColorPicker
              defaultColor={this.state.baseColor}
              onChangeComplete={color => this.setBaseColor(color.hex)}
              color={this.state.baseColor}
            />
          </div>
          <br />
        </Property>
        <div style={{ paddingTop: "10px" }}></div>
        <Property isVisible={!isConnected(connections, "viewer_metalic")}>
          <SliderWithInput
            title="Metalic"
            min={0}
            max={1}
            step={0.1}
            value={this.state.metalic}
            onChange={value => this.setParam("metalic", value)}
          />
          <br />
        </Property>
        <Property isVisible={!isConnected(connections, "viewer_roughness")}>
          <div>
            <SliderWithInput
              title="Roughness"
              min={0}
              max={1}
              step={0.01}
              value={this.state.roughness}
              onChange={value => this.setParam("roughness", value)}
            />
          </div>
          <br />
        </Property>
        <Property isVisible={!isConnected(connections, "viewer_opacity")}>
          <div>
            <SliderWithInput
              title="Opacity"
              min={0}
              max={1}
              step={0.1}
              value={this.state.opacity}
              onChange={value => this.setParam("opacity", value)}
            />
          </div>
          <br />
        </Property>
        <div>
          <SliderWithInput
            title="IOR value"
            min={0}
            max={2}
            step={0.01}
            value={this.state.ior}
            onChange={value => this.setParam("ior", value)}
          />
        </div>
        <Property isVisible={!isConnected(connections, "viewer_emissive")}>
          <div>Emission color</div>
          <div>
            <ColorPicker
              defaultColor={this.state.emissive}
              onChangeComplete={color => this.setEmisiveColor(color.hex)}
              color={this.state.emissive}
            />
          </div>
        </Property>
        <div>
          <SliderWithInput
            title="Emissive Intensity"
            min={0}
            max={10}
            step={0.1}
            value={this.state.emissiveIntensity}
            onChange={value => this.setParam("emissiveIntensity", value)}
          />
        </div>
        <br />
        <div>
          <SliderWithInput
            title="Normal Intensity"
            min={0}
            max={10}
            step={0.1}
            value={this.state.normalScale.x}
            onChange={value => this.setNormalIntensity(value)}
          />
        </div>
        <br />
        <div>
          <SliderWithInput
            title="Bump Intensity"
            min={0}
            max={10}
            step={0.1}
            value={this.state.bumpScale}
            onChange={value => this.setParam("bumpScale", value)}
          />
        </div>
        <br />
        <div>
          <SliderWithInput
            title="Displacement Intensity"
            min={0}
            max={10}
            step={0.1}
            value={this.state.displacementScale}
            onChange={value => this.setParam("displacementScale", value)}
          />
        </div>
        <br />
        <div>
          <SliderWithInput
            title="Displacement Bias (Midpoint)"
            min={-1}
            max={1}
            step={0.1}
            value={this.state.displacementBias}
            onChange={value => this.setParam("displacementBias", value)}
          />
        </div>
        <br />
        <div>
          <SliderWithInput
            title="AO Intensity"
            min={0}
            max={10}
            step={0.1}
            value={this.state.aoScale}
            onChange={value => this.setParam("aoScale", value)}
          />
        </div>
      </div>
    );

    return elements;
  };

  componentWillMount() {
    this.getViewerData();
  }

  render() {
    return <div>{this.renderControllers()}</div>;
  }
}
