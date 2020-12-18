import React, { Component, ReactElement } from "react";
import { menuBarItem, menuBarItems } from "./MenubarItems";
import { Dropdown, Divider } from "react-materialize";
import "jquery";
import "materialize-css/dist/js/materialize.js";
import "materialize-css/dist/css/materialize.css";

import "../../../css/menubar.css";

interface MenuBarState {}

interface MenuBarProps {
  menu?: menuBarItem[];
}

export default class MenuBar extends Component<MenuBarProps, MenuBarState> {
  dropDowns: HTMLDivElement[] = [];

  renderDropdowns = (menuItems: menuBarItem[]): ReactElement[] => {
    let dropDowns: ReactElement[] = [];

    menuItems.forEach((elem, i) => {
      let drops: ReactElement[] = [];

      if (elem.submenu) {
        elem.submenu.forEach((subMenuItem, index) => {
          if (subMenuItem.label === "divider") {
            drops.push(<Divider key={index} />);
          } else {
            drops.push(
              <div
                className={`dropdownSubElement`}
                key={index}
                style={{ display: "flex", flexDirection: "row" }}
                onClick={subMenuItem.click ? subMenuItem.click : undefined}
              >
                <div
                  style={{
                    width: "100%",
                    textAlign: "left"
                  }}
                >
                  {subMenuItem.label}
                </div>
                <div
                  style={{
                    width: "100%",
                    alignSelf: "flex-end",
                    textAlign: "right",
                    fontSize: "13px"
                  }}
                >
                  {subMenuItem.shortcut}
                </div>
              </div>
            );
          }
        });
      }

      dropDowns.push(
        <Dropdown
          id={`dd_trigger_${i}`}
          className="dropDownBlock"
          key={i}
          options={{
            coverTrigger: false,
            constrainWidth: false,
            constraintHeight: false
          }}
          trigger={
            <div className="menubarbutton" style={{ zIndex: 1002 }}>
              {elem.label}
            </div>
          }
        >
          {drops}
        </Dropdown>
      );
    });
    return dropDowns;
  };

  componentDidMount() {}

  render() {
    return (
      <div
        style={{
          display: "flex",
          paddingTop: "5px",
          paddingLeft: "15px",
          overflow: "hiddden"
        }}
        className="menubarBlock"
      >
        {this.renderDropdowns(this.props.menu ? this.props.menu : menuBarItems)}
      </div>
    );
  }
}
