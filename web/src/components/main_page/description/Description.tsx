import React, { Component } from "react";
import Lottie from "react-lottie";

interface State {}

interface Props {
  AnimationData: any;
  reverse?: boolean;
}

export default class Description extends Component<Props, State> {
  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: this.props.AnimationData.default,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };

    return (
      <div className="row">
        <div className="col s12 m5">
          <div
            style={{
              paddingTop: 50,
              maxWidth: 250,
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              width: "60%"
            }}
          >
            <Lottie options={defaultOptions} />
          </div>
        </div>
        <div className="col s12 m7">{this.props.children}</div>
      </div>
    );
  }
}
