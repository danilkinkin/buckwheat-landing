import * as THREE from 'three';

import gradientFragmentShader from './gradient.fragmentShader.glsl?raw';
import gradientVertexShader from './gradient.vertexShader.glsl?raw';

function getMaterial() {
  var uniforms = {
    ...THREE.ShaderLib['standard'].uniforms,
    resolution: {
      value: new THREE.Vector2(),
    },
    uTime: {
      value: 0,
    },
  };
  var material = new THREE.ShaderMaterial({
    uniforms: THREE.UniformsUtils.merge([
      THREE.UniformsLib['lights'],
      uniforms,
    ]),
    vertexShader: gradientVertexShader,
    fragmentShader: gradientFragmentShader,
    //wireframe: true,
  });

  return material;
}

export function initGradient(
  scene: THREE.Scene,
  renderer: THREE.WebGLRenderer
) {
  const quality = 0.04;

  const material = getMaterial();

  const plane = new THREE.Mesh(new THREE.PlaneGeometry(), material);
  scene.add(plane);

  const render = (elapsed: number, delta: number) => {
    material.uniforms.uTime.value = elapsed;
  };

  const updateSize = () => {
    const viewportSize = renderer.getSize(new THREE.Vector2());
    plane.geometry.dispose();
    plane.geometry = new THREE.PlaneGeometry(
      viewportSize.width,
      viewportSize.height * 4,
      viewportSize.width * quality,
      viewportSize.height * 4 * quality
    );
  };

  updateSize();

  return { render, updateSize };
}
