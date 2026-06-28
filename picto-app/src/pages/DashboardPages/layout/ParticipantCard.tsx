import React from "react";
import { TrashIcon } from "@heroicons/react/24/outline";

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
                placeholder={participantName==="" ?"Renommez le participant": participantName}
                onChange={(e) => handleParticipantNameChange(id, e.target.value)}
                autoFocus
            />
            <div className="delete_participant" onClick={()=>handleDeleteParticipant(id)}>
                <TrashIcon width={14} height={14} />
            </div>
        </div>
    )

} 

export default React.memo(ParticipantCard)