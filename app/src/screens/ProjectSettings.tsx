import React, { Component } from "react";
import Controller from "../components/controller/titlebar/Controller";
import { connect } from "react-redux";
import { Store } from "../redux/reducers";
import { setProjectName, setPublic } from "../redux/actions/ProjectActions";
import Inputbox from "../components/elements/form/Inputbox";
import Checkbox from "../components/elements/form/Checkbox";
import Button from "../components/elements/form/Button";
import { SECONDARY_COLOR } from "../constants";
let remote = window.require("electron").remote;

interface State {
  projectName: string;
  isPublic: boolean;
}

interface Props {
  projectName: string;
  isPublic: boolean;
  setProjectName: (val: string) => void;
  setPublic: (val: boolean) => void;
}

class ProjectSettings extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      projectName: this.props.projectName,
      isPublic: this.props.isPublic
    };
  }

  onClose = () => {};

  onChangeName = (val: string) => {
    this.setState({ projectName: val });
  };

  onChangePublic = () => {
    this.setState({ isPublic: !this.state.isPublic });
  };

  submit = () => {
    this.props.setProjectName(this.state.projectName);
    this.props.setPublic(this.state.isPublic);
    let window = remote.BrowserWindow.getFocusedWindow();
    window.close();
  };

  componentDidMount = () => {};

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
              title={`Project Settings`}
            />
            <div style={{ width: "95vw" }}>
              <div style={{ paddingLeft: 10, paddingRight: 10 }}>
                <div
                  style={{
                    marginTop: 50,
                    paddingBottom: 10,
                    width: "100%",
                    textAlign: "center"
                  }}
                >
                  <h4>Project Settings</h4>
                </div>
                <Inputbox
                  className={"s10"}
                  name="projectName"
                  onChange={(key, val) => this.onChangeName(val)}
                  value={this.state.projectName}
                  autofocus
                  placeholder="Project Name"
                  label="Project Name"
                />
                <Checkbox
                  title="Public Project"
                  value="isPublic"
                  onClick={this.onChangePublic}
                  checked={this.state.isPublic}
                />
                <div
                  style={{
                    paddingTop: 10,
                    justifyContent: "center",
                    display: "flex"
                  }}
                >
                  <Button title={"Save"} onClick={this.submit} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store: Store) => {
  return {
    projectName: store.project.config.projectName,
    isPublic: store.project.config.isPublic
  };
};

export default connect(
  mapStateToProps,
  { setProjectName, setPublic }
)(ProjectSettings);
