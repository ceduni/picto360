import React, { useState, useCallback } from "react";
// import Toolbar from "@components/Toolbar";
// import PanoramaViewer from "@components/PanoramaViewer";
// import ImageUploader from "@components/ImageUploader";
// import BottomNavBar from "@/components/BottomNavBar";
// import { motion, AnimatePresence } from "framer-motion";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import VisualisationPage from "./pages/VisualisationPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./authContext/authContext";
import ProfilePage from "./pages/ProfilePage";
import ActivityCreationPage from "./pages/ActivityCreationPage";

const App: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string >("null");

  return (
    <div className="app">
      <AuthProvider >
        <Routes>
          <Route  path= "/" element= {<HomePage setImageSrc={setImageSrc} />} />
          <Route  path= "/view" element= {<VisualisationPage imageSrc={imageSrc} />} />
          <Route  path= "/login" element= {<LoginPage />} />
          <Route  path= "/profile" element= {<ProfilePage />} />
          <Route  path="/activity_creation" element = {<ActivityCreationPage/>} />
        </Routes>
      </AuthProvider>

{/* 
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
            <BottomNavBar />
          </motion.div>
        )}
      </AnimatePresence> */}
    </div>
  );
};

export default React.memo(App);
