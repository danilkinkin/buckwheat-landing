import { useEffect, useRef, useState } from 'react';

import styles from './gradients.module.css';
import { initGrainFilter } from './grainPostProcessing';
import { InitThreeOptions, initThree } from './initThree';
import { initScene } from './initScene';
import { initGradient } from './initGradients';
import Stats from 'stats.js';

const threeCanvas = (
  canvas: HTMLCanvasElement,
  viewportSize: InitThreeOptions,
  initTimeOffset: number = 0
) => {
  const { renderer, clock } = initThree(canvas, viewportSize);
  const { scene, camera, updateSize: updateCameraSize } = initScene(renderer);
  const {
    render: renderGradient,
    updateSize: updateGradientSize,
    unload: unloadGradinet,
  } = initGradient(scene, renderer);
  const { render: renderFrame, resize: resizeFrame } = initGrainFilter(
    renderer,
    scene,
    camera
  );
  const stats = new Stats();
  // the number will decide which information will be displayed
  // 0 => FPS Frames rendered in the last second. The higher the number the better.
  // 1 => MS Milliseconds needed to render a frame. The lower the number the better.
  // 2 => MB MBytes of allocated memory. (Run Chrome with --enable-precise-memory-info)
  // 3 => CUSTOM User-defined panel support.
  stats.showPanel(0);

  document.body.appendChild(stats.dom);

  let elapsedTime = 0;
  let delta = 0;
  let isActive = true;

  const animate = () => {
    if (!isActive) return;
    stats.begin();
    elapsedTime = clock.elapsedTime + initTimeOffset;
    delta = clock.getDelta();

    renderGradient(elapsedTime, delta);
    renderFrame(elapsedTime, delta);

    stats.end();
    requestAnimationFrame(animate);
  };

  const resizeCanvas = (width: number, height: number) => {
    renderer.setSize(width, height);
    updateCameraSize();
    updateGradientSize();
    resizeFrame();
  };

  animate();
  resizeCanvas(viewportSize.width, viewportSize.height);

  const unload = () => {
    isActive = false;
    unloadGradinet();
    renderer.dispose();
  };

  return {
    resizeCanvas,
    unload,
  };
};

export function Gradients() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [timeOffset] = useState(Math.random() * 1000);

  useEffect(() => {
    try {
      const canvas = threeCanvas(
        canvasRef.current as HTMLCanvasElement,
        {
          width: rootRef.current?.clientWidth || 0,
          height: rootRef.current?.clientHeight || 0,
        },
        timeOffset
      );

      const resize = () => {
        canvas.resizeCanvas(
          rootRef.current?.clientWidth || 0,
          rootRef.current?.clientHeight || 0
        );
      };

      window.addEventListener('resize', resize);

      return () => {
        window.removeEventListener('resize', resize);

        canvas.unload();
      };
    } catch (e) {
      console.error(e);
    }
  }, [timeOffset]);

  return (
    <div className={styles.root} ref={rootRef}>
      <canvas className={styles.canvas} ref={canvasRef}></canvas>
    </div>
  );
}
