import React, { Component } from "react";
import { ACTIVE_COLOR_LIGHT } from "../../constants";
import { LOGIN_PAGE, SIGNUP_PAGE } from "../../routes";
import { getText } from "../../text/LanguageSelector";
import { headerText } from "../../text/Header";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Store } from "../../redux/reducers";

interface AvatarProps {
  isLoggedIn: boolean;
  currentRoute: string;
  navigate: (route: string) => void;
  userName: string;
  type: number;
}

class Avatar extends Component<RouteComponentProps & AvatarProps, any> {
  renderAvatar = (img?: string) => {
    return (
      <div
        onClick={() => {
          let path: string = "/";
          path = "/user/" + this.props.userName;
          // if (this.props.type === 0) {
          // } else if (this.props.type === 1) {
          //   path = "/company/" + this.props.userName;
          // }

          this.props.navigate(path);
        }}
        style={{ width: 30, height: 30, borderRadius: 30, cursor: "pointer" }}
      >
        <img
          width="100%"
          alt=""
          src={img ? img : `/dependencies/img/user.svg`}
        />
      </div>
    );
  };

  render() {
    if (this.props.isLoggedIn) {
      return <div>{this.renderAvatar()}</div>;
    } else {
      return (
        <div style={{ display: "flex" }}>
          <div
            onClick={() => this.props.navigate(LOGIN_PAGE)}
            style={{
              fontSize: 18,
              fontWeight: "bolder",
              paddingLeft: 8,
              paddingRight: 8,
              marginLeft: 8,
              marginRight: 8,
              cursor: "pointer",
              border: `2px ${
                this.props.currentRoute === LOGIN_PAGE
                  ? ACTIVE_COLOR_LIGHT
                  : "white"
              } solid`,
              color:
                this.props.currentRoute === LOGIN_PAGE
                  ? ACTIVE_COLOR_LIGHT
                  : undefined,
              borderRadius: 5
            }}
          >
            {getText(headerText.signInButton)}
          </div>
          <div
            onClick={() => this.props.navigate(SIGNUP_PAGE)}
            style={{
              fontSize: 18,
              fontWeight: "bolder",
              paddingLeft: 8,
              paddingRight: 8,
              marginLeft: 8,
              marginRight: 8,
              cursor: "pointer",
              border: `2px ${
                this.props.currentRoute === SIGNUP_PAGE
                  ? ACTIVE_COLOR_LIGHT
                  : "white"
              } solid`,
              color:
                this.props.currentRoute === SIGNUP_PAGE
                  ? ACTIVE_COLOR_LIGHT
                  : undefined,
              borderRadius: 5
            }}
          >
            {getText(headerText.signUpButton)}
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (store: Store) => {
  return {
    userName: store.user.userName,
    type: store.user.type
  };
};

export default connect(mapStateToProps)(withRouter(Avatar));
