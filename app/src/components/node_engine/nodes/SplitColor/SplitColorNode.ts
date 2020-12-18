import Rete from "rete";
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
import NodeEngine from "../../../../material_engine";
import SplitColorViewer from "../../controllers/SplitColorViewer";

const cv = (window as any).cv;

export const SPLIT_COLOR_TYPE = "node/splitcol";

const SPLIT_COLOR = "Split Color";

const SPLITCOL_INPUT = "splitcol_input";
const SPLITCOL_INPUT_TITLE = "Image";

const SPLITCOL_R = "splitcol_r";
const SPLITCOL_R_TITLE = "Red";

const SPLITCOL_G = "splitcol_g";
const SPLITCOL_G_TITLE = "Green";

const SPLITCOL_B = "splitcol_b";
const SPLITCOL_B_TITLE = "Blue";

class SplitColorController extends Rete.Control {
  render: any;
  component: any;
  props: object;

  constructor(emitter: string, key: string, name: string, node: any) {
    super(key);
    this.key = key;
    this.render = "react";
    this.component = SplitColorViewer; //Use functional components
    this.props = { emitter, name, node };
  }
}

export class SplitColorNode extends Rete.Component {
  globalResolution = ProjectSettings.getGlobalResolution();

  constructor() {
    super(SPLIT_COLOR);
  }

  async builder(node: Node): Promise<any> {
    let r = new Rete.Output(SPLITCOL_R, SPLITCOL_R_TITLE, GRAYSCALE_SOCKET);
    let g = new Rete.Output(SPLITCOL_G, SPLITCOL_G_TITLE, GRAYSCALE_SOCKET);
    let b = new Rete.Output(SPLITCOL_B, SPLITCOL_B_TITLE, GRAYSCALE_SOCKET);

    let image = new Rete.Input(
      SPLITCOL_INPUT,
      SPLITCOL_INPUT_TITLE,
      COLOR_SOCKET
    );
    node.addOutput(r);
    node.addOutput(g);
    node.addOutput(b);

    node.addInput(image);

    let init = getInitSettings(SPLIT_COLOR_TYPE);
    node.meta = { type: "Converter" };
    node.data = {
      ...init,
      ...node.data,
      display: "",
      parameters: {
        preview: null,
        ...node.data.parameters
      },
      preview: ""
    };

    // let controller = new SplitColorController(
    //   "Split Color",
    //   "split_color",
    //   "Split Color",
    //   node
    // );

    // node.addControl(controller);
    // Controllers.setController((node.data as any).id, controller);
    Cache.setCache(init.id, null);
    return node;
  }

  worker(node: any, inputs: any, outputs: Output): any {
    if (node) {
      if (!node.data.parameters.preview) {
        node.data.parameters.preview = "";
        node.data.lastUpdate = "";
      }
      const update = shouldNodeUpdate(node, inputs, outputs);
      if (update) {
        let cData = updateData(inputs, SPLITCOL_INPUT);
        if (cData) {
          if (cData.data) {
            NodeEngine.splitColor(
              cData.data,
              this.globalResolution,
              this.globalResolution
            ).then(res => {
              let id = Cache.setCache(node.data.id, { ...res });

              outputs[SPLITCOL_R] = [node.data.id, id, "r"];
              outputs[SPLITCOL_G] = [node.data.id, id, "g"];
              outputs[SPLITCOL_B] = [node.data.id, id, "b"];
              node.data.cacheId = id;
              updateController(Controllers.getController(node.data.id));
              Editor.updateSelected(node.data.id);
              ReteEngine.updateEngine();
            });
          }
        } else {
          node.data.preview = "";
          NodeEngine.splitColor(
            "",
            this.globalResolution,
            this.globalResolution
          ).then(res => {
            let id = Cache.setCache(node.data.id, { ...res });

            outputs[SPLITCOL_R] = [node.data.id, id, "r"];
            outputs[SPLITCOL_G] = [node.data.id, id, "g"];
            outputs[SPLITCOL_B] = [node.data.id, id, "b"];

            updateController(Controllers.getController(node.data.id));
            Editor.updateSelected(node.data.id);
            ReteEngine.updateEngine();
          });
        }
      } else {
        let c = Cache.getCache(node.data.id);
        if (c) {
          if (c.data) {
            outputs[SPLITCOL_R] = [
              node.data.id,
              c ? c.cacheId : undefined,
              "r"
            ];
            outputs[SPLITCOL_G] = [
              node.data.id,
              c ? c.cacheId : undefined,
              "g"
            ];
            outputs[SPLITCOL_B] = [
              node.data.id,
              c ? c.cacheId : undefined,
              "b"
            ];
          }
        }
      }
    }
  }
}
