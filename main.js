import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';


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
const starsMat = new THREE.TextureLoader().load('Space.jpg');

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


//bloom renderer
const renderScene = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5,
  0.4,
  0.85
);
bloomPass.threshold = 0;
bloomPass.strength = 2; //intensity of glow
bloomPass.radius = 0;
const bloomComposer = new EffectComposer(renderer);
bloomComposer.setSize(window.innerWidth, window.innerHeight);
bloomComposer.renderToScreen = true;
bloomComposer.addPass(renderScene);
bloomComposer.addPass(bloomPass);




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
const mercuryOrbit = new THREE.Object3D();
mercuryOrbit.position.copy(sun.position);
const mercuryGeometry = new THREE.SphereGeometry(0.20, 32, 32);
const mercuryMaterial = new THREE.MeshPhongMaterial({ map:MercureTexture });
const mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
mercury.position.set(2.5, 0, 0);
mercury.receiveShadow = true;
mercury.castShadow = true;
//scene.add(mercury);

mercuryOrbit.add(mercury);
scene.add(mercuryOrbit);



// Création de Venus
const venusOrbit = new THREE.Object3D();
venusOrbit.position.copy(sun.position);

const VenusGeometry = new THREE.SphereGeometry(0.30, 32, 32);
const VenusMaterial = new THREE.MeshPhongMaterial({ map:VenusSurfaceTexture});
const Venus = new THREE.Mesh(VenusGeometry, VenusMaterial);
Venus.position.set(3.5, 0, 0);
Venus.receiveShadow = true;
Venus.castShadow = true;
//scene.add(Venus);
venusOrbit.add(Venus);
scene.add(venusOrbit);

// Création de l'atmosphère de Venus
const venusAtmosphereOrbit = new THREE.Object3D();
venusAtmosphereOrbit.position.copy(sun.position);
const VenusAtmosphereGeometry = new THREE.SphereGeometry(0.32, 32, 32);
const VenusAtmosphereMaterial = new THREE.MeshBasicMaterial({ map: VenusAtmosphereTexture, transparent: true, opacity: 0.2 });
const VenusAtmosphere = new THREE.Mesh(VenusAtmosphereGeometry, VenusAtmosphereMaterial);
VenusAtmosphere.position.set(3.5, 0, 0); // Positionner l'atmosphère autour de Venus
//scene.add(VenusAtmosphere);
venusOrbit.add(VenusAtmosphere);

// Création de la Terre
const earthOrbit = new THREE.Object3D();
earthOrbit.position.copy(sun.position);
const terreGeometry = new THREE.SphereGeometry(0.40, 32, 32);
const terreMaterial = new THREE.MeshPhongMaterial({
  map: EarthDayTexture,
  normalMap: EarthNormalTexture,
  specularMap: EarthSpecularTexture,
});
const terre = new THREE.Mesh(terreGeometry, terreMaterial);
terre.position.set(5, 0, 0);
terre.receiveShadow = true;
terre.castShadow = true;
earthOrbit.add(terre);
scene.add(earthOrbit);

// Création des nuages autour de la Terre
const cloudsGeometry = new THREE.SphereGeometry(0.41, 32, 32);
const cloudsMaterial = new THREE.MeshPhongMaterial({
  map: EarthCloudsTexture,
  transparent: true,
  opacity: 0.5
});
const clouds = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
clouds.position.set(5, 0, 0);
clouds.receiveShadow = true;
clouds.castShadow = true;
earthOrbit.add(clouds);

// Création de la Lune
const MoonOrbit = new THREE.Object3D();
MoonOrbit.position.set(5, 0, 0); // Même position que la Terre dans earthOrbit
const moonGeometry = new THREE.SphereGeometry(0.15, 32, 32);
const moonMaterial = new THREE.MeshPhongMaterial({ map: MoonTexture });
const moon = new THREE.Mesh(moonGeometry, moonMaterial);

// La Lune à une certaine distance de la Terre (locale)
moon.position.set(1, 0, 0); // Relative à MoonOrbit
moon.receiveShadow = true;
moon.castShadow = true;

MoonOrbit.add(moon);
earthOrbit.add(MoonOrbit);


// MARS
const marsOrbit = new THREE.Object3D();
marsOrbit.position.copy(sun.position);
const MarsGeometry = new THREE.SphereGeometry(0.35, 32, 32);
const MarsMaterial = new THREE.MeshPhongMaterial({ map: MarsTexture });
const Mars = new THREE.Mesh(MarsGeometry, MarsMaterial);
Mars.position.set(7, 0, 0);
Mars.receiveShadow = true;
Mars.castShadow = true;
marsOrbit.add(Mars);
scene.add(marsOrbit);

// JUPITER
const jupiterOrbit = new THREE.Object3D();
jupiterOrbit.position.copy(sun.position);
const JupiterGeometry = new THREE.SphereGeometry(0.55, 32, 32);
const JupiterMaterial = new THREE.MeshPhongMaterial({ map: JupiterTexture });
const Jupiter = new THREE.Mesh(JupiterGeometry, JupiterMaterial);
Jupiter.position.set(8.5, 0, 0);
Jupiter.receiveShadow = true;
Jupiter.castShadow = true;
jupiterOrbit.add(Jupiter);
scene.add(jupiterOrbit);

// SATURNE
const saturnOrbit = new THREE.Object3D();
saturnOrbit.position.copy(sun.position);
const SaturnGeometry = new THREE.SphereGeometry(0.45, 32, 32);
const SaturnMaterial = new THREE.MeshPhongMaterial({ map: SaturnTexture });
const Saturn = new THREE.Mesh(SaturnGeometry, SaturnMaterial);
Saturn.position.set(10, 0, 0);
Saturn.receiveShadow = true;
Saturn.castShadow = true;
saturnOrbit.add(Saturn);
scene.add(saturnOrbit);

// Anneau de Saturne 
const SaturnRingGeometry = new THREE.RingGeometry(0.6, 0.8, 64);
const SaturnRingMaterial = new THREE.MeshBasicMaterial({
  map: SaturnRingTexture,
  side: THREE.DoubleSide,
  transparent: true,
  opacity: 0.5
});
const SaturnRing = new THREE.Mesh(SaturnRingGeometry, SaturnRingMaterial);
SaturnRing.rotation.x = -Math.PI / 2;
SaturnRing.position.set(10, 0, 0);
saturnOrbit.add(SaturnRing);

// URANUS
const uranusOrbit = new THREE.Object3D();
uranusOrbit.position.copy(sun.position);
const UranusGeometry = new THREE.SphereGeometry(0.30, 32, 32);
const UranusMaterial = new THREE.MeshPhongMaterial({ map: UranusTexture });
const Uranus = new THREE.Mesh(UranusGeometry, UranusMaterial);
Uranus.position.set(11.5, 0, 0);
Uranus.receiveShadow = true;
Uranus.castShadow = true;
uranusOrbit.add(Uranus);
scene.add(uranusOrbit);

// NEPTUNE
const neptuneOrbit = new THREE.Object3D();
neptuneOrbit.position.copy(sun.position);
const NeptuneGeometry = new THREE.SphereGeometry(0.25, 32, 32);
const NeptuneMaterial = new THREE.MeshPhongMaterial({ map: NeptuneTexture });
const Neptune = new THREE.Mesh(NeptuneGeometry, NeptuneMaterial);
Neptune.position.set(12.5, 0, 0);
Neptune.receiveShadow = true;
Neptune.castShadow = true;
neptuneOrbit.add(Neptune);
scene.add(neptuneOrbit);



// Lumière directionnelle pour simuler la lumière du Soleil
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(-5, 5, 5).normalize();
scene.add(directionalLight);

// Lumière ambiante pour éclairer la scène
const ambientLight = new THREE.AmbientLight(0x404040, 0.5); // Lumière ambiante douce
scene.add(ambientLight);

function createOrbit(radius, color = 0xffffff) {
  const segments = 100;
  const points = [];

  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color });
  const circle = new THREE.LineLoop(geometry, material);
  circle.position.set(-5, 0, 0); // ✅ centrage sur le Soleil
  return circle;
}

// Autour du Soleil
scene.add(createOrbit(2.5, 0xaaaaaa)); // Mercure
scene.add(createOrbit(3.5, 0xffa500)); // Vénus
scene.add(createOrbit(5,   0x2196f3)); // Terre
scene.add(createOrbit(7,   0xff5722)); // Mars
scene.add(createOrbit(8.5, 0xffeb3b)); // Jupiter
scene.add(createOrbit(10,  0xffc107)); // Saturne
scene.add(createOrbit(11.5,0x00bcd4)); // Uranus
scene.add(createOrbit(12.5,0x3f51b5)); // Neptune

// Pour la Lune (autour de la Terre dans earthOrbit)
const moonOrbit = createOrbit(1);
moonOrbit.position.set(5, 0, 0); // Terre est à x = 5 dans earthOrbit
earthOrbit.add(moonOrbit);



// Positionner la caméra
camera.position.z = 5;
camera.position.y = 5;
camera.position.x = -11;

// La fonction Update comme Unity
function animate() {

    const delta = clock.getDelta();
    controls.update(delta); 

    mercuryOrbit.rotation.y += 0.02; // rapide
    venusOrbit.rotation.y += 0.01;   // un peu plus lent
    earthOrbit.rotation.y += 0.008;
    MoonOrbit.rotation.y += 0.003; // Tourne vite autour de la Terre
    marsOrbit.rotation.y += 0.007;
    jupiterOrbit.rotation.y += 0.005;
    saturnOrbit.rotation.y += 0.0035;
    uranusOrbit.rotation.y += 0.002;
    neptuneOrbit.rotation.y += 0.001;   

    mercury.rotation.y += 0.001; // Rotation de Mercure
    Venus.rotation.y += 0.001; // Rotation de Vénus
    terre.rotation.y += 0.001; // Rotation de la Terre
    clouds.rotation.y += 0.001; // Rotation des nuages de la Terre
    moon.rotation.y += 0.001; // Rotation de la Lune
    SaturnRing.rotation.z += 0.001; // Rotation lente de l'anneau de Saturne
    sun.rotation.y += 0.001; // Rotation lente du Soleil
    Jupiter.rotation.y += 0.002; // Rotation de Jupiter
    Saturn.rotation.y += 0.002; // Rotation de Saturne
    Uranus.rotation.y += 0.002; // Rotation d'Uranus
    Neptune.rotation.y += 0.002; // Rotation de Neptune


    bloomComposer.render();

}
