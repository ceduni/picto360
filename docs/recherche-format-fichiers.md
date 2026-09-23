# Recherche : réduire la taille des fichiers annotés

> **Objectif** : un seul fichier par projet (image ou vidéo 360° contenant ses
> annotations), le plus petit possible, sans dégrader la qualité perçue ni la
> compatibilité (navigateurs, Android/iOS, lecteurs externes).

Cette étude mesure d'abord où le poids se trouve réellement, puis compare les
options de format. Toutes les mesures ont été réalisées sur le panorama d'exemple
du dépôt (`picto-app/samples/Sommets_St-Sauveur_Avila_1-min.JPG`, 12 000 × 6 000,
JPEG 6,40 Mo) et sur une vidéo 3 840 × 1 920 dérivée de ce même panorama
(10 s à 30 i/s, contenu photo réel animé).

## 1. Où est le poids ? Décomposition du format `.picto` actuel

Le format `.picto` actuel est une archive ZIP (DEFLATE, niveau 6) contenant :

| Entrée           | Rôle                        | Ordre de grandeur   |
|------------------|-----------------------------|---------------------|
| `image.jpg`      | panorama 360°               | **~99,8 % du poids**|
| `annotations.json` | annotations (pitch/yaw…)  | 1–10 Ko             |
| `metadata.json`  | métadonnées                 | < 1 Ko              |
| `manifest.json`  | description de structure    | < 1 Ko              |

Mesures sur l'exemple (10 annotations) :

| Variante                                        | Taille      | Écart        |
|-------------------------------------------------|-------------|--------------|
| JPEG brut                                       | 6 714 477 o | —            |
| `.picto` actuel (DEFLATE 6, JSON indentés)      | 6 593 457 o | **−1,80 %**  |
| `.picto` optimisé (média stocké sans compression, JSON minifiés) | 6 715 579 o | **+0,02 %** |

**Conclusion 1 : le conteneur n'est ni le problème ni la solution.** Le coût de
l'annotation est négligeable (~1 Ko). Compresser ou non le média dans le ZIP
change au plus ±2 %. Le poids est entièrement dans le **média lui-même** ;
c'est donc sur le codec et la résolution qu'il faut agir.

## 2. Images : gain par re-encodage

| Encodage                        | Taille  | Écart vs source |
|---------------------------------|---------|-----------------|
| JPEG source (12 000 × 6 000)    | 6,40 Mo | —               |
| JPEG ré-encodé (≈ q70)          | 5,37 Mo | −16 %           |
| WebP q60                        | 5,22 Mo | −18 %           |
| WebP q80                        | 7,31 Mo | **+14 %** ⚠️    |
| AVIF q50                        | 3,49 Mo | **−45 %**       |

Points d'attention :

- **AVIF** offre le meilleur rapport taille/qualité, mais le décodage d'images
  de très grande taille reste coûteux sur mobile, et l'encodage navigateur
  (canvas) n'est pas disponible aujourd'hui : il faut un outil côté serveur
  (`avifenc`, `sharp`) ou WebAssembly.
- **WebP** est encodable directement par le navigateur (`canvas.toBlob`) — gain
  immédiat sans backend, mais plus faible ; et à haute qualité il peut devenir
  *plus gros* que le JPEG d'origine.
- La source fait **12 000 px de large**, au-delà de la limite de texture WebGL
  (8 192) de nombreux GPU mobiles. Une réduction à 8 192 × 4 096 améliore à la
  fois la compatibilité et la taille, avec une perte quasi invisible à l'écran.

**Conclusion 2 (images)** : proposer à l'export un ré-encodage JPEG q70–80
*défaut* + option « WebP » navigateur ; le réglage serveur actuel
(`sharp` q60 sur /api/compress-image) est déjà dans la bonne fourchette.

## 3. Vidéos : gain par codec

Encodages du même contenu (10 s, 3 840 × 1 920, 30 i/s). Les CRF ne sont pas
strictement équivalents entre codecs : l'ordre de grandeur des écarts est ce qui
compte.

| Codec            | Paramètre      | Taille   | Écart vs H.264 |
|------------------|----------------|----------|----------------|
| H.264 (réf.)     | CRF 23         | 25,28 Mo | —              |
| H.265 / HEVC     | CRF 28         | 11,88 Mo | **−53 %**      |
| AV1 (SVT)        | CRF 35, preset 8 | 15,53 Mo | **−39 %**    |

- **H.264** reste le seul socle compatible partout (tous navigateurs, Android,
  iOS). C'est le format d'entrée à accepter sans discussion.
- **H.265** divise ~par deux la taille ; décodage matériel quasi universel sur
  mobile récent, mais licences/patents et Safari/Chrome desktop selon platform.
- **AV1** : ~−40 %, libre de droits, décodage matériel sur matériel récent
  uniquement ; encodage lent (server-side `SVT-AV1` ou ffmpeg.wasm lourd).
- Comme pour les images, **la résolution est un levier majeur** : 3 840 × 1 920
  est rarement nécessaire sur écran de téléphone ; 2 560 × 1 280 réduit
  quasiment proportionnellement.

**Conclusion 3 (vidéos)** : accepter H.264/WebM en entrée, stocker tel quel,
et proposer un transcodage serveur (H.265 par défaut, AV1 en option) comme
évolution — pas de transcodage navigateur (trop lourd) en v1.

## 4. Options d'architecture du « fichier unique »

### Option A — Conteneur `.picto` v2 (recommandée à court terme)

Garder le ZIP, mais :

1. médias stockés **sans recompression** (`STORE`) — zéro coût CPU,
   l'écart de taille étant nul (§1) ;
2. JSON **minifiés** (gain réel de ~50 % sur les JSON, marginal en absolu) ;
3. accepter `video.mp4` / `video.webm` comme média (support vidéo).

Avantages : rétrocompatible (les lecteurs lisent par nom d'entrée, pas par
méthode de compression), préserve les *assets* embarqués (images/vidéos des
annotations), un seul fichier, extension reconnue par l'app.

### Option B — Métadonnées natives embarquées (expérimental)

Écrire les annotations **dans le fichier média lui-même**, sans conteneur :

| Média | Mécanisme standard            | Limite                         |
|-------|-------------------------------|--------------------------------|
| JPEG  | segment APP1 (XMP ou EXIF UserComment) | ~64 Ko par segment, très largement suffisant |
| PNG   | chunk `iTXt`/`zTXt`           | pas de limite pratique         |
| MP4   | atome `udta` (boîte XMP)      | pas de limite pratique         |

Le fichier reste un `.jpg`/`.mp4` standard ouvrable partout ; les annotations
voyagent avec le média, aucun outillage externe requis pour lire l'image.
Inconvénients : les *assets* des annotations ne peuvent plus être embarqués, il
faut écrire/lire les segments binaires soi-même (pas de dépendance lourde
nécessaire : APP1/iTXt sont triviaux, `udta` est d'un niveau intermédiaire), et
un ré-encodage par un outil tiers **efface** les annotations.

### Option C — Codecs modernes (complément indispensable)

Couplée à A ou B : ré-encodage JPEG→WebP/AVIF côté serveur, H.264→H.265/AV1
pour les vidéos. C'est ici que se trouvent les gains mesurés (§2, §3).

## 5. Recommandations

| Priorité | Action                                   | Gain attendu      |
|----------|------------------------------------------|-------------------|
| P0       | `.picto` v2 : `STORE` médias + JSON minifiés | ~2 % + CPU export ÷ |
| P0       | Support `video.mp4`/`webm` dans `.picto` | prérequis vidéo   |
| P1       | Export image : ré-encodage JPEG q70–80 (8 192 px max) | −20 à −30 % |
| P1       | Export vidéo serveur : H.265 par défaut  | ~−50 %            |
| P2       | Prototype XMP/EXIF embarqué (option B)   | suppression du conteneur (~1 Ko) et fichier standard |
| P3       | AVIF image / AV1 vidéo en option         | −40 à −50 %       |

## 6. Reproduire les mesures

```bash
# Conteneur
cd picto-app && node picto-measure.mjs   # (script de mesure ZIP vs brut)

# Images
S=picto-app/samples/Sommets_St-Sauveur_Avila_1-min.JPG
ffmpeg -i "$S" -q:v 8 out_q70.jpg
magick "$S" -quality 60 out_q60.webp
avifenc -j 4 -q 50 "$S" out.avif

# Vidéo (contenu photo réel animé depuis le panorama)
ffmpeg -loop 1 -i "$S" -vf "zoompan=z='min(1+on*0.002,1.6)':\
x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=300:s=3840x1920:fps=30" \
-t 10 src.mp4
ffmpeg -i src.mp4 -c:v libx264 -crf 23 h264.mp4
ffmpeg -i src.mp4 -c:v libx265 -crf 28 -tag:v hvc1 h265.mp4
ffmpeg -i src.mp4 -c:v libsvtav1 -crf 35 -preset 8 av1.mp4
```
