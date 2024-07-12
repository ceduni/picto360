import React, { useState } from "react";
import "./css/Toolbar.css";
import {
  IoSettingsSharp,
  IoCheckmark,
  IoSaveOutline,
  IoShareSocialSharp,
} from "react-icons/io5";
import { PiExport } from "react-icons/pi";

const Toolbar = () => {
  const [showShareOptions, setShowShareOptions] = useState(false);

  const toggleShareOptions = () => {
    setShowShareOptions((prev) => !prev);
  };

  return (
    <div className="toolbar">
      <div className="left-section">
        <img src="/logo_picto360.png" alt="Logo" className="logo" />
        <p>Projet#1.picto</p>
      </div>
      <div className="right-section">
        <ul>
          <li className="toolbar-button">
            <IoCheckmark />
          </li>
          <li className="toolbar-button">
            <IoSettingsSharp />
          </li>
          <li className="toolbar-button">
            <IoSaveOutline />
          </li>
          <li className="toolbar-button">
            <PiExport />
          </li>
          <li className="toolbar-button" onClick={toggleShareOptions}>
            <IoShareSocialSharp />
          </li>
        </ul>
        {showShareOptions && (
          <div className="modal">
            <div className="modal-content">
              <button
                onClick={toggleShareOptions}
                className="modal-close-button"
                style={{ float: "right" }}
              >
                ×
              </button>
              <h2>Partager</h2>
              <label htmlFor="expiration-lien">Date d'expiration</label>
              <br />
              <input type="date" name="expiration-lien" id="expiration-lien" />
              <br />
              <label htmlFor="acces-lien">Accès</label>
              <br />
              <select name="acces-lien" id="acces-lien">
                <option value="lecture">Lecture</option>
                <option value="ecriture">Lecture et écriture</option>
              </select>
              <br />
              <button className="bouton-lien">Copier le lien</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Toolbar;
