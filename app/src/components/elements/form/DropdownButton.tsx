import React, { Component, ReactElement } from "react";
import { Dropdown, Divider, Button, Icon } from "react-materialize";
// import Button from "./Button";

import "jquery";
import "materialize-css/dist/js/materialize.js";
import "materialize-css/dist/css/materialize.css";

export interface DropdownItem {
  title: string;
  click: (itemTitle: string) => void;
}

interface DropdownButtonProps {
  title: string;
  dropdownItems: DropdownItem[];
}

export default class DropdownButton extends Component<
  DropdownButtonProps,
  any
> {
  renderDropdowns = (menu: DropdownItem[]): ReactElement[] => {
    let drops: ReactElement[] = [];
    menu.forEach((subMenuItem, index: number) => {
      if (subMenuItem.title === "divider") {
        drops.push(<Divider key={index} />);
      } else {
        drops.push(
          <div
            className={`dropdownSubElement`}
            key={index}
            style={{ display: "flex", flexDirection: "row" }}
            onClick={() => subMenuItem.click(subMenuItem.title)}
          >
            <div
              style={{
                width: "100%",
                textAlign: "left",
                marginBottom: 0
              }}
            >
              {subMenuItem.title}
            </div>
          </div>
        );
      }
    });
    return drops;
  };

  render() {
    return (
      <div>
        <Dropdown
          className="dropDownBlock"
          options={{
            coverTrigger: false,
            constrainWidth: false,
            constraintHeight: false
          }}
          trigger={
            <Button>
              {this.props.title}{" "}
              <Icon style={{ marginLeft: "0px" }} right>
                keyboard_arrow_down
              </Icon>
            </Button>
          }
        >
          {this.renderDropdowns(this.props.dropdownItems)}
        </Dropdown>
      </div>
    );
  }
}
