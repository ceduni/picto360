/*Unused component*/
import React, { useState } from "react";
import "./css/FloatingMenu.css";

const FloatingMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`floating-menu ${isOpen ? "open" : ""}`}>
      {!isOpen && (
        <button className="menu-toggle" onClick={toggleMenu}>
          +
        </button>
      )}
      {isOpen && (
        <>
          <button className="close-button" onClick={toggleMenu}>
            &times;
          </button>
          <div className="menu-items">
            <button>Hotspot</button>
            <button>Forme</button>
            <button>Texte</button>
            <button>Vidéo</button>
            <button>Lien</button>
          </div>
        </>
      )}
    </div>
  );
};

export default React.memo(FloatingMenu);
