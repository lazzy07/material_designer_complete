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

export const GRAYTOCOL_NODE_TYPE = "node/graytocol";

const GRAYTOCOL_INPUT = "graytocol_input";
const GRAYTOCOL_INPUT_TITLE = "Image";

const GRAYTOCOL_OUTPUT = "graytocol_output";
const GRAYTOCOL_OUTPUT_TITLE = "Image";

const GRAYTOCOL = "Gray To Color";

class GrayToColController extends Rete.Control {
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

export class GrayToColNode extends Rete.Component {
  constructor() {
    super(GRAYTOCOL);
  }

  async builder(node: Node): Promise<any> {
    let input = new Rete.Input(
      GRAYTOCOL_INPUT,
      GRAYTOCOL_INPUT_TITLE,
      GRAYSCALE_SOCKET
    );
    let out = new Rete.Output(
      GRAYTOCOL_OUTPUT,
      GRAYTOCOL_OUTPUT_TITLE,
      COLOR_SOCKET
    );
    node.meta = { type: "Converter" };
    let init = getInitSettings(GRAYTOCOL_NODE_TYPE);

    let controller = new GrayToColController(
      "Gray to Color",
      "gray_to_color",
      "Gray To Color",
      node
    );

    node.addControl(controller);
    node.addInput(input);
    node.addOutput(out);

    node.data = {
      ...init,
      ...node.data,
      parameters: {
        dummy: "",
        ...node.data.parameters
      }
    };
    node.data.lastUpdates = {
      node: {},
      inputs: {}
    };
    Controllers.setController((node.data as any).id, controller);
    Cache.setCache(init.id, null);
    return node;
  }

  worker(node: any, inputs: any, outputs: Output): any {
    if (node) {
      const update = shouldNodeUpdate(node, inputs, outputs);

      if (update) {
        let {} = node.data.parameters;
        let cData = updateData(inputs, GRAYTOCOL_INPUT);
        let image = "";
        if (cData) {
          if (cData.data) {
            image = cData.data;
          }
        }

        NodeEngine.colorToGrayscale(image)
          .then(res => {
            let id = Cache.setCache(node.data.id, res);
            node.data.cacheId = id;
            outputs[GRAYTOCOL_OUTPUT] = [node.data.id, id];
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
          outputs[GRAYTOCOL_OUTPUT] = [node.data.id, c ? c.cacheId : undefined];
        }
      }
    }
  }
}
