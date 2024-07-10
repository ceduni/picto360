import React, { useRef, useEffect, useState } from "react";
import "./css/ContextMenu.css"
import {
  AiOutlineForm,
  AiOutlineUnorderedList,
  AiOutlineFileText,
  AiOutlineLink,
  AiOutlinePicture,
  AiOutlineSound,
} from "react-icons/ai";
import { IoMdCheckboxOutline } from "react-icons/io";
import {
  MdOutlineVideoLibrary,
  MdOutlinePermMedia,
  MdOutlineGif,
  MdOutlineLabel,
  MdOutlineArrowForwardIos,
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
  const [formSubMenuVisible, setFormSubMenuVisible] = useState(false);
  const [mediaSubMenuVisible, setMediaSubMenuVisible] = useState(false);
  const [formHoverTimer, setFormHoverTimer] = useState<NodeJS.Timeout | null>(
    null
  );
  const [mediaHoverTimer, setMediaHoverTimer] = useState<NodeJS.Timeout | null>(
    null
  );

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

  const handleFormMouseEnter = () => {
    setFormHoverTimer(setTimeout(() => setFormSubMenuVisible(true), 500));
  };

  const handleFormMouseLeave = () => {
    if (formHoverTimer) {
      clearTimeout(formHoverTimer);
    }
    setFormSubMenuVisible(false);
  };

  const handleMediaMouseEnter = () => {
    setMediaHoverTimer(setTimeout(() => setMediaSubMenuVisible(true), 500));
  };

  const handleMediaMouseLeave = () => {
    if (mediaHoverTimer) {
      clearTimeout(mediaHoverTimer);
    }
    setMediaSubMenuVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      ref={contextMenuRef}
      className="context-menu"
      style={{ top: `${y}px`, left: `${x}px` }}
    >
      <ul>
        <li
          onMouseEnter={handleFormMouseEnter}
          onMouseLeave={handleFormMouseLeave}
        >
          <AiOutlineForm className="menu-icon" /> Formulaire{" "}
          <MdOutlineArrowForwardIos className="arrow-icon" />
          {formSubMenuVisible && (
            <ul className="submenu">
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
            </ul>
          )}
        </li>
        <li
          onMouseEnter={handleMediaMouseEnter}
          onMouseLeave={handleMediaMouseLeave}
        >
          <MdOutlinePermMedia className="menu-icon" /> Média{" "}
          <MdOutlineArrowForwardIos className="arrow-icon" />
          {mediaSubMenuVisible && (
            <ul className="submenu">
              <li onClick={() => onMenuItemClick("Video")}>
                <MdOutlineVideoLibrary className="menu-icon" /> Vidéo
              </li>
              <li onClick={() => onMenuItemClick("Image")}>
                <AiOutlinePicture className="menu-icon" /> Image
              </li>
              <li onClick={() => onMenuItemClick("Audio")}>
                <AiOutlineSound className="menu-icon" /> Audio
              </li>
              <li onClick={() => onMenuItemClick("Animation")}>
                <MdOutlineGif className="menu-icon" /> Animation
              </li>
            </ul>
          )}
        </li>
        <li onClick={() => onMenuItemClick("Text")}>
          <AiOutlineFileText className="menu-icon" /> Texte
        </li>
        <li onClick={() => onMenuItemClick("Label")}>
          <MdOutlineLabel className="menu-icon" /> Étiquette
        </li>
        <li onClick={() => onMenuItemClick("Link")}>
          <AiOutlineLink className="menu-icon" /> Lien
        </li>
      </ul>
    </div>
  );
};

export default ContextMenu;
