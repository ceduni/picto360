import type { HotspotData, PannellumViewer } from "./Types";

export type ViewMode = "edit" | "preview";

export type ViewerState = {
    // Viewer configuration
    viewerId: string | null;
    imageSource: string | null;
    isLoading: boolean;
    error: Error | null;

    // Viewer instance
    viewerInstance: PannellumViewer | null;
    isViewerReady: boolean;

    // View mode
    viewMode: ViewMode;

    // Hotspots
    hotspots: HotspotData[];
    selectedHotspot: HotspotData | null;
    hotspotsLoaded: boolean;

    // UI State
    contextMenuVisible: boolean;
    contextMenuPosition: { x: number; y: number };
    targetIconPosition: { x: number; y: number } | null;
    editionPanelOpen: boolean;
    editionPanelState: "creating" | "editing" | null;
    hotspotListPanelOpen: boolean;

    // Project metadata
    projectTitle: string;
    projectDescription: string;
    projectTags: string[];

    // Settings
    autoSave: boolean;
    language: "fr" | "en";
    showAnnotations: boolean;
    annotationsLocked: boolean;

    // Notifications
    notifications: Array<{
        id: string;
        message: string;
        type: "success" | "warning" | "failure" | "info";
        timestamp: number;
    }>;
};

type Listener = (state: ViewerState) => void;

const INITIAL_STATE: ViewerState = {
    viewerId: null,
    imageSource: null,
    isLoading: false,
    error: null,
    viewerInstance: null,
    isViewerReady: false,
    viewMode: "edit",
    hotspots: [],
    selectedHotspot: null,
    hotspotsLoaded: false,
    contextMenuVisible: false,
    contextMenuPosition: { x: 0, y: 0 },
    targetIconPosition: null,
    editionPanelOpen: false,
    editionPanelState: null,
    hotspotListPanelOpen: false,
    projectTitle: "Untitled",
    projectDescription: "",
    projectTags: [],
    autoSave: true,
    language: "fr",
    showAnnotations: true,
    annotationsLocked: false,
    notifications: [],
};

export class Store {
    private state: ViewerState = { ...INITIAL_STATE };
    private listeners: Set<Listener> = new Set();

    /**
     * Returns a shallow copy of the current state
     */
    public getState(): ViewerState {
        return { ...this.state };
    }

    /**
     * Updates state with partial updates
     */
    public setState(patch: Partial<ViewerState> | ((s: ViewerState) => Partial<ViewerState>)): void {
        const newState: Partial<ViewerState> = typeof patch === "function" ? patch(this.state) : patch;
        this.state = { ...this.state, ...newState };
        this.notify();
    }

    /**
     * Resets state to initial values
     */
    public reset(): void {
        this.state = { ...INITIAL_STATE };
        this.notify();
    }

    /**
     * Subscribes to state changes
     */
    public subscribe(listener: Listener): () => void {
        this.listeners.add(listener);
        return () => {
            this.listeners.delete(listener);
        };
    }

    /**
     * Notifies all listeners
     */
    private notify(): void {
        const snapshot = this.getState();
        this.listeners.forEach((listener) => listener(snapshot));
    }

    // ==================== VIEWER METHODS ====================

    public setViewerId(viewerId: string | null): void {
        this.setState({ viewerId });
    }

    public setImageSource(imageSource: string | null): void {
        this.setState({ imageSource });
    }

    public setLoading(isLoading: boolean): void {
        this.setState({ isLoading });
    }

    public setError(error: Error | null): void {
        this.setState({ error });
    }

    public setViewerInstance(viewerInstance: PannellumViewer | null): void {
        this.setState({ 
            viewerInstance, 
            isViewerReady: viewerInstance !== null 
        });
    }

    public getViewerInstance(): PannellumViewer | null {
        return this.state.viewerInstance;
    }

    // ==================== VIEW MODE ====================

    public setViewMode(viewMode: ViewMode): void {
        this.setState({ viewMode });
    }

    public toggleViewMode(): void {
        this.setState((s) => ({
            viewMode: s.viewMode === "edit" ? "preview" : "edit",
        }));
    }

    public isEditMode(): boolean {
        return this.state.viewMode === "edit";
    }

    // ==================== HOTSPOT METHODS ====================

    public setHotspots(hotspots: HotspotData[]): void {
        this.setState({ hotspots });
    }

    public addHotspot(hotspot: HotspotData): void {
        this.setState((s) => ({
            hotspots: [...s.hotspots, hotspot],
        }));
    }

    public updateHotspot(updatedHotspot: HotspotData): void {
        this.setState((s) => ({
            hotspots: s.hotspots.map((hs) =>
                hs.id === updatedHotspot.id ? updatedHotspot : hs
            ),
        }));
    }

    public deleteHotspot(hotspotId: string): void {
        this.setState((s) => ({
            hotspots: s.hotspots.filter((hs) => hs.id !== hotspotId),
        }));
    }

    public getHotspots(): HotspotData[] {
        return this.state.hotspots;
    }

    public getHotspotById(hotspotId: string): HotspotData | null {
        return this.state.hotspots.find((hs) => hs.id === hotspotId) || null;
    }

    public getHotspotsByType(type: string): HotspotData[] {
        return this.state.hotspots.filter((hs) => hs.type === type);
    }

    public setHotspotsLoaded(loaded: boolean): void {
        this.setState({ hotspotsLoaded: loaded });
    }

    public areHotspotsLoaded(): boolean {
        return this.state.hotspotsLoaded;
    }

    // ==================== SELECTED HOTSPOT ====================

    public setSelectedHotspot(hotspot: HotspotData | null): void {
        this.setState({ selectedHotspot: hotspot });
    }

    public getSelectedHotspot(): HotspotData | null {
        return this.state.selectedHotspot;
    }

    public clearSelectedHotspot(): void {
        this.setState({ selectedHotspot: null });
    }

    // ==================== CONTEXT MENU ====================

    public showContextMenu(position: { x: number; y: number }): void {
        this.setState({
            contextMenuVisible: true,
            contextMenuPosition: position,
            targetIconPosition: position,
        });
    }

    public hideContextMenu(): void {
        this.setState({
            contextMenuVisible: false,
            contextMenuPosition: { x: 0, y: 0 },
            targetIconPosition: null,
        });
    }

    public updateContextMenuPosition(position: { x: number; y: number }): void {
        this.setState({
            contextMenuPosition: position,
            targetIconPosition: position,
        });
    }

    public clearTargetIcon(): void {
        this.setState({ targetIconPosition: null });
    }

    // ==================== EDITION PANEL ====================

    public openEditionPanel(state: "creating" | "editing"): void {
        this.setState({
            editionPanelOpen: true,
            editionPanelState: state,
        });
    }

    public closeEditionPanel(): void {
        this.setState({
            editionPanelOpen: false,
            editionPanelState: null,
        });
    }

    public isEditionPanelOpen(): boolean {
        return this.state.editionPanelOpen;
    }

    public getEditionPanelState(): "creating" | "editing" | null {
        return this.state.editionPanelState;
    }

    // ==================== HOTSPOT LIST PANEL ====================

    public toggleHotspotListPanel(): void {
        this.setState((s) => ({
            hotspotListPanelOpen: !s.hotspotListPanelOpen,
        }));
    }

    public openHotspotListPanel(): void {
        this.setState({ hotspotListPanelOpen: true });
    }

    public closeHotspotListPanel(): void {
        this.setState({ hotspotListPanelOpen: false });
    }

    // ==================== PROJECT METADATA ====================

    public setProjectTitle(title: string): void {
        this.setState({ projectTitle: title });
    }

    public setProjectDescription(description: string): void {
        this.setState({ projectDescription: description });
    }

    public setProjectTags(tags: string[]): void {
        this.setState({ projectTags: tags });
    }

    public addProjectTag(tag: string): void {
        this.setState((s) => ({
            projectTags: [...s.projectTags, tag],
        }));
    }

    public removeProjectTag(tag: string): void {
        this.setState((s) => ({
            projectTags: s.projectTags.filter((t) => t !== tag),
        }));
    }

    // ==================== SETTINGS ====================

    public setAutoSave(autoSave: boolean): void {
        this.setState({ autoSave });
    }

    public setLanguage(language: "fr" | "en"): void {
        this.setState({ language });
    }

    public setShowAnnotations(show: boolean): void {
        this.setState({ showAnnotations: show });
    }

    public toggleShowAnnotations(): void {
        this.setState((s) => ({
            showAnnotations: !s.showAnnotations,
        }));
    }

    public setAnnotationsLocked(locked: boolean): void {
        this.setState({ annotationsLocked: locked });
    }

    public toggleAnnotationsLocked(): void {
        this.setState((s) => ({
            annotationsLocked: !s.annotationsLocked,
        }));
    }

    // ==================== NOTIFICATIONS ====================

    public addNotification(
        message: string,
        type: "success" | "warning" | "failure" | "info" = "info"
    ): void {
        const notification = {
            id: `notification-${Date.now()}`,
            message,
            type,
            timestamp: Date.now(),
        };

        this.setState((s) => ({
            notifications: [...s.notifications, notification],
        }));

        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            this.removeNotification(notification.id);
        }, 5000);
    }

    public removeNotification(id: string): void {
        this.setState((s) => ({
            notifications: s.notifications.filter((n) => n.id !== id),
        }));
    }

    public clearNotifications(): void {
        this.setState({ notifications: [] });
    }

    // ==================== UTILITIES ====================

    public getHotspotCount(): number {
        return this.state.hotspots.length;
    }

    public hasHotspots(): boolean {
        return this.state.hotspots.length > 0;
    }

    public hasUnsavedChanges(): boolean {
        // You can implement logic to track changes
        return false;
    }
}

let storeInstance: Store | null = null;

export function getStore(): Store {
    if (!storeInstance) {
        storeInstance = new Store();
    }
    return storeInstance;
}