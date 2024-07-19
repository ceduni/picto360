import { useState, useEffect } from "react";

export const useImageViewer = () => {
  const [imageSrc] = useState("");
  const [showPopup] = useState(true);
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleContextMenu = (event: CustomEvent) => {
      setContextMenu({
        visible: true,
        x: event.detail.x,
        y: event.detail.y,
      });
    };

    window.addEventListener(
      "showContextMenu",
      handleContextMenu as EventListener
    );

    return () => {
      window.removeEventListener(
        "showContextMenu",
        handleContextMenu as EventListener
      );
    };
  }, []);

  const handleContextMenuItemClick = (type: string) => {
    console.log("Context menu item clicked:", type);
    setContextMenu({ ...contextMenu, visible: false });
  };

  const closeContextMenu = () => {
    setContextMenu({ ...contextMenu, visible: false });
  };

  return {
    imageSrc,
    showPopup,
    contextMenu,
    handleContextMenuItemClick,
    closeContextMenu,
  };
};
