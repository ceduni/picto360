import React, { useState, useCallback } from "react";
import Toolbar from "@components/Toolbar";
import PanoramaViewer from "@components/PanoramaViewer";
import ImageUploader from "@components/ImageUploader";
import BottomNavbar from "@/components/BottomNavbar";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

const App: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const handleImageUpload = useCallback((newImageSrc: string) => {
    setImageSrc(newImageSrc);
  }, []);

  const toggleEditMode = useCallback(() => {
    setIsEditMode((prevMode) => !prevMode);
  }, []);

  return (
    <div className="app">
      <header className="app__header">
        {imageSrc && <Toolbar imageSrc={imageSrc} isEditMode={isEditMode} toggleEditMode={toggleEditMode} />}
      </header>
      <div className="app__body">
        {imageSrc ? (
          <PanoramaViewer width="100%" height="100%" imageSrc={imageSrc} isEditMode={isEditMode} />
        ) : (
          <ImageUploader onImageUpload={handleImageUpload} />
        )}
      </div>
      <AnimatePresence>
        {imageSrc && isEditMode && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <BottomNavbar />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default React.memo(App);
