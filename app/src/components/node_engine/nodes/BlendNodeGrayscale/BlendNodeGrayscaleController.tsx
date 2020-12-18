import React, { Component } from "react";
import { Node } from "../../../../rete/src";
import SliderWithInput from "../../../elements/form/SliderWithInput";
import DropdownButton, {
  DropdownItem
} from "../../../elements/form/DropdownButton";

interface BlendNodeGrayscaleControllerProps {
  node: Node;
  updateEngine: any;
}

export default class BlendNodeGrayscaleController extends Component<
  BlendNodeGrayscaleControllerProps,
  any
> {
  constructor(props) {
    super(props);

    this.state = {};
  }

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

  getDropdownItems = (): DropdownItem[] => {
    return [
      {
        title: "Add",
        click: title => {
          this.setParam("type", title);
          this.onSetParamEnd();
        }
      },
      {
        title: "Substract",
        click: title => {
          this.setParam("type", title);
          this.onSetParamEnd();
        }
      },
      {
        title: "Multiply",
        click: title => {
          this.setParam("type", title);
          this.onSetParamEnd();
        }
      },
      {
        title: "Divide",
        click: title => {
          this.setParam("type", title);
          this.onSetParamEnd();
        }
      }
    ];
  };

  render() {
    return (
      <div style={{ paddingTop: "10px" }}>
        <div>Operation Type</div>
        <DropdownButton
          title={this.state.type}
          dropdownItems={this.getDropdownItems()}
        />
        <br />
        <SliderWithInput
          min={0}
          max={1}
          step={0.1}
          value={this.state.influence}
          onChange={value => this.setParam("influence", value)}
          onAfterChange={this.onSetParamEnd}
        />
      </div>
    );
  }
}
