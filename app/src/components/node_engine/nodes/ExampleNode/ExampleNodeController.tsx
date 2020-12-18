import React, { Component } from "react";

export default class ExampleNodeController extends Component<any, any> {
  componentDidMount() {
    console.log(this.props.getData());
  }

  render() {
    return (
      <div>
        <button>Lol</button>
      </div>
    );
  }
}
