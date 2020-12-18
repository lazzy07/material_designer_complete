import React, { Component } from "react";
import { SECONDARY_COLOR } from "../../../constants";
import "../../../css/libraryelements.css";
import { DragSource } from "react-dnd";
import { DRAG_ENV_MAP } from "../../../constants/dragtypes";

interface ExrElementProps {
  title: string;
  path: string;
  element: any;
  dropped: boolean;
  setElementDragging: (value: string) => void;
}

class ExrElement extends Component<ExrElementProps, any> {
  render() {
    const { isDragging, connectDragSource } = this.props as any;

    return connectDragSource(
      <div style={{ marginTop: 3, marginBottom: 3 }} className="exrElement">
        <div style={{ padding: 0, margin: 0, fontSize: 14, paddingLeft: 5 }}>
          <span style={{ fontWeight: "bolder" }}>EXR :</span> {this.props.title}
        </div>
        <div
          style={{
            padding: 0,
            margin: 0,
            fontSize: 12,
            textAlign: "end",
            opacity: 0.6,
            paddingRight: 5
          }}
        >
          {this.props.path}
        </div>
      </div>
    );
  }
}

const itemSource = {
  beginDrag: (props: any) => {
    props.setElementDragging(DRAG_ENV_MAP);
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

export default DragSource(DRAG_ENV_MAP, itemSource, collect)(ExrElement);
