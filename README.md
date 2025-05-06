<br/>
<p align="center">
    <img src="images/logo_picto360.png" width="300">
</p>

# Picto360: Application d'annotation d'image

> **Page web du projet (IFT3150):** https://ceduni.github.io/picto360

## Description du projet 

Ce projet est une collaboration avec [École en Réseau](https://eer.qc.ca/) et consiste à développer une application pédagogique permettant d'enrichir des images panoramiques et 360 avec des annotations diverses et interactives.

👀[Exemple d'annotation de photos 360 (prise avec un drone)](https://www.thinglink.com/scene/1800248329951511396)

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

# 🗂️ Organisation

Les dossiers du répertoire sont organisés comme suit:

<!-- TODO -->

# 🌟 Contribution

Le projet est supervisé par [Louis-Edouard LAFONTANT](mailto:louis.edouard.lafontant@umontreal.ca).

## Contributeurs

- Mathis MORRA-FISCHER [@Mathiiis](https://github.com/Mathiiis)
- Tarik BENAKEZOUH [@TBAce11](https://github.com/TBAce11)
