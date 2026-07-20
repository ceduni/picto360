<br/>
<p align="center">
    <img src="docs/images/logo_picto360.png" width="300">
</p>

# Picto360: Application d'annotation d'image

## Description du projet 

Picto360 est une collaboration avec [École en Réseau](https://eer.qc.ca/) visant à développer une application pédagogique qui enrichit des images panoramiques et à 360° avec des annotations interactives et permet la création 
d'activités académiques.

👀 [Exemple d'annotation de photos 360 (prise avec un drone)](https://www.thinglink.com/scene/1800248329951511396)

# 📘 Documentation

> [Dossier Drive](https://drive.google.com/drive/u/1/folders/12ap4jNxMDa4FnayR46Pu2auJaNviNHCZ): Contient la documentation du projet  
> [Wiki](https://github.com/ceduni/picto360/wiki): Contient la documentation de l'application et de l'infrastructure développée (Services, API, Base de données...)

## Template de site web pour IFT3150

Ce projet est un template de site web pour le cours IFT3150, construit avec [MkDocs](https://www.mkdocs.org/) et le thème [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/).

### Prérequis

Assurez-vous d’avoir les outils suivants installés :

- Python **3.8** ou plus récent
- `pip` (gestionnaire de paquets Python)

### Installation

1. Clonez ce dépôt :
```bash
git clone git@github.com:udem-diro/template-projet.git
cd ift3150-template
```

2. Installez les dépendances :
```bash
pip install -r requirements.txt
```

### Utilisation

#### Développement local

Pour lancer un serveur de développement local :

```bash
mkdocs serve
```

Le site sera accessible à l'adresse [http://127.0.0.1:8000](http://127.0.0.1:8000)

#### Construction du site

Pour construire le site :

```bash
mkdocs build
```

Les fichiers générés seront dans le dossier `site/`.

#### Déploiement

Pour déployer sur GitHub Pages :

```bash
mkdocs gh-deploy
```

> Cette commande pousse automatiquement le contenu du site sur la branche gh-pages.

### Structure du projet

- `docs/` : Contient tous les fichiers Markdown du site
- `mkdocs.yml` : Configuration de MkDocs
- `requirements.txt` : Dépendances Python
- `site/` : Site généré (créé lors de la construction)

### Personnalisation

1. Modifiez `mkdocs.yml` pour changer la configuration du site
2. Ajoutez/modifiez les fichiers Markdown (`.md`) dans `docs/`
3. Personnalisez le thème en modifiant les paramètres dans `mkdocs.yml`

## 🗂️ Organisation

### **`backend/`**
Code serveur et logique métier.

- **`models/`** : Modèles de données (Annotations, Projets, Images).
- **`routes/`** : Endpoints API RESTful.
- **`services/`** : Logique applicative.
- **`utils/`** : Utilitaires généraux.
- **`middlewares/`** : Vérifications avant l'exécution de la logique .

#### Configuration Cloudflare

Le backend utilise Cloudflare pour stocker les fichiers liés aux projets et aux contenus média :

- **R2 bucket images** : images principales des projets.
- **R2 bucket media** : contenus média des annotations, comme les vidéos, GIFs ou fichiers.

Ajoutez les variables suivantes dans `backend/.env` :

```env
CLOUDFLARE_ACCOUNT_ID=
CLOUDFLARE_API_TOKEN=
R2_MEDIA_BUCKET_NAME=picto-media
```

Pour créer les buckets R2 nécessaires à l'environnement courant :

```bash
cd backend
npm run setup:cloudflare
```

La commande peut être relancée sans risque : si un bucket existe déjà, le script continue.

### **`docs/`**
Documentation du projet.

- **`css/`** : Styles pour la documentation.
- **`images/`** : Logos et illustrations.
- **`index.html`** : Page d'accueil de la documentation.

### **`picto-app/`**
Frontend développé avec React et TypeScript.
- **`assets/`** : Styles CSS et autres assets.
- **`authContext/`** : Contexte d'authentification avec une scope générale.  
- **`components/`** : Composants React (Barre d'outils, Menu contextuel, Visionneuse).
- **`firebase/`** : Gestion des configurations de firebase. 
- **`hooks/`** : Hooks personnalisés.
- **`pages/`** : Pages principages de l'application.
- **`utils/`** : Outils. 
- **`public/`** : Fichiers publics incluant `pannellum.js`.

### **Racine du projet**
- **`README.md`** : Description générale.
- **`TIMELINE.md`** : Suivi hebdomadaire.

## 🌟 Contribution

Supervision par [Louis-Edouard LAFONTANT](mailto:louis.edouard.lafontant@umontreal.ca).

### Contributeurs
- Jeff Pendy [@Pejjp] (https://github.com/Pejjp)
- Mathis MORRA-FISCHER [@Mathiiis](https://github.com/Mathiiis)
- Tarik BENAKEZOUH [@TBAce11](https://github.com/TBAce11)
