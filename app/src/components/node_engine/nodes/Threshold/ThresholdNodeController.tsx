import React, { Component } from "react";
import DropdownButton, {
  DropdownItem
} from "../../../elements/form/DropdownButton";
import SliderWithInput from "../../../elements/form/SliderWithInput";

interface ThresholdNodeControllerProps {
  node: any;
  updateEngine: any;
}

export default class ThresholdNodeController extends Component<
  ThresholdNodeControllerProps,
  any
> {
  titles = [
    "Binary",
    "Binary Inv",
    "Trunc",
    "To Zero",
    "To Zero Inv",
    "Adaptive Gaussian",
    "Adaptive Mean"
  ];

  constructor(props) {
    super(props);

    this.state = {};
  }

  getDropdownItems = (): DropdownItem[] => {
    return [
      {
        title: this.titles[0],
        click: title => {
          this.setParam("threshType", 0);
          this.onSetParamEnd();
        }
      },
      {
        title: this.titles[1],
        click: title => {
          this.setParam("threshType", 1);
          this.onSetParamEnd();
        }
      },
      {
        title: this.titles[2],
        click: title => {
          this.setParam("threshType", 2);
          this.onSetParamEnd();
        }
      },
      {
        title: this.titles[3],
        click: title => {
          this.setParam("threshType", 3);
          this.onSetParamEnd();
        }
      },
      {
        title: this.titles[4],
        click: title => {
          this.setParam("threshType", 4);
          this.onSetParamEnd();
        }
      },
      {
        title: this.titles[5],
        click: title => {
          this.setParam("threshType", 5);
          this.onSetParamEnd();
        }
      },
      {
        title: this.titles[6],
        click: title => {
          this.setParam("threshType", 6);
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
            title={this.titles[this.state.threshType]}
            dropdownItems={this.getDropdownItems()}
          />
          <br />
          <div>Threshold Value</div>
          <SliderWithInput
            min={0}
            max={255}
            step={1}
            value={this.state.threshVal}
            onChange={value => this.setParam("threshVal", value)}
            onAfterChange={this.onSetParamEnd}
          />
          <br />
          <div>Max Value</div>
          <SliderWithInput
            min={0}
            max={255}
            step={1}
            value={this.state.maxVal}
            onChange={value => this.setParam("maxVal", value)}
            onAfterChange={this.onSetParamEnd}
          />
          <br />
          {this.state.threshType > 4 ? (
            <div>
              <div>Kernel Size</div>
              <SliderWithInput
                min={3}
                max={50}
                step={1}
                value={this.state.kernel}
                onChange={value => this.setParam("kernel", value)}
                onAfterChange={this.onSetParamEnd}
              />
            </div>
          ) : null}
          <br />
          {this.state.threshType > 4 ? (
            <div>
              <div>Substract from mean</div>
              <SliderWithInput
                min={-10}
                max={50}
                step={1}
                value={this.state.substract}
                onChange={value => this.setParam("substract", value)}
                onAfterChange={this.onSetParamEnd}
              />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
