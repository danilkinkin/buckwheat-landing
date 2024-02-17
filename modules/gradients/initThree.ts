import * as THREE from 'three';

export type InitThreeOptions = {
  width: number;
  height: number;
};

export function initThree(
  canvas: HTMLCanvasElement,
  { width, height }: InitThreeOptions
) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);

  const clock = new THREE.Clock();

  return { renderer, clock };
}
