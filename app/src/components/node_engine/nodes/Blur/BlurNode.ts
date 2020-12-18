import Rete from "rete";
import { ProjectSettings } from "../../../../services/get_project_settings/ProjectSettings";
import { GRAYSCALE_SOCKET } from "../../types";
import { Node, Output } from "../../../../rete/src";
import {
  getInitSettings,
  shouldNodeUpdate,
  updateController,
  updateData
} from "../settings";
import Cache from "../../cache";
import Controllers from "../../Controllers";
import Editor from "../../Editor";
import ReteEngine from "../../Engine";
import NodeEngine from "../../../../material_engine";
import { imageViewer } from "../../controllers/ImageViewer";

export const BLUR_NODE_TYPE = "node/blurgray";

const BLUR_INPUT = "blurgray_input";
const BLUR_INPUT_TITLE = "Image";

const BLUR_OUTPUT = "blurgray_output";
const BLUR_OUTPUT_TITLE = "Image";

const BLUR = "Blur Grayscale";

class BlurController extends Rete.Control {
  render: any;
  component: any;
  props: object;

  constructor(emitter: string, key: string, name: string, node: any) {
    super(key);
    this.key = key;
    this.render = "react";
    this.component = imageViewer; //Use functional components
    this.props = { emitter, name, node };
  }
}

export class BlurNode extends Rete.Component {
  constructor() {
    super(BLUR);
  }

  async builder(node: Node): Promise<any> {
    let input = new Rete.Input(BLUR_INPUT, BLUR_INPUT_TITLE, GRAYSCALE_SOCKET);
    let out = new Rete.Output(BLUR_OUTPUT, BLUR_OUTPUT_TITLE, GRAYSCALE_SOCKET);
    node.meta = { type: "Operator" };
    let init = getInitSettings(BLUR_NODE_TYPE);

    let controller = new BlurController(
      "Blur Grayscale",
      "blur_grayscale",
      "Blur Grayscale",
      node
    );

    node.addControl(controller);
    node.addInput(input);
    node.addOutput(out);

    node.data = {
      ...init,
      ...node.data,
      parameters: {
        type: 0,
        ksizeX: 3,
        ksizeY: 3,
        sigmaX: 0,
        sigmaY: 0,
        ...node.data.parameters
      }
    };
    Controllers.setController((node.data as any).id, controller);
    Cache.setCache(init.id, null);
    return node;
  }

  worker(node: any, inputs: any, outputs: Output): any {
    if (node) {
      const update = shouldNodeUpdate(node, inputs, outputs);
      if (update) {
        let { type, ksizeX, ksizeY, sigmaX, sigmaY } = node.data.parameters;
        let cData = updateData(inputs, BLUR_INPUT);
        let image = "";
        if (cData) {
          if (cData.data) {
            image = cData.data;
          }
        }

        NodeEngine.blur(image, type, ksizeX, ksizeY, sigmaX, sigmaY)
          .then(res => {
            let id = Cache.setCache(node.data.id, res);
            node.data.cacheId = id;
            outputs[BLUR_OUTPUT] = [node.data.id, id];
            updateController(Controllers.getController(node.data.id));
            Editor.updateSelected(node.data.id);
            ReteEngine.updateEngine();
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        let c = Cache.getCache(node.data.id);
        if (c) {
          outputs[BLUR_OUTPUT] = [node.data.id, c ? c.cacheId : undefined];
        }
      }
    }
  }
}
