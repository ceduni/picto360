import "./css/ActivityPlaygroundEditor.css";

import React, { useMemo, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { PencilIcon, EyeIcon } from "@heroicons/react/24/solid";
import PanoramaViewer from "@/components/PanoramaViewer";
import ToggleSwitch from "@/components/ui/ToggleSwitch";
import { useAuth } from "@/authContext/authContext";
import { ApiDataSource } from "@/utils/dataSources/apiDataSource";

interface Props {
    projectId: string;
    onClose: () => void;
}

/**
 * ActivityCreation's panorama editor. Unlike Studio's VisualisationPage +
 * Toolbar (which is full of Drive-export/.picto concepts that don't apply
 * here), this is a minimal full-screen overlay: just a close button, an
 * edit/preview toggle, and PanoramaViewer wired to the API-backed data
 * source instead of IndexedDB.
 */
const ActivityPlaygroundEditor: React.FC<Props> = ({ projectId, onClose }) => {
    const [isEditMode, setIsEditMode] = useState(true);
    const { currentUser } = useAuth();

    const dataSource = useMemo(
        () => new ApiDataSource(() => {
            if (!currentUser) throw new Error("Not authenticated");
            return currentUser.getIdToken();
        }),
        [currentUser]
    );

    return (
        <div className="playground-editor-overlay">
            <div className="playground-editor-overlay__header">
                <span className="playground-editor-overlay__title">Points d'intérêt</span>
                <div className="playground-editor-overlay__mode-switcher">
                    <ToggleSwitch
                        id="playground-edit-mode"
                        checked={isEditMode}
                        onChange={setIsEditMode}
                        variant="icon"
                        checkedIcon={<PencilIcon width={16} height={16} />}
                        uncheckedIcon={<EyeIcon width={16} height={16} />}
                    />
                    <span onClick={() => setIsEditMode((prev) => !prev)} className="playground-editor-overlay__mode-label">
                        {isEditMode ? "Mode annotation" : "Mode visualisation"}
                    </span>
                </div>
                <button
                    type="button"
                    className="playground-editor-overlay__close"
                    onClick={onClose}
                    aria-label="Fermer l'éditeur"
                >
                    <XMarkIcon width={20} height={20} />
                </button>
            </div>

            <PanoramaViewer
                viewerId={projectId}
                isEditMode={isEditMode}
                width="100vw"
                height="calc(100vh - 56px)"
                dataSource={dataSource}
                showVisibilityToggle
            />
        </div>
    );
};

export default React.memo(ActivityPlaygroundEditor);
