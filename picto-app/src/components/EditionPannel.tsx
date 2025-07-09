import React, { useEffect, useRef, useState } from "react"
import "./css/EditionPannel.css"
import { HotspotData } from "./HotspotManager"
import TextEditor, { EditorRef } from "./editors/TextEditor";
import HyperlinkEditor from "./editors/HyperlinkEditor";
import ImageEditor from "./editors/ImageEditor";
import VideoEditor from "./editors/VideoEditor";




interface EditionPannelProps {
    hotspot:HotspotData |  null;
    onSave: (hotspot:HotspotData) => void;
    onClose : () => void;
    onDelete : (hotspot:HotspotData) => void;
}

const EditionPannel : React.FC <EditionPannelProps> = ({hotspot,onSave,onClose,onDelete}) => {
    if (!hotspot) return null;

    const [formState, setFormState] = useState<HotspotData | null>(null);    

    const editorRef = useRef<EditorRef>(null);

    useEffect(() => {
        setFormState(hotspot);
    }, [hotspot]);   

    if (!formState) return <p>No hotspot selected</p>;

    const handleSave = (updatedFields: Partial<HotspotData>) => {
        onSave({ ...hotspot, ...updatedFields });
    };

    const handleClickSave = () => {
        editorRef.current?.submit();
    };

    const handleDelete = () =>{
        onDelete(hotspot);
        onClose()
    }


    const type = hotspot.type;

    const editor = (() => {
        switch (type) {
        case "text":
        case "label":
            return <TextEditor ref={editorRef} hotspot={hotspot} onSave={handleSave} />;
        case "hyperlink":
            return <HyperlinkEditor  ref={editorRef} hotspot={hotspot} onSave={handleSave} />;
        case "image":
            return <ImageEditor ref={editorRef} hotspot={hotspot} onSave={handleSave} />;
        case "video":
            return <VideoEditor ref={editorRef} hotspot={hotspot} onSave={handleSave}/>

        // add more cases as needed
        default:
            return <p>Unsupported hotspot type: {type}</p>;
        }
    })();

    return (
        <div className="edition_pannel">
            <div className="edition_pannel_content">
                <div className="edition_pannel_top">
                    {/* <TbEditCircle size={40}/> */}
                    <p className="edition_pannel_top_text">
                        Edition Pannel
                    </p>
                    {/* <IoCloseCircleOutline size={40} className="close_icon"/> */}
                </div>
                <div className="pannel_main_content">
                    <div className="annotation_type_container">
                        <p className="annotation_type_title">Type d'annotation:</p>
                        <p>{hotspot.type}</p>
                    </div>

                    {editor}                
                </div>
                <div className="edition_panel_buttons">
                    <input type="button" value={"Supprimer l'annotation"} className="delete_button" onClick={handleDelete}/>
                    <div className="bottom_pannel">
                        <button className="cancel_button" onClick={onClose}>Cancel</button>
                        <button className="save_button" onClick={handleClickSave}>Save</button>
                    </div>
                </div>
            </div>
            
        </div>

    );

}

export default React.memo(EditionPannel);