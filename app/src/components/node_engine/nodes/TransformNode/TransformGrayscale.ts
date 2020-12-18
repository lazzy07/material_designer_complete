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

export const TRANSFORM_NODE_TYPE = "node/transformgray";

const INVERTGRAY_INPUT = "transgray_input";
const INVERTGRAY_INPUT_TITLE = "Image";

const INVERTGRAY_OUTPUT = "transgray_output";
const INVERTGRAY_OUTPUT_TITLE = "Image";

const INVERTGRAY = "Transform Gray";

class MorphologyGrayController extends Rete.Control {
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

export class MorphologyGrayNode extends Rete.Component {
  constructor() {
    super(INVERTGRAY);
  }

  async builder(node: Node): Promise<any> {
    let input = new Rete.Input(
      INVERTGRAY_INPUT,
      INVERTGRAY_INPUT_TITLE,
      GRAYSCALE_SOCKET
    );
    let out = new Rete.Output(
      INVERTGRAY_OUTPUT,
      INVERTGRAY_OUTPUT_TITLE,
      GRAYSCALE_SOCKET
    );
    node.meta = { type: "Grayscale" };
    let init = getInitSettings(TRANSFORM_NODE_TYPE);

    let controller = new MorphologyGrayController(
      "Morphology gray",
      "morphology_gray",
      "Morphology gray",
      node
    );

    node.addControl(controller);
    node.addInput(input);
    node.addOutput(out);

    node.data = {
      ...init,
      ...node.data,
      parameters: {
        rotation: 0,
        sizeX: 1,
        sizeY: 1,
        posX: 0.5,
        posY: 0.5,
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
        let { operation, kernel, morphSize, iterations } = node.data.parameters;
        let cData = updateData(inputs, INVERTGRAY_INPUT);
        let image = "";
        if (cData) {
          if (cData.data) {
            image = cData.data;
          }
        }

        NodeEngine.morphologyOp(image, operation, kernel, morphSize, iterations)
          .then(res => {
            let id = Cache.setCache(node.data.id, res);
            node.data.cacheId = id;
            outputs[INVERTGRAY_OUTPUT] = [node.data.id, id];
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
          outputs[INVERTGRAY_OUTPUT] = [
            node.data.id,
            c ? c.cacheId : undefined
          ];
        }
      }
    }
  }
}
