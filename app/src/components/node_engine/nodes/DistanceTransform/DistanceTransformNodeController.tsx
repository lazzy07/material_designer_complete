import React, { Component } from "react";
import DropdownButton, {
  DropdownItem
} from "../../../elements/form/DropdownButton";
import SliderWithInput from "../../../elements/form/SliderWithInput";

interface DistanceTransformControllerProps {
  node: any;
  updateEngine: any;
}

export default class DistanceTransformController extends Component<
  DistanceTransformControllerProps,
  any
> {
  ret_type = ["Distance Transform", "Vornoi Graph"];
  titles = [
    "DIST_L1",
    "DIST_L2",
    "DIST_C",
    "DIST_FAIR",
    "DIST_WELSH",
    "DIST_HUBER"
  ];
  mask_size = ["3x3", "5x5"];
  labelTypes = ["CCOMP", "PIXEL"];

  getDropdownItems = (): DropdownItem[] => {
    return [
      {
        title: this.titles[0],
        click: title => {
          this.setParam("distanceType", 1);
          this.onSetParamEnd();
        }
      },
      {
        title: this.titles[1],
        click: title => {
          this.setParam("distanceType", 2);
          this.onSetParamEnd();
        }
      },
      {
        title: this.titles[2],
        click: title => {
          this.setParam("distanceType", 3);
          this.onSetParamEnd();
        }
      }
    ];
  };

  getRetType = () => {
    return [
      {
        title: this.ret_type[0],
        click: title => {
          this.setParam("retType", 0);
          this.onSetParamEnd();
        }
      },
      {
        title: this.ret_type[1],
        click: title => {
          this.setParam("retType", 1);
          this.onSetParamEnd();
        }
      }
    ];
  };

  getMaskSize = () => {
    return [
      {
        title: this.mask_size[0],
        click: title => {
          this.setParam("maskSize", 3);
          this.onSetParamEnd();
        }
      },
      {
        title: this.mask_size[1],
        click: title => {
          this.setParam("maskSize", 5);
          this.onSetParamEnd();
        }
      }
    ];
  };

  getLabelTypes = () => {
    return [
      {
        title: this.labelTypes[0],
        click: title => {
          this.setParam("labelType", 0);
          this.onSetParamEnd();
        }
      },
      {
        title: this.labelTypes[1],
        click: title => {
          this.setParam("labelType", 1);
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
          <div>Distance Type</div>
          <DropdownButton
            title={this.titles[this.state.distanceType - 1]}
            dropdownItems={this.getDropdownItems()}
          />
          <br />
          <div>Return type</div>
          <DropdownButton
            title={this.ret_type[this.state.retType]}
            dropdownItems={this.getRetType()}
          />
          <br />
          <div>Label type</div>
          <DropdownButton
            title={this.labelTypes[this.state.labelType]}
            dropdownItems={this.getLabelTypes()}
          />
          <br />
          <div>Mask type</div>
          <DropdownButton
            title={this.state.maskSize === 3 ? "3x3" : "5x5"}
            dropdownItems={this.getMaskSize()}
          />
        </div>
      </div>
    );
  }
}
