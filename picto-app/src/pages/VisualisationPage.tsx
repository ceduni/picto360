  import React, { useState, useCallback } from "react";
import Toolbar from "@components/Toolbar";
import PanoramaViewer from "@components/PanoramaViewer";
import BottomNavBar from "@/components/BottomNavBar";
import { motion, AnimatePresence } from "framer-motion";
import "../App.css";
  

interface ViewProps{
    imageSrc : string
}

const VisualisationPage: React.FC<ViewProps> = ({imageSrc}) => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false);

    const toggleEditMode = useCallback(() => {
        setIsEditMode((prevMode) => !prevMode);
    }, []);

    return(
        <div>
            <header className="app__header">
                <Toolbar imageSrc ={imageSrc} isEditMode={isEditMode} toggleEditMode={toggleEditMode} />
            </header>
            
            <PanoramaViewer  imageSrc={imageSrc} isEditMode={isEditMode} width={"100vw"} height="100vw" />
            
            <AnimatePresence>
            {imageSrc && isEditMode && (
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