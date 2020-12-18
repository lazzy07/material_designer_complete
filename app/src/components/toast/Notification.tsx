import React, { Component } from "react";
import SuccessIcon from "../elements/icons/SuccessIcon";
import ErrorIcon from "../elements/icons/ErrorIcon";
import { Animated } from "react-animated-css";
import Loader from "../elements/loaders/Loader";

interface NotificationProps {
  color?: string;
  data?: string;
  type: "icon" | "success" | "error" | "loading";
  animationIn: "fadeInLeft" | "fadeInRight" | "fadeIn";
  title?: string;
  message: string;
  position: "leftTop" | "leftBotom" | "rightTop" | "rightBottom";
  duration: number;
  onClose?: () => void;
}

interface NotificationState {
  unmount: boolean;
}

export default class Notification extends Component<
  NotificationProps,
  NotificationState
> {
  constructor(props) {
    super(props);

    this.state = {
      unmount: false
    };
  }

  /**
   * @memberof Notification
   * @param {String} type type of the icon
   * @param {String} iconType type of the icon (IconClass)
   */
  renderIcon = (type: string, data: string | undefined) => {
    switch (type) {
      case "icon":
        return (
          <i
            style={{ color: this.props.color || "white", fontSize: "50px" }}
            className={data}
          />
        );

      case "success":
        return <SuccessIcon color={this.props.color || "aqua"} />;

      case "error":
        return <ErrorIcon color={this.props.color || "#e8232d"} />;

      case "loading":
        return <Loader />;

      default:
        return null;
    }
  };

  // componentDidMount() {
  //   if (this.props.duration !== 0) {
  //     setTimeout(() => {
  //       this.setState({ unmount: true });
  //     }, this.props.duration);
  //   }
  // }

  render() {
    let positions = {
      leftTop: {
        top: "50px",
        left: -3
      },
      leftBottom: {
        bottom: "50px",
        left: 0
      },
      rightTop: {
        top: "50px",
        left: 0
      },
      rightBottom: {
        bottom: "50px",
        right: 0
      }
    };
    if (this.state.unmount) {
      return null;
    } else {
      return (
        <Animated
          isVisible
          animationIn={this.props.animationIn}
          animationOut="fadeOut"
        >
          <div
            style={{
              position: "fixed",
              zIndex: 1000000,
              ...positions[this.props.position],
              backgroundColor: "#373737",
              border: "2px solid #00796B",
              display: "flex"
            }}
          >
            {this.props.type ? (
              <div
                style={{
                  width: "80px",
                  padding: "20px",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                {this.renderIcon(this.props.type, this.props.data)}
              </div>
            ) : null}
            <div style={{ padding: "10px" }}>
              <h3
                style={{
                  fontSize: "21px",
                  maxWidth: "300px",
                  margin: 0,
                  paddingRight: "25px",
                  fontWeight: "bolder"
                }}
              >
                {this.props.title}
              </h3>
              <h3
                style={{
                  fontSize: "15px",
                  maxWidth: "300px",
                  margin: 0,
                  paddingTop: "5px"
                }}
              >
                {this.props.message}
              </h3>
            </div>
            <div
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                color: "white"
              }}
            >
              <span
                onClick={this.props.onClose}
                style={{
                  top: "2px",
                  right: "10px",
                  position: "absolute",
                  fontSize: "18px"
                }}
              >
                x
              </span>
            </div>
          </div>
        </Animated>
      );
    }
  }
}
