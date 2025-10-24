import { useSyncExternalStore } from "react";
import { getStore } from "@utils/Store";
import type { ViewerState } from "@utils/Store";

const store = getStore();

/**
 * Hook to select a specific slice of the store state
 * @param selector - Function to select a piece of state
 * @returns The selected state
 * 
 * @example
 * const hotspots = usePanoramaStore(s => s.hotspots);
 * const isEditMode = usePanoramaStore(s => s.viewMode === "edit");
 */
export function useStore<T>(selector: (state: ViewerState) => T): T {
    return useSyncExternalStore(
        store.subscribe.bind(store),
        () => selector(store.getState()),
        () => selector(store.getState())
    );
}

/**
 * Hook to get the entire store state
 * @returns The complete store state
 * 
 * @example
 * const state = useFullPanoramaStore();
 */
export function useFullStore(): ViewerState {
    return useSyncExternalStore(
        store.subscribe.bind(store),
        () => store.getState(),
        () => store.getState()
    );
}

/**
 * Hook to get the store instance for calling methods
 * @returns The store instance
 * 
 * @example
 * const store = usePanoramaStoreActions();
 * store.addHotspot(newHotspot);
 */
export function useStoreActions() {
    return store;
}