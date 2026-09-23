# Le format `.picto`

> Un fichier `.picto` = **un projet complet dans un seul fichier** : le média 360°
> (image ou vidéo), ses annotations, et les éventuels assets qu'elles référencent
> (images/vidéos locales des annotations).

## Principe

Un `.picto` est une **archive ZIP** standard : n'importe quel outil sait l'ouvrir
(`unzip -l monfichier.picto`). L'extension `.picto` ne sert qu'à l'associer à
l'application. Les entrées JSON sont compressées (DEFLATE) ; le média est stocké
**sans recompression** (STORE) puisqu'un JPEG/MP4 est déjà compressé — le mesurer
a montré que recompresser ne gagne au mieux que ±2 % (voir
[Recherche : formats de fichiers](recherche-format-fichiers.md)).

## Structure

```
monfichier.picto (ZIP)
├── image.jpg | video.mp4    ← le média 360° (selon mediaInfo.kind)
├── metadata.json            ← infos générales + description du média
├── annotations.json         ← les annotations (voir schéma plus bas)
├── manifest.json            ← description de la structure du fichier
└── assets/                  ← optionnel : fichiers locaux des annotations
    └── <id>-<nom>.png
```

### `metadata.json`

```json
{
  "version": "1.1",
  "format": "picto",
  "created": "2026-09-06T22:00:00.000Z",
  "imageInfo": { "filename": "image.jpg", "format": "jpg", "size": 6714477 },
  "mediaInfo": {
    "kind": "image",
    "filename": "image.jpg",
    "mimeType": "image/jpeg",
    "size": 6714477
  },
  "annotationCount": 12,
  "bundledAssetCount": 2,
  "creator": "MyPictoApp"
}
```

### `annotations.json`

```json
{
  "version": "1.0",
  "annotations": [
    {
      "id": "hotspot-1725...-0",
      "pitch": 12.5,
      "yaw": -47.2,
      "type": "text",
      "content": "Le sommet des Laurentides",
      "cssClass": "hotspot-manager__custom_hotspot",
      "timeRange": { "start": 7, "end": 10 }
    }
  ],
  "statistics": { "total": 1, "types": ["text"] }
}
```

- `pitch` / `yaw` : position sur la sphère 360° (degrés ; pitch +90 = zénith,
  −90 = nadir ; yaw 0 = direction initiale, positif vers la droite).
- `type` : `text`, `label`, `hyperlink`, `image`, `gif`, `video`.
- `timeRange` (**vidéo uniquement**, optionnel) : fenêtre de visibilité en
  secondes. Absent = toujours visible. Les projets image l'ignorent.

### `manifest.json`

Décrit le contenu (`fileType`, `version`, liste des fichiers). Les lecteurs
valident un fichier `.picto` en vérifiant la présence de `metadata.json`,
`annotations.json` et `manifest.json` dans le répertoire central du ZIP.

## Règles de versionnement

| Version | Changement |
|---------|------------|
| 1.0     | Image uniquement, JSON indentés, DEFLATE partout |
| 1.1     | Média vidéo accepté (`mediaInfo`, `video.mp4`), JSON minifiés, média en STORE |
| 1.2     | `timeRange` optionnel sur les annotations (vidéo) |

Règles appliquées :

1. **Ajouter, jamais retirer** : un champ nouveau est toujours optionnel ; un
   lecteur ancien ignore ce qu'il ne connaît pas.
2. Le lecteur détecte le média via `metadata.mediaInfo` (v1.1+), avec
   repli sur `metadata.imageInfo` (v1.0) — la lecture est rétrocompatible.
3. `imageInfo` reste écrit pour les projets image afin que les anciens
   lecteurs continuent de fonctionner.

## Où le code vit

- Écriture / lecture : `picto-app/src/pictoFileExtention/PictoFileFormat.ts`
  (côté client, via JSZip — aucune dépendance serveur).
- Export Drive `.picto` : `backend/src/providers/export/PictoFormatExporter.ts`
  (validation seulement ; le fichier est déjà assemblé par le client).
- Format « raw » (séparé) : `backend/src/providers/export/RawFormatExporter.ts`
  — média + `*_annotations.json` en deux fichiers.
