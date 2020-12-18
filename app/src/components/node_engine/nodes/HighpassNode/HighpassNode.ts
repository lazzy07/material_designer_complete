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

export const HIGHPASSGRAY_NODE_TYPE = "node/highpassgray";

const HIGHPASS_INPUT = "highpass_input";
const HIGHPASS_INPUT_TITLE = "Image";

const HIGHPASS_OUTPUT = "highpass_output";
const HIGHPASS_OUTPUT_TITLE = "Image";

const HIGHPASS = "Highpass Grayscale";

class HighpassController extends Rete.Control {
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

export class HighpassNode extends Rete.Component {
  constructor() {
    super(HIGHPASS);
  }

  async builder(node: Node): Promise<any> {
    let input = new Rete.Input(
      HIGHPASS_INPUT,
      HIGHPASS_INPUT_TITLE,
      GRAYSCALE_SOCKET
    );
    let out = new Rete.Output(
      HIGHPASS_OUTPUT,
      HIGHPASS_OUTPUT_TITLE,
      GRAYSCALE_SOCKET
    );
    node.meta = { type: "Operator" };
    let init = getInitSettings(HIGHPASSGRAY_NODE_TYPE);

    let controller = new HighpassController(
      "Highpass",
      "Highpass Filter",
      "Distance Transform",
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
        dx: 2,
        dy: 0,
        ksize: 1,
        delta: 0,
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
        let { type, dx, dy, ksize, delta } = node.data.parameters;
        let cData = updateData(inputs, HIGHPASS_INPUT);
        let image = "";
        if (cData) {
          if (cData.data) {
            image = cData.data;
          }
        }

        NodeEngine.highpass(image, type, dx, dy, ksize, delta)
          .then(res => {
            let id = Cache.setCache(node.data.id, res);
            node.data.cacheId = id;
            outputs[HIGHPASS_OUTPUT] = [node.data.id, id];
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
          outputs[HIGHPASS_OUTPUT] = [node.data.id, c ? c.cacheId : undefined];
        }
      }
    }
  }
}
