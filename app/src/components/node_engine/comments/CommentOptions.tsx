import React, { Component } from "react";
import { AlphaPicker, HuePicker, CirclePicker } from "react-color";
import Inputbox from "../../elements/form/Inputbox";

interface CommentOptionsProps {
  comment: any;
}

interface CommentOptionsState {
  data: any;
  name: string | undefined;
}

export default class CommentOptions extends Component<
  CommentOptionsProps,
  CommentOptionsState
> {
  constructor(props) {
    super(props);

    this.state = {
      data: { backgroundColor: { r: 0, g: 0, b: 0, a: 1 }, color: "#ffffff" },
      name: undefined
    };
  }

  updateColor = color => {
    if (this.props.comment) {
      this.props.comment.data.backgroundColor = color;
      this.props.comment.setStyles();
      this.props.comment.update();
    }
  };

  updateTextColor = color => {
    if (this.props.comment) {
      this.props.comment.data.color = color;
      this.props.comment.setStyles();
      this.props.comment.update();
    }
  };

  updateTitle = title => {
    this.props.comment.text = title;
    this.props.comment.update();
  };

  addDataToState = () => {
    if (this.props.comment) {
      this.setState({
        data: this.props.comment.data,
        name: this.props.comment.text
      });
    }
  };

  handleTextColor = color => {
    this.setState({
      data: {
        ...this.state.data,
        color: color.hex
      }
    });
    this.updateTextColor(color.hex);
  };

  handleBackgroundColor = (color, item) => {
    let col = { ...color.rgb };
    if (item === "alpha") {
      col = { ...color.rgb };
      this.setState({
        data: {
          ...this.state.data,
          backgroundColor: { ...color.rgb }
        }
      });
    } else {
      col = { ...color.rgb, a: this.state.data.backgroundColor.a };
      this.setState({
        data: {
          ...this.state.data,
          backgroundColor: { ...col }
        }
      });
    }
    this.updateColor(col);
  };

  setName = (name: string) => {
    this.setState({
      name
    });
    this.updateTitle(name);
  };

  componentWillMount() {
    this.addDataToState();
  }

  render() {
    return (
      <div style={{ paddingTop: 10 }}>
        <div>Change comment background</div>
        <div style={{ paddingTop: 3, paddingBottom: 17 }}>
          <div>
            <HuePicker
              width={"100%"}
              color={this.state.data.backgroundColor}
              onChangeComplete={color =>
                this.handleBackgroundColor(color, "color")
              }
            />
          </div>
          <div style={{ paddingTop: 3 }}>
            <AlphaPicker
              width={"100%"}
              color={this.state.data.backgroundColor}
              onChangeComplete={color =>
                this.handleBackgroundColor(color, "alpha")
              }
            />
          </div>
        </div>
        <div style={{ paddingTop: 10 }}>Change comment text color</div>
        <div style={{ paddingTop: 3, paddingBottom: 17 }}>
          <div>
            <CirclePicker
              colors={["#ffffff", "#000000", "#e8232d", "#252525"]}
              width={"100%"}
              color={this.state.data.color}
              onChangeComplete={color => this.handleTextColor(color)}
            />
          </div>
        </div>
        <div style={{ paddingTop: 20 }}>
          <Inputbox
            width={"100%"}
            value={this.state.name || ""}
            name="color_name"
            onChange={(key, value) => this.setName(value)}
            label="Comment"
            placeholder="Enter comment title"
          />
        </div>
      </div>
    );
  }
}
