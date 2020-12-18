import React, { Component } from "react";
import {
  Camera,
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  PlaneGeometry,
  Mesh,
  BoxGeometry,
  UnsignedByteType,
  TextureLoader,
  Texture,
  MeshStandardMaterial,
  AmbientLight,
  HalfFloatType,
  SphereGeometry
} from "three/src/Three";

import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Renderer } from "three/src/renderers/WebGLRenderer";
import { renderGraphicsMenu } from "./GraphicsEngineMenu";
import MenuBarSecondary from "../common/MenuBarSecondary";
import {
  DEFAULT_COLOR,
  MATERIAL_DEFAULT_COLOR,
  ENVMAP_DIRECTORY
} from "../../constants";
import { connect } from "react-redux";
import { Store } from "../../redux/reducers";
import { DropTarget } from "react-dnd";
import { DRAG_ENV_MAP } from "../../constants/dragtypes";
import { MatEnvMap } from "../../redux/types";
import { readFile } from "../../services/read_file/ReadFile";
import { EquirectangularToCubeGenerator } from "three/examples/jsm/loaders/EquirectangularToCubeGenerator";
import { PMREMGenerator } from "three/examples/jsm/pmrem/PMREMGenerator.js";
import { PMREMCubeUVPacker } from "three/examples/jsm/pmrem/PMREMCubeUVPacker.js";
import OptionsPane from "./OptionsPane";
import {
  changeEnvmapExposure,
  changeEnvmap,
  changeGeometry,
  changeSubdivisions,
  changeWireframe
} from "../../redux/actions/ProjectActions";
import Material from "./Material";
import { toggleCapture, setCapture } from "../../redux/actions/MaterialActions";
import GLTFExporter from "three-gltf-exporter";
import { addMaterialTextures } from "./../../redux/actions/MaterialActions";

interface GraphicsEngineProps {
  dimensions?: { width: number; height: number };
  environmentMap: string;
  envMapPath: string;
  loadGeometry?: (type: string) => void;
  toggleCapture: () => void;
  setCapture: (capture: string) => void;
  startCapture: boolean;
  addMaterialTextures: (textures: any) => void;
}

interface GraphicsEngineState {
  optionsPane: string;
}

class GraphicsEngine extends Component<
  GraphicsEngineProps,
  GraphicsEngineState
> {
  graphicsRendererDiv: HTMLDivElement | null = null;
  camera: Camera | null = null;
  scene: Scene | null = null;
  renderer: Renderer | null = null;
  frameId: number = 0;
  //Controls
  controls: any | null;
  geometry: Mesh | null = null;
  geometryType: string = "";
  geometrySubdivision: number = 0;
  exrBackground: Texture | null = null;
  cubeMap: any;
  material = Material.getMaterial();

  constructor(props) {
    super(props);

    this.state = {
      optionsPane: ""
    };
  }

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
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

  stop = () => {
    cancelAnimationFrame(this.frameId);
  };

  addPlaneGeometry = (width: number, height: number, subdivisions: number) => {
    let plane = new PlaneGeometry(width, height, subdivisions, subdivisions);
    return new Mesh(plane, this.material);
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

  addShpereGeometry = (radius: number, subdivisions: number) => {
    let geometry = new SphereGeometry(radius, subdivisions, subdivisions);
    return new Mesh(geometry, this.material);
  };

  loadHdrFormat = (data: string) => {
    return new Promise((resolve, reject) => {
      try {
        new RGBELoader()
          .setType(UnsignedByteType)
          .load("data:application/octet-stream;base64," + data, texture => {
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

  loadJpgPngFormat = (data: string, type: string) => {
    return new Promise((resolve, reject) => {
      try {
        const textureLoader = new TextureLoader();
        textureLoader.load(`data:image/${type};base64,` + data, texture => {
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

  loadEnvMap = async (envMapPath: string) => {
    readFile(this.props.envMapPath + "/" + envMapPath)
      .then(async file => {
        let envMap: MatEnvMap | undefined = JSON.parse(file.toString());
        if (envMap) {
          let type = envMap.mime.split("/")[1];
          let environment: any = null;
          switch (type) {
            case "hdr":
              environment = await this.loadHdrFormat(envMap.data);
              break;

            case "png":
            case "jpg":
            case "jpeg":
              environment = await this.loadJpgPngFormat(
                envMap.data,
                envMap.mime
              );
              break;
          }

          var cubemapGenerator = new EquirectangularToCubeGenerator(
            environment,
            { resolution: 1024, type: HalfFloatType }
          );
          this.exrBackground = (cubemapGenerator as any).renderTarget;

          var cubeMapTexture = cubemapGenerator.update(this.renderer as any);
          var pmremGenerator = new PMREMGenerator(cubeMapTexture);
          pmremGenerator.update(this.renderer as any);
          var pmremCubeUVPacker = new PMREMCubeUVPacker(
            pmremGenerator.cubeLods
          );
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
            (this.props as any).changeEnvmap(envMapPath);
          }
        }
      })
      .catch(err => {
        console.log(err);
        //TODO: Handle Error
      });
  };

  loadGeometry = (type: string, subdivision = 100) => {
    if (this.geometry && this.scene) {
      this.scene.remove(this.geometry);
    }
    switch (type) {
      case "plane":
        //Add geometry
        this.geometry = this.addPlaneGeometry(7, 7, subdivision);
        this.geometry.rotateX(-Math.PI / 2);
        break;

      case "cube":
        //Add geometry
        this.geometry = this.addCubeGeometry(4, subdivision);
        break;

      case "sphere":
        this.geometry = this.addShpereGeometry(3, subdivision);
        break;

      case "custom":
        break;
    }

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

  toggleOptionsPane = () => {
    if (this.state.optionsPane === "") {
      return "";
    } else {
      return this.state.optionsPane;
    }
  };

  optionPaneClose = () => {
    this.setState({
      optionsPane: ""
    });
  };

  changeOptionPane = (type: string) => {
    this.setState({
      optionsPane: type
    });
  };

  changeEnvmapExposure = (value: number) => {
    if (this.renderer) {
      (this.props as any).changeEnvmapExposure(value);
      (this.renderer as any).toneMappingExposure = value;
    }
  };

  changeSubdivision = (value: number) => {
    (this.props as any).changeSubdivisions(value);
    this.loadGeometry((this.props as any).geometry.type, value);
  };

  toggleWireframe = () => {
    if (!(this.props as any).geometry.wireframe) {
      this.material.wireframe = true;
      (this.material as any).needsUpdate = true;
    } else {
      this.material.wireframe = false;
      (this.material as any).needsUpdate = true;
    }

    console.log((this.props as any).geometry.wireframe);
    (this.props as any).changeWireframe();
  };

  async componentDidMount() {
    if (this.props.dimensions) {
      let height = 1000;
      let width = 1000;
      this.camera = new PerspectiveCamera(70, width / height, 0.1, 1000);
      this.camera.position.z = 10;
      this.scene = new Scene();

      await this.loadEnvMap("autumn_ground_4k.matenv");

      //Loading geometry
      this.loadGeometry(
        (this.props as any).geometry.type,
        (this.props as any).geometry.subdivision
      );

      if (this.geometry) {
        this.camera.lookAt(this.geometry.position);
      }

      //Rendering process
      this.renderer = new WebGLRenderer({
        antialias: true,
        preserveDrawingBuffer: true
      });
      if (this.renderer) {
        this.controls = new OrbitControls(
          this.camera,
          this.renderer.domElement
        );
        this.controls.keys = false;
        this.controls.minDistance = 1;
        this.controls.maxDistance = 100;
      }

      var light = new AmbientLight(0x404040); // soft white light
      this.scene.add(light);

      //Loading geometry manipulations
      if ((this.props as any).geometry.wireframe) {
        this.material.wireframe = true;
        (this.material as any).needsUpdate = true;
      }

      //manipulate envmap
      (this.renderer as any).toneMappingExposure = (this.props
        .environmentMap as any).exposure;

      //Positioning camera
      this.camera.position.set(2, 2, 5);

      //Set renderer background color
      (this.renderer as any).setClearColor(DEFAULT_COLOR);
      if (this.graphicsRendererDiv) {
        this.graphicsRendererDiv.appendChild(this.renderer.domElement);
      }
    }
    this.start();
  }

  render() {
    if (this.renderer && this.scene && this.props.startCapture) {
      var strMime = "image/jpeg";
      const imgData = this.renderer.domElement.toDataURL(strMime);
      this.props.setCapture(imgData);

      const material = Material.getMaterial();

      const data = {
        baseColor: material.color,
        baseColorMap: material.map ? material.map.image.currentSrc : "",

        bumpScale: material.bumpScale,
        bumpMap: material.bumpMap ? material.bumpMap.image.currentSrc : "",

        roughness: material.roughness,
        roughnessMap: material.roughnessMap
          ? material.roughnessMap.image.currentSrc
          : "",

        emissive: material.emissive,
        emissiveMap: material.emissiveMap
          ? material.emissiveMap.image.currentSrc
          : "",

        metalness: material.metalness,
        metalnessMap: material.metalnessMap
          ? material.metalnessMap.image.currentSrc
          : ""
      };
      this.props.addMaterialTextures(data);
      this.props.toggleCapture();
    }

    if (this.renderer && this.props.dimensions && this.camera) {
      this.renderer.setSize(
        this.props.dimensions.width,
        this.props.dimensions.height - 30
      );
      (this.camera as any).aspect =
        this.props.dimensions.width / (this.props.dimensions.height - 30);
      (this.camera as any).updateProjectionMatrix();
    }

    const { connectDropTarget, hovered, item } = this.props as any;

    const loadGeo = {
      plane: () => {
        this.props.loadGeometry ? this.props.loadGeometry("plane") : () => {};
        this.loadGeometry("plane", (this.props as any).geometry.subdivision);
      },
      sphere: () => {
        this.props.loadGeometry ? this.props.loadGeometry("sphere") : () => {};
        this.loadGeometry("sphere", (this.props as any).geometry.subdivision);
      },
      cube: () => {
        this.props.loadGeometry ? this.props.loadGeometry("cube") : () => {};
        this.loadGeometry("cube", (this.props as any).geometry.subdivision);
      },
      custom: () => {
        this.props.loadGeometry ? this.props.loadGeometry("custom") : () => {};
        this.loadGeometry("custom", (this.props as any).geometry.subdivision);
      },
      options: type => this.changeOptionPane(type)
    };

    return connectDropTarget(
      <div>
        <MenuBarSecondary
          menu={renderGraphicsMenu(loadGeo)}
          zIndex={1000}
          index={100}
        />
        <div
          style={{
            width: "100%"
          }}
          ref={ref => (this.graphicsRendererDiv = ref)}
        ></div>
        <div>
          <OptionsPane
            subdivision={(this.props as any).geometry.subdivision}
            envExposure={(this.props.environmentMap as any).exposure}
            wireframe={(this.props as any).geometry.wireframe}
            changeEnvmapExposure={(value: number) =>
              this.changeEnvmapExposure(value)
            }
            changeSubdivision={(value: number) => {
              this.changeSubdivision(value);
            }}
            toggleWireframe={this.toggleWireframe}
            pane={this.toggleOptionsPane}
            close={this.optionPaneClose}
          />
        </div>
      </div>
    );
  }
}

export const mapStateToProps = (state: Store) => {
  return {
    environmentMap: state.project.config.envMap,
    envMapPath: state.file.resourcesPath + "/" + ENVMAP_DIRECTORY,
    geometry: state.project.config.geometry,
    startCapture: state.material.startCapture
  };
};

export const mapDispatchToProps = {
  toggleCapture,
  setCapture,
  changeEnvmapExposure,
  changeEnvmap,
  loadGeometry: changeGeometry,
  changeSubdivisions,
  addMaterialTextures,
  changeWireframe
};

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
    item: monitor.getItem()
  };
};

const target = {
  drop: (props, monitor, component: GraphicsEngine) => {
    let name = monitor.getItem().element;
    component.loadEnvMap(name ? name : "");
  }
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DropTarget(DRAG_ENV_MAP, target, collect)(GraphicsEngine as any)) as any;
