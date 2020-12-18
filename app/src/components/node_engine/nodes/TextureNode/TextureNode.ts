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
import uuid from "uuid/v4";

export const TEXTURE_NODE_TYPE = "node/texture";

const INVERTGRAY_OUTPUT = "texture_output";
const INVERTGRAY_OUTPUT_TITLE = "Image";

const INVERTGRAY = "Texture";

class TextureController extends Rete.Control {
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

export class TextureNode extends Rete.Component {
  constructor() {
    super(INVERTGRAY);
  }

  async builder(node: Node): Promise<any> {
    let out = new Rete.Output(
      INVERTGRAY_OUTPUT,
      INVERTGRAY_OUTPUT_TITLE,
      COLOR_SOCKET
    );
    node.meta = { type: "Generator" };
    let init = getInitSettings(TEXTURE_NODE_TYPE);

    let controller = new TextureController(
      "Texture",
      "texture",
      "Texture",
      node
    );

    node.addControl(controller);
    node.addOutput(out);
    node.data = {
      ...init,
      id: uuid(),
      ...node.data,
      parameters: {
        img: "",
        ...node.data.parameters
      }
    };
    Controllers.setController((node.data as any).id, controller);
    Cache.setCache(init.id, (node.data as any).parameters.img);
    return node;
  }

  worker(node: any, inputs: any, outputs: Output): any {
    if (node) {
      const update = shouldNodeUpdate(node, inputs, outputs);
      const cData = Cache.getCache(node.data.id);

      if (!cData) {
        let id = Cache.setCache(node.data.id, node.data.parameters.img);
        outputs[INVERTGRAY_OUTPUT] = [node.data.id, id];
        node.data.cacheId = id;
        updateController(Controllers.getController(node.data.id));
        Editor.updateSelected(node.data.id);
        ReteEngine.updateEngine();
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
