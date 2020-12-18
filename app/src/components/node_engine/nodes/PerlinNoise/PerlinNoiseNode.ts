// import Rete from "../../../../rete/src";
import Rete from "rete";
import { imageViewer } from "./../../controllers/ImageViewer";
import { Node } from "rete-react-render-plugin";
import { GRAYSCALE_SOCKET } from "../../types";
import {
  NodeData,
  NodeIO,
  getInitSettings,
  shouldNodeUpdate,
  updateController
} from "../settings";
import NodeEngine from "../../../../material_engine";
import Cache from "../../cache";
import { Output } from "../../../../rete/src";
import ReteEngine from "../../Engine";
import Editor from "../../Editor";
import { ProjectSettings } from "../../../../services/get_project_settings/ProjectSettings";
import Controllers from "../../Controllers";

export const PERLIN_NOISE_TYPE = "node/perlin";

//Node Type
const PERLIN_NOISE = "Perlin Noise";
//Node keys
const PERLIN_NOISE_NODE_KEY = "perlin_noise";
//Node titles
const PERLIN_NOISE_NODE_TITLE = "Perlin Noise";
//Controller emmitters
const PERLIN_NOISE_CONTROLLER_EMITTER = "Preview of Perlin Noise";
//Controller keys
const PERLIN_NOISE_CONTROLLER_KEY = "perlin_noise_controller";
//Controller names
const PERLIN_NOISE_CONTROLLER_NAME = "Perlin Noise";

class PerlinNoiseController extends Rete.Control {
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

export default class PerlinNoiseNode extends Rete.Component {
  globalResolution = ProjectSettings.getGlobalResolution();

  constructor() {
    super(PERLIN_NOISE);
  }

  async builder(node: Node): Promise<any> {
    let output = new Rete.Output(
      PERLIN_NOISE_NODE_KEY,
      PERLIN_NOISE_NODE_TITLE,
      GRAYSCALE_SOCKET
    );
    let controller = new PerlinNoiseController(
      PERLIN_NOISE_CONTROLLER_EMITTER,
      PERLIN_NOISE_CONTROLLER_KEY,
      PERLIN_NOISE_CONTROLLER_NAME,
      node
    );

    node.meta = { type: "Generator" };

    node.addOutput(output);
    node.addControl(controller);

    const init = getInitSettings(PERLIN_NOISE_TYPE);

    node.data = {
      ...init,
      ...node.data,
      parameters: {
        seed: 1,
        sizeX: this.globalResolution,
        sizeY: this.globalResolution,
        octaves: 6,
        bias: 0.3,
        ...node.data.parameters
      }
    };
    Controllers.setController(node.data.id, controller);
    return node;
  }

  worker(node: Node, _: any, outputs: Output) {
    if (node) {
      //If global resolution changes or the nodedata have been changed
      const update = shouldNodeUpdate(node, _, outputs);

      if (update) {
        this.globalResolution = ProjectSettings.getGlobalResolution();
        node.data.parameters.sizeX = this.globalResolution;
        node.data.parameters.sizeY = this.globalResolution;

        const { seed, sizeX, sizeY, octaves, bias } = node.data.parameters;
        NodeEngine.perlinNoise(seed, sizeX, sizeY, octaves, bias)
          .then(image => {
            let cacheId = Cache.setCache(node.data.id, image);
            node.data.cacheId = cacheId;
            outputs[PERLIN_NOISE_NODE_KEY] = [node.data.id, cacheId];
            updateController(Controllers.getController(node.data.id));
            Editor.updateSelected(node.data.id);
            ReteEngine.updateEngine();
          })
          .catch(err => {
            //TODO Handle error
            console.log(err);
          });
      } else {
        let c = Cache.getCache(node.data.id);
        outputs[PERLIN_NOISE_NODE_KEY] = [
          node.data.id,
          c ? c.cacheId : undefined
        ];
      }
    }
  }
}
