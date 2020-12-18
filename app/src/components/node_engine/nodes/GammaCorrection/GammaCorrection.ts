import Rete from "rete";
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
import { COLOR_SOCKET } from "./../../types";

export const GAMMACORRECTION_NODE_TYPE = "node/gammacorrection";

const GAMMACORRECTION_INPUT = "gammacorr_input";
const GAMMACORRECTION_INPUT_TITLE = "Image";

const GAMMACORRECTION_OUTPUT = "gammacorr_output";
const GAMMACORRECTION_OUTPUT_TITLE = "Image";

const GAMMACORRECTION = "Gamma Correction";

class GammaCorrectionController extends Rete.Control {
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

export class GammaCorrectionNode extends Rete.Component {
  constructor() {
    super(GAMMACORRECTION);
  }

  async builder(node: Node): Promise<any> {
    let input = new Rete.Input(
      GAMMACORRECTION_INPUT,
      GAMMACORRECTION_INPUT_TITLE,
      COLOR_SOCKET
    );
    let out = new Rete.Output(
      GAMMACORRECTION_OUTPUT,
      GAMMACORRECTION_OUTPUT_TITLE,
      COLOR_SOCKET
    );
    node.meta = { type: "Operator" };
    let init = getInitSettings(GAMMACORRECTION_NODE_TYPE);

    let controller = new GammaCorrectionController(
      "Gamma Correction",
      "gamma_correction",
      "Gamma Correction",
      node
    );

    node.addControl(controller);
    node.addInput(input);
    node.addOutput(out);

    node.data = {
      ...init,
      ...node.data,
      parameters: {
        gamma: 1,
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
        let { gamma } = node.data.parameters;
        let cData = updateData(inputs, GAMMACORRECTION_INPUT);
        let image = "";
        if (cData) {
          if (cData.data) {
            image = cData.data;
          }
        }

        NodeEngine.gammaCorrection(image, gamma)
          .then(res => {
            let id = Cache.setCache(node.data.id, res);
            node.data.cacheId = id;
            outputs[GAMMACORRECTION_OUTPUT] = [node.data.id, id];
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
          outputs[GAMMACORRECTION_OUTPUT] = [
            node.data.id,
            c ? c.cacheId : undefined
          ];
        }
      }
    }
  }
}
