import * as THREE from 'three';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { DotScreenPass } from 'three/examples/jsm/postprocessing/DotScreenPass';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass';
import { TexturePass } from 'three/examples/jsm/postprocessing/TexturePass';
import { BleachBypassShader } from 'three/examples/jsm/shaders/BleachBypassShader';
import { ColorifyShader } from 'three/examples/jsm/shaders/ColorifyShader';
import { HorizontalBlurShader } from 'three/examples/jsm/shaders/HorizontalBlurShader';
import { VerticalBlurShader } from 'three/examples/jsm/shaders/VerticalBlurShader';
import { SepiaShader } from 'three/examples/jsm/shaders/SepiaShader';
import { VignetteShader } from 'three/examples/jsm/shaders/VignetteShader';
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader';
import { GrainShader } from './grainPostprocessingShader';

export function initGrainFilter(
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.OrthographicCamera
) {
  let composerScene;
  const width = window.innerWidth || 2;
  const height = window.innerHeight || 2;

  const shaderBleach = BleachBypassShader;
  const shaderSepia = SepiaShader;
  const shaderVignette = VignetteShader;

  const effectBleach = new ShaderPass(shaderBleach);
  const effectSepia = new ShaderPass(shaderSepia);
  const effectVignette = new ShaderPass(shaderVignette);
  const gammaCorrection = new ShaderPass(GammaCorrectionShader);

  effectBleach.uniforms['opacity'].value = 0.95;
  effectSepia.uniforms['amount'].value = 0.9;
  effectVignette.uniforms['offset'].value = 0.95;
  effectVignette.uniforms['darkness'].value = 1.6;

  const effectFilm = new ShaderPass(GrainShader);

  const effectHBlur = new ShaderPass(HorizontalBlurShader);
  const effectVBlur = new ShaderPass(VerticalBlurShader);
  effectHBlur.uniforms['h'].value = 2 / (width / 2);
  effectVBlur.uniforms['v'].value = 2 / (height / 2);

  const effectColorify1 = new ShaderPass(ColorifyShader);
  const effectColorify2 = new ShaderPass(ColorifyShader);
  effectColorify1.uniforms['color'] = new THREE.Uniform(
    new THREE.Color(1, 0.8, 0.8)
  );
  effectColorify2.uniforms['color'] = new THREE.Uniform(
    new THREE.Color(1, 0.75, 0.5)
  );

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
  //composer2.addPass(gammaCorrection);
  composer2.addPass(effectFilm);
  //composer2.addPass(effectColorify1);
  //composer2.addPass(effectColorify2);
  //composer2.addPass(effectVignette);

  //window.addEventListener('resize', onWindowResize);

  return {
    render: (elapsed: number, delta: number) => {
      //renderer.render(scene, camera);
      //renderer.setViewport(0, 0, width, height);
      composer2.render(delta);

      effectFilm.uniforms['uTime'].value = elapsed;
    },
  };
}

/* function onWindowResize() {
  halfWidth = window.innerWidth / 2;
  halfHeight = window.innerHeight / 2;

  cameraPerspective.aspect = window.innerWidth / window.innerHeight;
  cameraPerspective.updateProjectionMatrix();

  cameraOrtho.left = -halfWidth;
  cameraOrtho.right = halfWidth;
  cameraOrtho.top = halfHeight;
  cameraOrtho.bottom = -halfHeight;

  cameraOrtho.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  composerScene.setSize(halfWidth * 2, halfHeight * 2);

  composer1.setSize(halfWidth, halfHeight);
  composer2.setSize(halfWidth, halfHeight);
  composer3.setSize(halfWidth, halfHeight);
  composer4.setSize(halfWidth, halfHeight);

  renderScene.uniforms['tDiffuse'].value = composerScene.renderTarget2.texture;
} */
