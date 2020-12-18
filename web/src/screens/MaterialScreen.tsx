import React, { Component } from "react";
import {
  Camera,
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Mesh,
  BoxGeometry,
  TextureLoader,
  Texture,
  AmbientLight,
  HalfFloatType
} from "three/src/Three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Renderer } from "three/src/renderers/WebGLRenderer";
import { MeshStandardMaterial, DoubleSide } from "three";
import { EquirectangularToCubeGenerator } from "three/examples/jsm/loaders/EquirectangularToCubeGenerator";
import { PMREMGenerator } from "three/examples/jsm/pmrem/PMREMGenerator.js";
import { PMREMCubeUVPacker } from "three/examples/jsm/pmrem/PMREMCubeUVPacker.js";
import UserInfo from "../components/profile/UserInfo";
import { renderTags } from "../services/RenderTags";
import ScreenButton from "../components/screen_button/ScreenButton";
import { SECONDARY_COLOR } from "../constants";
import ParticleBackground from "../components/common/ParticleBackground";

export default class MaterialScreen extends Component {
  graphicsRendererDiv: HTMLDivElement | null = null;
  camera: Camera | null = null;
  scene: Scene | null = null;
  renderer: Renderer | null = null;
  frameId: number = 0;
  controls: any | null;
  geometry: Mesh | null = null;
  geometryType: string = "";
  geometrySubdivision: number = 0;
  exrBackground: Texture | null = null;
  cubeMap: any;
  material: any | undefined;

  loadJpgPngFormat = () => {
    return new Promise((resolve, reject) => {
      try {
        const textureLoader = new TextureLoader();
        textureLoader.load("/dependencies/img/hdri.jpeg", texture => {
          if (texture) {
            texture.flipY = true;
            resolve(texture);
          } else {
            reject(new Error("Texture coln't be loaded"));
          }
        });
      } catch (err) {
        reject(err);
      }
    });
  };

  loadEnvMap = async () => {
    let environment: any = await this.loadJpgPngFormat();
    var cubemapGenerator = new EquirectangularToCubeGenerator(environment, {
      resolution: 1024,
      type: HalfFloatType
    });
    this.exrBackground = (cubemapGenerator as any).renderTarget;

    var cubeMapTexture = cubemapGenerator.update(this.renderer as any);
    var pmremGenerator = new PMREMGenerator(cubeMapTexture);
    pmremGenerator.update(this.renderer as any);
    var pmremCubeUVPacker = new PMREMCubeUVPacker(pmremGenerator.cubeLods);
    pmremCubeUVPacker.update(this.renderer as any);
    this.cubeMap = pmremCubeUVPacker.CubeUVRenderTarget;
    environment.dispose();
    pmremGenerator.dispose();
    pmremCubeUVPacker.dispose();

    if (this.scene && this.geometry) {
      let newEnvMap = (this.geometry.material as any).envMap;
      let background = this.scene.background;
      newEnvMap = this.cubeMap ? this.cubeMap.texture : null;
      background = this.exrBackground;

      if (newEnvMap !== (this.geometry.material as any).envMap) {
        (this.geometry.material as any).envMap = newEnvMap;
        (this.geometry.material as any).needsUpdate = true;
      }
      this.scene.background = background;
    }
  };

  addCubeGeometry = (dimension: number, subdivisions: number) => {
    let box = new BoxGeometry(
      dimension,
      dimension,
      dimension,
      subdivisions,
      subdivisions,
      subdivisions
    );

    return new Mesh(box, this.material);
  };

  loadGeometry = (subdivision = 100) => {
    if (this.geometry && this.scene) {
      this.scene.remove(this.geometry);
    }

    this.geometry = this.addCubeGeometry(4, subdivision);

    if (this.scene && this.geometry) {
      if (this.cubeMap) {
        (this.geometry.material as any).envMap = this.cubeMap.texture;
        (this.geometry.material as any).needsUpdate = true;
      }
      this.geometry.position.set(0, 0, 0);
      this.geometry.name = "geometry";
      this.scene.add(this.geometry);
    }
  };

  renderScene = () => {
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    } else {
      console.log(
        `Rendering not possible::: one of the rendering requirements haven't been met`
      );
    }
  };

  animate = () => {
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  };

  start = () => {
    if (!this.controls && this.renderer && this.camera) {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.keys = false;
      this.controls.minDistance = 1;
      this.controls.maxDistance = 100;
    }

    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  };

  stop = () => {
    cancelAnimationFrame(this.frameId);
  };

  componentDidMount = async () => {
    this.material = new MeshStandardMaterial({
      color: "#949392",
      roughness: 0.98,
      side: DoubleSide
    });

    if (this.graphicsRendererDiv) {
      this.camera = new PerspectiveCamera(
        70,
        this.graphicsRendererDiv.clientWidth /
          this.graphicsRendererDiv.clientHeight,
        0.1,
        1000
      );
      this.camera.position.z = 10;
      this.scene = new Scene();
    }

    //Loading geometry
    this.loadGeometry(100);

    if (this.geometry && this.camera) {
      this.camera.lookAt(this.geometry.position);
    }

    //Rendering process
    this.renderer = new WebGLRenderer({
      antialias: true
    });

    await this.loadEnvMap();

    if (this.renderer) {
      if (this.graphicsRendererDiv)
        this.renderer.setSize(
          this.graphicsRendererDiv.clientWidth,
          this.graphicsRendererDiv.clientHeight
        );
    }

    var light = new AmbientLight(0x404040); // soft white light
    this.scene!.add(light);

    //manipulate envmap

    //Positioning camera
    this.camera!.position.set(2, 2, 5);

    //Set renderer background color
    (this.renderer as any).setClearColor("#ffffff");
    if (this.graphicsRendererDiv) {
      this.graphicsRendererDiv.appendChild(this.renderer.domElement);
    }
    this.start();
    window.addEventListener("resize", this.updateDimensions);
  };

  updateDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    if (this.renderer && this.camera && this.graphicsRendererDiv) {
      this.renderer.setSize(
        this.graphicsRendererDiv.clientWidth,
        this.graphicsRendererDiv.clientHeight
      );
      (this.camera as any).aspect =
        this.graphicsRendererDiv.clientWidth /
        this.graphicsRendererDiv.clientHeight;
      (this.camera as any).updateProjectionMatrix();
    }

    return (
      <div style={{ paddingTop: 10 }}>
        <div className="row" style={{ padding: 10 }}>
          <div className="col s12 m6">
            <div
              style={{
                width: "100%",
                height: "500px",
                borderRadius: 20,
                backgroundColor: SECONDARY_COLOR
              }}
              ref={ref => (this.graphicsRendererDiv = ref)}
            ></div>
          </div>
          <div className="col s12 m6" style={{ paddingTop: 20 }}>
            <div style={{ opacity: 0.6 }}>
              <ParticleBackground />
            </div>
            <UserInfo
              user={{
                userName: "@lazzy07",
                lastName: "Senanayake",
                firstName: "Lasantha"
              }}
            />
            <h5>Material 01</h5>
            <p style={{ paddingRight: 5 }}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Accusamus recusandae ipsum quod totam obcaecati est et fugit
              numquam aliquam? Distinctio harum, magnam tempore ullam nihil
              praesentium vero accusantium deleniti incidunt corporis, ab quo
              odio nostrum impedit architecto a quibusdam ut sapiente ipsum?
              Enim, placeat accusantium? Ratione iusto inventore sapiente
              repellat.
            </p>

            {renderTags(["hello", "world"])}
            <div
              style={{
                paddingTop: 10,
                display: "flex",
                justifyContent: "center"
              }}
            >
              <ScreenButton title="Add to my library" onClick={() => {}} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
