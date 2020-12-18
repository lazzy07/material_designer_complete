import React, { Component } from "react";
import { Icon } from "react-materialize";
import { DropTarget } from "react-dnd";
import { DRAG_ENV_MAP, DRAG_TEXTURES } from "./../../constants/dragtypes";
import {
  SECONDARY_COLOR,
  WARNING_COLOR,
  ACTIVE_COLOR_LIGHT,
  LOCKED_COLOR
} from "../../constants";
import { Animated } from "react-animated-css";
import Loader from "../elements/loaders/Loader";
import { SYSTEM_ENVMAPS, SYSTEM_TEXTURES } from "../../redux/types";
const fs = window.require("fs");
let locked = false;

interface RecyclebinProps {
  warning?: boolean;
  whenDropped: (dropped: boolean) => void;
  state: string;
}

class Recyclebin extends Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      state: ""
    };
  }

  setIcon = () => {
    switch (this.state.state) {
      case "":
        return (
          <Animated
            animationIn="fadeIn"
            animationOut="fadeOut"
            isVisible={true}
          >
            <Icon medium>delete</Icon>
          </Animated>
        );

      case "loading":
        return (
          <Animated
            animationIn="fadeIn"
            animationOut="fadeOut"
            isVisible={true}
          >
            <div style={{ width: 40, height: 40 }}>
              <Loader />
            </div>
          </Animated>
        );

      case "error":
        return (
          <Animated
            animationIn="fadeIn"
            animationOut="fadeOut"
            isVisible={true}
          >
            <Icon medium>report_problem</Icon>
          </Animated>
        );

      case "success":
        return (
          <Animated
            animationIn="fadeIn"
            animationOut="fadeOut"
            isVisible={true}
          >
            <Icon medium>done</Icon>
          </Animated>
        );
    }
  };

  setType = (type: string) => {
    this.setState({
      state: type
    });
  };

  render() {
    const { connectDropTarget, hovered, item } = this.props as any;
    return connectDropTarget(
      <div
        style={{
          backgroundColor: SECONDARY_COLOR,
          padding: 10,
          borderRadius: "50%",
          border: `2px ${
            locked ? LOCKED_COLOR : hovered ? WARNING_COLOR : ACTIVE_COLOR_LIGHT
          } solid`
        }}
      >
        {this.setIcon()}
      </div>
    );
  }
}

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
    item: monitor.getItem()
  };
};

const target = {
  drop: (props, monitor, component: Recyclebin) => {
    if (!locked) {
      locked = true;
      props.whenDropped(true);
      let item = monitor.getItem();
      const itemType = monitor.getItemType();
      component.setType("loading");
      switch (itemType) {
        case DRAG_ENV_MAP:
          if (fs.existsSync(props.envmapPath) && item) {
            for (let i = 0; i < SYSTEM_ENVMAPS.length; i++) {
              if (item.element === SYSTEM_ENVMAPS[i]) {
                component.setType("error");
                locked = false;
                props.whenDropped(false);
                setTimeout(() => {
                  props.setElementDragging("");
                  component.setType("");
                }, 480);
                return;
              }
            }
            if (fs.existsSync(props.envmapPath + "/" + item.element)) {
              fs.unlink(props.envmapPath + "/" + item.element, err => {
                if (err) {
                  locked = false;
                  props.whenDropped(false);
                } else {
                  component.setType("success");
                  locked = false;
                  props.whenDropped(false);
                  setTimeout(() => {
                    props.setElementDragging("");
                    component.setType("");
                  }, 480);
                  return;
                }
              });
            }
          } else {
            locked = false;
            props.whenDropped(false);
          }

        case DRAG_TEXTURES:
          if (item.typ === "system") {
            if (fs.existsSync(props.textureSystemPath)) {
              if (
                fs.existsSync(
                  props.textureSystemPath + "/" + item.name + ".mattex"
                ) &&
                item
              ) {
                for (let i = 0; i < SYSTEM_TEXTURES.length; i++) {
                  if (item.element === SYSTEM_TEXTURES[i]) {
                    component.setType("error");
                    locked = false;
                    props.whenDropped(false);
                    setTimeout(() => {
                      props.setElementDragging("");
                      component.setType("");
                    }, 480);
                    return;
                  }
                }
                fs.unlink(
                  props.textureSystemPath + "/" + item.name + ".mattex",
                  err => {
                    if (err) {
                      locked = false;
                      props.whenDropped(false);
                      setTimeout(() => {
                        props.setElementDragging("");
                        component.setType("");
                      }, 480);
                    } else {
                      component.setType("success");
                      locked = false;
                      props.whenDropped(false);
                      setTimeout(() => {
                        props.setElementDragging("");
                        component.setType("");
                      }, 480);
                      return;
                    }
                  }
                );
              } else {
                component.setType("error");
                locked = false;
                props.whenDropped(false);
                setTimeout(() => {
                  props.setElementDragging("");
                  component.setType("");
                }, 480);
                return;
              }
            }
          } else if (item.typ === "project") {
            if (props.projectTextures) {
              for (let i = 0; i < props.projectTextures.length; i++) {
                if (item.uuid === props.projectTextures[i].uuid) {
                  component.setType("success");
                  props.removeTextureProject(item.uuid);
                  locked = false;
                  props.whenDropped(false);
                  setTimeout(() => {
                    props.setElementDragging("");
                    component.setType("");
                  }, 480);
                  return;
                }
              }
              component.setType("error");
              locked = false;
              props.whenDropped(false);
              setTimeout(() => {
                props.setElementDragging("");
                component.setType("");
              }, 480);
            }
          }
      }
    }
  }
};
export default DropTarget([DRAG_ENV_MAP, DRAG_TEXTURES], target, collect)(
  Recyclebin as any
) as any;
