import React, { Component } from "react";
import { getText } from "../../text/LanguageSelector";
import { supportedTypesText } from "../../text/SupportedTypesText";
import Animated from "react-animate-on-scroll";

export default class SupportedTypes extends Component {
  render() {
    return (
      <div className="row">
        <div
          style={{ position: "relative", minHeight: 470 }}
          className="col s12 m8 l5"
        >
          <Animated animateIn="fadeIn" delay={0} duration={0.8} animateOnce>
            <img
              style={{ position: "absolute", left: 30, top: 0 }}
              width="230px"
              src="/dependencies/img/mud/ao.jpg"
              alt=""
            />
          </Animated>

          <Animated animateIn="fadeIn" delay={50} duration={0.8} animateOnce>
            <img
              style={{ position: "absolute", left: 70, top: 40 }}
              width="230px"
              src="/dependencies/img/mud/height.jpg"
              alt=""
            />
          </Animated>
          <Animated animateIn="fadeIn" delay={60} duration={0.8} animateOnce>
            <img
              style={{ position: "absolute", left: 110, top: 80 }}
              width="230px"
              src="/dependencies/img/mud/roughness.jpg"
              alt=""
            />
          </Animated>
          <Animated animateIn="fadeIn" delay={70} duration={0.8} animateOnce>
            <img
              style={{ position: "absolute", left: 150, top: 120 }}
              width="230px"
              src="/dependencies/img/mud/normal.jpg"
              alt=""
            />
          </Animated>
          <Animated animateIn="fadeIn" delay={80} duration={0.8} animateOnce>
            <img
              style={{ position: "absolute", left: 190, top: 160 }}
              width="230px"
              src="/dependencies/img/mud/color.jpg"
              alt=""
            />
          </Animated>
        </div>
        <div
          className="col s12 m4 l7"
          style={{
            height: "100%",
            display: "flex",
            flex: 1,
            flexDirection: "column"
          }}
        >
          <h4>{getText(supportedTypesText.title)}</h4>
          <p>{getText(supportedTypesText.text)}</p>

          <ol style={{ listStyleType: "disc" }}>
            <li>{getText(supportedTypesText.color)}</li>
            <li>{getText(supportedTypesText.normal)}</li>
            <li>{getText(supportedTypesText.height)}</li>
            <li>{getText(supportedTypesText.roughness)}</li>
            <li>{getText(supportedTypesText.ao)}</li>
          </ol>
        </div>
      </div>
    );
  }
}
