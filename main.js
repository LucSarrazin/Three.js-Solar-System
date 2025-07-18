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
//scene.background = new THREE.TextureLoader().load('Space.jpg');
//const starsMat = new THREE.TextureLoader().load('Space.jpg');
const textureLoader = new THREE.TextureLoader();
const starsTextureUrl = '/stars.jpg';  // chemin relatif depuis la racine public

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
  starsTextureUrl,
  starsTextureUrl,
  starsTextureUrl,
  starsTextureUrl,
  starsTextureUrl,
  starsTextureUrl,
]);
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
sun.name = "Sun"; // Nommer le Soleil pour l'identifier
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // ou autre type
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
mercury.name = "Mercury"; // Nommer Mercure pour l'identifier
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
Venus.name = "Venus"; // Nommer Vénus pour l'identifier
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
VenusAtmosphere.name = "Venus"; // Nommer l'atmosphère de Vénus pour l'identifier
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
terre.name = "Earth"; // Nommer la Terre pour l'identifier
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
cloudsMaterial.depthWrite = false;
clouds.renderOrder = 1;
clouds.name = "Earth"; // Nommer les nuages pour l'identifier
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
moon.name = "Moon"; // Nommer la Lune pour l'identifier

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
Mars.name = "Mars"; // Nommer Mars pour l'identifier
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
Jupiter.name = "Jupiter"; // Nommer Jupiter pour l'identifier
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
Saturn.name = "Saturn"; // Nommer Saturne pour l'identifier
saturnOrbit.add(Saturn);
scene.add(saturnOrbit);

// Anneau de Saturne 
const SaturnRingGeometry = new THREE.RingGeometry(0.6, 0.8, 64);
const SaturnRingMaterial = new THREE.MeshBasicMaterial({
  map: SaturnRingTexture,
  side: THREE.DoubleSide,
  transparent: true,
  opacity: 0.2
});
const SaturnRing = new THREE.Mesh(SaturnRingGeometry, SaturnRingMaterial);
SaturnRing.rotation.x = -Math.PI / 2;
SaturnRing.position.set(10, 0, 0);
SaturnRing.name = "Saturn"; // Nommer l'anneau de Saturne pour l'identifier
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
Uranus.name = "Uranus"; // Nommer Uranus pour l'identifier
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
Neptune.name = "Neptune"; // Nommer Neptune pour l'identifier
neptuneOrbit.add(Neptune);
scene.add(neptuneOrbit);




const ambientLight = new THREE.AmbientLight(0x404040, 3); // Lumière ambiante
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

function addStar() {
  const geometry = new THREE.SphereGeometry(0.05, 24, 24);
  const material = new THREE.MeshStandardMaterial({ map: SaturnRingTexture, emissive: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(500).fill().forEach(addStar);


// Positionner la caméra
camera.position.z = 5;
camera.position.y = 5;
camera.position.x = -11;

// La fonction Update comme Unity
function animate() {

    const delta = clock.getDelta();
    controls.update(delta); 

    mercuryOrbit.rotation.y += 0.5 * delta;
    venusOrbit.rotation.y += 0.25 * delta;
    earthOrbit.rotation.y += 0.2 * delta;
    MoonOrbit.rotation.y += 0.4 * delta;
    marsOrbit.rotation.y += 0.15 * delta;
    jupiterOrbit.rotation.y += 0.1 * delta;
    saturnOrbit.rotation.y += 0.07 * delta;
    uranusOrbit.rotation.y += 0.04 * delta;
    neptuneOrbit.rotation.y += 0.02 * delta;
 

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

    updateInfoBox(moon, document.getElementById("infoBoxMoon"));
    updateInfoBox(Venus, document.getElementById("infoBoxVenus"));
    updateInfoBox(mercury, document.getElementById("infoBoxMercury"));
    updateInfoBox(terre, document.getElementById("infoBoxEarth"));
    updateInfoBox(moon, document.getElementById("infoBoxMoon"));
    updateInfoBox(Mars, document.getElementById("infoBoxMars"));
    updateInfoBox(Jupiter, document.getElementById("infoBoxJupiter"));
    updateInfoBox(Saturn, document.getElementById("infoBoxSaturn"));
    updateInfoBox(Uranus, document.getElementById("infoBoxUranus"));
    updateInfoBox(Neptune, document.getElementById("infoBoxNeptune"));
    updateInfoBox(sun, document.getElementById("infoBoxSun"));



    bloomComposer.render();

}

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('click', onClick, false);

function onClick(event) {
  // Position de la souris normalisée (-1 à +1)
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Mise à jour du rayon
  raycaster.setFromCamera(mouse, camera);

  // Raycast sans sélectionner les LineLoop (orbites)
  const intersects = raycaster.intersectObjects(scene.children, true)
    .filter(obj => obj.object.type !== "LineLoop");

  if (intersects.length > 0) {
    const clickedObject = intersects[0].object;
    console.log("Objet cliqué :", clickedObject.name || clickedObject);

    if (clickedObject.name === "Moon") {
  const screenPos = toScreenPosition(moon, camera);
  const infoBoxMoon = document.getElementById("infoBoxMoon");
  infoBoxMoon.style.display = "block";
  infoBoxMoon.style.left = `${screenPos.x + 20}px`;
  infoBoxMoon.style.top = `${screenPos.y - 20}px`;
} else {
  document.getElementById("infoBoxMoon").style.display = "none";
}

if (clickedObject.name === "Venus") {
  const screenPos = toScreenPosition(Venus, camera);
  const infoBoxVenus = document.getElementById("infoBoxVenus");
  infoBoxVenus.style.display = "block";
  infoBoxVenus.style.left = `${screenPos.x + 20}px`;
  infoBoxVenus.style.top = `${screenPos.y - 20}px`;
} else {
  document.getElementById("infoBoxVenus").style.display = "none";
}

if (clickedObject.name === "Mercury") {
  const screenPos = toScreenPosition(mercury, camera);
  const infoBoxMercury = document.getElementById("infoBoxMercury");
  infoBoxMercury.style.display = "block";
  infoBoxMercury.style.left = `${screenPos.x + 20}px`;
  infoBoxMercury.style.top = `${screenPos.y - 20}px`;
} else {
  document.getElementById("infoBoxMercury").style.display = "none";
}

if (clickedObject.name === "Earth") {
  const screenPos = toScreenPosition(terre, camera);
  const infoBoxEarth = document.getElementById("infoBoxEarth");
  infoBoxEarth.style.display = "block";
  infoBoxEarth.style.left = `${screenPos.x + 20}px`;
  infoBoxEarth.style.top = `${screenPos.y - 20}px`;
} else {
  document.getElementById("infoBoxEarth").style.display = "none";
}

if (clickedObject.name === "Mars") {
  const screenPos = toScreenPosition(Mars, camera);
  const infoBoxMars = document.getElementById("infoBoxMars");
  infoBoxMars.style.display = "block";
  infoBoxMars.style.left = `${screenPos.x + 20}px`;
  infoBoxMars.style.top = `${screenPos.y - 20}px`;
} else {
  document.getElementById("infoBoxMars").style.display = "none";
}

if (clickedObject.name === "Jupiter") {
  const screenPos = toScreenPosition(Jupiter, camera);
  const infoBoxJupiter = document.getElementById("infoBoxJupiter");
  infoBoxJupiter.style.display = "block";
  infoBoxJupiter.style.left = `${screenPos.x + 20}px`;
  infoBoxJupiter.style.top = `${screenPos.y - 20}px`;
} else {
  document.getElementById("infoBoxJupiter").style.display = "none";
}

if (clickedObject.name === "Saturn") {
  const screenPos = toScreenPosition(Saturn, camera);
  const infoBoxSaturn = document.getElementById("infoBoxSaturn");
  infoBoxSaturn.style.display = "block";
  infoBoxSaturn.style.left = `${screenPos.x + 20}px`;
  infoBoxSaturn.style.top = `${screenPos.y - 20}px`;
} else {
  document.getElementById("infoBoxSaturn").style.display = "none";
}

if (clickedObject.name === "Uranus") {
  const screenPos = toScreenPosition(Uranus, camera);
  const infoBoxUranus = document.getElementById("infoBoxUranus");
  infoBoxUranus.style.display = "block";
  infoBoxUranus.style.left = `${screenPos.x + 20}px`;
  infoBoxUranus.style.top = `${screenPos.y - 20}px`;
} else {
  document.getElementById("infoBoxUranus").style.display = "none";
}

if (clickedObject.name === "Neptune") {
  const screenPos = toScreenPosition(Neptune, camera);
  const infoBoxNeptune = document.getElementById("infoBoxNeptune");
  infoBoxNeptune.style.display = "block";
  infoBoxNeptune.style.left = `${screenPos.x + 20}px`;
  infoBoxNeptune.style.top = `${screenPos.y - 20}px`;
} else {
  document.getElementById("infoBoxNeptune").style.display = "none";
}

if (clickedObject.name === "Sun") {
  const screenPos = toScreenPosition(sun, camera);
  const infoBoxSun = document.getElementById("infoBoxSun");
  infoBoxSun.style.display = "block";
  infoBoxSun.style.left = `${screenPos.x + 20}px`;
  infoBoxSun.style.top = `${screenPos.y - 20}px`;
} else {
  document.getElementById("infoBoxSun").style.display = "none";
}

  } else {
    document.getElementById("infoBoxMoon").style.display = "none";
    document.getElementById("infoBoxVenus").style.display = "none";
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


function updateInfoBox(object3D, infoBoxElement) {
  if (!infoBoxElement || infoBoxElement.style.display !== "block") return;

  const screenPos = toScreenPosition(object3D, camera);
  const boxWidth = infoBoxElement.offsetWidth;
  const boxHeight = infoBoxElement.offsetHeight;

  const isVisible =
    screenPos.x > 0 &&
    screenPos.y > 0 &&
    screenPos.x + boxWidth < window.innerWidth &&
    screenPos.y + boxHeight < window.innerHeight;

  if (isVisible) {
    infoBoxElement.style.left = `${screenPos.x + 20}px`;
    infoBoxElement.style.top = `${screenPos.y - 20}px`;
  } else {
    infoBoxElement.style.display = "none";
  }
}
