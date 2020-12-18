import PerlinNoiseNode from "./nodes/PerlinNoise/PerlinNoiseNode";
import uuid from "uuid/v4";
import { ViewerNode } from "./nodes/ViewerNode/ViewerNode";
import BlendNodeGrayscale from "./nodes/BlendNodeGrayscale/BlendNodeGrayscale";
import { SplitColorNode } from "./nodes/SplitColor/SplitColorNode";
import { MergeColorNode } from "./nodes/MergeToColor/MergeToColor";
import { ThresholdNode } from "./nodes/Threshold/ThresholdNode";
import { BlurNode } from "./nodes/Blur/BlurNode";
import { DistanceTransformNode } from "./nodes/DistanceTransform/DistanceTransformNode";
import { HighpassNode } from "./nodes/HighpassNode/HighpassNode";
import { ColorToGrayNode } from "./nodes/ColorToGrayscale/ColorToGrayscaleNode";
import { GrayToColNode } from "./nodes/GrayscaleToColor/GrayscaleToColorNode";
import { InvertGrayscaleNode } from "./nodes/InvertNode/InvertNodeGrayscale";
import { GammaCorrectionNode } from "./nodes/GammaCorrection/GammaCorrection";
import { MorphologyGrayNode } from "./nodes/MorphologyNode/MorphologyNode";
import { ColorizeNode } from "./nodes/Colorize/Colorize";

export interface NodeElementToInit {
  title: string;
  uuid: string;
  class: any;
  save: "system/web" | "project";
  type: "system" | "custom";
  icon?: string;
  contextmenu: boolean;
  library: boolean;
  viewer: boolean;
}

export interface NodeElement {
  title: string;
  uuid: string;
  save: "system/web" | "project";
  type: "system" | "custom";
  icon?: string;
  contextmenu: boolean;
  library: boolean;
  viewer: boolean;
}

export interface EditorNode {
  uuid: string;
  element: any;
}

export const nodeList: NodeElementToInit[] = [
  {
    title: "Perlin Noise",
    uuid: "",
    class: PerlinNoiseNode,
    save: "system/web",
    type: "system",
    contextmenu: true,
    library: true,
    viewer: true
  },
  {
    title: "Viewer",
    uuid: "",
    class: ViewerNode,
    save: "system/web",
    type: "system",
    contextmenu: true,
    library: true,
    viewer: false
  },
  {
    title: "Blend Grayscale",
    uuid: "",
    class: BlendNodeGrayscale,
    save: "system/web",
    type: "system",
    contextmenu: true,
    library: true,
    viewer: true
  },
  {
    title: "Split Color",
    uuid: "",
    class: SplitColorNode,
    save: "system/web",
    type: "system",
    contextmenu: true,
    library: true,
    viewer: true
  },
  {
    title: "Merge Color",
    uuid: "",
    class: MergeColorNode,
    save: "system/web",
    type: "system",
    contextmenu: true,
    library: true,
    viewer: true
  },
  {
    title: "Threshold",
    uuid: "",
    class: ThresholdNode,
    save: "system/web",
    type: "system",
    contextmenu: true,
    library: true,
    viewer: true
  },
  {
    title: "Blur",
    uuid: "",
    class: BlurNode,
    save: "system/web",
    type: "system",
    contextmenu: true,
    library: true,
    viewer: true
  },
  {
    title: "Distance Transform",
    uuid: "",
    class: DistanceTransformNode,
    save: "system/web",
    type: "system",
    contextmenu: true,
    library: true,
    viewer: true
  },
  {
    title: "Highpass Grayscale",
    uuid: "",
    class: HighpassNode,
    save: "system/web",
    type: "system",
    contextmenu: true,
    library: true,
    viewer: true
  },
  {
    title: "Color to Grayscale",
    uuid: "",
    class: ColorToGrayNode,
    save: "system/web",
    type: "system",
    contextmenu: true,
    library: true,
    viewer: true
  },
  {
    title: "Grayscale to Color",
    uuid: "",
    class: GrayToColNode,
    save: "system/web",
    type: "system",
    contextmenu: true,
    library: true,
    viewer: true
  },
  {
    title: "Invert grayscale",
    uuid: "",
    class: InvertGrayscaleNode,
    save: "system/web",
    type: "system",
    contextmenu: true,
    library: true,
    viewer: true
  },
  {
    title: "Gamma Correction Col",
    uuid: "",
    class: GammaCorrectionNode,
    save: "system/web",
    type: "system",
    contextmenu: true,
    library: true,
    viewer: true
  },
  {
    title: "Morphology Gray",
    uuid: "",
    class: MorphologyGrayNode,
    save: "system/web",
    type: "system",
    contextmenu: true,
    library: true,
    viewer: true
  },
  {
    title: "Colorize",
    uuid: "",
    class: ColorizeNode,
    save: "system/web",
    type: "system",
    contextmenu: true,
    library: true,
    viewer: true
  }
];

export default class NodeClass {
  private _nodeList: NodeElement[] = [];
  private _nodes: EditorNode[] = [];

  constructor(nodes = nodeList) {
    this.initNodelist(nodes);
  }

  get nodeList() {
    return this._nodeList;
  }

  set nodeList(nodeList: NodeElement[]) {
    this._nodeList = nodeList;
  }

  get nodes() {
    return this._nodes;
  }

  set nodes(nodes: EditorNode[]) {
    this._nodes = nodes;
  }

  initNodelist = (nodeList: NodeElementToInit[]) => {
    let nList: NodeElement[] = [];
    let nd: EditorNode[] = [];

    nodeList.forEach(node => {
      let uuidStr = node.uuid !== "" ? node.uuid : uuid();

      nList.push({
        title: node.title,
        uuid: uuidStr,
        save: node.save,
        type: node.type,
        icon: node.icon,
        contextmenu: node.contextmenu,
        library: node.library,
        viewer: node.viewer
      });

      nd.push({
        uuid: uuidStr,
        element: new node.class()
      });
    });
    this.nodeList = nList;
    this.nodes = nd;
  };

  addNewNode = (node: NodeElementToInit) => {
    let uuidStr = node.uuid !== "" ? node.uuid : uuid();

    this.nodeList.push({
      title: node.title,
      uuid: uuidStr,
      save: node.save,
      type: node.type,
      icon: node.icon,
      contextmenu: node.contextmenu,
      library: node.library,
      viewer: node.viewer
    });

    this.nodes.push({
      uuid: uuidStr,
      element: new node.class()
    });
  };

  getNodeClassById = (id: string) => {
    for (let i = 0; i < this.nodes.length; i++) {
      if (id === this.nodes[i].uuid) {
        return this.nodes[i].element;
      }
    }
    return null;
  };
}
