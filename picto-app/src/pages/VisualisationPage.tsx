import React, { useState, useCallback } from "react";
import Toolbar from "@components/Toolbar";
import PanoramaViewer from "@components/PanoramaViewer";
import { useParams } from "react-router-dom";

import ErrorBanner from "@/components/FeedbackBanner";
import { useServerSentAuth } from "@/hooks/useServerSentAuth";
import { useFeedbackBanner } from "@/hooks/useFeedbackbanner";


const VisualisationPage: React.FC = () => {
    const [isEditMode, setIsEditMode] = useState<boolean>(true);
    const { bannerRef } = useFeedbackBanner();

    const { driveAuthStatus } = useServerSentAuth();

    const { viewerId } = useParams<{ viewerId: string }>();

    const toggleEditMode = useCallback(() => {
        setIsEditMode((prevMode) => !prevMode);
    }, []);

    const hasViewerId = Boolean(viewerId);

    return (
        <div >
            <Toolbar isEditMode={isEditMode} toggleEditMode={toggleEditMode} viewerId={viewerId} driveAuthStatus={driveAuthStatus} />
            <ErrorBanner ref={bannerRef} />

            {/* Don't mount until ready */}
            {hasViewerId ? (
                <PanoramaViewer
                    key={viewerId!}       // force remount when url changes (if your viewer needs it)
                    viewerId={viewerId!}
                    isEditMode={isEditMode}
                    bannerRef={bannerRef}
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