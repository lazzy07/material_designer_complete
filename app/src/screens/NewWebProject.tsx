import React, { Component } from "react";
import Controller from "../components/controller/titlebar/Controller";
import { SECONDARY_COLOR } from "../constants";
import Inputbox from "../components/elements/form/Inputbox";
import Button from "../components/elements/form/Button";
import { createNewMaterialGraph } from "../redux/new_material_graph/CreateNewMaterialGraph";
import { connect } from "react-redux";
import { Store } from "../redux/reducers";
import { initialProjectConfig } from "../services/initial_project_settings/InitialProjectConfig";
import { addProjectData } from "../redux/actions/ProjectActions";
import { openCloudFile } from "./../redux/actions/FileActions";
import { graphql, MutateProps } from "react-apollo";
import { addWebProjectMutation } from "../gql/AddWebProjectMutation";

let remote = window.require("electron").remote;

interface State {
  projectName: string;
  error: string;
  disabled: boolean;
}

interface Props {
  userName: string;
  addProjectData: (data: string) => void;
  openCloudFile: (fileName: string) => void;
}

class NewWebProject extends Component<Props & MutateProps, State> {
  constructor(props) {
    super(props);

    this.state = {
      projectName: "",
      error: "",
      disabled: false
    };
  }

  onClose = () => {};

  onSubmit = () => {
    this.setState({ error: "", disabled: false });
    if (this.state.projectName.length > 0) {
      let graphData = createNewMaterialGraph(this.props.userName);

      let initialFileData = {
        user: this.props.userName,
        config: initialProjectConfig,
        activeGraph: graphData.uuid,
        graphs: [{ ...graphData }],
        textureList: []
      };

      initialFileData.config.projectPath = "webfile";
      initialFileData.config.projectName = this.state.projectName;

      this.props
        .mutate({ variables: { projectData: JSON.stringify(initialFileData) } })
        .then(res => {
          this.props.addProjectData({
            ...initialFileData,
            id: res.data.addNewProject
          } as any);
          this.props.openCloudFile(this.state.projectName);
          let window = remote.BrowserWindow.getFocusedWindow();
          window.close();
        })
        .catch(err => {
          console.log(err);
          this.setState({ error: err.message });
        });
    }
  };

  onChange = (val: string) => {
    this.setState({
      projectName: val
    });
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
              title={`Create Web Project`}
            />
          </div>
          <div
            style={{
              marginTop: 30,
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              width: "100%"
            }}
          >
            {/* Content goes here */}
            <h4 style={{ paddingBottom: 20 }}>Create a new cloud project</h4>
            <i className="material-icons large" style={{ paddingBottom: 10 }}>
              add_circle
            </i>
            <Inputbox
              name="projectName"
              value={this.state.projectName}
              label="Project Name"
              placeholder="Enter project name"
              autofocus={true}
              onChange={(key, val) => {
                this.onChange(val);
              }}
              width={300}
            />
            <Button title="Create" onClick={this.onSubmit} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store: Store) => {
  return {
    userName: store.user.userName
  };
};

export default connect(
  mapStateToProps,
  { addProjectData, openCloudFile }
)(graphql(addWebProjectMutation)(NewWebProject));
