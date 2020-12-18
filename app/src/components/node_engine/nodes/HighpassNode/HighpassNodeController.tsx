import React, { Component } from "react";
import DropdownButton, {
  DropdownItem
} from "../../../elements/form/DropdownButton";
import SliderWithInput from "../../../elements/form/SliderWithInput";

interface HiighpassControllerProps {
  node: any;
  updateEngine: any;
}

export default class HighpassNodeController extends Component<
  HiighpassControllerProps,
  any
> {
  titles = ["Laplacian", "Sobel", "Scharr"];

  constructor(props) {
    super(props);

    this.state = {};
  }

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
          {this.state.type !== 0 ? (
            <div>
              <div>dx</div>
              <SliderWithInput
                min={0}
                max={3}
                step={1}
                value={this.state.dx}
                onChange={value => this.setParam("dx", parseInt(value))}
                onAfterChange={this.onSetParamEnd}
              />
              <br />
              <div>dy</div>
              <SliderWithInput
                min={0}
                max={3}
                step={1}
                value={this.state.dy}
                onChange={value => this.setParam("dy", parseInt(value))}
                onAfterChange={this.onSetParamEnd}
              />
              <br />{" "}
            </div>
          ) : null}
          <div>Kernel Size</div>
          <SliderWithInput
            min={1}
            max={31}
            step={1}
            value={this.state.ksize}
            onChange={value => this.setParam("ksize", parseInt(value))}
            onAfterChange={this.onSetParamEnd}
          />
          <br />
          <div>Delta value</div>
          <SliderWithInput
            min={-100}
            max={100}
            step={0.1}
            value={this.state.delta}
            onChange={value => this.setParam("delta", value)}
            onAfterChange={this.onSetParamEnd}
          />
          <br />
        </div>
      </div>
    );
  }
}
