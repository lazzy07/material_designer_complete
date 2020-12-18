import React, { Component } from "react";
import Axios from "axios";
import { Animated } from "react-animated-css";
import { Button, TextInput } from "react-materialize";
import { withRouter } from "react-router-dom";
import Controller from "../components/controller/titlebar/Controller";
import {
  WARNING_COLOR,
  GRAPHQL_URL,
  REFRESH_TOKEN_URL
} from "./../constants/index";
import { SIGNUP_PAGE, EDITOR_PAGE } from "../routes";
import { loginQuery } from "../gql/LoginQuery";
import { parseSessionToken } from "../services/jwt/ParseJwt";
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/UserActions";
import JwtDecode from "jwt-decode";
const session = window.require("electron");

declare global {
  interface Window {
    require: any;
  }
}

class LoginScreen extends Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      send: {
        userName: "",
        password: ""
      },
      error: "",
      disabled: false
    };
  }

  validateEmail = (email: string): boolean => {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    return expression.test(email.toLowerCase());
  };

  openSignup = (): void => {
    this.props.history.push(SIGNUP_PAGE);
  };

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      send: { ...this.state.send, [e.target.name]: e.target.value }
    });
  };

  signup = (userName: string, password: string) => {
    this.setState({
      error: ""
    });
    if (userName.length > 0) {
      if (password.length > 5) {
        this.queryLogin();
      } else {
        this.setState({
          error: "Incorrect password"
        });
      }
    } else {
      this.setState({
        error: "Incorrect email or user name"
      });
    }
  };

  queryLogin = () => {
    this.setState({ disabled: true });
    Axios.post(
      GRAPHQL_URL,
      {
        query: loginQuery,
        variables: {
          userName: this.validateEmail(this.state.send.userName)
            ? ""
            : this.state.send.userName,
          email: this.validateEmail(this.state.send.userName)
            ? this.state.send.userName
            : "",
          password: this.state.send.password,
          secureKey: localStorage.getItem("secureKey") || "",
          secureUser: localStorage.getItem("secureUser") || ""
        }
      },
      { withCredentials: true }
    )
      .then(res => {
        const data = res.data;
        if (data.errors) {
          this.setState({
            error: data.errors[0].message,
            disabled: false
          });
        } else {
          const saveData = parseSessionToken(data.data.login);

          this.props.loginUser(saveData);
          this.props.history.push(EDITOR_PAGE);
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({ error: "Server err", disabled: false });
      });
  };

  componentWillMount = () => {
    const cookie = localStorage.getItem("cookie");

    if (cookie) {
      const jid = JSON.parse(cookie);
      (window as any)
        .require("electron")
        .remote.session.defaultSession.cookies.set(
          { url: "http://localhost:3000", ...jid },
          err => {
            if (err) {
              console.log(err);
              return;
            }
            Axios.post(REFRESH_TOKEN_URL, {}, { withCredentials: true })
              .then(res => {
                if (!res.data.error) {
                  console.log(JwtDecode(res.data.accessToken));
                  const saveData = parseSessionToken(res.data.accessToken);
                  this.props.loginUser({
                    ...saveData,
                    sessionId: res.data.accessToken
                  });
                  if ((window as any).type === "editor")
                    this.props.history.push(EDITOR_PAGE);
                } else {
                  localStorage.removeItem("cookie");
                  console.log(res.data);
                }
              })
              .catch(err => {
                this.setState({ loading: false });
                console.log(err);
              });
          }
        );
    }
  };

  render() {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh"
        }}
      >
        <Controller minimize canClose />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh"
          }}
        >
          <div style={{ textAlign: "center" }}>
            <Animated
              animationIn="fadeIn"
              animationOut="fadeOut"
              isVisible={true}
              animationInDelay={200}
            >
              <h1 style={{ fontSize: "50px", padding: 0, margin: 0 }}>
                Material Designer
              </h1>
              <h2 style={{ fontSize: "30px", padding: 0, margin: 0 }}>
                Sign in
              </h2>
            </Animated>
            <Animated
              animationIn="fadeIn"
              animationOut="fadeOutLeft"
              isVisible={true}
              animationInDelay={500}
            >
              <div style={{ padding: "20px" }}>
                <img height="180px" src="./dependencies/img/user.svg" alt="" />
              </div>
              <div style={{ textAlign: "start" }}>
                <TextInput
                  name="userName"
                  onChange={this.onChange}
                  value={this.state.send.userName}
                  className="inputter"
                  placeholder="Enter username or email"
                  s={10}
                  label="Username / Email"
                />
                <TextInput
                  name="password"
                  onChange={this.onChange}
                  value={this.state.send.password}
                  className="inputter"
                  placeholder="Enter password"
                  s={10}
                  type="password"
                  label="Password"
                />
              </div>
              <div>
                <p
                  style={{
                    textAlign: "center",
                    color: WARNING_COLOR,
                    fontWeight: "bolder",
                    margin: "2px",
                    padding: "2px"
                  }}
                >
                  {this.state.error}
                </p>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div style={{ paddingRight: "10px" }}>
                    <Button
                      disabled={this.state.disabled}
                      onClick={() =>
                        this.signup(
                          this.state.send.userName,
                          this.state.send.password
                        )
                      }
                      waves="light"
                    >
                      Sign in
                    </Button>
                  </div>
                  {!localStorage.getItem("secureKey") && (
                    <Button
                      onClick={this.openSignup}
                      className="transparent"
                      waves="light"
                    >
                      Sign up
                    </Button>
                  )}
                </div>
                <p style={{ fontSize: "15px" }}>
                  <span
                    className="clickable"
                    onClick={() => {
                      this.props.history.push(EDITOR_PAGE);
                    }}
                  >
                    Start without signing in
                  </span>
                </p>
              </div>
            </Animated>
          </div>
        </div>
      </div>
    );
  }
}
const mapActionsToProps = {
  loginUser
};

export default connect(
  null,
  mapActionsToProps
)(withRouter(LoginScreen));
