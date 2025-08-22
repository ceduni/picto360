import React, { useEffect, useCallback, useState, useRef, useMemo } from "react";
import { useHotspotCreation } from "../hooks/useHotspotCreation";
import { PiTargetBold } from "react-icons/pi";
import ContextMenu from "./ContextMenu";
import { HotspotData } from "./HotspotManager";
import "./css/PanoramaViewer.css";

import EditionPannel from "./EditionPannel";
import { createHotspotInstance, deleteHotspotInstance } from "@/utils/HotspotUtils";
import { useNavigate } from "react-router-dom";
import { getViewerItem, putViewerItem } from "@/utils/storedImageData";

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
  viewerId: string;
  isEditMode: boolean;
}

interface PannellumViewer {
  mouseEventToCoords: (event: MouseEvent) => [number, number];
  destroy: () => void;
  getYaw: () => number;
  getPitch: () => number;
  getHfov: () => number;
  onLoad:()=>void;
}

const PanoramaViewer: React.FC<PanoramaViewerProps> = ({ width, height, viewerId, isEditMode }) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const hotspotCounter = useRef(0);
  const [imageSource,setImageSource] = useState<string|null>(null);

  const viewerInstanceRef = useRef<PannellumViewer | null>(null);
  const [contextMenuState, setContextMenuState] = useState({
    visible: false,
    position: { x: 0, y: 0 },
  });
  const [targetIconPosition, setTargetIconPosition] = useState<{ x: number; y: number } | null>(null);
  const contextMenuCoordsRef = useRef<{ pitch: number; yaw: number }>({ pitch: 0, yaw: 0 });

  const [editingPannelState,setEditingPannelState] = useState<{ isOpen: boolean ; state: string} | null>(null);
  
  const [hotspots, setHotspots] = useState<HotspotData[]>([]);
  const [selectedHotspot, setSelectedHotspot] = useState<HotspotData | null>(null);

  const viewerConfig = useMemo(
    () => ({
      type: "equirectangular",
      panorama: imageSource,
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
    [imageSource] // northOffset excluded as it forces the viewer to reload
  );

  const navigate = useNavigate()

  const initializeViewer = useCallback( () => {

    if (!viewerRef.current || !imageSource) {
      console.error("PanellumViewer - Viewer ref or image source is missing.:", imageSource);
      return;
    }

    if(!window.pannellum){
      console.error("PanellumViewer - window.pannellum is not available. Check script loading.");
      return;
    }
    
    if(!viewerInstanceRef.current){
      console.log("PanellumViewer - Initializing Pannellum viewer...:", viewerConfig.panorama);
      viewerInstanceRef.current = window.pannellum.viewer(viewerRef.current, viewerConfig) as PannellumViewer;    
    }

  }, [viewerId, viewerConfig,imageSource]);

  useEffect(() => {

    if(viewerId === "null" || !viewerId ){
        navigate("/", {replace : true});
        return;
    }

    let objectUrl: string | undefined;

    ( async () => {
        if (!viewerId) return;
        const viewerItem = await getViewerItem(viewerId);
        const compressedImage = viewerItem?.blob;
        const annotations = viewerItem?.annotations;
        if (!compressedImage) {
            navigate("/");
            return;
        }
        objectUrl = URL.createObjectURL(compressedImage);
        setImageSource(objectUrl);
        if(annotations) {
          setHotspots(annotations)
        };
    })();
    
    return () => {
      if (viewerInstanceRef.current) {
        console.log("PanellumViewer - Destroying Pannellum viewer...");
        viewerInstanceRef.current.destroy();
        viewerInstanceRef.current = null;
      }
      // cleanup: revoke the previous object URL when viewerId changes/unmounts
      if (imageSource) URL.revokeObjectURL(imageSource); 
    };
  }, [viewerId,navigate]);

  useEffect(() => {
    if (imageSource) {
      initializeViewer();
    }
  }, [imageSource]);


  // Fetch the existing hotpots on reload
  useEffect(() => {
    if (viewerInstanceRef.current && hotspots.length > 0) {
      const handler = () => {
        console.log("hotspots: ", hotspots)

        hotspots.forEach(hs => {
          if (hs) addHotspotToViewer(hs);
        });
      };

      // wait until panorama is fully loaded
      (viewerInstanceRef.current as any).on("load", handler);


    }
}, [viewerInstanceRef.current,hotspots]);
  


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


  const handleHotspotCreate =  async (hotspotData: HotspotData) => {
    if (!hotspotData.content || hotspotData===undefined) return;

    addHotspotToViewer(hotspotData);

    const newHotspotList = [...hotspots,hotspotData];

    await putViewerItem(viewerId,undefined,undefined,newHotspotList);
    // Add to list
    setHotspots(newHotspotList);

    setTargetIconPosition(null);
  }

  const addHotspotToViewer = (hotspotData: HotspotData)=> {
    if (!hotspotData.content || hotspotData===undefined) return;

    // Render to viewer
    if (viewerInstanceRef.current) {
      (viewerInstanceRef.current as any).removeHotSpot(hotspotData.id);

      const hotspotInstance = createHotspotInstance(hotspotData,handlePannellumClick);

      (viewerInstanceRef.current as any).addHotSpot(hotspotInstance);
    }    

    hotspotCounter.current++;

    console.log("put hotspot in viewer")

  }

  const handleHotspotSave = async (updatedHotspot: HotspotData) => {

    const newHotspotList = hotspots.map(hotS => hotS.id === updatedHotspot.id ? updatedHotspot : hotS);
    await putViewerItem(viewerId,undefined,undefined,newHotspotList);

    setHotspots(newHotspotList);

    // Refresh viewer hotspot:
    if (viewerInstanceRef.current) {
      (viewerInstanceRef.current as any).removeHotSpot(updatedHotspot.id);

      const hotspotInstance = createHotspotInstance(updatedHotspot,handlePannellumClick);

      (viewerInstanceRef.current as any).addHotSpot(hotspotInstance);
    }
  };

  const handleHotspotDelete = async (toDeleteHotspot:HotspotData) => {
    if(viewerInstanceRef.current){
      const newHotspotList = hotspots.filter(hotS => hotS.id != toDeleteHotspot.id );
      await putViewerItem(viewerId,undefined,undefined,newHotspotList);

      setHotspots(newHotspotList);

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
