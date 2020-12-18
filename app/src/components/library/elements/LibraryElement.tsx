import React, { Component } from "react";
import "../../../css/libraryelements.css";
import { MatTex } from "../../../redux/types";
import { DRAG_TEXTURES } from "../../../constants/dragtypes";
import { DragSource } from "react-dnd";
interface LibraryElementProps {
  file: MatTex;
  height?: number;
  type: "listView" | "thumbSmall" | "thumbLarge";
  dropped: any;
  setElementDragging: any;
  element: any;
}

interface LibraryViewState {
  image: Buffer | null;
}

class LibraryElement extends Component<LibraryElementProps, LibraryViewState> {
  render() {
    const { connectDragSource } = this.props as any;
    if (this.props.type === "thumbSmall" || this.props.type === "thumbLarge") {
      return connectDragSource(
        <div
          className={`libraryItem col ${
            this.props.type === "thumbLarge" ? "l12" : "l6"
          }`}
          style={{
            textAlign: "center",
            padding: 5,
            marginTop: 15,
            overflow: "hidden"
          }}
        >
          <img
            style={{ userSelect: "none", pointerEvents: "none" }}
            height={this.props.type === "thumbSmall" ? undefined : undefined}
            className="col s12"
            alt=""
            src={`data:${this.props.file.mime};base64,${this.props.file.data}`}
          />
          <div>{this.props.file.name}</div>
        </div>
      );
    } else {
      return connectDragSource(
        <div
          className="libraryItem"
          style={{
            display: "flex",
            padding: 5,
            paddingLeft: 10,
            marginTop: 5,
            alignItems: "center"
          }}
        >
          <img
            style={{ userSelect: "none", pointerEvents: "none" }}
            height={50}
            width={50}
            // className="col s12"
            alt=""
            src={`data:${this.props.file.mime};base64,${this.props.file.data}`}
          />
          <div style={{ paddingLeft: 6, overflow: "hidden", paddingRight: 4 }}>
            {this.props.file.name}
          </div>
        </div>
      );
    }
  }
}

const itemSource = {
  beginDrag: (props: any) => {
    props.setElementDragging(DRAG_TEXTURES);
    return props.element;
  },
  endDrag: (props: any, monitor: any, component: any) => {
    setTimeout(() => {
      if (!props.dropped) props.setElementDragging("");
    }, 100);
    return;
  }
};

const collect = (connect: any, monitor: any) => {
  return {
    connectDragSource: connect.dragSource(),
    conncetDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
};

export default DragSource(DRAG_TEXTURES, itemSource, collect)(LibraryElement);
