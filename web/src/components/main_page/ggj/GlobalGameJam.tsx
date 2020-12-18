import React, { Component } from "react";

export default class GlobalGameJam extends Component {
  render() {
    return (
      <div>
        <div
          style={{
            position: "relative",
            height: "500px",
            backgroundImage: "url(/dependencies/img/ggj.jpg)",
            // backgroundBlendMode: "luminosity",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            backgroundSize: "cover"
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "500px",
              backgroundColor: "black",
              opacity: 0.6
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              textAlign: "center",
              height: "500px",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column"
            }}
          >
            <h2>Material Designer made it to the Global Game Jam 2020</h2>
            <p>
              We are happy to inform you that material designer has made it to
              the Global Game Jam 2020 - Colombo on 1st of February 2020 with
              it's sister project Vulture Engine, real time game engine that
              also made by us!.
            </p>
          </div>
        </div>
      </div>
    );
  }
}
