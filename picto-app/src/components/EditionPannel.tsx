import "./css/EditionPannel.css"

import React, { useEffect, useRef, useState } from "react"
import { EditorRef, HotspotData } from "../utils/Types"
import TextEditor from "./editors/TextEditor";
import HyperlinkEditor from "./editors/HyperlinkEditor";
import ImageEditor from "./editors/ImageEditor";
import VideoEditor from "./editors/VideoEditor";
import { TrashIcon, XMarkIcon, PhotoIcon, LinkIcon, VideoCameraIcon, DocumentTextIcon } from "@heroicons/react/24/outline";



interface EditionPannelProps {
    hotspot: HotspotData | null;
    /** Video projects: show the time-range editor. */
    isVideo?: boolean;
    duration?: number;
    onSave: (hotspot: HotspotData) => void;
    onClose: () => void;
    onDelete: (hotspot: HotspotData) => void;
    onCreate: (hotspot: HotspotData) => void;
    pannelState: string
}

const EditionPannel: React.FC<EditionPannelProps> = ({ hotspot, isVideo = false, duration, onSave, onClose, onDelete, onCreate, pannelState }) => {
    if (!hotspot) return null;

    const [formState, setFormState] = useState<HotspotData | null>(null);
    const [timeRange, setTimeRange] = useState<{ start: number; end?: number } | undefined>(hotspot.timeRange);
    const editorRef = useRef<EditorRef>(null);

    const boxRef = useRef<HTMLDivElement>(null);
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const handle = document.getElementById("handle");


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
        setTimeRange(hotspot.timeRange);
    }, [hotspot]);

    if (!formState && pannelState == "editing") {
        return <p>No hotspot selected</p>;
    }

    const handleSave = (updatedFields: Partial<HotspotData>) => {
        // Video: apply the time-range fields to every annotation type.
        const withTime = isVideo
            ? { timeRange, ...updatedFields }
            : updatedFields;

        if (pannelState === "editing") {
            onSave({ ...hotspot, ...withTime });
            onClose();
            return;
        }

        if (pannelState === "creating") {
            onCreate({ ...hotspot, ...withTime });
            onClose();
            return;
        }
    };

    const handleClickSave = () => {
        editorRef.current?.submit();
    };

    const handleDelete = () => {
        onDelete(hotspot);
        onClose()
    }


    const type = hotspot.type;

    const typeLabel = (() => {
        switch (type) {
            case "text":
                return "Texte";
            case "label":
                return "Étiquette";
            case "hyperlink":
                return "Hyperlien";
            case "gif":
                return "GIF";
            case "image":
                return "Image";
            case "video":
                return "Vidéo";
            default:
                return "Inconnu";
        }
    })();

    const editor = (() => {
        switch (type) {
            case "text":
            case "label":
                return <TextEditor ref={editorRef} hotspot={hotspot} onSave={handleSave} />;
            case "hyperlink":
                return <HyperlinkEditor ref={editorRef} hotspot={hotspot} onSave={handleSave} />;
            case "gif":
            case "image":
                return <ImageEditor ref={editorRef} hotspot={hotspot} onSave={handleSave} />;
            case "video":
                return <VideoEditor ref={editorRef} hotspot={hotspot} onSave={handleSave} />

            // add more cases as needed
            default:
                return <p>Unsupported hotspot type: {type}</p>;
        }
    })();

    const panelIcon = (() => {
        switch (type) {
            case "text":
            case "label":
                return <DocumentTextIcon width={20} height={20} />;
            case "hyperlink":
                return <LinkIcon width={20} height={20} />;
            case "gif":
            case "image":
                return <PhotoIcon width={20} height={20} />;
            case "video":
                return <VideoCameraIcon width={20} height={20} />;

            // add more cases as needed
            default:
                return <p>Unsupported hotspot type: {type}</p>;
        }
    })();

    return (
        <div id="movable" className="edition_pannel" ref={boxRef}>
            <div id="handle" className="draggable_line" onMouseDown={handleMouseDown}></div>
            
            <div className="edition_pannel_content">
                <div className="modal__header">
                    <div className="t-page-title">
                        <div className="edition_pannel_icon">{panelIcon}</div> 
                        {typeLabel}
                    </div>
                    <button className="modal__close-button" onClick={onClose} aria-label="Fermer le pannel d'édition sans sauvegarder">
                        <XMarkIcon width={18} height={18} />
                    </button>

                </div>
                <div className="pannel_main_content">
                    {editor}
                    {isVideo && (
                        <div className="edition_pannel__timerange">
                            <label className="edition_pannel__timerange-label">
                                Visible de
                                <input
                                    type="number"
                                    min={0}
                                    step={0.5}
                                    value={timeRange?.start ?? 0}
                                    onChange={(e) => setTimeRange({
                                        start: Math.max(0, Number(e.target.value) || 0),
                                        end: timeRange?.end,
                                    })}
                                />
                                s
                            </label>
                            <label className="edition_pannel__timerange-label">
                                à
                                <input
                                    type="number"
                                    min={0}
                                    step={0.5}
                                    placeholder="fin"
                                    value={timeRange?.end ?? ""}
                                    onChange={(e) => {
                                        const raw = e.target.value.trim();
                                        setTimeRange({
                                            start: timeRange?.start ?? 0,
                                            end: raw === "" ? undefined : Math.max(0, Number(raw) || 0),
                                        });
                                    }}
                                />
                                s
                                {duration !== undefined && Number.isFinite(duration) && (
                                    <span className="edition_pannel__timerange-hint">
                                        (durée: {Math.floor(duration / 60)}:{Math.floor(duration % 60).toString().padStart(2, "0")})
                                    </span>
                                )}
                            </label>
                        </div>
                    )}
                </div>
                <div className="edition_panel_buttons">
                    {
                        pannelState == "editing" &&
                        <button type="button" title="delete" className="delete_button" onClick={handleDelete}>
                            <TrashIcon width={18} height={18} />
                        </button>
                    }
                    <div className="popup-modal__footer">
                        <button type="button" className="modal__button button__secondary" onClick={onClose}>Annuler</button>
                        {
                            pannelState == "editing" &&
                            <button type="button" className="modal__button button__primary" onClick={handleClickSave}>
                                Sauvegarder
                            </button>
                        }
                        {
                            pannelState == "creating" &&
                            <button type="button" className="modal__button button__primary" onClick={handleClickSave}>
                                Créer
                            </button>
                        }
                    </div>
                </div>
            </div>

        </div>

    );

}

export default React.memo(EditionPannel);