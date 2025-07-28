import React from "react";
import { HiTrash } from "react-icons/hi2";

interface ParticipantCardProps {
    id:string,
    participantName:string,
    handleParticipantNameChange:(idx:string,newName: string) => void,
    handleDeleteParticipant : (toRemove:string) =>void,
}

const ParticipantCard : React.FC<ParticipantCardProps> = ({id,participantName,handleParticipantNameChange,handleDeleteParticipant}) =>{
    return (
        <div className="participant_card">
            <input key={id}
                name="particip_card_name"
                value = {participantName}
                placeholder={participantName}
                onChange={(e) => handleParticipantNameChange(id, e.target.value)}
                autoFocus
            />
            <div className="delete_participant" onClick={()=>handleDeleteParticipant(id)}>
                <HiTrash size={18}/>
            </div>
        </div>
    )

} 

export default React.memo(ParticipantCard)