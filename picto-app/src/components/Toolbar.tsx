import { useState } from "react";
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
  const [projectTitle, setProjectTitle] = useState("Projet#1.picto");

  const toggleShareOptions = () => {
    setShowShareOptions((prev) => !prev);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProjectTitle(event.target.value);
  };

  return (
    <div className="toolbar">
      <div className="left-section">
        <img src="/logo_picto360.png" alt="Logo" className="logo" />
        <input
          type="text"
          value={projectTitle}
          onChange={handleTitleChange}
          className="project-title-input"
        />
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
          <div className="share-options">
            <div className="share-options-content">
              <button
                onClick={toggleShareOptions}
                className="share-options-close-button"
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
