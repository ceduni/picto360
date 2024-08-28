<br/>
<p align="center">
    <img src="docs/images/logo_picto360.png" width="300">
</p>

# Picto360: Application d'annotation d'image

> **Page web du projet (IFT3150):** https://ceduni.github.io/picto360

## Description du projet 

Picto360 est une collaboration avec [École en Réseau](https://eer.qc.ca/) visant à développer une application pédagogique qui enrichit des images panoramiques et à 360° avec des annotations interactives.

👀 [Exemple d'annotation de photos 360 (prise avec un drone)](https://www.thinglink.com/scene/1800248329951511396)

### Problématique

Les outils existants pour annoter des images à 360° sont souvent coûteux, complexes, et requièrent la création de comptes utilisateurs, compromettant ainsi la confidentialité des données. Ces limitations freinent l'adoption de ces technologies dans les environnements éducatifs, en particulier ceux disposant de ressources limitées.

### Proposition

Picto360 propose une solution web gratuite, intuitive et sécurisée, permettant d'ajouter des annotations interactives à des images panoramiques et à 360°, spécialement conçue pour un usage éducatif. L'application offre des fonctionnalités robustes pour la gestion des projets, la visualisation immersive des images, et le partage collaboratif, le tout sans nécessiter de comptes utilisateurs, garantissant ainsi la protection des données personnelles.

#### Objectifs 

- Créer une plateforme intuitive et accessible pour l'annotation d'images à 360°.
- Assurer la confidentialité des données sans comptes utilisateurs.
- Offrir une interaction immersive avec les annotations.
- Faciliter le partage et la collaboration sur les projets.
- Encourager la contribution de la communauté éducative avec une solution open-source.

#### Fonctionnalités

- **Gestion des images :**
  - Téléchargement et stockage d'images à 360°.
  - Navigation interactive dans les images.
- **Annotation des images :**
  - Ajout, modification, et suppression d'annotations (texte, liens, vidéos, quiz).
  - Positionnement précis des annotations.
- **Partage et collaboration :**
  - Génération de liens partageables avec permissions configurables.
  - Exportation de projets annotés.
- **Interface utilisateur :**
  - Menu contextuel pour gérer les annotations.
  - Barre d'outils pour la gestion des projets.
- **Sécurité et confidentialité :**
  - Aucun compte utilisateur requis.
  - Protocoles sécurisés pour le stockage et le partage des données.
- **Accessibilité :**
  - Compatible avec les principaux navigateurs web.
  - Adaptabilité aux écrans (ordinateurs, tablettes, smartphones).

## 📅 Échéancier

> Début du projet : 6 mai 2024  
> Fin du projet : 16 août 2024

Le développement est structuré en phases :

- **Phase 1: Élaboration des exigences** (Semaines 1-2)
- **Phase 2: Prototypage et conception** (Semaines 3-6)
- **Phase 3: Développement** (Semaines 7-12)
- **Phase 4: Tests & Rapports** (Semaines 13-15)

Le suivi du projet est détaillé dans le fichier [**TIMELINE**](TIMELINE.md).

## 🌐 Infrastructure

Picto360 s'appuie sur une architecture moderne et modulaire :

- **Frontend :** Développé avec React et TypeScript pour une interface utilisateur dynamique. Vite est utilisé pour un développement rapide.
- **Backend :** Implémenté en Node.js avec Fastify, assurant des performances élevées et une communication fluide avec le frontend.
- **Base de données :** MongoDB gère les images, annotations et projets avec flexibilité grâce à son modèle NoSQL.
- **API RESTful :** Gérée par Fastify, cette API assure la gestion des images, annotations, et le partage de projets.
- **Visualisation des images :** Pannellum permet une navigation fluide et une interaction immersive avec les images.
- **Services tiers :** Intégration de Google Drive, OneDrive, et Dropbox pour l'importation directe d'images.

## 📘 Documentation

- [Dossier Drive](https://drive.google.com/drive/u/1/folders/12ap4jNxMDa4FnayR46Pu2auJaNviNHCZ) : Documentation du projet.
- [Wiki](https://github.com/ceduni/picto360/wiki) : Documentation de l'application et de l'infrastructure.

## 🗂️ Organisation

### **`backend/`**
Code serveur et logique métier.

- **`models/`** : Modèles de données (Annotations, Projets, Images).
- **`routes/`** : Endpoints API RESTful.
- **`services/`** : Logique applicative.
- **`utils/`** : Utilitaires généraux.

### **`docs/`**
Documentation du projet.

- **`css/`** : Styles pour la documentation.
- **`images/`** : Logos et illustrations.
- **`index.html`** : Page d'accueil de la documentation.

### **`picto-app/`**
Frontend développé avec React et TypeScript.

- **`components/`** : Composants React (Barre d'outils, Menu contextuel, Visionneuse).
- **`hooks/`** : Hooks personnalisés.
- **`models/`** : Modèles de données pour le frontend.
- **`assets/`** : Styles CSS et autres assets.
- **`public/`** : Fichiers publics incluant `pannellum.js`.

### **Racine du projet**
- **`README.md`** : Description générale.
- **`TIMELINE.md`** : Suivi hebdomadaire.

## 🌟 Contribution

Supervision par [Louis-Edouard LAFONTANT](mailto:louis.edouard.lafontant@umontreal.ca).

### Contributeurs

- Mathis MORRA-FISCHER [@Mathiiis](https://github.com/Mathiiis)
- Tarik BENAKEZOUH [@TBAce11](https://github.com/TBAce11)
