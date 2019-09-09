import { Engine } from "@babylonjs/core";
import { Component, Prop, h } from "@stencil/core";

import { format } from "../../utils/utils";

@Component({
  tag: "my-component",
  styleUrl: "my-component.css",
  shadow: true
})
export class MyComponent {
  /**
   * The first name
   */
  @Prop() first: string;

  /**
   * The middle name
   */
  @Prop() middle: string;

  /**
   * The last name
   */
  @Prop() last: string;

  private canvas?: HTMLCanvasElement;

  private getText(): string {
    return format(this.first, this.middle, this.last);
  }

  componentDidRender() {
    new Engine(this.canvas, true, {
      deterministicLockstep: true,
      lockstepMaxSteps: 32,
      preserveDrawingBuffer: true,
      stencil: true
    });
  }

  render() {
    return (
      <div>
        <div>Hello, World! I'm {this.getText()}</div>
        <canvas
          ref={(canvas: HTMLCanvasElement) => (this.canvas = canvas)}
        ></canvas>
      </div>
    );
  }
}
