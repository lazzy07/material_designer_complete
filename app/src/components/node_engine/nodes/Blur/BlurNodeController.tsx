import React, { Component } from "react";
import DropdownButton, {
  DropdownItem
} from "../../../elements/form/DropdownButton";
import SliderWithInput from "../../../elements/form/SliderWithInput";

interface BlurNodeControllerProps {
  node: any;
  updateEngine: any;
}

export default class BlurNodeController extends Component<
  BlurNodeControllerProps,
  any
> {
  titles = ["Blur", "Gaussian Blur", "Median Blur"];

  getDropdownItems = (): DropdownItem[] => {
    return [
      {
        title: this.titles[0],
        click: title => {
          this.setParam("type", 0);
          this.onSetParamEnd();
        }
      },
      {
        title: this.titles[1],
        click: title => {
          this.setParam("type", 1);
          this.onSetParamEnd();
        }
      },
      {
        title: this.titles[2],
        click: title => {
          this.setParam("type", 2);
          this.onSetParamEnd();
        }
      }
    ];
  };

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
          <DropdownButton
            title={this.titles[this.state.type]}
            dropdownItems={this.getDropdownItems()}
          />
          <br />
          <div>{this.state.type !== 2 ? "Kernel size X" : "Kernel size"}</div>
          <SliderWithInput
            min={3}
            max={500}
            step={1}
            value={this.state.ksizeX}
            onChange={value => this.setParam("ksizeX", parseInt(value))}
            onAfterChange={this.onSetParamEnd}
          />
          <br />
          {this.state.type !== 2 ? (
            <div>
              <div>Kernel size Y</div>
              <SliderWithInput
                min={3}
                max={500}
                step={1}
                value={this.state.ksizeY}
                onChange={value => this.setParam("ksizeY", parseInt(value))}
                onAfterChange={this.onSetParamEnd}
              />
              <br />
            </div>
          ) : null}
          {this.state.type === 1 ? (
            <div>
              <div>Sigma X</div>
              <SliderWithInput
                min={3}
                max={50}
                step={0.1}
                value={this.state.sigmaX}
                onChange={value => this.setParam("sigmaX", value)}
                onAfterChange={this.onSetParamEnd}
              />
              <br />
              <div>Sigma Y</div>
              <SliderWithInput
                min={3}
                max={50}
                step={0.1}
                value={this.state.sigmaY}
                onChange={value => this.setParam("sigmaY", value)}
                onAfterChange={this.onSetParamEnd}
              />
              <br />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
