import Rete from "rete";
import { imageViewer } from "../../controllers/ImageViewer";
import { GRAYSCALE_SOCKET } from "../../types";
import {
  getInitSettings,
  shouldNodeUpdate,
  updateController,
  updateData
} from "../settings";
import NodeEngine from "../../../../material_engine";
import Cache from "../../cache";
import { Output, Node } from "../../../../rete/src";
import ReteEngine from "../../Engine";
import Editor from "../../Editor";
import { Mat } from "../../../../types";
import { ProjectSettings } from "../../../../services/get_project_settings/ProjectSettings";
import Controllers from "../../Controllers";
const cv = (window as any).cv;

export const BLEND_GRAYSCALE_TYPE = "node/blendg";

const BLEND_NODE = "Blend Node Gray";

const BLENDG_IMG1 = "blendg_img1";
const BLENDG_IMG2 = "blendg_img2";
const BLENDG_IMG1_TITLE = "Image 1";
const BLENDG_IMG2_TITLE = "Image 2";
const BLENDG_OUTPUT = "blendg_output";
const BLENDG_OUTPUT_TITLE = "Mask";

class BlendNodeController extends Rete.Control {
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

export default class BlendNodeGrayscale extends Rete.Component {
  constructor() {
    super(BLEND_NODE);
  }

  async builder(node: Node) {
    let image1 = new Rete.Input(
      BLENDG_IMG1,
      BLENDG_IMG1_TITLE,
      GRAYSCALE_SOCKET
    );
    let image2 = new Rete.Input(
      BLENDG_IMG2,
      BLENDG_IMG2_TITLE,
      GRAYSCALE_SOCKET
    );
    // let mask = new Rete.Input(BLENDG_MASK, BLENDG_MASK_TITLE, GRAYSCALE_SOCKET);

    let output = new Rete.Output(
      BLENDG_OUTPUT,
      BLENDG_OUTPUT_TITLE,
      GRAYSCALE_SOCKET
    );

    let controller = new BlendNodeController(
      "Blend Preview",
      "blendg_controller",
      "Blend Grayscale",
      node
    );

    node.meta = { type: "Operator" };

    node.addInput(image1);
    node.addInput(image2);
    node.addControl(controller);
    node.addOutput(output);

    const init = getInitSettings(BLEND_GRAYSCALE_TYPE);

    node.data = {
      ...init,
      ...node.data,
      parameters: {
        type: "Add",
        influence: 1,
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
        let img1 = "";
        let img2 = "";
        if (
          inputs[BLENDG_IMG1].length === 0 &&
          inputs[BLENDG_IMG2].length === 0
        ) {
          img1 = "";
          img2 = "";
        } else {
          if (inputs[BLENDG_IMG1].length === 0) {
            let imgData = updateData(inputs, BLENDG_IMG2);
            if (imgData) {
              img2 = imgData.data;
              img1 = "";
            }
          }
          if (inputs[BLENDG_IMG2].length === 0) {
            let imgData = updateData(inputs, BLENDG_IMG1);
            if (imgData) {
              img1 = imgData.data;
              img2 = "";
            }
          }
          if (
            inputs[BLENDG_IMG2].length !== 0 &&
            inputs[BLENDG_IMG1].length !== 0
          ) {
            let imgData1 = updateData(inputs, BLENDG_IMG1);
            let imgData2 = updateData(inputs, BLENDG_IMG2);

            if (imgData1 && imgData2) {
              img1 = imgData1.data;
              img2 = imgData2.data;
            }
          }
        }
        let type = 0;
        switch (node.data.parameters.type) {
          case "Add":
            type = 0;
            break;
          case "Substract":
            type = 1;
            break;
          case "Multiply":
            type = 2;
            break;
          case "Divide":
            type = 3;
            break;
        }
        NodeEngine.blendImage(img1, img2, type, node.data.parameters.influence)
          .then(res => {
            let cacheId = Cache.setCache(node.data.id, res);
            node.data.cacheId = cacheId;
            outputs[BLENDG_OUTPUT] = [node.data.id, cacheId];
            updateController(Controllers.getController(node.data.id));
            Editor.updateSelected(node.data.id);
            ReteEngine.updateEngine();
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        let c = Cache.getCache(node.data.id);
        outputs[BLENDG_OUTPUT] = [node.data.id, c ? c.cacheId : undefined];
      }
    }
  }
}
