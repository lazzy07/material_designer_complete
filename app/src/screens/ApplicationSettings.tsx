import React, { Component } from "react";
import Controller from "../components/controller/titlebar/Controller";
import { SECONDARY_COLOR } from "../constants";
import { connect } from "react-redux";
import { Store } from "../redux/reducers";
import Inputbox from "../components/elements/form/Inputbox";
import uuid from "uuid";
import { UserState } from "../redux/reducers/UserReducer";
import Button from "../components/elements/form/Button";

interface Props {
  user: UserState;
}

interface State {
  secureKey: string;
}

class ApplicationSettings extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      secureKey:
        localStorage.getItem("secureKey") === null
          ? ""
          : localStorage.getItem("secureKey")!
    };
  }

  removeKey = () => {
    localStorage.setItem("secureKey", "");
    localStorage.setItem("secureUser", "");
  };

  onClose = () => {};

  addKey = () => {
    localStorage.setItem("secureKey", this.state.secureKey);
    if (this.props.user) {
      localStorage.setItem("secureUser", this.props.user.userName);
    }
  };

  onChange = (val: string) => {
    this.setState({ secureKey: val });
  };

  autoGenarate = () => {
    this.setState({ secureKey: uuid.v4() });
  };

  showSecureKeyOptions = () => {
    if (this.props.user.type === 1) {
      if (localStorage.getItem("secureKey")) {
        if (localStorage.getItem("secureKey")!.length > 0) {
          if (localStorage.getItem("secureUser") === this.props.user.userName) {
            return true;
          } else {
            return false;
          }
        }
      } else {
        return true;
      }
    } else {
      return false;
    }
  };

  secureKeyOptions = () => {
    if (this.showSecureKeyOptions()) {
      return (
        <div>
          <div style={{ padding: 20 }}>
            <p style={{ padding: 0, margin: 0, paddingBottom: 15 }}>
              Setting secure key will let your employees access your online
              projects from this PC
            </p>
            <Inputbox
              name="secureKey"
              label="Secure key"
              value={this.state.secureKey}
              onChange={(key, val) => this.onChange(val)}
              placeholder="Enter a Secure Key"
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%"
            }}
          >
            <Button title="Autogenerate" onClick={this.autoGenarate} />
            <Button title="Set Secure Key" onClick={this.addKey} />
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  render() {
    return (
      <div>
        <div
          style={{
            display: "flex",
            height: window.innerHeight,
            width: window.innerWidth,
            overflow: "hiddden",
            borderLeft: `3px solid ${SECONDARY_COLOR}`,
            borderRight: `3px solid ${SECONDARY_COLOR}`,
            borderBottom: `3px solid ${SECONDARY_COLOR}`
          }}
        >
          <div>
            <Controller
              background
              icon
              canClose
              draggable
              fileName
              onClose={this.onClose}
              fileMenuPos={"40%"}
              title={`Application Settings`}
            />
            <div
              style={{
                marginTop: 50,
                paddingBottom: 10,
                width: "98vw",
                textAlign: "center"
              }}
            >
              <h3>Application Settings</h3>
            </div>
            {this.secureKeyOptions()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store: Store) => {
  return {
    user: store.user
  };
};

export default connect(mapStateToProps)(ApplicationSettings);
