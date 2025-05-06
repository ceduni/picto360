import { useCallback, useEffect } from "react";

export interface HotspotEvent {
  type: string;
  coords: [number, number];
}

export const useHotspotCreation = (
  viewerElement: HTMLDivElement | null,
  onHotspotCreation: (type: string, coords: [number, number]) => void
) => {
  const handleHotspotEvent = useCallback(
    (event: Event) => {
      const { type, coords } = (event as CustomEvent<HotspotEvent>).detail;
      onHotspotCreation(type, coords);
    },
    [onHotspotCreation]
  );

  useEffect(() => {
    if (viewerElement) {
      viewerElement.addEventListener("hotspotEvent", handleHotspotEvent);

      return () => {
        viewerElement.removeEventListener("hotspotEvent", handleHotspotEvent);
      };
    }
  }, [viewerElement, handleHotspotEvent]);

  const dispatchHotspotEvent = useCallback(
    (type: string, coords: [number, number]) => {
      if (viewerElement) {
        const event = new CustomEvent<HotspotEvent>("hotspotEvent", {
          detail: { type, coords },
        });
        viewerElement.dispatchEvent(event);
      }
    },
    [viewerElement]
  );

  return { dispatchHotspotEvent };
};
