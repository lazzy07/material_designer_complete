import React, { Component } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import Inputbox from "../elements/form/Inputbox";

interface ImportFileElementProps {
  uuid: string;
  fName: string;
  mime: any;
  buff?: Buffer;
  selectItem: (uuid: string) => void;
  isActive: (uuid: string) => boolean;
  setName: (uuid: string, value: string) => void;
}

export default class ImportFileElement extends Component<
  ImportFileElementProps
> {
  render() {
    return (
      <div
        key={this.props.uuid}
        className={`${
          this.props.isActive(this.props.uuid)
            ? " importFileActive "
            : " importFile "
        }`}
        style={{
          display: "flex",
          width: window.innerWidth - 10,
          padding: "10px"
        }}
      >
        <div style={{ width: 50 }}>
          <Checkbox
            onClick={() => this.props.selectItem(this.props.uuid)}
            style={{
              color: "white"
            }}
            checked={this.props.isActive(this.props.uuid)}
            value={this.props.fName}
            inputProps={{
              "aria-label": "primary checkbox"
            }}
          />
        </div>
        {this.props.buff ? (
          <div style={{ overflow: "hidden", width: 180 }}>
            <img
              draggable={false}
              style={{ WebkitUserSelect: "none" }}
              alt=""
              height={90}
              src={`data:${
                this.props.mime.mime
              };base64,${this.props.buff.toString("base64")}`}
            />
          </div>
        ) : (
          <div>
            <h5>{this.props.mime.mime}</h5>
          </div>
        )}
        <div
          style={{
            overflow: "hidden",
            paddingLeft: 20,

            display: "flex",
            alignItems: "center",
            width: "100%"
          }}
        >
          <Inputbox
            width={400}
            name={this.props.uuid}
            onChange={(key, val) => this.props.setName(key, val)}
            label={"File Name"}
            value={this.props.fName}
          />
        </div>
      </div>
    );
  }
}
