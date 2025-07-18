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

// Chargement des textures
const EarthNightTexture = new THREE.TextureLoader().load('EarthNight.jpg');
const EarthDayTexture = new THREE.TextureLoader().load('EarthDay.jpg');
const EarthCloudsTexture = new THREE.TextureLoader().load('EarthClouds.jpg');
const EarthNormalTexture = new THREE.TextureLoader().load('2k_earth_normal_map.tif');
const EarthSpecularTexture = new THREE.TextureLoader().load('2k_earth_specular_map.tif');


const MoonTexture = new THREE.TextureLoader().load('MoonTexture.jpg');
const SunTexture = new THREE.TextureLoader().load('sun.jpg');
const MercureTexture = new THREE.TextureLoader().load('PIA17386.jpg');
const VenusAtmosphereTexture = new THREE.TextureLoader().load('venus_atmosphere.jpg');
const VenusSurfaceTexture = new THREE.TextureLoader().load('venus_surface.jpg');
const MarsTexture = new THREE.TextureLoader().load('mars.jpg');
const JupiterTexture = new THREE.TextureLoader().load('jupiter.jpg');
const SaturnTexture = new THREE.TextureLoader().load('saturn.jpg');
const SaturnRingTexture = new THREE.TextureLoader().load('saturnRing.png');
const NeptuneTexture = new THREE.TextureLoader().load('neptune.jpg');
const UranusTexture = new THREE.TextureLoader().load('uranus.jpg');

// Deltatime and Controls
const clock = new THREE.Clock();
const controls = new OrbitControls(camera, renderer.domElement);


// Création du Soleil
const sunGeometry = new THREE.SphereGeometry(1.4, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ map: SunTexture });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.position.set(-5, 0, 0); // Positionner le Soleil à gauche de la Terre
sun.receiveShadow = true; // Permet au Soleil de recevoir des ombres
sun.castShadow = true; // Permet au Soleil de projeter des ombres
scene.add(sun);

// Création de Mercure
const mercuryGeometry = new THREE.SphereGeometry(0.20, 32, 32);
const mercuryMaterial = new THREE.MeshPhongMaterial({ map:MercureTexture });
const mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
mercury.position.set(-2.5, 0, 0);
mercury.receiveShadow = true;
mercury.castShadow = true;
scene.add(mercury);


// Création de Venus
const VenusGeometry = new THREE.SphereGeometry(0.30, 32, 32);
const VenusMaterial = new THREE.MeshPhongMaterial({ map:VenusSurfaceTexture});
const Venus = new THREE.Mesh(VenusGeometry, VenusMaterial);
Venus.position.set(-1.5, 0, 0);
Venus.receiveShadow = true;
Venus.castShadow = true;
scene.add(Venus);

// Création de l'atmosphère de Venus
const VenusAtmosphereGeometry = new THREE.SphereGeometry(0.32, 32, 32);
const VenusAtmosphereMaterial = new THREE.MeshBasicMaterial({ map: VenusAtmosphereTexture, transparent: true, opacity: 0.5 });
const VenusAtmosphere = new THREE.Mesh(VenusAtmosphereGeometry, VenusAtmosphereMaterial);
VenusAtmosphere.position.set(-1.5, 0, 0); // Positionner l'atmosphère autour de Venus
scene.add(VenusAtmosphere);


// Création de la Terre
const terreGeometry = new THREE.SphereGeometry(0.40, 32, 32);
const terreMaterial = new THREE.MeshPhongMaterial({ map: EarthNightTexture, normalMap: EarthNormalTexture, specularMap:EarthSpecularTexture});
const terre = new THREE.Mesh(terreGeometry, terreMaterial);
terre.position.set(0, 0, 0); // Positionner la Terre au centre
terre.receiveShadow = true; // Permet à la Terre de recevoir des ombres
terre.castShadow = true; // Permet à la Terre de projeter des ombres
scene.add(terre);

// Creations nuages
const cloudsGeometry = new THREE.SphereGeometry(0.41, 32, 32);
const cloudsMaterial = new THREE.MeshPhongMaterial({ map: EarthCloudsTexture, transparent: true, opacity: 0.5});
const clouds = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
clouds.position.set(0, 0, 0); // Positionner la Terre au centre
clouds.receiveShadow = true;
clouds.castShadow = true;
scene.add(clouds);


// Création de la Lune
const moonGeometry = new THREE.SphereGeometry(0.15, 32, 32);
const moonMaterial = new THREE.MeshPhongMaterial({ map: MoonTexture });
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.position.set(1, 0, 0); // Positionner la Lune à droite de la Terre
moon.receiveShadow = true; // Permet à la Lune de recevoir des ombres
moon.castShadow = true; // Permet à la Lune de projeter des ombres
scene.add(moon);



// Création de la Mars
const MarsGeometry = new THREE.SphereGeometry(0.35, 32, 32);
const MarsMaterial = new THREE.MeshPhongMaterial({ map: MarsTexture});
const Mars = new THREE.Mesh(MarsGeometry, MarsMaterial);
Mars.position.set(2, 0, 0); // Positionner la Terre au centre
Mars.receiveShadow = true; // Permet à la Terre de recevoir des ombres
Mars.castShadow = true; // Permet à la Terre de projeter des ombres
scene.add(Mars);


// Création de la Jupiter
const JupiterGeometry = new THREE.SphereGeometry(0.55, 32, 32);
const JupiterMaterial = new THREE.MeshPhongMaterial({ map: JupiterTexture});
const Jupiter = new THREE.Mesh(JupiterGeometry, JupiterMaterial);
Jupiter.position.set(3.5, 0, 0); // Positionner la Terre au centre
Jupiter.receiveShadow = true; // Permet à la Terre de recevoir des ombres
Jupiter.castShadow = true; // Permet à la Terre de projeter des ombres
scene.add(Jupiter);


// Création de la Jupiter
const SaturnGeometry = new THREE.SphereGeometry(0.45, 32, 32);
const SaturnMaterial = new THREE.MeshPhongMaterial({ map: SaturnTexture});
const Saturn = new THREE.Mesh(SaturnGeometry, SaturnMaterial);
Saturn.position.set(5, 0, 0); // Positionner la Terre au centre
Saturn.receiveShadow = true; // Permet à la Terre de recevoir des ombres
Saturn.castShadow = true; // Permet à la Terre de projeter des ombres
scene.add(Saturn);

// Création de l'anneau de Saturne
const SaturnRingGeometry = new THREE.RingGeometry(0.6, 0.8, 64);
const SaturnRingMaterial = new THREE.MeshBasicMaterial({   
  map: SaturnRingTexture,
  side: THREE.DoubleSide,
  transparent: true,
  opacity: 0.5
});
const SaturnRing = new THREE.Mesh(SaturnRingGeometry, SaturnRingMaterial);
SaturnRing.rotation.x = -Math.PI / 2; // Rotation pour que l'anneau soit horizontal
SaturnRing.position.set(5, 0, 0); // Positionner l'anneau autour de Saturne
scene.add(SaturnRing);


// Création de la Uranus
const UranusGeometry = new THREE.SphereGeometry(0.30, 32, 32);
const UranusMaterial = new THREE.MeshPhongMaterial({ map: UranusTexture});
const Uranus = new THREE.Mesh(UranusGeometry, UranusMaterial);
Uranus.position.set(6.5, 0, 0); // Positionner la Terre au centre
Uranus.receiveShadow = true; // Permet à la Terre de recevoir des ombres
Uranus.castShadow = true; // Permet à la Terre de projeter des ombres
scene.add(Uranus);


// Création de la Netpune
const NetpuneGeometry = new THREE.SphereGeometry(0.25, 32, 32);
const NetpuneMaterial = new THREE.MeshPhongMaterial({ map: NeptuneTexture});
const Netpune = new THREE.Mesh(NetpuneGeometry, NetpuneMaterial);
Netpune.position.set(7.5, 0, 0); // Positionner la Terre au centre
Netpune.receiveShadow = true; // Permet à la Terre de recevoir des ombres
Netpune.castShadow = true; // Permet à la Terre de projeter des ombres
scene.add(Netpune);


// Lumière directionnelle pour simuler la lumière du Soleil
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(-5, 5, 5).normalize();
scene.add(directionalLight);

// Lumière ambiante pour éclairer la scène
const ambientLight = new THREE.AmbientLight(0x404040, 0.5); // Lumière ambiante douce
scene.add(ambientLight);


// Positionner la caméra
camera.position.z = 5;

// La fonction Update comme Unity
function animate() {
  const delta = clock.getDelta();
  controls.update(delta);

  renderer.render(scene, camera);
}
