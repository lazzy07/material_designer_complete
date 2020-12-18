import React, { Component } from "react";
import MaskBackground from "../components/common/MaskBackground";
import ScreenButton from "../components/screen_button/ScreenButton";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { USER_SIGNUP_PAGE, COMPANY_SIGNUP_PAGE } from "../routes";

interface Props {}

interface State {}

class UserCompanySelection extends Component<
  Props & RouteComponentProps,
  State
> {
  render() {
    return (
      <div className="row" style={{ minHeight: "100vh" }}>
        <MaskBackground />
        <div className="row" style={{ textAlign: "center", paddingTop: 20 }}>
          <h1>Tell us who you are?</h1>
          <div className="col s12 m8 offset-m2">
            <div className="col s6">
              <div style={{ padding: 30 }}>
                <img
                  alt=""
                  src="/dependencies/img/building.svg"
                  height="200px"
                />
              </div>
              <ScreenButton
                title="I'm a Company"
                onClick={() => {
                  this.props.history.push(COMPANY_SIGNUP_PAGE);
                }}
              />
            </div>
            <div className="col s6">
              <div style={{ padding: 30 }}>
                <img alt="" src="/dependencies/img/user.svg" height="200px" />
              </div>
              <ScreenButton
                title="I'm a user"
                onClick={() => {
                  this.props.history.push(USER_SIGNUP_PAGE);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(UserCompanySelection);
