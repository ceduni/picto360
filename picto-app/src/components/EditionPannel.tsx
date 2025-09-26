import React, { useEffect, useRef, useState } from "react"
import "./css/EditionPannel.css"
import { EditorRef, HotspotData } from "../utils/Types"
import TextEditor from "./editors/TextEditor";
import HyperlinkEditor from "./editors/HyperlinkEditor";
import ImageEditor from "./editors/ImageEditor";
import VideoEditor from "./editors/VideoEditor";
import { BsTrash3Fill } from "react-icons/bs";


interface EditionPannelProps {
    hotspot:HotspotData |  null;
    onSave: (hotspot:HotspotData) => void;
    onClose : () => void;
    onDelete : (hotspot:HotspotData) => void;
    onCreate : (hotspot:HotspotData) => void;
    pannelState : string
}

const EditionPannel : React.FC <EditionPannelProps> = ({hotspot,onSave,onClose,onDelete,onCreate,pannelState}) => {
    if (!hotspot) return null;

    const [formState, setFormState] = useState<HotspotData | null>(null);    
    const editorRef = useRef<EditorRef>(null);

    const boxRef = useRef<HTMLDivElement>(null);
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    let handle = document.getElementById("handle");


    const handleMouseDown = (e: React.MouseEvent) => {
        const box = boxRef.current;
        if (!box) return;

        setDragging(true);
        setOffset({
            x: e.clientX - box.offsetLeft,
            y: e.clientY - box.offsetTop
        });

        // Prevent selecting text while dragging
        document.body.style.userSelect = "none";
        if (handle) handle.style.cursor = "grabbing";

    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
        if (!dragging || !boxRef.current) return;
            boxRef.current.style.left = `${e.clientX - offset.x}px`;
            boxRef.current.style.top = `${e.clientY - offset.y}px`;
        };

        const handleMouseUp = () => {
            setDragging(false);
            if (handle) handle.style.cursor = "grab";
            document.body.style.userSelect = "auto";
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

        return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [dragging, offset]);


    useEffect(() => {
        setFormState(hotspot);
    }, [hotspot]);   

    if (!formState && pannelState=="editing"){
        return <p>No hotspot selected</p>;
    } 

    const handleSave = (updatedFields: Partial<HotspotData>) => {
        if(pannelState==="editing"){
            onSave({ ...hotspot, ...updatedFields });
            onClose();
            return;
        }

        if(pannelState==="creating"){
            onCreate({... hotspot, ...updatedFields});
            onClose();
            return;
        }
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
        <div id="movable" className="edition_pannel" ref={boxRef}>
                <div id = "handle" className="draggable_line" onMouseDown={handleMouseDown}/>
            <div className="edition_pannel_content">
                <div className="edition_pannel_top">
                    <p className="edition_pannel_top_text">
                        Panneau d'édition
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
                    {
                        pannelState=="editing" &&
                        <button type="button" title="delete" className="delete_button" onClick={handleDelete}>
                            <BsTrash3Fill />
                        </button>                        
                    }
                    <div className="bottom_pannel">
                        <button type="button" className="cancel_button" onClick={onClose}>Cancel</button>
                        {
                            pannelState=="editing" &&
                            <button type="button" className="save_button" onClick={handleClickSave}>Sauvegarder</button>                      
                        }
                        {
                            pannelState=="creating" &&
                            <button type="button" className="save_button" onClick={handleClickSave}>Créer</button>                      
                        }
                    </div>
                </div>
            </div>
            
        </div>

    );

}

export default React.memo(EditionPannel);