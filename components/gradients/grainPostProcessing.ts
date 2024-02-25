import * as THREE from 'three';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { GrainShader } from './grainPostprocessingShader';

export function initGrainFilter(
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.OrthographicCamera
) {
  const width = window.innerWidth || 2;
  const height = window.innerHeight || 2;

  const effectFilm = new ShaderPass(GrainShader);

  const rtParameters = {
    stencilBuffer: true,
  };

  const renderScenePass = new RenderPass(scene, camera);

  let composer2 = new EffectComposer(
    renderer,
    new THREE.WebGLRenderTarget(width, height, rtParameters)
  );

  composer2.setPixelRatio(window.devicePixelRatio);

  composer2.addPass(renderScenePass);
  composer2.addPass(effectFilm);

  return {
    render: (elapsed: number, delta: number) => {
      composer2.render(delta);

      effectFilm.uniforms['uTime'].value = elapsed;
    },
    resize: () => {
      const viewportSize = renderer.getSize(new THREE.Vector2());

      composer2.setSize(viewportSize.width, viewportSize.height);
    },
  };
}
