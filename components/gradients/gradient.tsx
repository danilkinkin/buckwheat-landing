import { useEffect, useRef, useState } from 'react';

import styles from './gradients.module.css';
import { initGrainFilter } from './grainPostProcessing';
import { InitThreeOptions, initThree } from './initThree';
import { initScene } from './initScene';
import { initGradient } from './initGradients';

const threeCanvas = (
  canvas: HTMLCanvasElement,
  viewportSize: InitThreeOptions,
  initTimeOffset: number = 0
) => {
  const { renderer, clock } = initThree(canvas, viewportSize);
  const { scene, camera, updateSize: updateCameraSize } = initScene(renderer);
  const { render: renderGradient, updateSize: updateGradientSize } =
    initGradient(scene, renderer);
  const { render: renderFrame } = initGrainFilter(renderer, scene, camera);

  const animate = () => {
    const elapsedTime = clock.elapsedTime + initTimeOffset;
    const delta = clock.getDelta();

    renderGradient(elapsedTime, delta);
    renderFrame(elapsedTime, delta);

    requestAnimationFrame(animate);
  };

  const resizeCanvas = (width: number, height: number) => {
    renderer.setSize(width, height);
    updateCameraSize();
    updateGradientSize();
  };

  animate();
  resizeCanvas(viewportSize.width, viewportSize.height);

  return {
    resizeCanvas,
  };
};

export function Gradients() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [timeOffset] = useState(Math.random() * 1000);

  useEffect(() => {
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
    };
  }, []);

  return (
    <div className={styles.root} ref={rootRef}>
      <canvas className={styles.canvas} ref={canvasRef}></canvas>
    </div>
  );
}
