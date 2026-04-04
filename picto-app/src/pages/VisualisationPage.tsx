import React, { useState, useCallback } from "react";
import Toolbar from "@components/Toolbar";
import PanoramaViewer from "@components/PanoramaViewer";
import { useParams } from "react-router-dom";

import ErrorBanner from "@/components/FeedbackBanner";
import { useAutoDriveExport } from "@/hooks/useAutoDriveExport";
import { useDriveExportProgress } from "@/hooks/useDriveExportProgress";
import { useServerSentAuth } from "@/hooks/useServerSentAuth";
import ExportProgressPopupWindow from "@/components/ui/ExportProgressPopupWindow";


const VisualisationPage: React.FC = () => {
    const [isEditMode, setIsEditMode] = useState<boolean>(true);
    const {
        driveAuthStatus,
        uploadProgress,
        exportStatus,
        exportError,
        uploadComplete,
    } = useServerSentAuth();
    const { viewerId } = useParams<{ viewerId: string }>();
    const {
        progressState,
        startDriveExport,
        markDriveExportSuccess,
        markDriveExportFailure,
        closeProgressPopup,
    } = useDriveExportProgress({
        uploadProgress,
        exportStatus,
        exportError,
        uploadComplete,
    });
    const { bannerRef } = useAutoDriveExport({
        viewerId,
        driveAuthStatus,
        onDriveExportStart: startDriveExport,
        onDriveExportSuccess: markDriveExportSuccess,
        onDriveExportFailure: markDriveExportFailure,
    });

    const toggleEditMode = useCallback(() => {
        setIsEditMode((prevMode) => !prevMode);
    }, []);

    const hasViewerId = Boolean(viewerId);
    console.log("Drive auth status in toolbar: ", driveAuthStatus)


    return (
        <div >
            <Toolbar
                isEditMode={isEditMode}
                toggleEditMode={toggleEditMode}
                viewerId={viewerId}
                driveAuthStatus={driveAuthStatus}
                driveExportInProgress={progressState.isActive}
                onDriveExportStart={startDriveExport}
                onDriveExportSuccess={markDriveExportSuccess}
                onDriveExportFailure={markDriveExportFailure}
            />
            <ErrorBanner ref={bannerRef} />
            <ExportProgressPopupWindow progressState={progressState} onClose={closeProgressPopup} />

            {/* Don't mount until ready */}
            {hasViewerId ? (
                <PanoramaViewer
                    key={viewerId!}       // force remount when url changes (if your viewer needs it)
                    viewerId={viewerId!}
                    isEditMode={isEditMode}
                    width="100vw"
                    height="100vh"
                />
            ) : (
                <div style={{ height: "100vh", display: "grid", placeItems: "center" }}>
                    Pas d'images uploadées
                </div>
            )}
        </div>
    )

}

export default React.memo(VisualisationPage);
