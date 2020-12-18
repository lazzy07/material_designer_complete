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

export const DISTTRANS_NODE_TYPE = "node/distancetrans";

const DISTTRANS_INPUT = "distancetrans_input";
const DISTTRANS_INPUT_TITLE = "Image";

const DISTTRANS_OUTPUT = "distancetrans_output";
const DISTTRANS_OUTPUT_TITLE = "Image";

const DISTTRANS = "Distance Transform";

class DistanceTransformController extends Rete.Control {
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

export class DistanceTransformNode extends Rete.Component {
  constructor() {
    super(DISTTRANS);
  }

  async builder(node: Node): Promise<any> {
    let input = new Rete.Input(
      DISTTRANS_INPUT,
      DISTTRANS_INPUT_TITLE,
      GRAYSCALE_SOCKET
    );
    let out = new Rete.Output(
      DISTTRANS_OUTPUT,
      DISTTRANS_OUTPUT_TITLE,
      GRAYSCALE_SOCKET
    );
    node.meta = { type: "Operator" };
    let init = getInitSettings(DISTTRANS_NODE_TYPE);

    let controller = new DistanceTransformController(
      "Distance Transform",
      "distance_transform",
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
        retType: 0,
        distanceType: 3,
        maskSize: 3,
        labelType: 0,
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
        let {
          retType,
          distanceType,
          maskSize,
          labelType
        } = node.data.parameters;
        let cData = updateData(inputs, DISTTRANS_INPUT);
        let image = "";
        if (cData) {
          if (cData.data) {
            image = cData.data;
          }
        }

        NodeEngine.distanceTransform(
          image,
          retType,
          distanceType,
          maskSize,
          labelType
        )
          .then(res => {
            let id = Cache.setCache(node.data.id, res);
            node.data.cacheId = id;
            outputs[DISTTRANS_OUTPUT] = [node.data.id, id];
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
          outputs[DISTTRANS_OUTPUT] = [node.data.id, c ? c.cacheId : undefined];
        }
      }
    }
  }
}
