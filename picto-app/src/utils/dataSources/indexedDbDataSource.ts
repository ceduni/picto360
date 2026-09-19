import type { HotspotData } from "@/utils/Types";
import type { LoadedViewerData, ViewerDataSource } from "@/utils/viewerDataSource";
import { getViewerItem, putViewerItem } from "@/utils/storedImageData";
import { hydrateStoredHotspots, resolveHotspotPersistence } from "@/utils/HotspotAssetUtils";

/**
 * `ViewerDataSource` implementation backed by the client-side IndexedDB
 * store (`storedImageData.ts`). This wraps the existing `getViewerItem` /
 * `putViewerItem` functions and the hotspot asset reconciliation helpers in
 * `HotspotAssetUtils.ts` without changing their behavior.
 */
export class IndexedDbDataSource implements ViewerDataSource {
    async load(viewerId: string): Promise<LoadedViewerData> {
        const viewerItem = await getViewerItem(viewerId);
        const compressedImage = viewerItem?.compressedBlob || viewerItem?.blob;
        const annotations = viewerItem?.annotations;
        const assets = viewerItem?.assets || [];

        if (!compressedImage) {
            return {
                imageSource: null,
                hotspots: [],
                dispose: () => {},
            };
        }

        const objectUrl = URL.createObjectURL(compressedImage);
        let hotspots: HotspotData[] = [];
        let hotspotObjectUrls: string[] = [];

        if (annotations && Array.isArray(annotations)) {
            const hydrated = hydrateStoredHotspots(annotations, assets);
            hotspots = hydrated.hotspots;
            hotspotObjectUrls = hydrated.objectUrls;
        }

        return {
            imageSource: objectUrl,
            hotspots,
            dispose: () => {
                URL.revokeObjectURL(objectUrl);
                hotspotObjectUrls.forEach((url) => URL.revokeObjectURL(url));
            },
        };
    }

    async createHotspot(viewerId: string, hotspots: HotspotData[]): Promise<HotspotData[]> {
        return this.persistHotspots(viewerId, hotspots);
    }

    async updateHotspot(viewerId: string, hotspots: HotspotData[]): Promise<HotspotData[]> {
        return this.persistHotspots(viewerId, hotspots);
    }

    async deleteHotspot(viewerId: string, hotspots: HotspotData[]): Promise<HotspotData[]> {
        return this.persistHotspots(viewerId, hotspots);
    }

    private async persistHotspots(viewerId: string, hotspots: HotspotData[]): Promise<HotspotData[]> {
        const viewerItem = await getViewerItem(viewerId);
        const resolved = resolveHotspotPersistence(hotspots, viewerItem?.assets);

        await putViewerItem(
            viewerId,
            undefined,
            undefined,
            resolved.storedHotspots,
            undefined,
            resolved.assets,
        );

        return resolved.runtimeHotspots;
    }
}

/** Shared singleton — safe to reuse since the class holds no instance state. */
export const indexedDbDataSource = new IndexedDbDataSource();
