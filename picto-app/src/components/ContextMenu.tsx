import React, { useRef, useEffect, useCallback } from "react";
import "./css/ContextMenu.css";
import {
  AiOutlineUnorderedList,
  AiOutlineFileText,
  AiOutlineLink,
  AiOutlinePicture,
} from "react-icons/ai";
import {
  MdOutlineVideoLibrary,
  MdOutlineGif,
  MdOutlineLabel,
} from "react-icons/md";

interface ContextMenuProps {
  visible: boolean;
  x: number;
  y: number;
  onMenuItemClick: (type: string) => void;
  onClose: () => void;
  isEditMode: boolean;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  visible,
  x,
  y,
  onMenuItemClick,
  onClose,
  isEditMode,
}) => {
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const horizontalOffset = 30;

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isEditMode) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside, isEditMode]);

  useEffect(() => {
    if (!isEditMode) {
      onClose();
    }
  }, [isEditMode, onClose]);

  useEffect(() => {
    if (contextMenuRef.current) {
      const menu = contextMenuRef.current;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const menuWidth = menu.offsetWidth;
      const menuHeight = menu.offsetHeight;

      const BottomNavbar = document.querySelector(".lowerBar");
      const BottomNavbarHeight = BottomNavbar
        ? BottomNavbar.getBoundingClientRect().height
        : 0;

      let adjustedX = x + horizontalOffset; // separation from the target icon
      let adjustedY = y;

      //context menu screen overflow checks
      if (x + menuWidth + horizontalOffset > screenWidth) {
        adjustedX = screenWidth - menuWidth;
      }

      if (y + menuHeight > screenHeight - BottomNavbarHeight) {
        adjustedY = y - menuHeight;
      }

      menu.style.left = `${adjustedX}px`;
      menu.style.top = `${adjustedY}px`;
    }
  }, [x, y, visible, horizontalOffset]);

  if (!visible || !isEditMode) return null;

  return (
    <div
      ref={contextMenuRef}
      className="context-menu"
      style={{ top: `${y}px`, left: `${x}px` }}
    >
      <ul>
        <li onClick={() => onMenuItemClick("Form")}>
          <AiOutlineUnorderedList className="menu-icon" /> Questionnaire
        </li>
        <hr className="menu-separator" />
        <li onClick={() => onMenuItemClick("Video")}>
          <MdOutlineVideoLibrary className="menu-icon" /> Vidéo
        </li>
        <li onClick={() => onMenuItemClick("Image")}>
          <AiOutlinePicture className="menu-icon" /> Image
        </li>
        <li onClick={() => onMenuItemClick("Gif")}>
          <MdOutlineGif className="menu-icon" /> GIF
        </li>
        <hr className="menu-separator" />
        <li onClick={() => onMenuItemClick("Text")}>
          <AiOutlineFileText className="menu-icon" /> Texte
        </li>
        <li onClick={() => onMenuItemClick("Label")}>
          <MdOutlineLabel className="menu-icon" /> Étiquette
        </li>
        <li onClick={() => onMenuItemClick("Hyperlink")}>
          <AiOutlineLink className="menu-icon" /> Lien
        </li>
      </ul>
    </div>
  );
};

export default React.memo(ContextMenu);
