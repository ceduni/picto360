import {
  HotspotData,
  PendingHotspotAsset,
  StoredViewerAsset,
} from "@/utils/Types";

const LOCAL_ASSET_PREFIX = "asset://";

interface HydratedHotspotResult {
  hotspot: HotspotData;
  objectUrls: string[];
}

export interface HydratedHotspotListResult {
  hotspots: HotspotData[];
  objectUrls: string[];
}

export interface ResolvedHotspotPersistenceResult {
  storedHotspots: HotspotData[];
  runtimeHotspots: HotspotData[];
  assets: StoredViewerAsset[];
}

export function createAssetReference(assetId: string): string {
  return `${LOCAL_ASSET_PREFIX}${assetId}`;
}

export function isAssetReference(value?: string): boolean {
  return typeof value === "string" && value.startsWith(LOCAL_ASSET_PREFIX);
}

export function createStoredViewerAsset(
  pendingAsset: PendingHotspotAsset,
): StoredViewerAsset {
  return {
    id: crypto.randomUUID(),
    blob: pendingAsset.blob,
    fileName: pendingAsset.fileName || "asset",
    mimeType: pendingAsset.mimeType || pendingAsset.blob.type || "application/octet-stream",
    kind: pendingAsset.kind,
  };
}

export function resolveHotspotPersistence(
  hotspots: HotspotData[],
  existingAssets: StoredViewerAsset[] = [],
): ResolvedHotspotPersistenceResult {
  const assetMap = new Map(existingAssets.map((asset) => [asset.id, asset]));
  const storedHotspots: HotspotData[] = [];
  const runtimeHotspots: HotspotData[] = [];

  hotspots.forEach((hotspot) => {
    const { pendingAsset, ...baseHotspot } = hotspot;

    if (pendingAsset) {
      const asset = createStoredViewerAsset(pendingAsset);
      assetMap.set(asset.id, asset);

      const runtimeContent = URL.createObjectURL(asset.blob);

      storedHotspots.push({
        ...baseHotspot,
        assetId: asset.id,
        assetSource: "local",
        fileName: asset.fileName,
        mimeType: asset.mimeType,
        content: createAssetReference(asset.id),
      });

      runtimeHotspots.push({
        ...baseHotspot,
        assetId: asset.id,
        assetSource: "local",
        fileName: asset.fileName,
        mimeType: asset.mimeType,
        content: runtimeContent,
      });

      return;
    }

    if (baseHotspot.assetSource === "local" && baseHotspot.assetId) {
      const runtimeHotspot = hydrateStoredHotspot(baseHotspot, existingAssets);

      storedHotspots.push({
        ...baseHotspot,
        content: createAssetReference(baseHotspot.assetId),
      });
      runtimeHotspots.push(runtimeHotspot.hotspot);
      return;
    }

    storedHotspots.push({
      ...baseHotspot,
      assetId: undefined,
      assetSource: undefined,
      fileName: undefined,
      mimeType: undefined,
      content: baseHotspot.content,
    });

    runtimeHotspots.push({
      ...baseHotspot,
      assetId: undefined,
      assetSource: undefined,
      fileName: undefined,
      mimeType: undefined,
      content: baseHotspot.content,
    });
  });

  const referencedAssetIds = new Set(
    storedHotspots
      .filter((hotspot) => hotspot.assetSource === "local" && hotspot.assetId)
      .map((hotspot) => hotspot.assetId as string),
  );

  const assets = Array.from(assetMap.values()).filter((asset) =>
    referencedAssetIds.has(asset.id),
  );

  return {
    storedHotspots,
    runtimeHotspots,
    assets,
  };
}

export function hydrateStoredHotspots(
  hotspots: HotspotData[] = [],
  assets: StoredViewerAsset[] = [],
): HydratedHotspotListResult {
  const objectUrls: string[] = [];

  const hydratedHotspots = hotspots.map((hotspot) => {
    const hydrated = hydrateStoredHotspot(hotspot, assets);
    objectUrls.push(...hydrated.objectUrls);
    return hydrated.hotspot;
  });

  return {
    hotspots: hydratedHotspots,
    objectUrls,
  };
}

export function prepareHotspotsForPictoExport(
  hotspots: HotspotData[] = [],
  includeLocalFiles: boolean,
): HotspotData[] {
  return hotspots.map(({ pendingAsset, ...hotspot }) => {
    if (hotspot.assetSource === "local") {
      return {
        ...hotspot,
        content: includeLocalFiles && hotspot.assetId
          ? createAssetReference(hotspot.assetId)
          : "",
      };
    }

    return hotspot;
  });
}

function hydrateStoredHotspot(
  hotspot: HotspotData,
  assets: StoredViewerAsset[] = [],
): HydratedHotspotResult {
  if (hotspot.assetSource !== "local" || !hotspot.assetId) {
    return {
      hotspot,
      objectUrls: [],
    };
  }

  const asset = assets.find((item) => item.id === hotspot.assetId);
  if (!asset) {
    return {
      hotspot: {
        ...hotspot,
        content: hotspot.content && !isAssetReference(hotspot.content)
          ? hotspot.content
          : "",
      },
      objectUrls: [],
    };
  }

  if (hotspot.content && !isAssetReference(hotspot.content)) {
    return {
      hotspot,
      objectUrls: [],
    };
  }

  const objectUrl = URL.createObjectURL(asset.blob);
  return {
    hotspot: {
      ...hotspot,
      content: objectUrl,
      fileName: hotspot.fileName || asset.fileName,
      mimeType: hotspot.mimeType || asset.mimeType,
    },
    objectUrls: [objectUrl],
  };
}
