export default interface ScreenLayoutElement {
  component: boolean;
  direction: "horizontal" | "vertical";
  flex?: number;
  type:
    | "NODE_EDITOR_SCREEN"
    | "LIBRARY_SCREEN"
    | "PROPERTIES_SCREEN"
    | "GRAPHICS_VIEWER"
    | "IMAGE_VISUALIZER"
    | null;
  sub?: ScreenLayoutElement[];
  propagateDimensions?: boolean;
}
