import "@css/SettingsPopupWindow.css";

import React, { useState } from "react";
import { MdClose, MdAdd } from "react-icons/md";

interface SettingsPopupProps {
    isOpen: boolean;
    fileNameMaxLength?: number;
    projectNameMaxLength?: number;
    descriptionMaxLength?: number;
    state: {
        fileName: string,
        setFileName: (e: React.ChangeEvent<HTMLInputElement>) => void,
    }
    setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SettingsPopupWindow: React.FC<SettingsPopupProps> = ({ isOpen, setIsPopupOpen, state, fileNameMaxLength = 50 }) => {
    const { fileName, setFileName } = state;
    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState("");
    // const [language, setLanguage] = useState("fr");
    // const [autoSave, setAutoSave] = useState(true);
    const [tags, setTags] = useState<string[]>([]);
    const [currentTag, setCurrentTag] = useState("");

    const handlePopupClose = () => {
        setIsPopupOpen(false);
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            handlePopupClose();
        }
    };

    const handleAddTag = () => {
        if (currentTag.trim() && !tags.includes(currentTag.trim())) {
            setTags([...tags, currentTag.trim()]);
            setCurrentTag("");
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAddTag();
        }
    };

    if (!isOpen) return null;

    return (
        <div className={`settings-modal-backdrop ${isOpen ? 'settings-modal-backdrop--open' : ''}`} onClick={handleBackdropClick}>
            <div className={`settings-modal ${isOpen ? 'settings-modal--open' : ''}`}>
                <div className="settings-modal__header">
                    <h2 className="settings-modal__title">Paramètres du projet</h2>
                    <button className="settings-modal__close-button" onClick={handlePopupClose} aria-label="Fermer les paramètres">
                        <MdClose />
                    </button>
                </div>

                <div className="settings-modal__content">
                    {/* File Name */}
                    <div className="settings-modal__section">
                        <label htmlFor="file-name" className="settings-modal__label">
                            Nom du fichier (pour la sauvegarde)
                        </label>
                        <div className="settings-modal__filename-wrapper">
                            <input id="file-name" className="settings-modal__input settings-modal__input--filename"
                                type="text"
                                value={fileName}
                                onChange={setFileName}
                                placeholder="Entrez le nom du fichier"
                                maxLength={fileNameMaxLength}
                            />
                            <code className="settings-modal__file-extension">.picto</code>
                        </div>
                    </div>

                    {/* Project Name */}
                    <div className="settings-modal__section">
                        <label htmlFor="project-name" className="settings-modal__label">
                            Titre du projet
                        </label>
                        <input id="project-name" className="settings-modal__input"
                            type="text"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            placeholder="Entrez le nom du projet"
                            maxLength={50}
                        />
                    </div>

                    {/* Description */}
                    <div className="settings-modal__section">
                        <label htmlFor="description" className="settings-modal__label">
                            Description
                        </label>
                        <textarea id="description" className="settings-modal__textarea"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Décrivez votre projet"
                            rows={4}
                            maxLength={500}
                        />
                        <span className="settings-modal__char-count">
                            {description.length}/500
                        </span>
                    </div>

                    {/* Tags */}
                    {__ENABLE_BETA__ && (
                        <div className="settings-modal__section">
                            <label htmlFor="tags" className="settings-modal__label">
                                Étiquettes
                            </label>
                            <div className="settings-modal__tag-input-wrapper">
                                <input
                                    id="tags"
                                    type="text"
                                    value={currentTag}
                                    onChange={(e) => setCurrentTag(e.target.value)}
                                    onKeyDown={handleTagKeyDown}
                                    placeholder="Ajouter une étiquette"
                                    className="settings-modal__input"
                                    maxLength={20}
                                />
                                <button
                                    onClick={handleAddTag}
                                    className="settings-modal__add-tag-button"
                                    type="button"
                                    aria-label="Ajouter étiquette"
                                >
                                    <MdAdd />
                                </button>
                            </div>
                            {tags.length > 0 && (
                                <div className="settings-modal__tags-list">
                                    {tags.map((tag) => (
                                        <span key={tag} className="settings-modal__tag">
                                            {tag}
                                            <button
                                                onClick={() => handleRemoveTag(tag)}
                                                className="settings-modal__tag-remove"
                                                aria-label={`Supprimer ${tag}`}
                                            >
                                                <MdClose />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Language Setting */}
                    {/* <div className="settings-modal__section">
                        <label htmlFor="language" className="settings-modal__label">
                            Langue
                        </label>
                        <select
                            id="language"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="settings-modal__select"
                        >
                            <option value="fr">Français</option>
                            <option value="en">English</option>
                            <option value="es">Español</option>
                        </select>
                    </div> */}

                    {/* Auto-save Setting */}
                    {/* <div className="settings-modal__section">
                        <label htmlFor="auto-save" className="settings-modal__label">
                            Sauvegarde automatique
                        </label>
                        <p className="bare" style={{ fontSize: "1.3em" }}>Cette option est utilisé seulement quand vous être connecté</p>
                        <div className="settings-modal__toggle-wrapper">
                            <input
                                type="checkbox"
                                id="auto-save"
                                checked={autoSave}
                                onChange={(e) => setAutoSave(e.target.checked)}
                                className="settings-modal__checkbox"
                            />
                            <span className="settings-modal__toggle-slider"></span>
                        </div>
                    </div> */}
                </div>

                <div className="settings-modal__footer">
                    <button className="settings-modal__button settings-modal__button--secondary" onClick={handlePopupClose}>
                        Annuler
                    </button>
                    <button
                        onClick={() => {
                            // Save settings logic here
                            console.log('Settings saved:', {
                                fileName,
                                projectName,
                                description,
                                tags,
                                // language, 
                                // autoSave
                            });
                            handlePopupClose();
                        }}
                        className="settings-modal__button settings-modal__button--primary"
                    >
                        Enregistrer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default React.memo(SettingsPopupWindow);