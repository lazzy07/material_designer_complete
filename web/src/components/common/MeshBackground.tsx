import React, { Component } from "react";
import Particles from "react-particles-js";

export default class MeshBackground extends Component {
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
        <Particles
          className="particles"
          params={{
            particles: {
              number: {
                value: 60,
                density: {
                  enable: true,
                  value_area: 800
                }
              },
              line_linked: {
                enable: false
              },
              move: {
                speed: 1,
                out_mode: "out"
              },
              shape: {
                type: ["images"],
                images: [
                  {
                    src: "/dependencies/img/particle_3d/01.png",
                    height: 50,
                    width: 50
                  },
                  {
                    src: "/dependencies/img/particle_3d/02.png",
                    height: 50,
                    width: 50
                  },
                  {
                    src: "/dependencies/img/particle_3d/03.png",
                    height: 50,
                    width: 50
                  },
                  {
                    src: "/dependencies/img/particle_3d/04.png",
                    height: 50,
                    width: 50
                  },
                  {
                    src: "/dependencies/img/particle_3d/05.png",
                    height: 50,
                    width: 50
                  }
                ]
              },
              color: {
                value: "#CCC"
              },
              size: {
                value: 30,
                random: false,
                anim: {
                  enable: true,
                  speed: 4,
                  size_min: 10,
                  sync: false
                }
              }
            },
            retina_detect: false
          }}
        />
      </div>
    );
  }
}
