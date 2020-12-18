import React, { Component } from "react";
import { Animated } from "react-animated-css";
import { Button, TextInput } from "react-materialize";
import { withRouter } from "react-router-dom";
import { WARNING_COLOR, GRAPHQL_URL } from "./../constants/index";
import { SIGNUP_PAGE, LOGIN_PAGE, NEWS_FEED } from "../routes";
import { connect } from "react-redux";
import { setRoute } from "../redux/actions/RouteActions";

import Axios from "axios";
import { loginQuery } from "../gql/LoginQuery";
import { loginUser } from "../redux/actions/UserActions";
import { parseSessionToken } from "../services/ParseJWT";

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
    this.props.setRoute(SIGNUP_PAGE);
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
          password: this.state.send.password
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
          this.props.history.push(NEWS_FEED);
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({ error: "Server error", disabled: false });
      });
  };

  componentDidMount = () => {
    this.props.setRoute(LOGIN_PAGE);
  };

  render() {
    return (
      <div
        style={{
          width: "100vw",
          paddingTop: 20
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
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
                <img height="180px" src="/dependencies/img/user.svg" alt="" />
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
                  <Button
                    onClick={this.openSignup}
                    className="transparent"
                    waves="light"
                  >
                    Sign up
                  </Button>
                </div>
              </div>
            </Animated>
          </div>
        </div>
      </div>
    );
  }
}

const mapActionsToProps = {
  setRoute,
  loginUser
};

export default connect(null, mapActionsToProps)(withRouter(LoginScreen));
