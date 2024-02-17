import * as THREE from 'three';

import { useEffect, useRef, useState } from 'react';

import gradientFragmentShader from '@/modules/gradients/gradient.fragmentShader.glsl?raw';
import gradientVertexShader from '@/modules/gradients/gradient.vertexShader.glsl?raw';
import { makeItGrain } from '@/modules/gradients/grain';
import { initGrainFilter } from './grainPostProcessing';

function initThree(canvas: HTMLCanvasElement) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  const clock = new THREE.Clock();

  return { renderer, clock };
}

function initScene() {
  const scene = new THREE.Scene();

  scene.background = new THREE.Color(0xffffff);

  const camera = new THREE.OrthographicCamera(-1, -1, -1, -1, -100000, 100000);
  camera.position.z = 5;
  camera.position.y = 8;
  camera.lookAt(scene.position);

  return { scene, camera };
}

function setCameraSize(camera: THREE.OrthographicCamera) {
  camera.left = -window.innerWidth / 2;
  camera.right = window.innerWidth / 2;
  camera.top = window.innerHeight / 2;
  camera.bottom = -window.innerHeight / 2;
  camera.updateProjectionMatrix();
}

function initGradient(scene: THREE.Scene) {
  const size = {
    x: Math.round(window.innerWidth),
    y: Math.round(window.innerHeight * 3),
  };
  const quality = 0.04;
  console.log(size, size.x * quality,
    size.y * quality)
  const geometry = new THREE.PlaneGeometry(
    size.x,
    size.y,
    size.x * quality,
    size.y * quality
  );
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
    lights: true,
  });
  const plane = new THREE.Mesh(geometry, material);
  //plane.position.y = (window.innerHeight * 3) / 2;
  scene.add(plane);

  const animate = (elapsed: number, delta: number) => {
    material.uniforms.uTime.value = elapsed;
  };

  return { animate };
}

export default function Gradients() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [timeOffset] = useState(Math.random() * 1000);

  useEffect(() => {
    const { renderer, clock } = initThree(
      canvasRef.current as HTMLCanvasElement
    );
    const { scene, camera } = initScene();
    setCameraSize(camera);
    const { animate: animateGradient } = initGradient(scene);
    //const { animate: animateGrain } = makeItGrain(scene, camera);
    const { render } = initGrainFilter(renderer, scene, camera);

    const animate = () => {
      const elapsedTime = clock.elapsedTime + timeOffset;
      const delta = clock.getDelta();

      animateGradient(elapsedTime, delta);
      //animateGrain(elapsedTime, delta);

      render(elapsedTime, delta);
      //renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Resize canvas on window resize
    const resizeCanvas = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      setCameraSize(camera);
    };

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef}></canvas>;
}
