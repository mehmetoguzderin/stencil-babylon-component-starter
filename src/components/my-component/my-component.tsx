import "@babylonjs/core/Animations/animatable";
import "@babylonjs/core/Audio/audioEngine";
import "@babylonjs/core/Audio/audioSceneComponent";
import "@babylonjs/core/Culling/ray";
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/core/Helpers/sceneHelpers";
import "@babylonjs/core/Meshes/meshBuilder";
import "@babylonjs/core/Physics/physicsEngineComponent";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import "pepjs";

import { Color4, Engine, Scene } from "@babylonjs/core";
import { Component, h, Prop } from "@stencil/core";

import SPECTOR from "spectorjs";

@Component({
  tag: "my-component",
  styleUrl: "my-component.css",
  shadow: true
})
export class MyComponent {
  /**
   * The clear color
   */
  @Prop() clearColor: string;

  private canvas?: HTMLCanvasElement;

  componentDidRender() {
    let spector = new SPECTOR.Spector();
    spector.displayUI(true);
    spector.getCaptureUI().updateCanvasesList([this.canvas]);

    let engine = new Engine(this.canvas, true, {
      deterministicLockstep: true,
      lockstepMaxSteps: 32,
      preserveDrawingBuffer: true,
      stencil: true
    });

    let scene = new Scene(engine);
    scene.clearColor = Color4.FromHexString(this.clearColor);

    scene.render();
  }

  render() {
    return (
      <canvas
        ref={(canvas: HTMLCanvasElement) => (this.canvas = canvas)}
      ></canvas>
    );
  }
}
