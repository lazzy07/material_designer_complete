import React, { Component } from "react";
import Rete from "../../rete/src";
import ConnectionPlugin from "rete-connection-plugin";
import ReactRenderPlugin from "rete-react-render-plugin";
import AreaPlugin from "rete-area-plugin";
import CommentPlugin from "../../rete-comment-plugin/src";
import { MaterialNode } from "./MaterialNode";
import Contextmenu, { ContextmenuElement } from "./Contextmenu";
import { contextMenu } from "react-contexify";
import "../../css/main.css";
import { Engine } from "../../rete/src/engine/index";
import { NodeEditor } from "./../../rete/src/editor";
import { removeNode, cloneNode } from "./engine_functions/node";
import NodeClass, { NodeElement } from "./NodeList";
import Comment from "./../../rete-comment-plugin/src/comment";
import { connect } from "react-redux";
import { Store } from "../../redux/reducers";
import { MatGraph, MatTex } from "../../redux/types";
import { editActiveGraph } from "../../redux/actions/ProjectActions";
import { DropTarget } from "react-dnd";

import "../../css/node.css";
import Cache from "./cache";
import Editor from "./Editor";
import Material from "../graphics_engine/Material";
import { setImageViewerNode } from "../../redux/actions/SystemActions";
import { DRAG_ENV_MAP, DRAG_TEXTURES } from "../../constants/dragtypes";
import { ProjectSettings } from "../../services/get_project_settings/ProjectSettings";
import { TextureNode } from "./nodes/TextureNode/TextureNode";
import { toggleCapture } from "../../redux/actions/MaterialActions";

interface NodeEngineState {
  editorElements: ContextmenuElement[];
}
interface NodeEngineProps {
  setSelected: any;
  dimensions?: any;
  activeGraph: MatGraph | null;
  nodeHolder: NodeClass;
  selected: any;
  engine: Engine;
  editActiveGraph: (id: string, data: any) => void;
  setImageViewerNode: (id: string) => void;
}

class NodeEngine extends Component<NodeEngineProps, NodeEngineState> {
  editorRef: HTMLElement | null = null;
  editor: NodeEditor | null = null;
  activeGraphId = "";
  mousePos = [0, 0];

  constructor(props) {
    super(props);

    this.state = {
      editorElements: []
    };
  }

  renderNodeContextMenu = (): ContextmenuElement[] => {
    return [
      {
        title: "Delete",
        onClick: (event, props) => {
          if (props.elem) {
            if (this.editor) removeNode(this.editor, props.elem);
          }
        }
      },
      {
        title: "Clone",
        onClick: (event, props) => {
          if (props.elem) {
            if (this.editor) cloneNode(this.editor, props.elem);
          }
        }
      }
    ];
  };

  addEditorMenuElement = (elem: NodeElement) => {
    let oldElems = [...this.state.editorElements];
    let newElem = this.renderMenuElement(elem);

    this.setState({
      editorElements: [...oldElems, newElem]
    });
  };

  renderMenuElement = (elem: NodeElement) => {
    return {
      title: elem.title,
      onClick: () =>
        this.onEditorMenuElementClick("add/node", { uuid: elem.uuid })
    };
  };

  onEditorMenuElementClick = async (type: string, data: any) => {
    switch (type) {
      case "add/node":
        let element = this.props.nodeHolder.getNodeClassById(data.uuid);

        if (element) {
          if (this.editor) {
            let node = await element.createNode();
            node.position = [this.mousePos[0], this.mousePos[1]];
            this.editor.addNode(node);
          }
        }
        break;
    }
  };

  addDefaultNodesToContextMenu = () => {
    let elems: ContextmenuElement[] = [];

    this.props.nodeHolder.nodeList.forEach(n => {
      if (n.contextmenu) {
        elems.push(this.renderMenuElement(n));
      }
    });

    this.setState({
      editorElements: elems
    });
  };

  //Loading active graph data into editor
  loadActiveGraph = (activeGraph: MatGraph) => {
    if (activeGraph && this.editor) {
      if (activeGraph.data) {
        if (activeGraph.data.id) {
          this.editor.fromJSON(activeGraph.data);
        } else {
          Material.resetToDefault();
          this.editor.clear();
        }
      }
    }
  };

  //Adding editor data into the redux store
  loadToStore = () => {
    if (this.editor && this.props.activeGraph) {
      this.props.editActiveGraph(
        this.props.activeGraph.uuid,
        this.editor.toJSON()
      );
    }
  };

  processEngine = async () => {
    await this.props.engine.abort();
    if (this.editor) this.props.engine.process(this.editor.toJSON());
  };

  //Listen to editor changes and process
  engineListners = () => {
    if (this.editor && this.props.engine) {
      this.editor.on("connectioncreated", async () => {
        await this.props.engine.abort();
        if (this.editor) this.props.engine.process(this.editor.toJSON());
      });

      this.editor.on("connectionremoved", async () => {
        await this.props.engine.abort();
        if (this.editor) this.props.engine.process(this.editor.toJSON());
      });

      this.editor.on("nodecreated", async () => {
        await this.props.engine.abort();
        if (this.editor) await this.props.engine.process(this.editor.toJSON());
      });

      this.editor.on("noderemoved", async node => {
        await this.props.engine.abort();
        Cache.removeCache((node.data as any).id);
        if (this.editor) await this.props.engine.process(this.editor.toJSON());
      });

      this.editor.on("process", async () => {
        await this.props.engine.abort();
        if (this.editor) await this.props.engine.process(this.editor.toJSON());
      });
    }
  };

  drawImageScaled = (img: any, ctx: any) => {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.min(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  };

  loadTextureFile = (texture: MatTex) => {
    return new Promise((resolve, reject) => {
      let canvas = document.createElement("canvas");
      let size = ProjectSettings.getGlobalResolution();
      canvas.width = size;
      canvas.height = size;
      var ctx = canvas.getContext("2d");

      let image = new Image();
      image.onload = () => {
        if (ctx) {
          ctx.fillStyle = "black";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          this.drawImageScaled(image, ctx);
          let imgStr = canvas.toDataURL("image/jpeg", 1.0);
          let str = imgStr.split(",")[1];
          resolve(str);
        } else {
          reject("Error");
        }
      };
      image.src = "data:" + texture.mime + ";" + "base64," + texture.data;
    });
  };

  createTextureNode = async (texture: MatTex) => {
    let img = await this.loadTextureFile(texture);

    if (img) {
      if (this.editor) {
        let node = await new TextureNode().createNode();
        let id = node.data.id;
        let cid = Cache.setCache(id, img);
        node.position = [this.mousePos[0], this.mousePos[1]];
        node.data.parameters.img = (" " + img).slice(1);
        node.data.cacheId = cid;

        this.editor.addNode(node);
      }
    }
  };

  componentWillReceiveProps(nextProps: NodeEngineProps) {
    if (nextProps.activeGraph !== this.props.activeGraph) {
      this.loadToStore();
      if (nextProps.activeGraph) this.loadActiveGraph(nextProps.activeGraph);
    }
  }

  //Configuring node controller and editor
  async componentDidMount() {
    if (this.editorRef) {
      Editor.setNodeEditor(this.editorRef);

      this.editor = Editor.getEditor();
      //Add plugins to editor
      this.editor.use(ConnectionPlugin);
      this.editor.use(ReactRenderPlugin, { component: MaterialNode });
      this.editor.use(AreaPlugin);
      this.editor.use(CommentPlugin, { disableBuiltInEdit: true });

      this.addDefaultNodesToContextMenu();

      this.editor.register(new TextureNode() as any);
      this.props.engine.register(new TextureNode() as any);
      this.props.nodeHolder.nodes.map(c => {
        if (this.editor) {
          this.editor.register(c.element as any);
          this.props.engine.register(c.element as any);
        }
      });

      setTimeout(
        () =>
          this.props.activeGraph
            ? this.loadActiveGraph(this.props.activeGraph)
            : undefined,
        2000
      );

      this.editor.on("dblclick", async ({ e, node }) => {
        Editor.getSelected();
        if (node) {
          if (node.name !== "Viewer Node") {
            this.props.setImageViewerNode((node.data as any).id);
            Editor.forceUpdateSelected((node.data as any).id);
          }
        }
      });

      this.editor.on("nodeselect", node => {
        if (this.props.selected === node) {
          this.props.setSelected(node);
        } else {
          this.props.setSelected(null);
          this.props.setSelected(node);
        }
      });

      this.editor.on(["connectioncreated", "connectionremoved"], connection => {
        if (connection.input.node === this.props.selected) {
          this.props.setSelected(null);
          this.props.setSelected(connection.input.node);
        } else if (connection.output.node === this.props.selected) {
          this.props.setSelected(null);
          this.props.setSelected(connection.output.node);
        }
      });

      this.editor.on("contextmenu", ({ e, node }) => {
        if (!node) {
          contextMenu.show({
            id: "editor_menu",
            event: e,
            props: {
              elem: null
            }
          });
        } else {
          contextMenu.show({
            id: "node_menu",
            event: e,
            props: {
              elem: node
            }
          });
        }
      });

      this.editor.on("mousemove", mouse => {
        this.mousePos = [mouse.x, mouse.y];
      });

      (this.editor as any).on("editcomment", (comment: Comment) => {
        // TODO Add contextmenu to comments
      });

      (this.editor as any).on("commentselected", (comment: Comment) => {
        this.props.setSelected(null);
        this.props.setSelected(comment);
      });

      (this.editor as any).on("commentremoved", comment => {
        if (this.props.selected === comment) {
          this.props.setSelected(null);
        }
      });

      this.editor.on("noderemoved", node => {
        if (node === this.props.selected) this.props.setSelected(null);
      });

      this.engineListners();
    } else {
      console.log("Editor is not being initalized");
    }
  }

  render() {
    const { connectDropTarget, hovered, item } = this.props as any;

    return connectDropTarget(
      <div id="editor_menu">
        <div style={{ overflow: "hidden" }}>
          <div
            ref={ref => (this.editorRef = ref)}
            className="node-editor"
            style={{
              ...this.props.dimensions,
              overflow: "hidden"
            }}
          />

          <Contextmenu
            serchbox
            nodeElements={this.renderNodeContextMenu()}
            editorElements={this.state.editorElements}
          />
        </div>
      </div>
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
    activeGraph: getActiveGraph(state.project.graphs, state.project.activeGraph)
  };
};
const mapDispatchToProps = {
  editActiveGraph,
  setImageViewerNode
};

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
    item: monitor.getItem()
  };
};

const target = {
  drop: (props, monitor, component: NodeEngine) => {
    // let name = monitor.getItem().element;
    // component.loadEnvMap(name ? name : "");
    component.createTextureNode(monitor.getItem());
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DropTarget(DRAG_TEXTURES, target, collect)(NodeEngine));
