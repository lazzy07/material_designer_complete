import Rete from "rete";
import { imageViewer } from "../../controllers/ImageViewer";
import { ProjectSettings } from "../../../../services/get_project_settings/ProjectSettings";
import { GRAYSCALE_SOCKET } from "../../types";
import { COLOR_SOCKET } from "./../../types";
import { Node, Output } from "../../../../rete/src";
import {
  getInitSettings,
  shouldNodeUpdate,
  updateController,
  updateData
} from "../settings";
import Cache from "../../cache";
import { Mat } from "../../../../types";
import Controllers from "../../Controllers";
import Editor from "../../Editor";
import ReteEngine from "../../Engine";
import MaterialEngine from "../../../../material_engine";

const cv = (window as any).cv;

export const MERGE_COLOR_TYPE = "node/mergecol";

const MERGE_COLOR = "Merge Color";

const MERGE_OUTPUT = "mergecol_input";
const MERGE_OUTPUT_TITLE = "Image";

const MERGE_R = "mergecol_r";
const MERGE_R_TITLE = "Red";

const MERGE_G = "mergecol_g";
const MERGE_G_TITLE = "Green";

const MERGE_B = "mergecol_b";
const MERGE_B_TITLE = "Blue";

class MergeColorController extends Rete.Control {
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

export class MergeColorNode extends Rete.Component {
  globalResolution = ProjectSettings.getGlobalResolution();

  constructor() {
    super(MERGE_COLOR);
  }

  async builder(node: Node): Promise<any> {
    let r = new Rete.Input(MERGE_R, MERGE_R_TITLE, GRAYSCALE_SOCKET);
    let g = new Rete.Input(MERGE_G, MERGE_G_TITLE, GRAYSCALE_SOCKET);
    let b = new Rete.Input(MERGE_B, MERGE_B_TITLE, GRAYSCALE_SOCKET);

    let image = new Rete.Output(MERGE_OUTPUT, MERGE_OUTPUT_TITLE, COLOR_SOCKET);
    node.addInput(r);
    node.addInput(g);
    node.addInput(b);

    node.addOutput(image);

    let controller = new MergeColorController(
      "Merge Color",
      "merge_color",
      "Merge Color",
      node
    );

    node.addControl(controller);

    let init = getInitSettings(MERGE_COLOR_TYPE);
    node.meta = { type: "Converter" };
    node.data = {
      ...init,
      ...node.data,
      parameters: {
        dummy: "",
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
        let r: string, g: string, b: string;
        let cDataR = updateData(inputs, MERGE_R);
        let cDataG = updateData(inputs, MERGE_G);
        let cDataB = updateData(inputs, MERGE_B);
        if (cDataR) {
          r = cDataR.data;
        } else {
          r = "";
        }

        if (cDataG) {
          g = cDataG.data;
        } else {
          g = "";
        }

        if (cDataB) {
          b = cDataB.data;
        } else {
          b = "";
        }

        MaterialEngine.mergeColor(r, g, b)
          .then(res => {
            let cacheId = Cache.setCache(node.data.id, res);
            node.data.cacheId = cacheId;
            outputs[MERGE_OUTPUT] = [node.data.id, cacheId];

            updateController(Controllers.getController(node.data.id));
            Editor.updateSelected(node.data.id);
            ReteEngine.updateEngine();
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        let c = Cache.getCache(node.data.id);
        outputs[MERGE_OUTPUT] = [node.data.id, c ? c.cacheId : undefined];
      }
    }
  }
}
