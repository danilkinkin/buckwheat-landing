import Head from 'next/head';
import * as THREE from 'three';

import styles from '@/modules/gradients/gradients.module.scss';
import { useEffect, useRef } from 'react';

import gradientFragmentShader from '@/modules/gradients/gradient.fragmentShader.glsl?raw';
import gradientVertexShader from '@/modules/gradients/gradient.vertexShader.glsl?raw';

const cameraScale = 6300;

function initThree(canvas: HTMLCanvasElement) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  const clock = new THREE.Clock();

  return { renderer, clock };
}

function initScene() {
  const scene = new THREE.Scene();

  scene.background = new THREE.Color(0xFFFFFF);

  const camera = new THREE.OrthographicCamera();
  camera.position.z = 5;
  camera.position.y = 8;
  camera.lookAt(scene.position);

  return { scene, camera };
}

function setCameraSize(
  camera: THREE.OrthographicCamera,
  scale: number = cameraScale
) {
  camera.left = -window.innerWidth / scale;
  camera.right = window.innerWidth / scale;
  camera.top = window.innerHeight / scale;
  camera.bottom = -window.innerHeight / scale;
  camera.updateProjectionMatrix();
}

function initGradient(scene: THREE.Scene) {
  const size = { x: 0.5, y: 1.5 };
  const quality = 70;
  const geometry = new THREE.PlaneGeometry(size.x, size.y, size.x * quality, size.y * quality);
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
  scene.add(plane);

  const animate = (elapsed: number, delta: number) => {
    material.uniforms.uTime.value = elapsed;
  };

  return { animate };
}

export default function GradientsPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const { renderer, clock } = initThree(canvasRef.current as HTMLCanvasElement);
    const { scene, camera } = initScene();
    setCameraSize(camera);
    const { animate: animateGradient } = initGradient(scene);

    const animate = () => {
      requestAnimationFrame(animate);

      animateGradient(clock.elapsedTime, clock.getDelta());

      renderer.render(scene, camera);
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

  return (
    <>
      <Head>
        <title>Gradients Sandbox</title>
      </Head>
      <main className={styles.main}>
        <canvas ref={canvasRef}></canvas>
      </main>
    </>
  );
}
