import * as THREE from 'three';

export function initScene(renderer: THREE.WebGLRenderer) {
  const scene = new THREE.Scene();

  scene.background = new THREE.Color(0xffffff);

  const camera = new THREE.OrthographicCamera(-1, -1, -1, -1, -100000, 100000);
  camera.position.z = 5;
  camera.position.y = 8;
  camera.lookAt(scene.position);

  const updateSize = () => {
    const viewportSize = renderer.getSize(new THREE.Vector2());

    camera.left = viewportSize.width / -2;
    camera.right = viewportSize.width / 2;
    camera.top = viewportSize.height / 2;
    camera.bottom = -viewportSize.height / 2;
    camera.updateProjectionMatrix();
  };

  updateSize();

  return { scene, camera, updateSize };
}
