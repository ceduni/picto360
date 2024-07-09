import React, { useEffect, useRef } from 'react';

interface HotSpot {
    pitch: number;
    yaw: number;
    type: string;
    text?: string;
    URL?: string;
    sceneId?: string;
    targetYaw?: number;
    targetPitch?: number;
    cssClass?: string;
    clickHandlerFunc?: (args: any) => void;
    clickHandlerArgs?: any;
    createTooltipFunc?: (args: any) => HTMLElement;
    createTooltipArgs?: any;
    id: string;
}

interface PannellumViewerProps {
    width: string;
    height: string;
    image: string;
}

const ImageViewer: React.FC<PannellumViewerProps> = ({ width, height, image }) => {
    const viewerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (viewerRef.current) {
            const viewer = pannellum.viewer(viewerRef.current, {
                type: "equirectangular",
                panorama: image,
                autoLoad: true,
                autoRotate: -2,
                showZoomCtrl: true,
                strings: {
                    loadingLabel: "Chargement en cours...",
                },
            });

            // Add event listener for mousedown event
            viewer.on('mousedown', function (event: MouseEvent) {
                // Get click coordinates
                const coords = viewer.mouseEventToCoords(event);

                // Create a unique ID for the hotspot
                const hotspotId = `hotspot-${Date.now()}`;

                // Define the hotspot
                const hotspot: HotSpot = {
                    id: hotspotId,
                    pitch: coords[0],
                    yaw: coords[1],
                    type: 'info',
                    text: 'You clicked here!',
                    clickHandlerFunc: (args: any) => {
                        alert('Missing annotation');
                    }
                };

                // Add the hotspot to the viewer
                viewer.addHotSpot(hotspot);
            });

            // Cleanup
            return () => {
                viewer.destroy();
            };
        }
    }, [image]);

    return <div ref={viewerRef} style={{ width, height }} />;
};

export default ImageViewer;
