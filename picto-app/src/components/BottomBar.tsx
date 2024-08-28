import React, { useState } from "react";
import { LiaHandPointerSolid, LiaMousePointerSolid } from "react-icons/lia";
import { GoPlusCircle } from "react-icons/go";
import { IoLayersOutline } from "react-icons/io5";
import { BiUndo, BiRedo } from "react-icons/bi";

import "./css/BottomBar.css";

const BottomBar: React.FC = () => {
  const [isHandPointer, setIsHandPointer] = useState(true);

  const switchCursor = () => {
    const cursor = document.querySelector(".cursor");
    if (cursor) {
      cursor.classList.toggle("cursor");
    }
    setIsHandPointer(!isHandPointer);
  };

  return (
    <div className="lowerBar">
      <div className="button-container">
        <button>
          <IoLayersOutline className="buttons" />
        </button>
        <button>
          <GoPlusCircle className="buttons" />
        </button>
        <button onClick={switchCursor}>
          {isHandPointer ? (
            <LiaHandPointerSolid className="buttons" />
          ) : (
            <LiaMousePointerSolid className="buttons" />
          )}
        </button>
        <button>
          <BiUndo className="buttons" />
        </button>
        <button>
          <BiRedo className="buttons" />
        </button>
      </div>
    </div>
  );
};

export default React.memo(BottomBar);;
