import ScreenLayoutElement from "./ScreenLayoutInterface";

export const defaultLayout: ScreenLayoutElement[][] = [
  [
    {
      direction: "vertical",
      component: false,
      type: null,
      flex: 0.2,
      sub: [
        {
          direction: "vertical",
          component: true,
          type: "LIBRARY_SCREEN",
          flex: 1
        }
      ]
    },
    {
      direction: "vertical",
      component: false,
      type: null,
      flex: 0.6,
      sub: [
        {
          direction: "horizontal",
          component: false,
          type: null,
          flex: 0.6,
          sub: [
            {
              direction: "vertical",
              type: "GRAPHICS_VIEWER",
              component: true,
              flex: 0.5
            },
            {
              direction: "vertical",
              component: true,
              type: "IMAGE_VISUALIZER",
              flex: 0.5
            }
          ]
        },
        {
          direction: "horizontal",
          component: true,
          type: "NODE_EDITOR_SCREEN",
          propagateDimensions: true,
          flex: 1
        }
      ]
    },
    {
      direction: "vertical",
      component: false,
      type: null,
      flex: 0.2,
      sub: [
        {
          direction: "vertical",
          component: true,
          type: "PROPERTIES_SCREEN",
          flex: 1
        }
      ]
    }
  ]
];
