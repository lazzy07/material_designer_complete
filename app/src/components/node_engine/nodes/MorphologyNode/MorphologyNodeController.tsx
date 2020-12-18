import React, { Component } from "react";
import DropdownButton, {
  DropdownItem
} from "../../../elements/form/DropdownButton";
import SliderWithInput from "../../../elements/form/SliderWithInput";

interface MorphologyControllerProps {
  node: any;
  updateEngine: any;
}

export default class MorphologyNodeController extends Component<
  MorphologyControllerProps,
  any
> {
  operation = ["Opening", "Closing", "Gradient", "Top Hat", "Black Hat"];
  kernel = ["Rect", "Cross", "Ellipse"];

  constructor(props) {
    super(props);

    this.state = {};
  }

  getDropdownItems = (): DropdownItem[] => {
    return [
      {
        title: this.operation[0],
        click: title => {
          this.setParam("operation", 0);
          this.onSetParamEnd();
        }
      },
      {
        title: this.operation[1],
        click: title => {
          this.setParam("operation", 1);
          this.onSetParamEnd();
        }
      },
      {
        title: this.operation[2],
        click: title => {
          this.setParam("operation", 2);
          this.onSetParamEnd();
        }
      },
      {
        title: this.operation[3],
        click: title => {
          this.setParam("operation", 3);
          this.onSetParamEnd();
        }
      },
      {
        title: this.operation[4],
        click: title => {
          this.setParam("operation", 4);
          this.onSetParamEnd();
        }
      }
    ];
  };

  getKernelItems = () => {
    return [
      {
        title: this.kernel[0],
        click: title => {
          this.setParam("kernel", 0);
          this.onSetParamEnd();
        }
      },
      {
        title: this.kernel[1],
        click: title => {
          this.setParam("kernel", 1);
          this.onSetParamEnd();
        }
      },
      {
        title: this.kernel[2],
        click: title => {
          this.setParam("kernel", 2);
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
          <div>Operation Type</div>
          <DropdownButton
            title={this.operation[this.state.operation]}
            dropdownItems={this.getDropdownItems()}
          />
          <br />
          <div>Kernel Type</div>
          <DropdownButton
            title={this.kernel[this.state.kernel]}
            dropdownItems={this.getKernelItems()}
          />
          <br />
          <div>Morph kernel size</div>
          <SliderWithInput
            min={1}
            max={50}
            step={1}
            value={this.state.morphSize}
            onChange={value => this.setParam("morphSize", parseInt(value))}
            onAfterChange={this.onSetParamEnd}
          />
          <br />
          <div>Iterations</div>
          <SliderWithInput
            min={1}
            max={6}
            step={1}
            value={this.state.iterations}
            onChange={value => this.setParam("iterations", parseInt(value))}
            onAfterChange={this.onSetParamEnd}
          />
          <br />
        </div>
      </div>
    );
  }
}
