import { useState } from "react";
import Toolbar from "@components/Toolbar";
import PanoramaViewer from "@components/PanoramaViewer";
import ImageUploader from "@components/ImageUploader";
import BottomBar from "@components/BottomBar";
import "./App.css";

const App = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleImageUpload = (imageSrc: string) => {
    setImageSrc(imageSrc);
  };

  return (
    <div className="App">
      {imageSrc && <Toolbar imageSrc={imageSrc}/>}
      <div className="App-body">
        {imageSrc ? (
          <PanoramaViewer width="100%" height="100%" imageSrc={imageSrc} />
        ) : (
          <ImageUploader onImageUpload={handleImageUpload} />
        )}
      </div>
      {imageSrc && <BottomBar />}
    </div>
  );
};

export default App;
