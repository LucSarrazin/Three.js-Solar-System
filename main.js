import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Création de la scène et de la caméra adapté à la taille de l'écran
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  90,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Création du render
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// Texture de l'arrière-plan
scene.background = new THREE.TextureLoader().load('Space.jpg');

// Deltatime and Controls
const clock = new THREE.Clock();
const controls = new OrbitControls(camera, renderer.domElement);

// La fonction Update comme Unity
function animate() {
  const delta = clock.getDelta();
  controls.update(delta);

  renderer.render(scene, camera);
}
