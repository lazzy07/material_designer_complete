import React, { Component } from "react";
import ReactDOM from "react-dom";
import { store } from "../../redux/store";
import { Provider } from "react-redux";

interface Props {}

export default class Modal extends Component<Props, any> {
  modalTarget: any;

  componentDidMount = () => {
    this.modalTarget = document.createElement("div");
    this.modalTarget.className = "modal";
    document.body.appendChild(this.modalTarget);
    this._render();
  };

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.modalTarget);
    document.body.removeChild(this.modalTarget);
  }

  _render = () => {
    ReactDOM.render(
      <Provider store={store}>
        <div>{this.props.children}</div>
      </Provider>,
      this.modalTarget
    );
  };

  UNSAFE_componentWillUpdate = () => {
    this._render();
  };

  render() {
    return <noscript />;
  }
}
