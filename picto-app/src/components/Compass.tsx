import React from "react";
import "./css/Compass.css";

interface CompassProps {
  rotation: number;
  show: boolean;
}

const Compass: React.FC<CompassProps> = ({ rotation, show }) => {
  if (!show) return null;

  return (
    <div className="custom-compass">
      <div className="compass-inner">
        <div className="north">N</div>
        <div className="east">E</div>
        <div className="west">O</div>
        <div className="south">S</div>
        <div className="main-arrow" style={{ transform: `rotate(${rotation}deg)` }}>
          <div className="arrow-up"></div>
          <div className="arrow-down"></div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Compass);
