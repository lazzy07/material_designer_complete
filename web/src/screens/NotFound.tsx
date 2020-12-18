import React, { Component } from "react";

export default class NotFound extends Component {
  render() {
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div>
            <i className="material-icons large">cancel</i>
          </div>
          <div>
            <h4>Page not found</h4>
          </div>
        </div>
      </div>
    );
  }
}
