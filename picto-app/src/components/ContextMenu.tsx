import React, { useRef, useEffect } from "react";
import "./css/ContextMenu.css";
import {
  AiOutlineUnorderedList,
  AiOutlineFileText,
  AiOutlineLink,
  AiOutlinePicture,
  AiOutlineSound,
} from "react-icons/ai";
import { IoMdCheckboxOutline } from "react-icons/io";
import {
  MdOutlineVideoLibrary,
  MdOutlineGif,
  MdOutlineLabel,
} from "react-icons/md";
import { RiSurveyLine } from "react-icons/ri";
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
        <li onClick={() => onMenuItemClick("True_or_False")}>
          <IoMdCheckboxOutline className="menu-icon" /> Vrai ou faux
        </li>
        <li onClick={() => onMenuItemClick("Multiple_Choice")}>
          <AiOutlineUnorderedList className="menu-icon" /> Choix multiples
        </li>
        <li onClick={() => onMenuItemClick("Poll")}>
          <RiSurveyLine className="menu-icon" /> Sondage
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
        <li onClick={() => onMenuItemClick("Audio")}>
          <AiOutlineSound className="menu-icon" /> Audio
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

export default ContextMenu;
