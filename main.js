import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
//import { FlyControls } from 'three/addons/controls/FlyControls.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const loader = new GLTFLoader();

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();


const moonTexture = new THREE.TextureLoader().load('MoonTexture.jpg');
const spaceTexture = new THREE.TextureLoader().load('Space.jpg');


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);
scene.background = spaceTexture; // Set the background to space texture


// Clock (nécessaire pour FlyControls)
const clock = new THREE.Clock();

/*
// FlyControls
const controls = new FlyControls(camera, renderer.domElement);
controls.movementSpeed = 10;
controls.rollSpeed = 1;
controls.autoForward = false;*/


const controls = new OrbitControls( camera, renderer.domElement );


scene.add(new THREE.AmbientLight(0xffffff, 0.5)); // Add ambient light


const Kawai = new THREE.Object3D(); // Create an empty object for the kawai model

loader.load( '/kawai/scene.gltf', function ( gltf ) {

  gltf.scene.scale.set(0.1, 0.1, 0.1); // Adjust scale
  gltf.scene.position.set(0, -2, 0); // Adjust position
  Kawai.add(gltf.scene); // Add the kawai model to the empty object
  scene.add( Kawai );

}, undefined, function ( error ) {

  console.error( error );

} );

const SpaceShip = new THREE.Object3D(); // Create an empty object for the spaceship

loader.load( '/SpaceShip/scene.gltf', function ( gltf ) {

  gltf.scene.scale.set(0.05, 0.05, 0.05); // Adjust scale
  gltf.scene.position.set(2, 0.5, 0); // Adjust position
  //gltf.scene.rotation.set(0,0,0); // Adjust rotation
  SpaceShip.add(gltf.scene); // Add the spaceship model to the empty object
  scene.add( SpaceShip );

}, undefined, function ( error ) {

  console.error( error );

} );


const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
cube.name = "Kawai"; // Set a name for the cube
scene.add(cube);


const geometry2 = new THREE.SphereGeometry(0.5, 32, 32);
const material2 = new THREE.MeshBasicMaterial({ map: moonTexture });
const sphere = new THREE.Mesh(geometry2, material2);
sphere.name = "Moon"; // Set a name for the sphere
sphere.position.set(2, 0, 0);
scene.add(sphere);

camera.position.z = 5;

function animate() {
  const delta = clock.getDelta();
  controls.update(delta);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.01;
  SpaceShip.rotation.y += 0.005; // Rotate the spaceship
  SpaceShip.rotation.x += 0.005; // Rotate the spaceship on the x-axis
  SpaceShip.rotation.z += 0.005; // Rotate the spaceship on the z-axis

  const infoBoxMoon = document.getElementById("infoBoxMoon");
  if (infoBoxMoon.style.display === "block") {
    const screenPos = toScreenPosition(sphere, camera);
    infoBoxMoon.style.left = `${screenPos.x + 20}px`;
    infoBoxMoon.style.top = `${screenPos.y - 20}px`;
  }
  
  const infoBoxKawai = document.getElementById("infoBoxKawai");
  if (infoBoxKawai.style.display === "block") {
    const screenPos = toScreenPosition(Kawai, camera);
    infoBoxKawai.style.left = `${screenPos.x + 20}px`;
    infoBoxKawai.style.top = `${screenPos.y - 20}px`;
  }

  //animationCamera();

  renderer.render(scene, camera);

}

/*function animationCamera() {
  camera.position.x = Math.sin(Date.now() * 0.001) * 5;
  camera.position.z = Math.cos(Date.now() * 0.001) * 5;
  camera.lookAt(scene.position);
  renderer.render(scene, camera);
}*/


window.addEventListener('click', onClick, false);

function onClick(event) {
  // Position de la souris normalisée (-1 à +1)
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Mise à jour du rayon
  raycaster.setFromCamera(mouse, camera);

  // Liste des objets à tester (ex: toute la scène ou un tableau d’objets)
  const intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects.length > 0) {
    const clickedObject = intersects[0].object;
    console.log("Objet cliqué :", clickedObject.name || clickedObject);

    if (clickedObject.name === "Moon") {
      const screenPos = toScreenPosition(sphere, camera);
        
      const infoBoxMoon = document.getElementById("infoBoxMoon");
      infoBoxMoon.style.display = "block";
      infoBoxMoon.style.left = `${screenPos.x + 20}px`; // +20 pour placer à droite
      infoBoxMoon.style.top = `${screenPos.y - 20}px`; // -20 pour monter un peu
    } else {
      document.getElementById("infoBoxMoon").style.display = "none";
    }

    if (clickedObject.name === "Kawai") {
      const screenPos = toScreenPosition(Kawai, camera);
        
      const infoBoxKawai = document.getElementById("infoBoxKawai");
      infoBoxKawai.style.display = "block";
      infoBoxKawai.style.left = `${screenPos.x + 20}px`; // +20 pour placer à droite
      infoBoxKawai.style.top = `${screenPos.y - 20}px`; // -20 pour monter un peu
    } else {
      document.getElementById("infoBoxKawai").style.display = "none";
    }
  } 
}


function toScreenPosition(obj, camera) {
  const vector = new THREE.Vector3();
  const widthHalf = window.innerWidth / 2;
  const heightHalf = window.innerHeight / 2;

  obj.updateMatrixWorld();
  vector.setFromMatrixPosition(obj.matrixWorld);
  vector.project(camera);

  return {
    x: (vector.x * widthHalf) + widthHalf,
    y: -(vector.y * heightHalf) + heightHalf
  };
}

