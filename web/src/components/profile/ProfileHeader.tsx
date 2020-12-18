import React, { Component } from "react";
import { Dropdown } from "react-materialize";
import "../../css/dropdown.css";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Store } from "../../redux/reducers";
import {
  SETTINGS_SCREEN,
  APIKEYS_SCREEN,
  SECUREKEYS_SCREEN,
  HOME_PAGE
} from "../../routes";
import { logoutUser } from "../../redux/actions/UserActions";
import Axios from "axios";
import { LOGOUT_URL } from "../../constants";

interface Props {
  userName: string;
  isCompany: boolean;
  logoutUser: () => void;
}

interface State {}

class ProfileHeader extends Component<Props & RouteComponentProps, State> {
  ref: any;
  eventListner: any;

  componentDidMount() {
    window.addEventListener(
      "scroll",
      event => {
        let value = -6 + window.scrollY / 60;
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

  onClickSettings = () => {
    this.props.history.push(SETTINGS_SCREEN);
  };

  onClickApi = () => {
    this.props.history.push(APIKEYS_SCREEN);
  };

  onClickSecure = () => {
    this.props.history.push(SECUREKEYS_SCREEN);
  };

  logOut = () => {
    Axios.post(LOGOUT_URL, {}, { withCredentials: true })
      .then(res => {
        console.log("Logging out complete");
        this.props.logoutUser();
        this.props.history.push(HOME_PAGE);
      })
      .catch(err => {});
  };

  render() {
    return (
      <div>
        <div
          id="pHeroBackground"
          style={{
            position: "relative",
            height: "300px",
            width: "100%",
            overflow: "hidden",
            backgroundImage:
              "url(/dependencies/img/pattern_opaque.png), linear-gradient(230deg, #00695C, #4DB6AC)",
            backgroundAttachment: "fixed"
          }}
        >
          <div style={{ position: "absolute", right: 10, top: 10 }}>
            {this.props.userName === (this.props.match.params as any).id && (
              <Dropdown
                id={"profile_options"}
                className="dropDownBlock"
                options={{
                  closeOnClick: true,
                  coverTrigger: false,
                  inDuration: 100,
                  outDuration: 100
                }}
                trigger={
                  <div>
                    <i
                      style={{ cursor: "pointer", fontSize: "36px" }}
                      className="material-icons"
                    >
                      more_vert
                    </i>
                  </div>
                }
              >
                <div
                  onClick={this.onClickSettings}
                  className="dropdownSubElement"
                >
                  Settings
                </div>
                {this.props.userName ===
                  (this.props.match.params as any).id && (
                  <div onClick={this.onClickApi} className="dropdownSubElement">
                    API Keys
                  </div>
                )}
                {this.props.isCompany ? (
                  this.props.userName ===
                    (this.props.match.params as any).id && (
                    <div
                      onClick={this.onClickSecure}
                      className="dropdownSubElement"
                    >
                      Set Secure Keys
                    </div>
                  )
                ) : (
                  <div></div>
                )}
                <div onClick={this.logOut} className="dropdownSubElement">
                  Logout
                </div>
              </Dropdown>
            )}
          </div>
          <div ref={ref => (this.ref = ref)} id="skewSectionProfile"></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store: Store) => {
  return {
    userName: store.user.userName,
    isCompany: store.user.type === 0 ? false : true
  };
};

export default connect(mapStateToProps, { logoutUser })(
  withRouter(ProfileHeader)
);
