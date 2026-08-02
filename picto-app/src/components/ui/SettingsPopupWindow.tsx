import "@css/SettingsPopupWindow.css";

import React, { useState } from "react";
import { XMarkIcon, PlusIcon } from "@heroicons/react/24/outline";

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
        <div className={`popup_background `} onClick={handleBackdropClick}>
            <div className={`modal ${isOpen ? 'modal--open' : ''}`}>
                <div className="modal__header">
                    <h2 className="t-page-title">Paramètres du projet</h2>
                    <button className="modal__close-button" onClick={handlePopupClose} aria-label="Fermer les paramètres">
                        <XMarkIcon width={18} height={18} />
                    </button>
                </div>

                <div className="popup_window_content">
                    {/* File Name */}
                    <div className="modal__section">
                        <label htmlFor="file-name" className="t-label">
                            Nom du fichier (pour la sauvegarde)
                        </label>
                        <div className="modal__filename-wrapper">
                            <input id="file-name" className="modal__input modal__input--filename"
                                type="text"
                                value={fileName}
                                onChange={setFileName}
                                placeholder="Entrez le nom du fichier"
                                maxLength={fileNameMaxLength}
                            />
                            <code className="modal__file-extension">.picto</code>
                        </div>
                    </div>

                    {/* Project Name */}
                    <div className="modal__section">
                        <label htmlFor="project-name" className="t-label">
                            Titre du projet
                        </label>
                        <input id="project-name" className="modal__input"
                            type="text"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            placeholder="Entrez le nom du projet"
                            maxLength={50}
                        />
                    </div>

                    {/* Description */}
                    <div className="modal__section">
                        <label htmlFor="description" className="t-label">
                            Description
                        </label>
                        <textarea id="description" className="modal__textarea"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Décrivez votre projet"
                            rows={4}
                            maxLength={500}
                        />
                        <span className="t-helper">
                            {description.length}/500
                        </span>
                    </div>

                    {/* Tags */}
                    {__ENABLE_BETA__ && (
                        <div className="modal__section">
                            <label htmlFor="tags" className="t-label">
                                Étiquettes
                            </label>
                            <div className="modal__section_horizontal">
                                <input
                                    id="tags"
                                    type="text"
                                    value={currentTag}
                                    onChange={(e) => setCurrentTag(e.target.value)}
                                    onKeyDown={handleTagKeyDown}
                                    placeholder="Ajouter une étiquette"
                                    className="modal__input"
                                    maxLength={20}
                                />
                                <button
                                    onClick={handleAddTag}
                                    className="button__primary"
                                    type="button"
                                    aria-label="Ajouter étiquette"
                                >
                                    <PlusIcon width={18} height={18} />
                                </button>
                            </div>
                            {tags.length > 0 && (
                                <div className="modal__tags-list">
                                    {tags.map((tag) => (
                                        <span key={tag} className="modal__tag">
                                            {tag}
                                            <button
                                                onClick={() => handleRemoveTag(tag)}
                                                className="modal__tag-remove"
                                                aria-label={`Supprimer ${tag}`}
                                            >
                                                <XMarkIcon width={18} height={18} />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="popup-modal__footer">
                    <button className="modal__button button__secondary" onClick={handlePopupClose}>
                        Annuler
                    </button>
                    <button
                        onClick={() => {
                            handlePopupClose();
                        }}
                        className="modal__button button__primary"
                    >
                        Enregistrer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default React.memo(SettingsPopupWindow);