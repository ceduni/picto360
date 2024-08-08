import React, { useState } from "react";
import "./css/Toolbar.css";
import { LuEye, LuCheck } from "react-icons/lu";
import { FaPencil } from "react-icons/fa6";
import {
  IoSettingsSharp,
  IoSaveOutline,
  IoShareSocialSharp,
  IoClose,
} from "react-icons/io5";
import { PiExport } from "react-icons/pi";

const Toolbar = () => {
  const [isSliderEnabled, setIsSliderEnabled] = useState(true);
  const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsSliderEnabled(event.target.checked);
  };

  const [showShareOptions, setShowShareOptions] = useState(false);
  const toggleShareOptions = () => {
    setShowShareOptions((prev) => !prev);
  };

  const [projectTitle, setProjectTitle] = useState("Projet#1.picto");
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProjectTitle(event.target.value);
  };


  const [isSaved, setIsSaved] = useState(false);
  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 1500);
  };

  return (
    <div className="toolbar">
      <div className="left-section">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M572.5 241.4C518.3 135.6 410.9 64 288 64S57.7 135.6 3.5 241.4a32.4 32.4 0 0 0 0 29.2C57.7 376.4 165.1 448 288 448s230.3-71.6 284.5-177.4a32.4 32.4 0 0 0 0-29.2zM288 400a144 144 0 1 1 144-144 143.9 143.9 0 0 1 -144 144zm0-240a95.3 95.3 0 0 0 -25.3 3.8 47.9 47.9 0 0 1 -66.9 66.9A95.8 95.8 0 1 0 288 160z"/></svg>
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
            <div className="toggle-slider-container">
              <label className="toggle-slider">
                <input type="checkbox" id="toggle-slider" checked={isSliderEnabled} onChange={handleToggleChange} />
                <span className="slider">
                  {isSliderEnabled ? <FaPencil className="icon-pen" /> : <LuEye className="icon-eye"/>}
                </span>
              </label>
            </div>
          </li>
          <li className="toolbar-button">
            <IoSettingsSharp />
          </li>
          <li className="toolbar-button" onClick={handleSave}>
            {isSaved ? (
                <LuCheck />
              ) : (
                <IoSaveOutline />
            )}
          </li>
          <li className="toolbar-li toolbar-button">
            <PiExport />
          </li>
          <li
            className="toolbar-li toolbar-button"
            onClick={toggleShareOptions}
          >
            <IoShareSocialSharp />
          </li>
        </ul>
        {showShareOptions && (
          <div className="share-options">
            <div className="share-options-content">
              <button
                onClick={toggleShareOptions}
                className="share-options-close-button"
              >
                <IoClose />
              </button>
              <h2>Partager</h2>
              <label htmlFor="expiration-lien">Date d'expiration</label>
              <input type="date" name="expiration-lien" id="expiration-lien" />
              <label htmlFor="acces-lien">Accès</label>
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