import React, { Component } from "react";
import Inputbox from "../elements/form/Inputbox";
import { Menu, Item } from "react-contexify";
import { theme, animation } from "react-contexify";

const contextmenuItemStyles: React.CSSProperties = {};

export interface ContextmenuElement {
  title: string;
  onClick?: (event: Event, props: any) => void;
}

interface ContextmenuProps {
  serchbox?: boolean;
  editorElements: ContextmenuElement[];
  nodeElements: ContextmenuElement[];
}

interface ContextmenuState {
  search: string;
}

export default class Contextmenu extends Component<
  ContextmenuProps,
  ContextmenuState
> {
  constructor(props) {
    super(props);

    this.state = {
      search: ""
    };
  }

  renderElements = (elems: ContextmenuElement[]) => {
    let retItems: any[] = [];
    elems.forEach((elem, index) => {
      if (elem.title.toLowerCase().includes(this.state.search.toLowerCase())) {
        retItems.push(
          <Item
            className="node_context_menu_item"
            onClick={({ event, props }) => {
              elem.onClick ? elem.onClick(event, props) : undefined;
            }}
            key={index}
          >
            <div style={contextmenuItemStyles}>{elem.title}</div>
          </Item>
        );
      }
    });

    return retItems;
  };

  renderSearch = () => {
    return (
      <Item disabled>
        <div style={contextmenuItemStyles}>
          <Inputbox
            autofocus
            value={this.state.search}
            name="menu_search"
            onChange={(_, value) => this.setState({ search: value })}
          />
        </div>
      </Item>
    );
  };

  render() {
    return (
      <div>
        <Menu
          onShown={() => this.setState({ search: "" })}
          style={{ maxHeight: "300px", overflowY: "auto" }}
          id="editor_menu"
          theme={theme.dark}
          animation={animation.zoom}
        >
          {this.props.serchbox ? this.renderSearch() : null}
          {this.renderElements(this.props.editorElements)}
        </Menu>
        <Menu id="node_menu" theme={theme.dark} animation={animation.zoom}>
          {this.renderElements(this.props.nodeElements)}
        </Menu>
      </div>
    );
  }
}
