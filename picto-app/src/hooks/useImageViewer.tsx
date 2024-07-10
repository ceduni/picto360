import { useState, useEffect } from "react";

export const useImageViewer = () => {
  const [imageSrc, setImageSrc] = useState("");
  const [showPopup, setShowPopup] = useState(true);
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

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const file = event.dataTransfer.files[0];
      const url = URL.createObjectURL(file);
      setImageSrc(url);
      setShowPopup(false);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const url = URL.createObjectURL(file);
      setImageSrc(url);
      setShowPopup(false);
    }
  };

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
    handleDragOver,
    handleDrop,
    handleImageChange,
    handleContextMenuItemClick,
    closeContextMenu,
  };
};
