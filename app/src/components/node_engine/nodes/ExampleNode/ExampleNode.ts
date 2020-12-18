import Rete from "rete";
import { GRAYSCALE_SOCKET } from "../../types";
import { imageViewer } from "../../controllers/ImageViewer";

class NumControl extends Rete.Control {
  render: string;
  component: any;
  props: object;

  constructor(emitter: string, key: string, name: string) {
    super(key);
    this.key = key;
    this.render = "react";
    this.component = imageViewer; //use functional components
    this.data = "lol";
    this.props = { emitter, name, getMad: this.data };
  }
}

export default class NumComponent extends Rete.Component {
  constructor() {
    super("Greyscale");
  }

  async builder(node): Promise<any> {
    let out = new Rete.Output("num", "Number", GRAYSCALE_SOCKET);
    let out2 = new Rete.Output("num1", "Number", GRAYSCALE_SOCKET);

    let input = new Rete.Input("num2", "Get String", GRAYSCALE_SOCKET);
    let input2 = new Rete.Input("num3", "Get String", GRAYSCALE_SOCKET);

    let control = new NumControl(this.editor, "Get number as file", "false");

    node.meta = { type: "Grayscale" };

    return node
      .addControl(control)
      .addInput(input)
      .addInput(input2)
      .addOutput(out)
      .addOutput(out2);
  }

  worker(node, inputs, outputs) {
    outputs[0] = node.data.num;
  }
}
