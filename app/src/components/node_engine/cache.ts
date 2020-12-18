import { Dictionary } from "typescript-collections";
import uuid4 from "uuid/v4";

export interface CacheElement {
  nodeId: string;
  cacheId: string;
  data: any;
}

export default class Cache {
  private static _cache: Dictionary<string, CacheElement> = new Dictionary<
    string,
    CacheElement
  >();

  static setCache = (nodeId: string, data: any) => {
    let id = uuid4();
    Cache._cache.setValue(nodeId, { nodeId, cacheId: id, data });
    return id;
  };

  static getCache = (nodeId: string) => {
    let cacheItem = Cache._cache.getValue(nodeId);

    if (cacheItem) {
      return cacheItem;
    } else {
      return null;
    }
  };

  static removeCache = (nodeId: string) => {
    Cache._cache.remove(nodeId);
  };

  static removeAllCache = () => {
    Cache._cache.clear();
  };
}
