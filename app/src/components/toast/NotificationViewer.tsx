import React, { Component, ReactElement } from "react";
import { Toast } from "react-materialize";
import "jquery";
import "materialize-css/dist/js/materialize.js";
import "materialize-css/dist/css/materialize.css";

import ToastInterface from "./NotificationMessage";
import Notification from "./Notification";
import { clearInterval } from "timers";

interface ToastProps {
  toasts: ToastInterface[];
}

interface ToastState {
  currentToast: ReactElement | null;
  close: boolean;
}

let dummyToasts: ToastInterface[] = [
  {
    type: "success",
    message: "Success Message I am Successful",
    duration: 5000,
    title: "Its Successful"
  },
  {
    type: "loading",
    message: "Success Message I am Successful",
    duration: 5000,
    title: "Its loading"
  }
];

export default class NotificationViewer extends Component<
  ToastProps,
  ToastState
> {
  timer: NodeJS.Timeout | null = null;
  timeOut: NodeJS.Timeout | null = null;
  constructor(props) {
    super(props);

    this.state = {
      currentToast: null,
      close: false
    };
  }

  delay = async (d: number): Promise<boolean> => {
    return new Promise(resolve => {
      this.timer = setTimeout(() => {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        if (this.timeOut) {
          clearTimeout(this.timeOut);
        }
        resolve(true);
      }, d);

      this.timeOut = setInterval(() => {
        if (this.state.close) {
          this.setState({
            currentToast: null,
            close: false
          });
          if (this.timer) {
            clearTimeout(this.timer);
          }
          if (this.timeOut) {
            clearTimeout(this.timeOut);
          }
          resolve(true);
        }
      }, 1000);
    });
  };

  onCloseCurrent = () => {
    this.setState({
      close: true
    });
  };

  renderToasts = async (toasts: ToastInterface[]) => {
    for (let i = 0; i < toasts.length; i++) {
      let toast = toasts[i];
      let renderT = (
        <Notification
          duration={toast.duration ? toast.duration : 5000}
          message={toast.message}
          title={toast.title}
          type={toast.type}
          animationIn={"fadeIn"}
          position="rightBottom"
          onClose={this.onCloseCurrent}
        />
      );

      this.setState({
        currentToast: renderT
      });

      let res = await this.delay(toast.duration + 500);

      if (res) {
        this.setState({
          currentToast: null,
          close: false
        });
      }
    }
  };

  componentDidMount() {
    // this.renderToasts(dummyToasts);
  }

  componentWillUnmount() {
    if (this.timeOut) {
      clearInterval(this.timeOut);
    }
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  render() {
    return (
      <div style={{ zIndex: 10000, position: "fixed" }}>
        {this.state.currentToast}
      </div>
    );
  }
}
