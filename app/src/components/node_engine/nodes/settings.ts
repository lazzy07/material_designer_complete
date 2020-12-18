import uuid4 from "uuid/v4";
import { Connection } from "./../../../rete/src/connection";
import Cache from "../cache";

export interface NodeData {
  id: string;
  type: string;
  parameters: any;
  lastUpdates: {
    node: any;
    // outputs: any;
    inputs: any;
  };
  cacheId: string;
}

export interface NodeIO {
  id: string;
  update: string;
  dataKey: string;
}

const hasNoCache = node => {
  if (node.data.id) {
    let cData = Cache.getCache(node.data.id);

    if (cData) {
      if (cData.data) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }
};

export const resetLastOnstart = () => {
  return {
    lastUpdates: {
      node: {},
      inputs: {}
    },
    cacheId: ""
  };
};

const checkInputCache = (inputs: any, inputId: string) => {
  let dt = inputs[inputId];
  if (dt.length == 0) {
    return true;
  }
  dt = dt[0];
  if (dt) {
    if (dt.length > 1) {
      if (dt[1]) {
        return true;
      }
    }
  }
  return false;
};

const checkInputs = (inputs: any) => {
  let i = true;
  for (let key in inputs) {
    let c = checkInputCache(inputs, key);
    i = c;
  }
  return i;
};

export const shouldNodeUpdate = (node: any, inputs: any, outputs: any) => {
  if (checkInputs(inputs)) {
    if (
      checkObjectChanged(node.data.lastUpdates.node, node.data.parameters) ||
      // checkObjectChanged(node.data.lastUpdates.outputs, outputs) ||
      // hasNoCache(node)||
      checkObjectChanged(node.data.lastUpdates.inputs, inputs)
    ) {
      node.data.lastUpdates = {
        node: { ...node.data.parameters },
        inputs: { ...inputs }
      };
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

const checkObjectChanged = (object1: object, object2: object) => {
  return JSON.stringify(object1) !== JSON.stringify(object2);
};

export const getInitSettings = (type: string): NodeData => {
  return {
    id: uuid4(),
    type: type,
    parameters: {},
    lastUpdates: {
      node: {},
      inputs: {}
    },
    cacheId: ""
  };
};

export const isConnected = (array: Connection[], value: string) => {
  let connection: Connection | null = null;

  array.forEach(ele => {
    if (ele.input.key === value) {
      connection = ele;
    }
  });

  return connection;
};

export const updateController = (controller: any) => {
  if (controller) (controller as any).update();
};

export const updateData = (inputs: object, type: string) => {
  let conn = inputs[type][0];
  let updt = conn ? inputs[type][0][0] : null;
  if (conn) {
    if (conn.length === 2) {
      return updt ? Cache.getCache(updt) : null;
    } else if (conn.length === 3) {
      let cData = Cache.getCache(updt);
      if (cData) {
        return {
          ...cData,
          data: cData.data[conn[2]]
        };
      }
    }
  }
  return null;
};
