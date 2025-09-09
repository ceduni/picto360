  import React, { useState, useCallback, useEffect, useRef } from "react";
import Toolbar from "@components/Toolbar";
import PanoramaViewer from "@components/PanoramaViewer";
import BottomNavBar from "@/components/BottomNavBar";
import { motion, AnimatePresence } from "framer-motion";
import "../App.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MessageBannerRef } from "@/utils/Types";
import ErrorBanner from "@/components/FeedbackBanner";
import { useServerSentAuth } from "@/hooks/useServerSentAuth";


const VisualisationPage: React.FC = () => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const bannerRef = useRef<MessageBannerRef>(null); 
    const {driveAuthStatus} = useServerSentAuth();
    
    const { viewerId } = useParams<{ viewerId: string }>();
    const navigate =  useNavigate();

    const toggleEditMode = useCallback(() => {
        setIsEditMode((prevMode) => !prevMode);
    }, []);

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    const query = useQuery();
    // const message = query.get("message");


    const hasViewerId = Boolean(viewerId);

    return(
        
        <div>
            <header className="app__header">
                <Toolbar isEditMode={isEditMode} 
                        toggleEditMode={toggleEditMode} 
                        viewerId = {viewerId}
                        bannerRef = {bannerRef}
                        driveAuthStatus = {driveAuthStatus}
                        />
            </header>
            <ErrorBanner ref={bannerRef}/>

            {/* ⬇️ Don't mount until ready */}
            {hasViewerId ? (
                <PanoramaViewer
                key={viewerId!}       // force remount when url changes (if your viewer needs it)
                viewerId={viewerId!}
                isEditMode={isEditMode}
                bannerRef = {bannerRef}
                width="100vw"
                height="100vh"
                />
            ) : (
                <div style={{ height: "100vh", display: "grid", placeItems: "center" }}>
                    Pas d'images uploadées 
                </div>
            )}
            
            <AnimatePresence>
            {viewerId && isEditMode && (
                <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ duration: 0.5 }}
                >
                <BottomNavBar />
                </motion.div>
            )}
            </AnimatePresence>
        </div>
    )

}

export default React.memo(VisualisationPage);