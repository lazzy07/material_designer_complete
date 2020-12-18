import React, { Component } from "react";
import { SECONDARY_COLOR } from "../../../constants";
import MenuBar from "../menubar/MenuBar";
import Icon from "../Icon/Icon";
import FileName from "../filename/FileName";
import { menuBarItems } from "../menubar/MenubarItems";

declare global {
  interface Window {
    require: any;
  }
}

let os = window.require("os");
let remote = window.require("electron").remote;

interface Props {
  background?: boolean; //there is a top bar background?
  draggable?: boolean; //the window is draggable?
  maximize?: boolean; //window can be maximized?
  minimize?: boolean; //minimizable window?
  canClose: boolean; //closeable window?
  menubar?: boolean; //Menubar should be displayed?
  icon?: boolean; //Icon of the app should be displayed?
  fileName?: boolean; //Does opened filename should be displayed?
  title?: string; //title of the screen
  fileMenuPos?: string;
  onClose?: () => void;
}

class Controller extends Component<Props, any> {
  ref: HTMLDivElement | null = null;
  constructor(props) {
    super(props);

    this.state = {
      platform: null
    };
  }

  minimizeWindow = (): void => {
    remote.getCurrentWindow().minimize();
  };

  maximizeWindow = (): void => {
    let window = remote.BrowserWindow.getFocusedWindow();
    window.isMaximized() ? window.unmaximize() : window.maximize();
  };

  closeWindow = (): void => {
    if (this.props.canClose) {
      if (this.props.onClose) {
        this.props.onClose();
      }
      let window = remote.BrowserWindow.getFocusedWindow();
      window.close();
    }
  };

  getRef = (): HTMLDivElement | null => {
    return this.ref;
  };

  drawCircle = (color: string, onClick: any): object => {
    return (
      <div
        onClick={() => onClick()}
        style={{
          zIndex: 1000,
          marginLeft: "10px",
          width: "18px",
          height: "18px",
          borderRadius: "18px",
          backgroundColor: color
        }}
      />
    );
  };

  componentWillMount = () => {
    this.setState({
      platform: os.platform()
    });
  };

  render() {
    if (this.state.platform === "darwin") {
      return (
        <div
          ref={ref => (this.ref = ref)}
          style={{
            zIndex: 1001,
            position: "fixed",
            display: "flex",
            justifyContent: "flex-end",
            right: "0px",
            width: "100%",
            backgroundColor: this.props.background ? SECONDARY_COLOR : undefined
          }}
        >
          <div
            style={{
              paddingTop: "5px",
              display: "flex",
              paddingBottom: "5px",
              backgroundColor: SECONDARY_COLOR,
              zIndex: 1002
            }}
          >
            {this.drawCircle("#FF605C", this.closeWindow)}
            {this.props.minimize
              ? this.drawCircle("#FFBD44", this.minimizeWindow)
              : null}
            {this.props.maximize
              ? this.drawCircle("#00CA4E", this.maximizeWindow)
              : null}
          </div>
          {this.props.fileName ? (
            <div
              style={{
                position: "absolute",
                top: "3px",
                left: this.props.fileMenuPos || "50%",
                textAlign: "center"
              }}
            >
              <FileName fileName={this.props.title} />
            </div>
          ) : null}
          <div
            style={{
              width: "100%",
              WebkitAppRegion: this.props.draggable ? "drag" : "no-drag"
            }}
          />
        </div>
      );
    } else {
      return (
        <div
          ref={ref => (this.ref = ref)}
          style={{
            zIndex: 1001,
            position: "fixed",
            display: "flex",
            justifyContent: "flex-end",
            right: "0px",
            paddingRight: "15px",
            width: "100%",
            backgroundColor: this.props.background ? SECONDARY_COLOR : undefined
          }}
        >
          {this.props.icon ? <Icon /> : null}
          {this.props.menubar ? (
            <div style={{ zIndex: 1002 }}>
              <MenuBar />
            </div>
          ) : null}
          {this.props.fileName ? (
            <div
              style={{
                position: "absolute",
                top: "5px",
                left: this.props.fileMenuPos || "50%",
                textAlign: "center"
              }}
            >
              <FileName fileName={this.props.title} />
            </div>
          ) : null}
          <div
            style={{
              width: "100%",
              paddingBottom: "20px",
              WebkitAppRegion: this.props.draggable ? "drag" : "no-drag"
            }}
          />
          <div
            style={{
              display: "flex",
              paddingTop: "5px",
              paddingBottom: "5px",
              backgroundColor: this.props.background
                ? SECONDARY_COLOR
                : undefined,
              zIndex: 1002
            }}
          >
            {this.props.minimize ? (
              <i
                style={{ paddingLeft: "5px", paddingRight: "5px" }}
                onClick={() => this.minimizeWindow()}
                className="fas fa-window-minimize"
              />
            ) : null}
            {this.props.maximize ? (
              <i
                onClick={() => this.maximizeWindow()}
                style={{
                  paddingLeft: "5px",
                  paddingRight: "5px",
                  fontSize: "20px",
                  marginLeft: "15px"
                }}
                className="far fa-window-maximize"
              />
            ) : null}
            <i
              onClick={() => this.closeWindow()}
              style={{
                fontSize: "23px",
                marginLeft: "15px",
                paddingLeft: "5px",
                paddingRight: "5px"
              }}
              className="fas fa-times"
            />
          </div>
        </div>
      );
    }
  }
}

export default Controller;
