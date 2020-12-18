import React, { Component } from "react";
import { isIOS } from "react-device-detect";
import { Animated } from "react-animated-css";

import "../../../css/herobackground.css";
import { getText } from "./../../../text/LanguageSelector";
import { mainHeroText } from "./../../../text/MainHero";

export default class HeroView extends Component {
  ref: any;
  eventListner: any;

  componentDidMount() {
    window.addEventListener(
      "scroll",
      event => {
        let value = -3 + window.scrollY / 60;
        if (this.ref) {
          this.ref.style.transform = "skewY(" + value + "deg)";
        }
      },
      true
    );
  }

  componentWillUnmount() {
    if (this.eventListner) {
      window.removeEventListener("scroll", () => {});
    }
  }

  render() {
    return (
      <div
        id="heroBackground"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <video
          style={{
            position: "absolute",
            objectFit: "cover",
            minHeight: "90vh",
            minWidth: "100vw",
            overflow: "hidden"
          }}
          src="/dependencies/video/intro.mp4"
          controls={false}
          loop
          muted
          autoPlay
          playsInline
        />
        {isIOS ? null : <div id="heroOverlay"></div>}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)"
          }}
        >
          <Animated animationIn="fadeInDown" animationOut="fadeOutUp" isVisible>
            <h1
              style={{
                fontSize: "6.2em",
                width: "95vw",
                marginBottom: 0,
                textAlign: "center"
              }}
            >
              {getText(mainHeroText.title)}
            </h1>
          </Animated>
          <p
            style={{
              fontSize: "1.5em",
              textAlign: "center",
              marginTop: 0,
              paddingTop: 0,
              letterSpacing: "0.5em"
            }}
          >
            {getText(mainHeroText.subTitle)}
          </p>
          <p
            style={{
              textAlign: "center",
              width: "60%",
              left: "50%",
              marginLeft: "20%"
            }}
          >
            {getText(mainHeroText.text)}
          </p>
        </div>
        <div ref={ref => (this.ref = ref)} id="skewSection"></div>
      </div>
    );
  }
}
