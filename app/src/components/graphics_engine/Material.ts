import { MeshStandardMaterial, Color, DoubleSide } from "three";
import { MATERIAL_DEFAULT_COLOR, DEFAULT_COLOR } from "../../constants";

export default class Material {
  private static _material = new MeshStandardMaterial({
    color: MATERIAL_DEFAULT_COLOR,
    roughness: 0.98,
    side: DoubleSide
  });

  private static _default_material = new MeshStandardMaterial({
    color: MATERIAL_DEFAULT_COLOR,
    roughness: 0.98
  });

  static getMaterial() {
    return this._material;
  }

  static resetToDefault() {}
}
