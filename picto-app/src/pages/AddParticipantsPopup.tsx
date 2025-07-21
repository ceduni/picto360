import React, { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";

import "./css/AddParticipantsPopup.css"


interface AddParticipantsPopupProps{
    onSubmit:(participNumber:number) => void
    onClose: () => void ;
}

const AddParticipantsPopup : React.FC<AddParticipantsPopupProps> = ({onClose,onSubmit}) =>{
    const [numberParticipants,setNumberParticipants] = useState(0);
    const [addLater,setAddLater] = useState(true);
    const [errorMessagePopup,setErrorMessagePopup] = useState<{err:string,isDisplayed:boolean}>({err:"",isDisplayed:false});

    const handleChangePartiNumber = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setNumberParticipants(e.target.valueAsNumber);
    }

    const handleSubmitParticip = () => {
        if(numberParticipants<0) {
            setErrorMessagePopup({err:"Nombre de participants invalide, doit être >= 0 ",isDisplayed:true})
            return
        };

        if(numberParticipants === 0){
            if(!addLater){
                setErrorMessagePopup({err:"Nombre de participants invalide, voulez vous en ajouter plus tard ?",isDisplayed:true})
                return;
            }
        }
        onSubmit(numberParticipants);
        onClose();
    }

    const onAddLater = () =>{
        setAddLater(!addLater)
    }

    const onCloseError = () =>{
        setErrorMessagePopup({err:"",isDisplayed:false})
    }

    useEffect(()=>{
        if(addLater && numberParticipants != 0){
            setNumberParticipants(0);
        }
        // if(numberParticipants<0){
        //     setNumberParticipants(0);
        // }
    },[addLater,numberParticipants])


    return (
        <div className="popup_background">
            <div className="popup_window">
                <div className="popup_close_button" onClick={onClose}>
                    <IoIosClose size={45} />
                </div>

                {   errorMessagePopup.isDisplayed &&             
                    <div className="error_message_window">
                        <IoIosClose size={30} onClick={onCloseError}/>
                        <p>{errorMessagePopup.err}</p>
                    </div>
                }

                <div className="popup_window_content">
                    <div className="popup_partiip_number_field">
                        <p>Nombre de participants:</p>
                        <input  type="number"
                                onChange={handleChangePartiNumber}
                                value={numberParticipants}
                                className="number_particp_field"
                                min={0}
                                max={50}/>
                    </div>
                    
                    <div>
                        <p>Ajouter plus tard</p>
                        <input type="checkbox" id="add_later" name="add_later" checked={addLater} onChange={onAddLater}/>

                    </div>
                        {
                            addLater ? <h2>true</h2>:<h2>false</h2>
                        }
                    <button 
                        type="button" 
                        className="popup_add_button"
                        onClick={handleSubmitParticip}>
                            Ajouter
                    </button>
                </div>
            </div>
        </div>
    )
}

export default React.memo(AddParticipantsPopup);