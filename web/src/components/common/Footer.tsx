import React, { Component } from "react";
import "../../css/footer.css";

export default class Footer extends Component {
  render() {
    return (
      <div
        className="footer"
        style={{ height: "400px", overflow: "hidden", position: "relative" }}
      >
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <h4 style={{ paddingBottom: "20px" }}>Material Designer</h4>
        </div>
        <div className="row">
          <div style={{ paddingLeft: "20px" }} className="col s12 m6">
            <p>
              <i
                style={{ paddingRight: "5px" }}
                className="tiny material-icons"
              >
                local_phone
              </i>{" "}
              Phone : +94 77 360 130 5
            </p>
            <p>
              <i
                style={{ paddingRight: "5px" }}
                className="tiny material-icons"
              >
                email
              </i>
              Email : 222lasantha@gmail.com
            </p>
            <p>
              <i
                style={{ paddingRight: "5px" }}
                className="tiny material-icons"
              >
                business
              </i>
              Address : Kandy, Sri Lanka
            </p>
          </div>
          <div
            className="col s12 m6"
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center"
            }}
          >
            <i style={{ padding: 20 }} className="fab fa-github fa-3x"></i>
            <i style={{ padding: 20 }} className="fab fa-instagram fa-3x"></i>
            <i style={{ padding: 20 }} className="fab fa-facebook-f fa-3x"></i>
            <i style={{ padding: 20 }} className="fab fa-linkedin fa-3x"></i>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "60px",
            bottom: 0,
            left: 0,
            backgroundImage: "url('/dependencies/img/pattern.png')"
          }}
        ></div>
      </div>
    );
  }
}
