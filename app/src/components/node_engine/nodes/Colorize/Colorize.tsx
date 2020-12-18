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

export const COLORIZE_NODE_TYPE = "node/colorize";

const INVERTGRAY_INPUT = "colorize_input";
const INVERTGRAY_INPUT_TITLE = "Image";

const INVERTGRAY_OUTPUT = "colorize_output";
const INVERTGRAY_OUTPUT_TITLE = "Image";

const INVERTGRAY = "Colorize";

class ColorizeController extends Rete.Control {
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

export class ColorizeNode extends Rete.Component {
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
      COLOR_SOCKET
    );
    node.meta = { type: "Converter" };
    let init = getInitSettings(COLORIZE_NODE_TYPE);

    let controller = new ColorizeController(
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
        positions: [
          { pos: 0.0, color: "#000000" },
          { pos: 1.0, color: "#ffffff" }
        ],
        lut:
          "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAQADAREAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABwgK/8QAHhAAAgMAAQUAAAAAAAAAAAAAAAVCgsMJBwg5ebj/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AwPrIVzAQFkK5gICyFcwEBZCuYCAshXMBAWQrmAgLIVzAQFkK5gICyFcwEBZCuYCAshXMBAWQrmAgLIVzAQFkK5gICyFcwEBZCuYCAshXMBAWQrmAgLIVzAQFkK5gICyFcwEBZCuYCAshXMBAWQrmAgLIVzAQFkK5gICyFcwEBZCuYCAshXMBAWQrmAgLIVzAj/lQ8WHJV6/+8f506hgf/9k=",
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
        let { lut } = node.data.parameters;
        let cData = updateData(inputs, INVERTGRAY_INPUT);
        let image = "";
        if (cData) {
          if (cData.data) {
            image = cData.data;
          }
        }

        NodeEngine.colorize(image, lut)
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
