export const DEFAULT_COLOR: string = "#252525";
export const SECONDARY_COLOR: string = "#313231";
export const WARNING_COLOR: string = "#e8232d";
export const LOCKED_COLOR = "#EF6C00";
export const INACTIVE_COLOR = "#37474F";
export const DEFAULT_FONT_COLOR = "#ffffff";
export const ACTIVE_COLOR = "#26a69a";
export const ACTIVE_COLOR_LIGHT = "rgb(0, 151, 134)";

export const MATERIAL_DEFAULT_COLOR = "#949392";

export const SLIDERS_COLOR = "#515151";
export const SLIDER_STYLES_VERT = {
  borderRight: `1.5px solid ${SLIDERS_COLOR}`,
  borderLeft: `1.5px solid ${SLIDERS_COLOR}`,
  backgroundColor: SLIDERS_COLOR,
  zIndex: 0
};

export const SLIDER_STYLES_HOR = {
  borderTop: `1.5px solid ${SLIDERS_COLOR}`,
  borderBottom: `1.5px solid ${SLIDERS_COLOR}`,
  backgroundColor: SLIDERS_COLOR,
  zIndex: 0
};

export const TEXTURE_DIRECTORY = "textures";
export const ENVMAP_DIRECTORY = "envmaps";

export const URL = "http://localhost:5000";
export const WEB_URL = "http://localhost";
export const GRAPHQL_URL = URL + "/graphql";
export const REFRESH_TOKEN_URL = URL + "/refresh_token";
export const UPLOAD_MATERIAL_URL = WEB_URL + ":4000" + "/uploadmaterial";
