import { NodeEditor } from "./../../../rete/src/editor";
import { Node } from "./../../../rete/src/node";
import { createNode } from "./utils";
import uuid from "uuid/v4";
import Cache from "../cache";

export const removeNode = (editor: NodeEditor, node: Node) => {
  if (!node.data.lockDelete) {
    editor.removeNode(node);
  }
};

export const cloneNode = async (editor: NodeEditor, node: Node) => {
  const {
    name,
    position: [x, y],
    ...params
  } = node;
  const component = editor.components.get(name);
  const cData = Cache.getCache((params.data as any).id);
  const newNode = await createNode(component, {
    ...params,
    data: {
      ...params.data,
      id: uuid()
    },
    x: x + 50,
    y: y + 50
  });

  if (cData) {
    if (cData.data) {
      let dt: any;

      if (typeof cData.data == "string") {
        dt = (" " + cData.data).slice(1);
      } else {
        dt = JSON.parse(JSON.stringify(cData.data));
      }
      let id = Cache.setCache(newNode.data.id, dt);
    }
  }

  editor.addNode(newNode);
};
