import { PerspectiveCamera, WebGLRenderer, Vector3 as V3, LinearToneMapping, ReinhardToneMapping } from 'three';
import { mainCamera, mainScene } from './base';
import { updateMaterial } from '../materials/sphereMat'
import { convProps, canvasProps,renderProps } from './props';
import {customEventsCanv} from '../render/events'


const convCamera = new PerspectiveCamera(90, 1, 0.1, 5000);

// let convRenderers = [new WebGLRenderer(), new WebGLRenderer(), new WebGLRenderer(), new WebGLRenderer(), new WebGLRenderer(), new WebGLRenderer()]
let convRenderers = [null,null,null,null,null,null]
const updateConv = () => {
  convRenderers = convRenderers.map((r, i) => {
    const canvas = document.getElementById(`convCanv${i}`);

    convProps.refs.push(canvas);
    return new WebGLRenderer({ canvas, antialias: true });
  });
  convProps.refs.push(document.getElementById('convCanvContainer'))
  if (convProps.hdrToon) {
    convRenderers.map(renderer => {
      renderer.toneMapping = ReinhardToneMapping;
      renderer.toneMappingExposure = 4;
    })
  } else {
    convRenderers.map(renderer => {
      renderer.toneMapping = LinearToneMapping;
      renderer.toneMappingExposure = 1;
    })
  }
  console.log('EndUpdate')
  resizeConv();
  customEventsCanv();
}
const resizeConv = () => {
  console.log('resize!')
  if (convProps.refs.length !== 0) {
    const segSize = Math.floor(window.innerWidth * canvasProps.vhw / 3);
    convProps.refs[0].style.top = `${segSize}px`;
    convProps.refs[1].style.top = `${segSize}px`;
    convProps.refs[1].style.left = `${segSize}px`;
    convProps.refs[2].style.top = `${segSize}px`;
    convProps.refs[2].style.left = `${segSize * 2}px`;
    convProps.refs[3].style.top = `${segSize}px`;
    convProps.refs[3].style.left = `${segSize * 3}px`;
    convProps.refs[4].style.left = `${segSize}px`;
    convProps.refs[5].style.top = `${segSize * 2}px`;
    convProps.refs[5].style.left = `${segSize}px`;
    // thats a container of canvases
    convProps.refs[6].style.width = `${segSize * 4}px`;
    convProps.refs[6].style.height = `${segSize * 3}px`;

    convRenderers.map(renderer => {
      renderer.setSize(segSize, segSize);
    })
  }

}
const convRender = () => {
  if(convRenderers[0]){
    convCamera.rotation.set(0, 0, 0);
    const direction = new V3
    mainCamera.getWorldDirection(direction)
    const angle = direction.multiply(new V3(1, 0, 1)).angleTo(new V3(0, 0, -1));
    if (direction.x < 0) {
      convCamera.rotateY(angle);
    } else {
      convCamera.rotateY(-angle);
    }
    updateMaterial();
    convRenderers[1].render(mainScene, convCamera)
    convCamera.rotateY(-Math.PI / 2);
    updateMaterial();
    convRenderers[2].render(mainScene, convCamera)
    convCamera.rotateY(-Math.PI / 2);
    updateMaterial();
    convRenderers[3].render(mainScene, convCamera)
    convCamera.rotateY(-Math.PI / 2);
    updateMaterial();
    convRenderers[0].render(mainScene, convCamera)
    convCamera.rotateY(-Math.PI / 2);
    convCamera.rotateX(Math.PI / 2);
    updateMaterial();
    convRenderers[4].render(mainScene, convCamera)
    convCamera.rotateX(-Math.PI);
    updateMaterial();
    convRenderers[5].render(mainScene, convCamera)
  }
  
}
const setExposureConv = (val = renderProps.exposure) => {
  convRenderers.map(renderer => {
    renderer.toneMappingExposure = val;
  })
}
const hdrToneMappingConv = (hdr = true) => {
  convProps.hdrToon = hdr
  if (hdr) {
    convRenderers.map(renderer => {
      renderer.toneMapping = ReinhardToneMapping;
      renderer.toneMappingExposure = 4;
    })
  } else {
    convRenderers.map(renderer => {
      renderer.toneMapping = LinearToneMapping;
      renderer.toneMappingExposure = 1;
    })
  }
}

export { convRender, updateConv, resizeConv,hdrToneMappingConv,setExposureConv };