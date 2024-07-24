import { useState } from "react";
import Toolbar from "@components/Toolbar";
import ImageViewer from "@components/ImageViewer";
import ImageUpload from "@components/ImageUpload";
import BottomBar from "@components/BottomBar";
import "./App.css";

const App = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleImageUpload = (imageSrc: string) => {
    setImageSrc(imageSrc);
  };

  return (
    <div className="App">
      {imageSrc && <Toolbar />}
      <div className="App-body">
        {imageSrc ? (
          <ImageViewer width="100%" height="100%" imageSrc={imageSrc} />
        ) : (
          <ImageUpload onImageUpload={handleImageUpload} />
        )}
      </div>
      {imageSrc && <BottomBar />}
    </div>
  );
};

export default App;
