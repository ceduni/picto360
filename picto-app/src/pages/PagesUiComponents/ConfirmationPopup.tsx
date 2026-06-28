import React from "react";

interface ConfirmationPopupProps {
    message: {title:string,details?:string},
    type: "confirm" | "confirm-cancel" | "cancel",
    handleConfirm?: ()=>void
    handleCancel?:()=>void,
    confirmLabel?: string;
    cancelLabel?: string;
}

const ConfirmationPopup : React.FC<ConfirmationPopupProps> = ({message,type,handleConfirm,handleCancel,confirmLabel="Confirm",cancelLabel="Cancel"}) =>{

    return(
        <div className="popup_background">
            <div className="popup_window">
                <div className="popup_window-header">
                    <p className="t-page-title">{message.title}</p>
                    <p className="t-subtitle">{message.details}</p>
                </div>

                <div className="popup_buttons-container">
                    {
                        (type==="cancel" || type === "confirm-cancel") &&
                        <button type="button" 
                                name="button__secondary" 
                                onClick={handleCancel}
                                className="button__secondary"
                        >{cancelLabel}
                        </button>
                    }
                    {
                        (type==="confirm" || type === "confirm-cancel") &&
                        <button type="button" name="confirm_button" onClick={handleConfirm} className="button__primary">{confirmLabel}</button>
                    }
                </div>     
            </div>
        </div>
    )
}

export default React.memo(ConfirmationPopup)