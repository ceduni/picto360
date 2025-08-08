import React, { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";

import "./css/AddParticipantsPopup.css"
import { TeamInstance,ActivityIstance, handleParticipantNameChange, handleDeleteParticipant, ParticipantData, handleAddParticipToTeam } from "@/utils/ActivityCreactionUtils";
import ParticipantCard from "./PagesUiComponents/ParticipantCard";
import { FaPlus } from "react-icons/fa";


interface AddParticipantsPopupProps{
    teamIdx:number;
    teamList:TeamInstance[];
    setFormValues:React.Dispatch<React.SetStateAction<ActivityIstance>>;
    handleTeamNameChange:(idx:number,newName: string) => void,

    onClose: () => void ;
}

const AddParticipantsPopup : React.FC<AddParticipantsPopupProps> = ({onClose,teamIdx,teamList,setFormValues,handleTeamNameChange}) =>{
    const [updatedTeams,setUpdatedTeams] = useState([...teamList]);
    const [newTeamDetails,setNewTeamDetails] = useState({
        name:"",
        participantsNumberToAdd:0,
        participantsNames :[],
        supervise:false,
        supervisor_id:""
    })
    const [errorMessagePopup,setErrorMessagePopup] = useState<{err:string,isDisplayed:boolean}>({err:"",isDisplayed:false});

    // if skip participants add process is allowed , un-comment all the parts with addLater
    // const [addLater,setAddLater] = useState(true);

    const teamToEdit = teamList[teamIdx];

    const handleChangePartiNumber = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setNewTeamDetails({...newTeamDetails,participantsNumberToAdd : e.target.valueAsNumber});
    }
    
    const onAddParticipToTeam = (toAdd:number) => {

        if(toAdd<=0) {
            setErrorMessagePopup({err:"Nombre de participants invalide, doit être >= 0 ",isDisplayed:true})
            return
        };

        // const newTeams = [...updatedTeams];

        if (!updatedTeams[teamIdx] ) {
            console.log("Erreur de création 2"); 
            return 
        };

        const modifiedTeam = handleAddParticipToTeam(toAdd,updatedTeams[teamIdx]); 
        
        if(modifiedTeam===undefined) return;

        updatedTeams[teamIdx] = modifiedTeam;

        setUpdatedTeams(updatedTeams);
        setNewTeamDetails({...newTeamDetails,participantsNumberToAdd:0})
    }

    const handleConfirmation =()=>{
        setFormValues(prev => ({ ...prev, teamsList: updatedTeams }))
        onClose();
    }
    
    const onCloseError = () =>{
        setErrorMessagePopup({err:"",isDisplayed:false})
    }

    // const onAddLater = () =>{
    //     setAddLater(!addLater)
    // }
        // useEffect(()=>{
    //     if(addLater && numberParticipants != 0){
    //         setNumberParticipants(0);
    //     }
    // },[addLater,numberParticipants])



    // props handlers for paricipant card 
    const changeParticipantName = (idx:string,toAdd:string) =>{
        const newParticipantsList = handleParticipantNameChange(teamToEdit.participantsNames,idx,toAdd);

        const updatedTeams = [...teamList];
        updatedTeams[teamIdx].participantsNames = newParticipantsList

        setFormValues((prev)=>({...prev,teamsList:updatedTeams}))
    }

    const deleteParticipantFromActivity = (toDelete:string) =>{
        const newParticipantsList = handleDeleteParticipant(teamToEdit.participantsNames,toDelete);

        const updatedTeams = [...teamList];
        updatedTeams[teamIdx].participantsNames = newParticipantsList
        setFormValues((prev)=>({...prev,teamsList:updatedTeams}));
    }


    return (
        <div className="popup_background">
            <div className="popup_window">
                {   errorMessagePopup.isDisplayed &&             
                    <div className="error_message_window">
                        <IoIosClose size={30} onClick={onCloseError}/>
                        <p>{errorMessagePopup.err}</p>
                    </div>
                }

                <div className="popup_window_content">
                    <div className="popup_window_content-top">
                        <div className="popup_close_button" onClick={onClose}>
                            <IoIosClose size={45} />
                        </div>
                        <input key={teamIdx}
                                name="team_card_name"
                                value = {teamToEdit.name}
                                placeholder={teamToEdit.name}
                                onChange={(e) => handleTeamNameChange(teamIdx, e.target.value)}
                                autoFocus
                                className="team-title-input"
                            />
                    <div/>

                    </div>

                    
                    <div className="team_participants_field">
                        <h3 className="popup_list_title">
                            Participants ( {teamToEdit.participantsNames.length} ) 
                        </h3>
                        {
                            teamToEdit.participantsNames.length <= 0 ?
                            <p className="error_board">Pas de participants</p>
                            :
                            <div  className="popup-list_parent_container_inner">

                                <div className="popup-list_group">
                                    {   teamToEdit.participantsNames.map((participant) => (
                                            <ParticipantCard id={participant.id} 
                                                                key={participant.id}
                                                                participantName={participant.name} 
                                                                handleParticipantNameChange={changeParticipantName}
                                                                handleDeleteParticipant={deleteParticipantFromActivity} />
                                        ))
                                    }
                                </div>
                            </div>
                        }

                    </div>
                    <div className="popup_particip_number_field">
                        <div className="add_participants_container">
                            <input  type="number"
                                    onChange={handleChangePartiNumber}
                                    onKeyDown={(e)=>e.key==="Enter" && onAddParticipToTeam(newTeamDetails.participantsNumberToAdd) }
                                    value={newTeamDetails.participantsNumberToAdd}
                                    className="number_particp_field"
                                    min={0}
                                    max={50}/>
                            <div className="add_one" onClick={()=>onAddParticipToTeam(1)}>
                                <FaPlus size={14} />
                                <p>1</p>
                            </div>
                        </div>
                        <p>Participants à ajouter:</p>

                    </div>
                    <button 
                        type="button" 
                        className="popup_add_button"
                        onClick={handleConfirmation}>
                            Enrégistrer
                    </button>
                    {/* <div>
                        <p>Ajouter plus tard</p>
                        <input type="checkbox" id="add_later" name="add_later" checked={addLater} onChange={onAddLater}/>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default React.memo(AddParticipantsPopup);