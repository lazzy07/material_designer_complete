import React, { Component } from "react";
import ProfileInfo from "../components/profile/ProfileInfo";

interface Props {}

interface State {
  selected: string;
}

export default class TopScreen extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      selected: "Artwork"
    };
  }

  changeSelected = (selected: string) => {
    this.setState({
      selected
    });
  };

  render() {
    return (
      <div>
        <div
          style={{
            minHeight: "200vh",
            position: "relative",
            width: "100%",
            overflow: "hidden",
            backgroundImage:
              "url(/dependencies/img/pattern_opaque.png), linear-gradient(230deg, #00695C, #4DB6AC)",
            backgroundAttachment: "fixed",
            marginBottom: 0,
            paddingTop: 50,
            paddingBottom: 50
          }}
          className="row"
        >
          <div
            style={{ minHeight: "200vh" }}
            className="col s12 m8 l6 offset-m2 offset-l3 defaultBackground"
          >
            <div
              style={{
                display: "flex",
                textAlign: "center",
                justifyContent: "center"
              }}
            >
              <h1>Top 10's</h1>
            </div>
            <div className="row">
              <div className="col s4 m3 offset-m1">
                <ProfileInfo
                  icon="burst_mode"
                  onClick={() => {
                    this.changeSelected("Artwork");
                  }}
                  title="Artwork"
                />
              </div>
              <div className="col s4 m3">
                <ProfileInfo
                  icon="blur_circular"
                  onClick={() => {
                    this.changeSelected("Materials");
                  }}
                  title="Materials"
                />
              </div>
              <div className="col s4 m3">
                <ProfileInfo
                  icon="dialpad"
                  onClick={() => {
                    this.changeSelected("Keybindings");
                  }}
                  title="Keybindings"
                />
              </div>
            </div>
            <div
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                paddingTop: 5,
                paddingBottom: 5
              }}
              className="secondaryBackground"
            >
              <h3>{this.state.selected}</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
