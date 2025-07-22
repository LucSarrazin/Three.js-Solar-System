# 🌌 Three.js Solar System

Une simulation 3D interactive du système solaire réalisée avec **Three.js**, permettant de visualiser les planètes, leurs orbites et d'accéder à des fiches informatives en cliquant sur chaque astre.

---

## 🚀 Fonctionnalités

- 🌞 Représentation 3D du Soleil et des 8 planètes principales (ainsi que la Lune)
- 🌀 Orbites animées avec rotation réelle autour du Soleil
- 🌫️ Atmosphère autour de certaines planètes (comme Vénus ou les nuages de la Terre)
- ✨ Fond étoilé dynamique et effets lumineux réalistes (Bloom)
- 🖱️ Interaction : cliquez sur une planète ou le Soleil pour afficher une fiche descriptive
- 🌑 Anneaux de Saturne, rotation individuelle de chaque astre
- 📦 Utilisation de textures réalistes et d'un moteur 3D performant

---

## 🛠️ Technologies utilisées

- [Three.js](https://threejs.org/)
- WebGL (via `WebGLRenderer`)
- Effets de post-traitement : `UnrealBloomPass`
- Contrôles caméra : `OrbitControls`
- Vite
- JavaScript
- HTML / CSS vanilla

---

## 📁 Arborescence simplifiée

```
Threejs-project/
├── public/
│   ├── stars.jpg
│   ├── sun.jpg
│   ├── EarthDay.jpg
│   ├── EarthNight.jpg
│   ├── EarthClouds.jpg
│   ├── mars.jpg
│   └── ...
├── main.js
├── index.html
└── README.md
```

---

## 🖥️ Installation et exécution locale

1. **Cloner le dépôt :**
   ```bash
   git clone https://github.com/LucSarrazin/Threejs-project.git
   cd Threejs-project
   ```

2. **Installer les dépendances :**
   Comme le projet utilise des chemins relatifs et des modules JavaScript, il **nécessite un serveur local** pour fonctionner (pas simplement ouvrir `index.html` dans le navigateur).

   ```bash
   npm install
   ```

4. **Lancer le serveur local avec Vite**
   
   ```bash
   npx vite
   ```
   
5. **Accéder au projet dans le navigateur**
   Une fois le serveur lancé, ouvre ton navigateur à l’adresse :
   
   ```bash
   http://localhost:5173
   ```

---

## ✅ À faire / idées futures

- Ajouter les lunes principales des autres planètes (ex : Ganymède, Titan…)
- Ajout d’un système de zoom automatique vers la planète sélectionnée
- Interface multilingue (français/anglais)
- Sons et musiques spatiales d’ambiance
- Mode jour/nuit sur la Terre avec blending des textures

---

## ✍️ Auteur

Tous les droits de ce projet sont réservés à **Luc Sarrazin**. Aucune redistribution, modification ou utilisation commerciale n’est autorisée sans autorisation préalable.

---

## 📜 Licence

Ce projet est sous licence MIT — libre de l'utiliser, modifier et redistribuer.

---
