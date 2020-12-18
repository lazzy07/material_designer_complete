import React, { Component, ReactElement } from "react";
import Controller from "../components/controller/titlebar/Controller";
import { ReflexContainer, ReflexSplitter, ReflexElement } from "react-reflex";
import {
  SLIDERS_COLOR,
  SLIDER_STYLES_VERT,
  SLIDER_STYLES_HOR
} from "../constants";
import { getSizeOfElement } from "../functions";

import GraphicsEngine from "../components/graphics_engine/GraphicsEngine";
import ImageVisualizer from "../components/image_visualizer/ImageVisualizer";
import Library from "../components/library/Library";
import NodeEngine from "../components/node_engine/NodeEngine";
import PropertiesEditor from "../components/properties_editor/PropertiesEditor";
import Outliner from "../components/outliner/Outliner";
import { WELCOME_PAGE, LOGIN_PAGE } from "../routes";
import { withRouter } from "react-router";
import { Icon } from "react-materialize";
import { Store } from "../redux/reducers";
import { connect } from "react-redux";
import { ProjectState } from "../redux/reducers/ProjectReducer";
import { maximizeWindow } from "../services/screen_services/ScreenManipulator";
import HTML5Backend from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import "../css/libraryelements.css";
import { MatGraph } from "../redux/types";
import { Animated } from "react-animated-css";
import NodeClass from "../components/node_engine/NodeList";
import { Engine } from "../rete/src";
import Rete from "../rete/src";
import { ENGINE_VERSION } from "./../constants/versions";
import ReteEngine from "../components/node_engine/Engine";

import "../css/propertieseditor.css";
import { ProjectSettings } from "../services/get_project_settings/ProjectSettings";
import { saveProject } from "../services/save_project/SaveProject";

interface EditorProps {
  filePath?: string;
  history?: any;
  project: ProjectState;
  activeGraph: MatGraph | null;
  graphLen: number;
  libPath: string;
  userId: string;
}

interface EditorState {
  dimensions: { width: number; height: number };
  controllerDimensions: { width: number; height: number };
  display: ReactElement | null;
  selected: Node | Comment | null;
}

class EditorScreen extends Component<EditorProps, EditorState> {
  controller: Controller | null = null;
  nodeHolder = new NodeClass();

  engine: Engine = ReteEngine.getEngine();

  constructor(props) {
    super(props);

    this.state = {
      dimensions: { width: 0, height: 0 },
      controllerDimensions: { width: 0, height: 0 },
      display: null,
      selected: null
    };
  }

  setSelected = (selected: Node | Comment) => {
    if (this.state.selected !== selected) {
      this.setState({
        selected
      });
    }
  };

  resizeScreen = (): void => {
    let controllerSize: { width: number; height: number } = {
      width: 0,
      height: 0
    };

    if (this.controller) {
      let ref = this.controller.getRef();
      if (ref) {
        controllerSize = getSizeOfElement(ref);
      }
    }

    this.setState({
      dimensions: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      controllerDimensions: {
        width: controllerSize.width,
        height: controllerSize.height
      }
    });
  };

  renderAddGraphEditor = () => {
    if (this.props.graphLen === 0) {
      return (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                color: SLIDERS_COLOR
              }}
            >
              <Icon medium>note_add</Icon>
              <div>Please add a Material graph</div>
            </div>
          </Animated>
        </div>
      );
    } else {
      return (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                color: SLIDERS_COLOR
              }}
            >
              <Icon medium>scatter_plot</Icon>
              <div>Please select a material graph</div>
            </div>
          </Animated>
        </div>
      );
    }
  };

  componentWillMount() {
    if (this.props.filePath === ".") {
      this.props.history.push(WELCOME_PAGE);
    } else {
      if (this.props.project.config) {
        // if (!this.props.project.config.noWindowMaximized) {
        //   maximizeWindow();
        // }
      }
      window.addEventListener("resize", this.resizeScreen);
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeScreen);
  }

  componentDidMount() {
    this.resizeScreen();

    (document as any).addEventListener("save", e => {
      saveProject();
    });
  }

  render() {
    return (
      <DndProvider backend={HTML5Backend}>
        <div>
          <Controller
            ref={ref => (this.controller = ref)}
            canClose
            background
            maximize
            minimize
            draggable
            menubar
            icon
            fileName
          />
          <div
            style={{
              paddingTop: this.state.controllerDimensions.height,
              height: this.state.dimensions.height,
              overflow: "hidden"
            }}
          >
            <ReflexContainer orientation="vertical">
              <ReflexElement
                flex={0.25}
                propagateDimensions
                style={{ overflow: "hidden" }}
              >
                <Library />
              </ReflexElement>
              <ReflexSplitter
                style={{
                  height:
                    this.state.dimensions.height -
                    this.state.controllerDimensions.height,
                  ...SLIDER_STYLES_VERT
                }}
              />
              <ReflexElement flex={0.55}>
                <ReflexContainer
                  orientation="horizontal"
                  style={{
                    height:
                      this.state.dimensions.height -
                      this.state.controllerDimensions.height
                  }}
                >
                  <ReflexElement flex={0.4}>
                    <ReflexContainer orientation="vertical">
                      <ReflexElement
                        style={{ overflow: "hidden" }}
                        flex={0.5}
                        propagateDimensions
                      >
                        {/* Graphics engine */}
                        <GraphicsEngine />
                      </ReflexElement>
                      <ReflexSplitter
                        style={{
                          backgroundColor: SLIDERS_COLOR,
                          ...SLIDER_STYLES_VERT
                        }}
                      />
                      <ReflexElement
                        style={{ overflow: "hidden" }}
                        flex={0.5}
                        propagateDimensions
                      >
                        <ImageVisualizer />
                      </ReflexElement>
                    </ReflexContainer>
                  </ReflexElement>
                  <ReflexSplitter
                    style={{
                      ...SLIDER_STYLES_HOR
                    }}
                  />
                  <ReflexElement
                    flex={0.6}
                    propagateDimensions
                    style={{ overflow: "hidden" }}
                  >
                    {this.props.activeGraph ? (
                      <NodeEngine
                        nodeHolder={this.nodeHolder}
                        setSelected={this.setSelected}
                        selected={this.state.selected}
                        engine={this.engine}
                      />
                    ) : (
                      this.renderAddGraphEditor()
                    )}
                  </ReflexElement>
                </ReflexContainer>
              </ReflexElement>
              <ReflexSplitter
                style={{
                  height:
                    this.state.dimensions.height -
                    this.state.controllerDimensions.height,
                  ...SLIDER_STYLES_VERT
                }}
              />
              <ReflexElement flex={0.2}>
                <ReflexContainer
                  orientation="horizontal"
                  style={{
                    height:
                      this.state.dimensions.height -
                      this.state.controllerDimensions.height
                  }}
                >
                  <ReflexElement propagateDimensions flex={0.4}>
                    <Outliner />
                  </ReflexElement>
                  <ReflexSplitter
                    style={{
                      ...SLIDER_STYLES_HOR
                    }}
                  />
                  <ReflexElement
                    propagateDimensions
                    flex={0.6}
                    style={{ overflow: "hidden" }}
                  >
                    {this.props.activeGraph ? (
                      <PropertiesEditor
                        engine={this.engine}
                        selected={this.state.selected}
                      />
                    ) : (
                      undefined
                    )}
                  </ReflexElement>
                </ReflexContainer>
              </ReflexElement>
            </ReflexContainer>
          </div>
        </div>
      </DndProvider>
    );
  }
}

const getActiveGraph = (graphs: MatGraph[], activeGraph: string) => {
  let ret: MatGraph | null = null;
  graphs.forEach(graph => {
    if (graph.uuid === activeGraph) {
      ret = graph;
    }
  });
  return ret;
};

const mapStateToProps = (state: Store) => {
  return {
    filePath: state.file.filePath,
    project: state.project,
    activeGraph: getActiveGraph(
      state.project.graphs,
      state.project.activeGraph
    ),
    graphLen: state.project.graphs.length,
    sessionId: state.user.sessionId
  };
};

export default withRouter(connect(mapStateToProps)(EditorScreen) as any);
