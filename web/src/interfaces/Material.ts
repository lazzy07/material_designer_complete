import { Image } from "./Image";

export interface Material {
  name: string;
  material: any;
  description: string;
  image: Image;
  tags: string[];
}
