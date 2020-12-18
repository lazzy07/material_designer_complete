import React, { Component } from "react";
import ScreenButton from "../screen_button/ScreenButton";
import "../../css/downloadhero.css";

export default class DownloadHero extends Component {
  render() {
    return (
      <div
        className="downloadBackground"
        style={{
          position: "relative",
          backgroundImage:
            "url('/dependencies/img/download_hero.jpg'), linear-gradient(230deg, #868686, #4DB6AC)",
          backgroundBlendMode: "luminosity",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundSize: "cover"
        }}
      >
        <div className="screenshot hide-on-med-and-down">
          <img
            style={{
              width: "500px"
            }}
            src="/dependencies/img/screen.jpg"
            alt=""
          />
        </div>
        <div
          style={{
            width: "100vw"
          }}
        >
          <div
            style={{
              position: "absolute",
              right: 0,
              paddingRight: "20px",
              paddingLeft: "20px",
              top: "30%"
            }}
          >
            <h1
              style={{
                fontSize: "3.5em"
              }}
            >
              MATERIAL DESIGNER
            </h1>
            <h3 style={{ fontSize: "1.5em" }}>Alpha version 0.2</h3>
            <div>
              <ScreenButton title="Download" onClick={() => {}} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
