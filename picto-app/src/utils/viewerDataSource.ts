import type { HotspotData } from "@/utils/Types";

/**
 * Result of loading a viewer item from a data source.
 *
 * `imageSource` is a URL usable directly by the panorama viewer (an object
 * URL, a CDN URL, etc.) and `hotspots` is the fully hydrated/runtime list of
 * hotspots (asset references already resolved to something renderable).
 *
 * `dispose` must be called by the caller when the data is no longer needed
 * (e.g. on unmount) so the data source can release any resources it created
 * while loading (such as `URL.createObjectURL` results). Implementations
 * that don't allocate anything can make this a no-op.
 */
export interface LoadedViewerData {
    imageSource: string | null;
    hotspots: HotspotData[];
    dispose: () => void;
}

/**
 * Abstraction over "where viewer/panorama data lives and how it is
 * persisted". `useViewerData` and `useHotspotManager` are written against
 * this interface only, so a new implementation (e.g. an API-backed data
 * source) can be swapped in without touching Pannellum/rendering logic.
 *
 * `createHotspot`/`updateHotspot`/`deleteHotspot` each receive the full
 * intended hotspot list for the viewer item (i.e. the current list with the
 * relevant hotspot appended/replaced/removed by the caller) and are
 * responsible for reconciling/persisting any local asset data and returning
 * the resulting runtime hotspot list (with asset references resolved to
 * renderable content), mirroring the previous inline
 * `resolveHotspotPersistence` + `putViewerItem` flow.
 */
export interface ViewerDataSource {
    load(viewerId: string): Promise<LoadedViewerData>;
    createHotspot(viewerId: string, hotspots: HotspotData[]): Promise<HotspotData[]>;
    updateHotspot(viewerId: string, hotspots: HotspotData[]): Promise<HotspotData[]>;
    deleteHotspot(viewerId: string, hotspots: HotspotData[]): Promise<HotspotData[]>;
}
