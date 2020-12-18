import React, { Component } from "react";
import MaskBackground from "../components/common/MaskBackground";
import Textbox from "../components/common/Textbox";
import Button from "../components/common/Button";
import { v4 } from "uuid";
import { Query } from "@apollo/react-components";
import { secureKeysQuery, secureKeyDelete } from "../gql/SecureKeysQuery";
import Loader from "../components/common/Loader";
import { client } from "..";
import { addNewSecureKeyQuery } from "../gql/AddNewSecureKey";
import { withRouter, RouteComponentProps } from "react-router-dom";

interface Props {}

interface State {
  key: string;
  loading: boolean;
  data: string[];
}
class SecureKeysScreen extends Component<Props & RouteComponentProps, State> {
  constructor(props) {
    super(props);

    this.state = {
      key: "",
      loading: false,
      data: []
    };
  }

  onChange = (val: string) => {
    this.setState({ key: val });
  };

  autoGenerate = () => {
    this.setState({ key: v4() });
  };

  addNew = () => {
    this.setState({ loading: true });
    client
      .mutate({
        mutation: addNewSecureKeyQuery,
        variables: {
          key: this.state.key
        }
      })
      .then(res => {
        this.setState({ loading: false, data: res.data });
        this.props.history.replace(this.props.location.pathname);
      })
      .catch(err => {
        console.log(err);
      });
  };

  queryKey = () => {
    return (
      <Query fetchPolicy="no-cache" query={secureKeysQuery}>
        {({ loading, error, data }) => {
          if (loading)
            return (
              <div
                style={{
                  width: "100%",
                  textAlign: "center",
                  height: "100vh",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex"
                }}
              >
                <Loader />
                <h5>Loading</h5>
              </div>
            );

          if (error) return <div>error</div>;
          if (data.getSecureKeys.length === 0) {
            return (
              <div
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  height: "100vh"
                }}
              >
                <i className="material-icons large">no_encryption</i>
                <h5>No Secure Keys</h5>
              </div>
            );
          }

          return data.getSecureKeys.map((ele, index) => {
            return this.renderKey(ele);
          });
        }}
      </Query>
    );
  };

  removeKey = (key: string) => {
    client
      .mutate({ mutation: secureKeyDelete, variables: { key } })
      .then(res => {
        this.props.history.replace(this.props.location.pathname);
      });
  };

  renderKey = (key: string) => {
    return (
      <div
        key={key}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 5
        }}
        className="defaultBackground col s10 offset-s1 m6 offset-m3"
      >
        <div>
          <p>{key}</p>
        </div>
        <div>
          <i
            style={{ cursor: "pointer" }}
            className="material-icons hoverColor"
            onClick={() => this.removeKey(key)}
          >
            delete_forever
          </i>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div style={{ minHeight: "200vh", width: "100%" }}>
        <MaskBackground />
        <div style={{ width: "100%", textAlign: "center" }}>
          <h2>
            Secure Keys<i className="material-icons large">lock</i>
          </h2>
          <p>
            You can add Secure keys to your company PCs and let your employees
            accesss your projects only
          </p>
        </div>
        <div className="row" style={{ paddingTop: 10 }}>
          <div
            style={{ display: "flex", justifyContent: "center" }}
            className="col s10 offset-s1 m8 offset-m2"
          >
            <Textbox
              width={"300px"}
              autofocus
              value={this.state.key}
              name="keyval"
              onChange={(key, val) => this.onChange(val)}
              placeholder={"Add new Key"}
              label={"Add API Key"}
            />
          </div>
          <div className="row">
            <div
              className="col s12 m8 offset-m2"
              style={{
                display: "flex",
                justifyContent: "center",
                padding: 20
              }}
            >
              <Button
                disabled={this.state.loading}
                title="Add new Key"
                onClick={this.addNew}
              />
              <Button title="Autogenarate" onClick={this.autoGenerate} />
            </div>
          </div>
          <div className="row" style={{ paddingTop: 20 }}>
            <div
              style={{ minHeight: "100vh" }}
              className="secondaryBackground col s12 m8 offset-m2"
            >
              <div style={{ paddingTop: 10, paddingBottom: 10 }}>
                {this.queryKey()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SecureKeysScreen);
