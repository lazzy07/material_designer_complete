import React, { Component } from "react";

interface Props {
  id: string;
  title: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
}

interface State {}

export default class TextArea extends Component<Props, State> {
  handleChange = event => {
    this.props.onChange(event.target.value);
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.props.onSubmit) {
      this.props.onSubmit();
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="input-field">
          <textarea
            onChange={this.handleChange}
            value={this.props.value}
            style={{ color: "white" }}
            id={this.props.id}
            className="materialize-textarea"
          ></textarea>
          <label htmlFor={this.props.id}>{this.props.title}</label>
        </div>
      </form>
    );
  }
}
