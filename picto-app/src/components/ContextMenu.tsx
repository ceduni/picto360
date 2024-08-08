import React, { useRef, useEffect } from "react";
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
import { BsCardText } from "react-icons/bs";

interface ContextMenuProps {
  visible: boolean;
  x: number;
  y: number;
  onMenuItemClick: (type: string) => void;
  onClose: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  visible,
  x,
  y,
  onMenuItemClick,
  onClose,
}) => {
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const horizontalOffset = 30;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    if (contextMenuRef.current) {
      const menu = contextMenuRef.current;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const menuWidth = menu.offsetWidth;
      const menuHeight = menu.offsetHeight;

      const bottomBar = document.querySelector(".lowerBar");
      const bottomBarHeight = bottomBar
        ? bottomBar.getBoundingClientRect().height
        : 0;

      let adjustedX = x + horizontalOffset; // separation from the target icon
      let adjustedY = y;

      //context menu screen overflow checks
      if (x + menuWidth + horizontalOffset > screenWidth) {
        adjustedX = screenWidth - menuWidth;
      }

      if (y + menuHeight > screenHeight - bottomBarHeight) {
        adjustedY = y - menuHeight;
      }

      menu.style.left = `${adjustedX}px`;
      menu.style.top = `${adjustedY}px`;
    }
  }, [x, y, visible, horizontalOffset]);

  if (!visible) return null;

  return (
    <div
      ref={contextMenuRef}
      className="context-menu"
      style={{ top: `${y}px`, left: `${x}px` }}
    >
      <ul>
        <li onClick={() => onMenuItemClick("Questionnaire")}>
          <AiOutlineUnorderedList className="menu-icon" /> Questionnaire
        </li>
        <li onClick={() => onMenuItemClick("Text_Box")}>
          <BsCardText className="menu-icon" /> Zone de texte
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
    </div> //Merge GIF and Image + Text and Label
  );
};

export default ContextMenu;
