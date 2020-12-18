import React, { Component } from "react";
import { Animated } from "react-animated-css";
import { TextInput, Button } from "react-materialize";
import { WARNING_COLOR, GRAPHQL_URL } from "./../constants/index";
import { withRouter } from "react-router-dom";
import { LOGIN_PAGE, SIGNUP_PAGE, NEWS_FEED } from "../routes";
import { connect } from "react-redux";
import { setRoute } from "../redux/actions/RouteActions";
import Axios from "axios";
import { signupQuery } from "../gql/SignupQuery";
import { parseSessionToken } from "../services/ParseJWT";
import { loginUser } from "../redux/actions/UserActions";

class SignupScreen extends Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      send: {
        userName: "",
        password: "",
        email: "",
        fName: "",
        lName: ""
      },
      confirm: {
        password: ""
      },
      disabled: false,
      error: {
        fName: "",
        lName: "",
        userName: "",
        password: "",
        confirmPassword: "",
        email: "",
        main: ""
      }
    };
  }

  signUp = (): void => {
    this.setState({
      error: {},
      disabled: true
    });
    let signup = this.validateSignup(
      this.state.send.fName,
      this.state.send.lName,
      this.state.send.userName,
      this.state.send.email,
      this.state.send.password,
      this.state.confirm.password
    );

    if (signup) {
      Axios.post(
        GRAPHQL_URL,
        {
          query: signupQuery,
          variables: {
            userName: this.state.send.userName,
            email: this.state.send.email,
            firstName: this.state.send.fName,
            lastName: this.state.send.lName,
            password: this.state.send.password,
            type: 0
          }
        },
        { withCredentials: true }
      )
        .then(res => {
          const data = res.data;
          if (data.errors) {
            this.setState({
              error: { main: data.errors[0].message },
              disabled: false
            });
          } else {
            const saveData = parseSessionToken(data.data.signup);
            this.props.loginUser(saveData);
            this.props.history.push(NEWS_FEED);
          }
        })
        .catch(err => {
          console.log(err);
          this.setState({
            error: { main: "Connection failed" },
            disabled: false
          });
        });
    }
  };

  addError = (to: string, error: string): null => {
    this.setState({
      error: {
        [to]: error,
        main: error
      }
    });
    return null;
  };

  validateEmail = (email: string): boolean => {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    return expression.test(email.toLowerCase());
  };

  validateSignup = (
    fName: string,
    lName: string,
    userName: string,
    email: string,
    password: string,
    confirmPassword: string
  ): object | null => {
    if (fName.length > 0) {
      if (lName.length > 0) {
        if (userName.length >= 4) {
          if (userName.match("^[A-z0-9]+$")) {
            if (this.validateEmail(email)) {
              if (password.length >= 6) {
                if (password === confirmPassword) {
                  return this.state.send;
                } else {
                  return this.addError(
                    "confirmPassword",
                    "Paswords didn't match"
                  );
                }
              } else {
                return this.addError(
                  "password",
                  "Password must be atleast 6 characters long"
                );
              }
            } else {
              return this.addError("email", "Please enter a valid email");
            }
          } else {
            return this.addError(
              "userName",
              "Username can only contain numbers and letters"
            );
          }
        } else {
          return this.addError(
            "userName",
            "Username must be atleast 4 characters long"
          );
        }
      } else {
        return this.addError("lName", "Last name can't be empty");
      }
    } else {
      return this.addError("fName", "First name can't be empty");
    }
  };

  openLogin = (): void => {
    this.props.setRoute(LOGIN_PAGE);
    this.props.history.push(LOGIN_PAGE);
  };

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      send: { ...this.state.send, [e.target.name]: e.target.value }
    });
  };

  onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      confirm: { ...this.state.confirm, [e.target.name]: e.target.value }
    });
  };

  componentDidMount() {
    this.props.setRoute(SIGNUP_PAGE);
  }

  render() {
    return (
      <div
        style={{
          width: "100vw"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "40px",
            textAlign: "center"
          }}
        >
          <Animated
            animationIn="fadeInUp"
            animationOut="fadeOut"
            isVisible={true}
            animationInDelay={200}
          >
            <h1 style={{ fontSize: "50px", padding: 0, margin: 0 }}>
              Material Designer
            </h1>
            <h2 style={{ fontSize: "30px", padding: 0, margin: 0 }}>Sign up</h2>
          </Animated>
        </div>
        <Animated
          animationIn="fadeIn"
          animationOut="fadeOut"
          isVisible={true}
          animationInDelay={300}
        >
          <div className="row">
            <div
              className="col s10 offset-s2"
              style={{
                textAlign: "start",
                paddingTop: "30px"
              }}
            >
              <TextInput
                name="fName"
                error={this.state.error.fName}
                onChange={this.onChange}
                value={this.state.send.fName}
                className="inputter"
                placeholder="Enter first name"
                s={10}
                label="First Name"
              />
              <TextInput
                name="lName"
                error={this.state.error.lName}
                onChange={this.onChange}
                value={this.state.send.lName}
                className="inputter"
                placeholder="Enter last name"
                s={10}
                label="Last Name"
              />
              <TextInput
                name="userName"
                error={this.state.error.userName}
                onChange={this.onChange}
                value={this.state.send.userName}
                className="inputter"
                placeholder="Enter username"
                s={10}
                label="Username"
              />
              <TextInput
                name="email"
                error={this.state.error.email}
                onChange={this.onChange}
                value={this.state.send.email}
                className="inputter"
                placeholder="Enter email"
                s={10}
                label="Email"
              />
              <TextInput
                name="password"
                error={this.state.error.password}
                onChange={this.onChange}
                value={this.state.send.password}
                className="inputter"
                placeholder="Enter password"
                s={10}
                type="password"
                label="Password"
              />
              <TextInput
                name="password"
                error={this.state.error.confirmPassword}
                onChange={this.onChangePassword}
                value={this.state.confirm.password}
                className="inputter"
                placeholder="Confirm password"
                s={10}
                type="password"
                label="Confirm password"
              />
            </div>
            <p
              style={{
                color: WARNING_COLOR,
                textAlign: "center",
                fontWeight: "bolder",
                fontSize: "20px",
                margin: "0px",
                padding: "0px"
              }}
            >
              {this.state.error.main}
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ paddingRight: "10px" }}>
              <Button
                disabled={this.state.disabled}
                onClick={this.signUp}
                waves="light"
              >
                Sign up
              </Button>
            </div>
          </div>
          <div style={{ textAlign: "center", paddingBottom: "50px" }}>
            <p onClick={this.openLogin} style={{ fontSize: "15px" }}>
              <span className="clickable">Back to sign in</span>
            </p>
          </div>
        </Animated>
      </div>
    );
  }
}

const mapStateToProps = {
  setRoute,
  loginUser
};

export default connect(null, mapStateToProps)(withRouter(SignupScreen));
