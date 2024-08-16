import React, { useState, useEffect } from "react";
/*import { TiInfoLarge } from 'react-icons/ti';
import { AiOutlineLink, AiOutlinePicture } from 'react-icons/ai';
import { MdOutlineGif, MdOutlineVideoLibrary } from 'react-icons/md';*/

interface HotspotEditorProps {
  visible: boolean;
  type:
    | "Text"
    | "Label"
    | "Hyperlink"
    | "Image"
    | "Gif"
    | "Video"
    | "Form"
    | "Text_box";
  initialContent: any;
  onSave: (content: any) => void;
  onCancel: () => void;
}

const HotspotEditor: React.FC<HotspotEditorProps> = ({
  visible,
  type,
  initialContent,
  onSave,
  onCancel,
}) => {
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  if (!visible) return null;

  const handleSave = () => {
    onSave(content);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContent(e.target.value);
  };

  return (
    <div className="hotspot-editor">
      <h2>Edit Hotspot</h2>
      {type === "Text" || type === "Label" ? (
        <textarea value={content} onChange={handleChange} />
      ) : type === "Hyperlink" ? (
        <>
          <label>URL:</label>
          <input type="text" value={content.url} onChange={handleChange} />
          <label>Text:</label>
          <input type="text" value={content.text} onChange={handleChange} />
        </>
      ) : type === "Image" || type === "Gif" ? (
        <>
          <label>Image/GIF URL:</label>
          <input type="text" value={content} onChange={handleChange} />
        </>
      ) : type === "Video" ? (
        <>
          <label>YouTube URL:</label>
          <input type="text" value={content} onChange={handleChange} />
        </>
      ) : null}
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default HotspotEditor;
