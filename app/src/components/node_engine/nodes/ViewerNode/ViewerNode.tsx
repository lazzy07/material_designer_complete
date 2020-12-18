// import Rete from "../../../../rete/src";
import Rete from "rete";

import React from "react";
import { Node } from "../../../../rete/src";
import { COLOR_SOCKET, GRAYSCALE_SOCKET } from "../../types";
import "../../../../css/node.css";
import { MATERIAL_DEFAULT_COLOR } from "../../../../constants";
import { shouldNodeUpdate, getInitSettings, updateData } from "../settings";
import Cache from "../../cache";
import Material from "../../../graphics_engine/Material";
import { Color, Vector2, Texture, TextureLoader } from "three";
import Controllers from "../../Controllers";

const VIEWER_NODE = "Viewer Node";
export const VIEWER_NODE_TYPE = "node/viewer";

const viewerDummyControllerView = (props: any) => {
  return <div></div>;
};

class ViewerNodeController extends Rete.Control {
  render: any;
  component: any;
  props: object;

  constructor(emitter: string, key: string, name: string, node: any) {
    super(key);
    this.key = key;
    this.render = "react";
    this.component = viewerDummyControllerView;
    this.props = { emitter, name, node };
  }
}

export class ViewerNode extends Rete.Component {
  constructor() {
    super(VIEWER_NODE);
  }

  builder = async (node: Node): Promise<any> => {
    let baseColor = new Rete.Input(
      "viewer_base_color",
      "Base Color",
      COLOR_SOCKET
    );
    let metalic = new Rete.Input("viewer_metalic", "Metalic", GRAYSCALE_SOCKET);
    let roughness = new Rete.Input(
      "viewer_roughness",
      "Roughness",
      GRAYSCALE_SOCKET
    );

    let ao = new Rete.Input("viewer_ao", "Ambient Occlusion", GRAYSCALE_SOCKET);
    let normal = new Rete.Input("viewer_normal", "Normal", COLOR_SOCKET);
    let transparency = new Rete.Input(
      "viewer_opacity",
      "Opacity",
      GRAYSCALE_SOCKET
    );
    let translucency = new Rete.Input(
      "viewer_translucency",
      "Translucency",
      COLOR_SOCKET
    );
    let displacement = new Rete.Input(
      "viewer_displacement",
      "Displacement",
      GRAYSCALE_SOCKET
    );
    let bump = new Rete.Input("viewer_bump", "Bump", GRAYSCALE_SOCKET);
    let emissive = new Rete.Input("viewer_emissive", "Emissive", COLOR_SOCKET);

    let controller = new ViewerNodeController(
      "Viewer Node",
      "viewer_node",
      "Viewer Node",
      node
    );

    node.meta = { type: "Viewer" };

    node.addInput(baseColor);
    node.addInput(metalic);
    node.addInput(roughness);
    node.addInput(ao);
    node.addInput(normal);
    node.addInput(bump);
    node.addInput(displacement);
    node.addInput(transparency);
    node.addInput(emissive);

    // TODO Add translucency support
    // node.addInput(translucency);

    node.addControl(controller);

    let init = getInitSettings(VIEWER_NODE_TYPE);
    node.data = {
      ...init,
      ...node.data,
      parameters: {
        baseColor: MATERIAL_DEFAULT_COLOR,
        metalic: 0,
        roughness: 0.8,
        opacity: 1,
        emissive: "#000000", //implement
        ior: 0.98,
        emissiveIntensity: 1,
        normalScale: new Vector2(1, 1), //implement
        bumpScale: 1, //implement
        displacementScale: 1, //implement
        displacementBias: 0,
        aoScale: 1, //implement
        ...(node.data.parameters as any)
      }
    };
    Controllers.setController((node.data as any).id, controller);
    Cache.setCache(init.id, null);
  };

  updateTexture = (type: string, texture: Texture | null = null) => {
    let material = Material.getMaterial();
    if (material[type]) {
      material[type].dispose();
    }
    material[type] = texture;
  };

  worker = (node: any, inputs: object, outputs: object) => {
    if (node) {
      const update = shouldNodeUpdate(node, inputs, outputs);
      // ** this is how to update the controller if (this.controller) (this.controller as any).update();
      if (update) {
        let material = Material.getMaterial();
        if (inputs["viewer_base_color"].length === 0) {
          material.color = new Color(node.data.parameters.baseColor);
          this.updateTexture("map");
        } else {
          let cData = updateData(inputs, "viewer_base_color");

          if (cData) {
            material.color = new Color(0xffffff);

            this.updateTexture(
              "map",
              new TextureLoader().load("data:image/jpeg;base64," + cData.data)
            );
          }
        }

        if (inputs["viewer_roughness"].length === 0) {
          material.roughness = node.data.parameters.roughness;
          this.updateTexture("roughnessMap");
        } else {
          let cData = updateData(inputs, "viewer_roughness");
          material.roughness = node.data.parameters.roughness;
          if (cData) {
            material.roughness = 1;
            this.updateTexture(
              "roughnessMap",
              new TextureLoader().load("data:image/jpeg;base64," + cData.data)
            );
          }
        }

        if (inputs["viewer_metalic"].length === 0) {
          material.metalness = node.data.parameters.metalic;
          this.updateTexture("metalnessMap");
        } else {
          let cData = updateData(inputs, "viewer_metalic");
          material.metalness = 1;
          if (cData) {
            this.updateTexture(
              "metalnessMap",
              new TextureLoader().load("data:image/jpeg;base64," + cData.data)
            );
          }
        }

        if (inputs["viewer_opacity"].length === 0) {
          if (node.data.parameters.opacity != 1) material.transparent = true;
          material.opacity = node.data.parameters.opacity;
          this.updateTexture("alphaMap");
        } else {
          material.opacity = 1;
          material.transparent = true;
          let cData = updateData(inputs, "viewer_opacity");
          if (cData) {
            this.updateTexture(
              "alphaMap",
              new TextureLoader().load("data:image/jpeg;base64," + cData.data)
            );
          }
        }

        if (inputs["viewer_emissive"].length === 0) {
          material.emissive = new Color(node.data.parameters.emissive);
          this.updateTexture("emissiveMap");
        } else {
          let cData = updateData(inputs, "viewer_emissive");
          if (cData) {
            this.updateTexture(
              "emissiveMap",
              new TextureLoader().load("data:image/jpeg;base64," + cData.data)
            );
          }
        }

        if (inputs["viewer_normal"].length !== 0) {
          let cData = updateData(inputs, "viewer_normal");
          if (cData) {
            this.updateTexture(
              "normalMap",
              new TextureLoader().load("data:image/jpeg;base64," + cData.data)
            );
          }
        } else {
          this.updateTexture("normalMap");
        }

        if (inputs["viewer_ao"].length !== 0) {
          let cData = updateData(inputs, "viewer_ao");
          if (cData) {
            this.updateTexture(
              "aoMap",
              new TextureLoader().load("data:image/jpeg;base64," + cData.data)
            );
          }
        } else {
          this.updateTexture("aoMap");
        }

        if (inputs["viewer_bump"].length !== 0) {
          let cData = updateData(inputs, "viewer_bump");
          if (cData) {
            this.updateTexture(
              "bumpMap",
              new TextureLoader().load("data:image/jpeg;base64," + cData.data)
            );
          }
        } else {
          this.updateTexture("bumpMap");
        }

        if (inputs["viewer_displacement"].length !== 0) {
          let cData = updateData(inputs, "viewer_displacement");
          if (cData) {
            this.updateTexture(
              "displacementMap",
              new TextureLoader().load("data:image/jpeg;base64," + cData.data)
            );
          }
        } else {
          this.updateTexture("displacementMap");
        }

        material.emissiveIntensity = node.data.parameters.emissiveIntensity;

        material.normalScale = node.data.parameters.normalScale;
        material.aoMapIntensity = node.data.parameters.aoScale;
        material.bumpScale = node.data.parameters.bumpScale;
        material.displacementScale = node.data.parameters.displacementScale;
        material.displacementBias = node.data.parameters.displacementBias;
        material.refractionRatio = node.data.parameters.ior;
        material.needsUpdate = true;
        // ** No need to update controller of viewer because it only have a dummy controller
        // updateController(this.controller);
      }
    }
  };
}
