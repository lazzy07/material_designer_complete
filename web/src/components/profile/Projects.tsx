import React, { Component } from "react";
import { Project } from "../../interfaces/Project";
import { connect } from "react-redux";
import { Store } from "../../redux/reducers";

interface Props {
  projects: Project[];
  userName: string;
}

interface State {}

class Projects extends Component<Props, State> {
  renderProjects = () => {
    return this.props.projects.map((ele, index) => {
      return (
        <div
          className="bgOnHover"
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontWeight: "bolder",
            paddingLeft: "30px",
            paddingRight: "30px"
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <i style={{ padding: 5, margin: 5 }} className="material-icons">
              description
            </i>
            <p style={{ padding: 0, margin: 0 }}>{ele.projectName}</p>
          </div>
          <div style={{ display: "flex" }}>
            {/* <i
              style={{ padding: 5, margin: 5 }}
              className="material-icons hoverColor"
            >
              dashboard
            </i> */}
            <i
              style={{ padding: 5, margin: 5 }}
              className="material-icons hoverColor"
            >
              add_to_photos
            </i>
            {this.props.userName === ele.user.userName && (
              <i
                style={{ padding: 5, margin: 5 }}
                className="material-icons hoverColor"
              >
                delete
              </i>
            )}
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <div
        className="defaultBackground"
        style={{ paddingTop: 10, paddingBottom: 10, minHeight: "100vh" }}
      >
        {this.renderProjects()}
      </div>
    );
  }
}

const mapStateToProps = (store: Store) => {
  return {
    userName: store.user.userName
  };
};

export default connect(mapStateToProps)(Projects);
