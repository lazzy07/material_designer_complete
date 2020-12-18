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

export const COLORTOGRAY_NODE_TYPE = "node/coltogray";

const COLORTOGRAY_INPUT = "coltogray_input";
const COLORTOGRAY_INPUT_TITLE = "Image";

const COLORTOGRAY_OUTPUT = "coltogray_output";
const COLORTOGRAY_OUTPUT_TITLE = "Image";

const COLORTOGRAY = "Color to Gray";

class ColorToGrayController extends Rete.Control {
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

export class ColorToGrayNode extends Rete.Component {
  constructor() {
    super(COLORTOGRAY);
  }

  async builder(node: Node): Promise<any> {
    let input = new Rete.Input(
      COLORTOGRAY_INPUT,
      COLORTOGRAY_INPUT_TITLE,
      COLOR_SOCKET
    );
    let out = new Rete.Output(
      COLORTOGRAY_OUTPUT,
      COLORTOGRAY_OUTPUT_TITLE,
      GRAYSCALE_SOCKET
    );
    node.meta = { type: "Converter" };
    let init = getInitSettings(COLORTOGRAY_NODE_TYPE);

    let controller = new ColorToGrayController(
      "Color To Gray",
      "color_to_gray",
      "Color To Gray",
      node
    );

    node.addControl(controller);
    node.addInput(input);
    node.addOutput(out);

    node.data = {
      ...init,
      ...node.data,
      parameters: {
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
        let {} = node.data.parameters;
        let cData = updateData(inputs, COLORTOGRAY_INPUT);
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
            outputs[COLORTOGRAY_OUTPUT] = [node.data.id, id];
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
          outputs[COLORTOGRAY_OUTPUT] = [
            node.data.id,
            c ? c.cacheId : undefined
          ];
        }
      }
    }
  }
}
