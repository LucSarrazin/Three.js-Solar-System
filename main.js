import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const loader = new GLTFLoader();

const moonTexture = new THREE.TextureLoader().load('MoonTexture.jpg');

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);


scene.add(new THREE.AmbientLight(0xffffff, 0.5)); // Add ambient light

loader.load( '/kawai/scene.gltf', function ( gltf ) {

  gltf.scene.scale.set(0.1, 0.1, 0.1); // Adjust scale
  gltf.scene.position.set(0, -2, 0); // Adjust position
  scene.add( gltf.scene );

}, undefined, function ( error ) {

  console.error( error );

} );

const SpaceShip = new THREE.Object3D(); // Create an empty object for the spaceship

loader.load( '/SpaceShip/scene.gltf', function ( gltf ) {

  gltf.scene.scale.set(0.05, 0.05, 0.05); // Adjust scale
  gltf.scene.position.set(2, 0.5, 0); // Adjust position
  //gltf.scene.rotation.set(0,0,0); // Adjust rotation
  SpaceShip.add(gltf.scene); // Add the spaceship model to the empty object
  scene.add( gltf.scene );

}, undefined, function ( error ) {

  console.error( error );

} );


const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);


const geometry2 = new THREE.SphereGeometry(0.5, 32, 32);
const material2 = new THREE.MeshBasicMaterial({ map: moonTexture });
const sphere = new THREE.Mesh(geometry2, material2);
sphere.position.set(2, 0, 0);
scene.add(sphere);

camera.position.z = 5;

function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.01;
  animationCamera();

  renderer.render(scene, camera);
}

function animationCamera() {
  camera.position.x = Math.sin(Date.now() * 0.001) * 5;
  camera.position.z = Math.cos(Date.now() * 0.001) * 5;
  camera.lookAt(scene.position);
  renderer.render(scene, camera);
}
