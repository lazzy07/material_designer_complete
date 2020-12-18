import { menuBarItem } from "../controller/menubar/MenubarItems";

interface graphicsEngineMenuFuctions {
  plane: () => void;
  sphere: () => void;
  cube: () => void;
  custom: () => void;
  options: (type: string) => void;
}

export const renderGraphicsMenu = (funcs: graphicsEngineMenuFuctions) => {
  const graphicsEngineMenu: menuBarItem[] = [
    {
      id: 5,
      label: "Geometry",
      submenu: [
        {
          id: 51,
          label: "Plane",
          click: funcs.plane
        },
        {
          id: 52,
          label: "Sphere",
          click: funcs.sphere
        },
        {
          id: 53,
          label: "Cube",
          click: funcs.cube
        },
        {
          id: 54,
          label: "Custom  ...",
          click: funcs.custom
        }
      ]
    },
    {
      id: 100,
      label: "Options",
      submenu: [
        {
          id: 1001,
          label: "Exposure",
          click: () => funcs.options("exposure")
        },
        {
          id: 1002,
          label: "Subdivision",
          click: () => funcs.options("subdivision")
        },
        {
          id: 1003,
          label: "Wireframe",
          click: () => funcs.options("wireframe")
        }
      ]
    }
  ];
  return graphicsEngineMenu;
};
