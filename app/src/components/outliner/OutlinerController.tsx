import React, { Component } from "react";
import { Icon } from "react-materialize";
import { SECONDARY_COLOR, LOCKED_COLOR, INACTIVE_COLOR } from "../../constants";

interface OutlinerControllerProps {
  selected: boolean;
  addNewGraph: () => void;
  removeGraph: () => void;
  setEdit: () => void;
}

export default class OutlinerController extends Component<
  OutlinerControllerProps,
  any
> {
  render() {
    return (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          backgroundColor: SECONDARY_COLOR
        }}
      >
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div
            onClick={this.props.addNewGraph}
            className="outlinerControllerButton"
          >
            <Icon>note_add</Icon>
          </div>
          <div
            style={{ color: !this.props.selected ? INACTIVE_COLOR : undefined }}
            className="outlinerControllerButton"
            onClick={this.props.setEdit}
          >
            <Icon>edit</Icon>
          </div>
          <div
            onClick={this.props.removeGraph}
            style={{ color: !this.props.selected ? INACTIVE_COLOR : undefined }}
            className="outlinerControllerButton"
          >
            <Icon>delete</Icon>
          </div>
          <div
            style={{ color: !this.props.selected ? INACTIVE_COLOR : undefined }}
            className="outlinerControllerButton"
          >
            <Icon>share</Icon>
          </div>
        </div>
      </div>
    );
  }
}
