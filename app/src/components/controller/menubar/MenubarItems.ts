import { store } from "../../../redux/store";
import { toggleCapture } from "../../../redux/actions/MaterialActions";
import { logoutUser } from "../../../redux/actions/UserActions";

const { ipcRenderer } = window.require("electron");

export interface menuBarItem {
  id: number;
  label: string;
  submenu?: menuBarItem[];
  shortcut?: string;
  click?: () => void;
}

const fileMenu: menuBarItem[] = [
  {
    id: 11,
    label: "New Project",
    shortcut: "Ctrl + N"
  },
  {
    id: 12,
    label: "New Window",
    shortcut: "Ctrl + Shift + N"
  },
  {
    id: 121,
    label: "divider"
  },
  {
    id: 13,
    label: "Open Project",
    shortcut: "Ctrl + Shift + O"
  },
  {
    id: 14,
    label: "Open Recent"
  },

  {
    id: 141,
    label: "divider"
  },
  {
    id: 15,
    label: "Save",
    shortcut: "Ctrl + S"
  },
  {
    id: 16,
    label: "Save As",
    shortcut: "Ctrl + Shift + S"
  },
  {
    id: 161,
    label: "divider"
  },
  {
    id: 17,
    label: "Settings",
    shortcut: "Ctrl + P",
    click: () => {
      ipcRenderer.send("OPEN_APPLICATION_SETTINGS");
    }
  },
  {
    id: 172,
    label: "Logout",
    click: () => {
      store.dispatch(logoutUser());
      (window as any)
        .require("electron")
        .remote.session.defaultSession.cookies.remove(
          "http://localhost:3000",
          "jid"
        )
        .then(() => {
          localStorage.setItem("cookie", "");
          ipcRenderer.send("RESTART_APP");
        });
    }
  },
  {
    id: 173,
    label: "Export",
    click: () => {
      store.dispatch(toggleCapture());
      ipcRenderer.send("CREATE_MATERIAL_EXPORTER");
    }
  },
  {
    id: 171,
    label: "divider"
  },
  {
    id: 18,
    label: "Exit"
  }
];

const editMenu: menuBarItem[] = [
  {
    id: 21,
    label: "Undo",
    shortcut: "Ctrl + Z"
  },
  {
    id: 22,
    label: "Redo",
    shortcut: "Ctrl + Shift + Z"
  },
  {
    id: 221,
    label: "divider"
  },
  {
    id: 23,
    label: "Cut",
    shortcut: "Ctrl + X"
  },
  {
    id: 24,
    label: "Copy",
    shortcut: "Ctrl + C"
  },
  {
    id: 25,
    label: "Paste",
    shortcut: "Ctrl + V"
  },
  {
    id: 26,
    label: "divider"
  },
  {
    id: 26,
    label: "Proj. Options",
    click: () => {
      ipcRenderer.send("OPEN_PROJECT_SETTINGS");
    }
  }
];

const viewMenu: menuBarItem[] = [
  {
    id: 31,
    label: "Online Status"
  },
  {
    id: 32,
    label: "File Name"
  }
];

const helpMenu: menuBarItem[] = [
  {
    id: 41,
    label: "Welcome"
  },
  {
    id: 42,
    label: "About Us"
  },
  {
    id: 43,
    label: "Our Website"
  }
];

export const menuBarItems: menuBarItem[] = [
  {
    id: 1,
    label: "File",
    submenu: fileMenu
  },
  {
    id: 2,
    label: "Edit",
    submenu: editMenu
  },
  {
    id: 3,
    label: "View",
    submenu: viewMenu
  },
  {
    id: 4,
    label: "Help",
    submenu: helpMenu
  }
];
