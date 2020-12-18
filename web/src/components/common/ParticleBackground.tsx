import React, { Component } from "react";
import Particles from "react-particles-js";

export default class ParticleBackground extends Component {
  render() {
    return (
      <div
        style={{
          position: "fixed",
          width: "100vw",
          minHeight: "100vh",
          zIndex: -1
        }}
      >
        <Particles className="particles" />
      </div>
    );
  }
}
