import React, { Component } from "react";
import { Icon } from "react-materialize";
import "../../css/outliner.css";
import Inputbox from "../elements/form/Inputbox";

interface OutlinerElementProps {
  id: string;
  type: string;
  title: string;
  web: boolean;
  share: boolean;
  active: boolean;
  edit: boolean;
  onClick?: () => void;
  onDoubleClick?: () => void;
  setOnHover: (isActiveHover: boolean) => void;
  setMaterialGraphTitle: (key: string, value: string) => void;
  submitEdit: () => void;
}

interface OutlinerElementState {}

export default class OutlinerElement extends Component<
  OutlinerElementProps,
  OutlinerElementState
> {
  renderIcon = (type: string) => {
    switch (type) {
      case "default":
        return "device_hub";
    }
  };

  onDoubleClick = () => {
    if (this.props.onDoubleClick) this.props.onDoubleClick();
  };

  render() {
    return (
      <div
        id={this.props.id}
        onMouseOver={() =>
          this.props.active ? this.props.setOnHover(true) : undefined
        }
        onMouseOut={() =>
          this.props.active ? this.props.setOnHover(false) : undefined
        }
        onClick={this.props.onClick ? this.props.onClick : undefined}
        onDoubleClick={this.onDoubleClick}
        className={`${
          this.props.active ? "outlinerActive" : "outlinerElement"
        }`}
        style={{
          paddingTop: 1,
          paddingBottom: 1,
          marginBottom: 2,
          paddingLeft: 5,
          paddingRight: 5,
          overflow: "hidden",
          display: "flex"
        }}
      >
        <div style={{ width: 30 }}>
          <Icon>{this.renderIcon(this.props.type)}</Icon>
        </div>
        <div
          style={{
            width: 30
          }}
        >
          {this.props.share ? <Icon>{"share"}</Icon> : null}
        </div>
        {this.props.active && this.props.edit ? (
          <Inputbox
            value={this.props.title}
            name={this.props.id}
            onChange={(key, value) =>
              this.props.setMaterialGraphTitle(key, value)
            }
            onKeyDown={(e, key, value) => {
              if (e.key === "Enter") {
                this.props.submitEdit();
              }
            }}
          />
        ) : (
          <div style={{ paddingLeft: 15, fontSize: 15 }}>
            {this.props.title}
          </div>
        )}
      </div>
    );
  }
}
