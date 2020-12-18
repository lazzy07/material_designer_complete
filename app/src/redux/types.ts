export type ResourceFile = "envmap" | "texture" | "node";

export interface LocalFile {
  path: string;
  name: string;
}

export interface CloudFile {
  name: string;
  user: string;
  id: string;
}

//Material graph structure
export interface MatGraph {
  title: string;
  user: string;
  type: string;
  share: boolean;
  web: boolean;
  uuid: string;
  data: any;
}

export interface MatTex {
  uuid: string;
  mime: string;
  name: string;
  data: string;
}

export interface MatEnvMap {
  uuid: string;
  mime: string;
  name: string;
  data: string;
}

export const SYSTEM_ENVMAPS = [
  "autumn_ground_4k.matenv",
  "cabin_4k.matenv",
  "mealie_road_4k.matenv"
];

export const SYSTEM_TEXTURES: string[] = [];
