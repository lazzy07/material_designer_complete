import React, { Component } from "react";
import GradientBuilder from "../../../../GradientBuilder/GradientBuilder";
import { SketchPicker } from "react-color";
import ColorPicker from "../../../common/ColorPicker";
const WrappedSketchPicker = ({ ...rest }) => {
  return (
    <ColorPicker
      defaultColor={rest.color}
      color={rest.color}
      enableAlpha={false}
      onChangeComplete={() => {}}
      onChange={c => {
        rest.onSelect(c.hex);
      }}
    />
  );
};

interface ColorizeControllerProps {
  node: any;
  updateEngine: any;
  dimensions: any;
}

export default class ColorizeController extends Component<
  ColorizeControllerProps,
  any
> {
  initPos: any;
  constructor(props) {
    super(props);

    this.state = {
      colorSelect: false
    };
  }

  getData = () => {
    this.setState({
      ...this.props.node.data.parameters
    });
    this.initPos = this.props.node.data.parameters.positions;
  };

  setParam = (key: string, value: any) => {
    this.setState({
      [key]: value
    });
    (this.props.node.data as any).parameters[key] = value;
  };

  onSetParamEnd = () => {
    this.props.node.update();
    this.props.updateEngine();
  };

  onColorPaletteChange = (palette: { pos: number; color: string }[]) => {
    let canvas = document.createElement("canvas");
    canvas.height = 1;
    canvas.width = 256;
    let ctx = canvas.getContext("2d");

    if (ctx) {
      let grd = ctx.createLinearGradient(0, 0, 255, 0);
      palette.forEach(ele => {
        grd.addColorStop(ele.pos, ele.color);
      });
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, 255, 1);
    }
    let gradient = canvas.toDataURL("image/jpeg", 1.0);
    let str = gradient.split(",")[1];

    this.setParam("lut", str);
    this.onSetParamEnd();
  };

  componentWillMount() {
    this.getData();
  }

  render() {
    return (
      <div style={{ paddingTop: "10px" }}>
        <div>Select Color pallette</div>
        <GradientBuilder
          {...{
            width: this.props.dimensions.width - 30,
            height: 32,
            palette: [...this.initPos],
            onPaletteChange: palette2 => {
              let pal: any = [];
              palette2.forEach(ele => {
                pal.push({ pos: parseFloat(ele.pos), color: ele.color });
              });
              this.onColorPaletteChange(pal);
              this.setParam("positions", pal);
            }
          }}
        >
          <WrappedSketchPicker
            {...{
              width: 200,
              disableAlpha: true
            }}
          />
        </GradientBuilder>
      </div>
    );
  }
}
