import { NodeEditor } from "../../rete/src";
import { ENGINE_VERSION } from "../../constants/versions";
import { store } from "../../redux/store";
import { Store } from "../../redux/reducers";
import { setImageViewer } from "../../redux/actions/SystemActions";
import Cache from "./cache";

export default class Editor {
  private static _editor: NodeEditor;

  static setNodeEditor(editorRef: HTMLElement) {
    Editor._editor = new NodeEditor("matdesigner@" + ENGINE_VERSION, editorRef);
  }

  static getEditor() {
    return this._editor;
  }

  static getSelected = () => {
    if (store) {
      let state: Store = store.getState();
      return state.system.viewerNodeId;
    }
  };

  static updateSelected = (id: string) => {
    if (id === Editor.getSelected()) {
      let cData = Cache.getCache(id);
      if (cData) store.dispatch(setImageViewer(cData.data));
    }
  };

  static forceUpdateSelected = (id: string) => {
    let cData = Cache.getCache(id);
    if (cData) store.dispatch(setImageViewer(cData.data));
  };
}
