import Rete, { NodeEditor } from "../../rete/src";
import { ENGINE_VERSION } from "./../../constants/versions";
import Editor from "./Editor";

export default class ReteEngine {
  private static _engine = new Rete.Engine("matdesigner@" + ENGINE_VERSION);

  static getEngine = () => {
    return ReteEngine._engine;
  };

  static updateEngine = async () => {
    await ReteEngine._engine.abort();
    let e = Editor.getEditor();
    if (e) await ReteEngine._engine.process(e.toJSON());
  };
}
