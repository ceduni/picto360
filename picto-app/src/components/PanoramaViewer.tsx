import React, { useEffect, useCallback, useState, useRef, useMemo } from "react";
import { useHotspotCreation } from "../hooks/useHotspotCreation";
import { PiTargetBold } from "react-icons/pi";
import ContextMenu from "./ContextMenu";
import HotspotManager, { HotspotData, HotspotInstance } from "./HotspotManager";
import "./css/PanoramaViewer.css";
import EditionPannel from "./EditionPannel";
import { createHotspotInstance, deleteHotspotInstance, hotspotClickHandler } from "@/utils/HotspotUtils";
import { useNavigate } from "react-router-dom";

declare global {
  interface Window {
    //TODO: Replace any (if possible)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pannellum: any;
  }
}

interface PanoramaViewerProps {
  width: string;
  height: string;
  imageSrc: string;
  isEditMode: boolean;
}

interface PannellumViewer {
  mouseEventToCoords: (event: MouseEvent) => [number, number];
  destroy: () => void;
  getYaw: () => number;
  getPitch: () => number;
  getHfov: () => number;
}

const PanoramaViewer: React.FC<PanoramaViewerProps> = ({ width, height, imageSrc, isEditMode }) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const hotspotCounter = useRef(0);

  const viewerInstanceRef = useRef<PannellumViewer | null>(null);
  const [contextMenuState, setContextMenuState] = useState({
    visible: false,
    position: { x: 0, y: 0 },
  });
  const [targetIconPosition, setTargetIconPosition] = useState<{ x: number; y: number } | null>(null);
  const contextMenuCoordsRef = useRef<{ pitch: number; yaw: number }>({ pitch: 0, yaw: 0 });

  const [editingPannelState,setEditingPannelState] = useState<{ isOpen: boolean ; state: string} | null>(null);

  // for hotspot creation
  // const [pendingHotspotType, setPendingHotspotType] = useState<string | null>(null);
  // const [pendingHotspotCoords, setPendingHotspotCoords] = useState<[number, number] | null>(null);
  
  const [hotspots, setHotspots] = useState<HotspotData[]>([]);
  const [selectedHotspot, setSelectedHotspot] = useState<HotspotData | null>(null);

  const viewerConfig = useMemo(
    () => ({
      type: "equirectangular",
      panorama: imageSrc,
      autoLoad: true,
      autoRotate: -2,
      showControls: false,
      showFullscreenCtrl: false,
      showZoomCtrl: true,
      keyboardZoom: false,
      disableKeyboardCtrl: true,
      mouseZoom: true,
      strings: {
        loadingLabel: "Chargement en cours...",
      },
    }),
    [imageSrc] // northOffset excluded as it forces the viewer to reload
  );

  const navigate = useNavigate()

  const initializeViewer = useCallback( () => {
    if (!viewerRef.current || !imageSrc) {
      console.error("PanellumViewer - Viewer ref or image source is missing.");
      return;
    }

    if(!window.pannellum){
      console.error("PanellumViewer - window.pannellum is not available. Check script loading.");
      return;
    }
    
    if(!viewerInstanceRef.current){
      console.log("PanellumViewer - Initializing Pannellum viewer...");
      viewerInstanceRef.current = window.pannellum.viewer(viewerRef.current, viewerConfig) as PannellumViewer;
    }

  }, [imageSrc, viewerConfig]);

  useEffect(() => {

    if(imageSrc === "null" ){
        navigate("/", {replace : true});
    }else{
      localStorage.setItem("imageSrc",imageSrc);
    }

    initializeViewer();    
    
    return () => {
      if (viewerInstanceRef.current) {
        console.log("PanellumViewer - Destroying Pannellum viewer...");
        localStorage.clear();
        viewerInstanceRef.current.destroy();
        viewerInstanceRef.current = null;
      }
    };
  }, [imageSrc]);


  const handleContextMenu = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault(); // Suppress the browser's native context menu

      if (!isEditMode || !viewerInstanceRef.current) return;

      const target = event.target as HTMLElement;
      if (target.closest(".hotspot-manager__custom-tooltip")) {
        event.preventDefault();
        event.stopPropagation();
        // change the error message to the banner
        console.log("Context menu disabled on hotspots");
        return;
      }

      const position = { x: event.clientX, y: event.clientY };
      setContextMenuState({ visible: true, position });
      setTargetIconPosition(position);

      const coords = viewerInstanceRef.current.mouseEventToCoords(event.nativeEvent);
      console.log("PanellumViewer - Mouse coords to pitch/yaw:", coords);
      contextMenuCoordsRef.current = { pitch: coords[0], yaw: coords[1] };
    },
    [isEditMode]
  );

  const hideContextMenu = useCallback(() => {
    setContextMenuState({ visible: false, position: { x: 0, y: 0 } });
    setTargetIconPosition(null);
  }, []);
  

  const handleHotspotCreation = useCallback((type: string, coords: [number, number]) => {
    console.log(`PanellumViewer - Performing action of type ${type} at pitch = ${coords[0]}, yaw = ${coords[1]}...`);
    
      const hotspotId = `hotspot-${Date.now()}-${hotspotCounter.current++}`;

      const newHotspot: HotspotData = {
        id: hotspotId,
        pitch:coords[0],
        yaw:coords[1],
        type:type.toLowerCase(),
        cssClass:  "hotspot-manager__custom_hotspot",
        // other fields left empty until edited
      };

      openEditor("creating",newHotspot);
  }, []);

  const { dispatchHotspotEvent } = useHotspotCreation(viewerRef.current, handleHotspotCreation);

  const handleContextMenuClick = useCallback(
    (menuItemType: string) => {
    
      if (!viewerInstanceRef.current) {
        console.error("PanellumViewer - Viewer instance is not ready.");
        return;
      }

      const { pitch, yaw } = contextMenuCoordsRef.current;
      const coords: [number, number] = [pitch, yaw];

      dispatchHotspotEvent(menuItemType, coords);

      setContextMenuState({ visible: false, position: { x: 0, y: 0 } });

    },
    [ dispatchHotspotEvent]
  );

  const openEditor = (state: string, hotspot: HotspotData) => {
    setSelectedHotspot(hotspot); 
    setEditingPannelState({ isOpen: true, state }); 
  };

  // Clear context menu state and target position when switching to Preview Mode
  useEffect(() => {
    if (!isEditMode) {
      hideContextMenu();
    }
  }, [isEditMode, hideContextMenu]);

  const handleRelocateContextMenu = useCallback(
    (newPosition: { x: number; y: number }) => {
      if (!isEditMode) return;

      setContextMenuState((prev) => ({
        ...prev,
        position: newPosition,
      }));

      setTargetIconPosition(newPosition);

      if (viewerInstanceRef.current) {
        const coords = viewerInstanceRef.current.mouseEventToCoords({
          clientX: newPosition.x,
          clientY: newPosition.y,
        } as MouseEvent);

        contextMenuCoordsRef.current = { pitch: coords[0], yaw: coords[1] };
      }
    },
    [isEditMode]
  );

  const handleHotspotCreate = (hotspotData: HotspotData) => {

    // handle errors
    if (!hotspotData.content) return;

    // Add to list
    setHotspots(prev => [...prev, hotspotData]);

    // Render to viewer
    (viewerInstanceRef.current as any)?.addHotSpot(
      createHotspotInstance(hotspotData, handlePannellumClick)
    );

    setTargetIconPosition(null);
  }

  const handleHotspotSave = (updatedHotspot: HotspotData) => {
    setHotspots(prev =>
      prev.map(hotS => hotS.id === updatedHotspot.id ? updatedHotspot : hotS)
    );

    // Refresh viewer hotspot:
    if (viewerInstanceRef.current) {
      (viewerInstanceRef.current as any).removeHotSpot(updatedHotspot.id);

      const hotspotInstance = createHotspotInstance(updatedHotspot,handlePannellumClick);

      (viewerInstanceRef.current as any).addHotSpot(hotspotInstance);
    }
  };

  const handleHotspotDelete = (toDeleteHotspot:HotspotData) => {
    if(viewerInstanceRef.current){
      (viewerInstanceRef.current as any).removeHotSpot(toDeleteHotspot.id);

      deleteHotspotInstance(viewerInstanceRef.current,toDeleteHotspot)
      hotspotCounter.current--;

    }
  }

  const handleHotspotClick = (hotspot: HotspotData) => {
    openEditor("editing",hotspot);

    console.log("Selected for editing:", hotspot);
  };


  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // Skip if clicking on a hotspot or the edition panel
      const target = e.target as HTMLElement;

      // Adjust selectors depending on the class structure
      if (
        target.closest(".hotspot-manager__custom-tooltip") || 
        target.closest(".edition_pannel") || 
        editingPannelState?.state=="creating" // prevent closing while 
      ) {
        return;
      }
      // Otherwise, close the panel
      setSelectedHotspot(null);
    };

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [editingPannelState?.state]);


  const handlePannellumClick = (event: MouseEvent, args: HotspotData) => {
    event.preventDefault();

      handleHotspotClick(args);
  };

  const handleClose = () => {
    if(editingPannelState?.state=="creating"){
      hotspotCounter.current--;
      setTargetIconPosition(null);
    }
    setEditingPannelState(null);
    setSelectedHotspot(null);
  }

  return (
    <>
      <div ref={viewerRef} className="panorama-viewer" style={{ width, height }} onContextMenu={handleContextMenu} />
      
      {isEditMode && contextMenuState.visible && (
        <ContextMenu
          visible={contextMenuState.visible}
          anchorPosition={contextMenuState.position}
          onMenuItemClick={handleContextMenuClick}
          onClose={hideContextMenu}
          onRelocate={handleRelocateContextMenu}
          isEditMode={isEditMode}
        />
      )}
      {isEditMode && targetIconPosition && (
        <div
          style={{
            top: targetIconPosition.y,
            left: targetIconPosition.x,
          }}
          className="panorama-viewer__target-icon"
        >
          <PiTargetBold />
        </div>
      )}
      <HotspotManager viewer={viewerInstanceRef.current} 
                      viewerElement={viewerRef.current} 
                      onHotspotClick={handleHotspotClick} 
      />
      {
        isEditMode &&  (editingPannelState?.isOpen ) && (
          <EditionPannel  hotspot = {selectedHotspot} 
                          onSave={handleHotspotSave} 
                          onClose ={handleClose} 
                          onDelete = {handleHotspotDelete}
                          onCreate = {handleHotspotCreate}
                          pannelState = {editingPannelState.state}/>
        )
      }

    </>
  );
};

export default React.memo(PanoramaViewer);
