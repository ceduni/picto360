export interface PannellumViewer {
    mouseEventToCoords: (event: MouseEvent) => [number, number];
    destroy: () => void;
    getYaw: () => number;
    getPitch: () => number;
    getHfov: () => number;
    on: (event: string, handler: () => void) => void;
    removeHotSpot: (id: string) => void;
    addHotSpot: (config: unknown) => void;
}

export interface ViewerConfig {
    type: string;
    panorama: string;
    autoLoad: boolean;
    autoRotate: number;
    showControls: boolean;
    showFullscreenCtrl: boolean;
    showZoomCtrl: boolean;
    keyboardZoom: boolean;
    disableKeyboardCtrl: boolean;
    mouseZoom: boolean;
    strings: {
        loadingLabel: string;
    };
}

export interface ContextMenuPosition {
    x: number;
    y: number;
}

export interface ContextMenuCoords {
    pitch: number;
    yaw: number;
}
