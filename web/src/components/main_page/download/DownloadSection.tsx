import React, { Component } from "react";
import { connect } from "react-redux";

import ScreenButton from "../../screen_button/ScreenButton";
import { setRoute } from "../../../redux/actions/RouteActions";
// import { routes } from "../../../routes/routes";
import { DOWNLOAD_SCREEN } from "../../../routes";
import { withRouter } from "react-router-dom";

class DownloadSection extends Component<any, any> {
  redirect = () => {
    this.props.setRoute(DOWNLOAD_SCREEN);
    this.props.history.push(DOWNLOAD_SCREEN);
  };

  render() {
    return (
      <div style={{ position: "relative" }}>
        <div style={{ position: "relative", top: 0, left: 0, padding: 40 }}>
          <div className="row">
            <div className="col s12 m6">
              <h5>
                Download{" "}
                <span style={{ fontWeight: "bolder", fontSize: "1.3em" }}>
                  Material Designer
                </span>{" "}
                now!!{" "}
                <span style={{ fontWeight: "bolder", fontSize: "1.05em" }}>
                  it's free and opensource
                </span>
              </h5>
              <p>
                <span style={{ fontWeight: "bolder" }}>Material designer </span>
                is a software that can create interesting textures that can be
                used to make textures for 3D models to be used in games
                architecture projects etc. Right now the project is still in its
                alpha version. and it's highly recommended not to use this in
                your projects just yet.
              </p>
            </div>
            <div
              className="col s12 m6"
              style={{
                paddingTop: 40,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%"
              }}
            >
              <ScreenButton onClick={this.redirect} title="Download Now" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapActionsToProps = {
  setRoute
};

export default connect(null, mapActionsToProps)(withRouter(DownloadSection));
