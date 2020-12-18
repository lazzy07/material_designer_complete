import React, { Component } from "react";
import Lottie from "react-lottie";
import * as animationData from "../../animations/balance/data.json";

export default class LicenceInfo extends Component {
  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: (animationData as any).default,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };

    return (
      <div className="row" style={{ paddingTop: 30 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
          className="col m4 s12"
        >
          {/* <img
            style={{
              paddingTop: "100px",
              color: "red",
              maxWidth: "200px"
            }}
            src="/dependencies/img/balance.svg"
            width="100%"
          /> */}
          <div style={{ paddingTop: "100px", maxWidth: "200px" }}>
            <Lottie options={defaultOptions} />
          </div>
        </div>
        <div className="col m8 s12">
          <h4>Licence Information - Material Designer Editor</h4>
          <h5>Apache Licence 2.0</h5>
          <p>
            A permissive license whose main conditions require preservation of
            copyright and license notices. Contributors provide an express grant
            of patent rights. Licensed works, modifications, and larger works
            may be distributed under different terms and without source code.
          </p>
          <div className="row">
            <div className="col s6">
              <h6>Permissions :</h6>
              <div style={{ paddingLeft: 20 }}>
                <p style={{ padding: 0, margin: 0 }}>
                  <i
                    className="material-icons specialColor"
                    style={{ paddingRight: 10, margin: 0 }}
                  >
                    check
                  </i>
                  Commercial use
                  <br />
                  <i
                    className="material-icons specialColor"
                    style={{ paddingRight: 10, margin: 0 }}
                  >
                    check
                  </i>
                  Modification
                  <br />
                  <i
                    className="material-icons specialColor"
                    style={{ paddingRight: 10, margin: 0 }}
                  >
                    check
                  </i>
                  Distribution
                  <br />
                  <i
                    className="material-icons specialColor"
                    style={{ paddingRight: 10, margin: 0 }}
                  >
                    check
                  </i>
                  Patent use
                  <br />
                  <i
                    className="material-icons specialColor"
                    style={{ paddingRight: 10, margin: 0 }}
                  >
                    check
                  </i>
                  Private use
                </p>
              </div>
            </div>
            <div className="col s6">
              <h6>Limitations :</h6>
              <div style={{ paddingLeft: 20 }}>
                <p>
                  <i
                    className="material-icons errorColor"
                    style={{ paddingRight: 10, margin: 0 }}
                  >
                    close
                  </i>
                  Trademark use
                  <br />
                  <i
                    className="material-icons errorColor"
                    style={{ paddingRight: 10, margin: 0 }}
                  >
                    close
                  </i>
                  Liability
                  <br />
                  <i
                    className="material-icons errorColor"
                    style={{ paddingRight: 10, margin: 0 }}
                  >
                    close
                  </i>
                  Warranty
                  <br />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
