import { Dictionary } from "typescript-collections";

interface ControllerElement {
  nodeId: string;
  controller: any;
}

export default class Controllers {
  private static _controllers: Dictionary<
    string,
    ControllerElement
  > = new Dictionary<string, ControllerElement>();

  static setController = (nodeId: string, controller: any) => {
    Controllers._controllers.setValue(nodeId, controller);
  };

  static getController = (nodeId: string) => {
    return Controllers._controllers.getValue(nodeId);
  };

  static removeController = (nodeId: string) => {
    Controllers._controllers.remove(nodeId);
  };
}
