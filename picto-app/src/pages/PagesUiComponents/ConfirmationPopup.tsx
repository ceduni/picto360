import React from "react";

interface ConfirmationPopupProps {
    message: {title:string,details?:string},
    type: "confirm" | "confirm-cancel" | "cancel",
    handleConfirm?: ()=>void
    handleCancel?:()=>void,
}

const ConfirmationPopup : React.FC<ConfirmationPopupProps> = ({message,type,handleConfirm,handleCancel}) =>{

    return(
        <div className="popup_background">
            <div className="popup_window">
                <p>{message.title}</p>
                <p>{message.details}</p>

                <div className="confimation_buttons-container">
                    {
                        (type==="cancel" || type === "confirm-cancel") &&
                        <button type="button" name="cancel_button" onClick={handleCancel}> Cancel</button>
                    }
                    {
                        (type==="confirm" || type === "confirm-cancel") &&
                        <button type="button" name="confirm_button" onClick={handleConfirm}> Confirm</button>
                    }
                </div>     
            </div>
        </div>
    )
}

export default React.memo(ConfirmationPopup)