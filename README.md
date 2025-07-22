# 🌌 Three.js Solar System

Une simulation 3D interactive du système solaire réalisée avec **Three.js**, permettant de visualiser les planètes, leurs orbites et d'accéder à des fiches informatives en cliquant sur chaque astre.

---

## 📸 Aperçu

![screenshot](public/screenshot.jpg) <!-- Remplace ou supprime si tu n’as pas encore d’image -->

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

2. **Lancer un serveur local :**

   Comme le projet utilise des chemins relatifs et des modules JavaScript, il **nécessite un serveur local** pour fonctionner (pas simplement ouvrir `index.html` dans le navigateur).

   Si tu as Python :
   ```bash
   # Python 3
   python -m http.server 5500
   # puis visite http://localhost:5500
   ```

   Sinon tu peux utiliser [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) dans VSCode.

---

## ✅ À faire / idées futures

- Ajouter les lunes principales des autres planètes (ex : Ganymède, Titan…)
- Ajout d’un système de zoom automatique vers la planète sélectionnée
- Interface multilingue (français/anglais)
- Sons et musiques spatiales d’ambiance
- Mode jour/nuit sur la Terre avec blending des textures

---

## ✍️ Auteur

Développé par **Luc Sarrazin**, étudiant en informatique passionné par les moteurs 3D et la programmation interactive.

---

## 📜 Licence

Ce projet est sous licence MIT — libre de l'utiliser, modifier et redistribuer.

---

## 🌐 Démo en ligne (optionnel)

Tu peux héberger le projet gratuitement avec :
- [GitHub Pages](https://pages.github.com/)
- [Netlify](https://www.netlify.com/)
- [Vercel](https://vercel.com/)

---
