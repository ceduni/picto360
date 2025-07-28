import { TeamInstance } from "@/utils/ActivityCreactionUtils";
import React from "react";
import { HiTrash } from "react-icons/hi2";

import { LuUserRoundPlus } from "react-icons/lu";

interface TeamCardProps {
    index:number,
    teamData:TeamInstance,
    handleTeamNameChange:(idx:number,newName: string) => void,
    setSelectedTeam : React.Dispatch<React.SetStateAction<{
                            indx: number;
                            teamData: TeamInstance;
                        } | undefined>>,
    setIsPaticipantsPopupOpen:React.Dispatch<React.SetStateAction<boolean>>,
    handleDeleteTeam : (toRemove:number)=>void, 
    
}

const TeamCard : React.FC<TeamCardProps> = ({index,teamData,handleTeamNameChange,setSelectedTeam,setIsPaticipantsPopupOpen,handleDeleteTeam}) =>{
    return (
        <div className="team_card">
            <input key={index}
                name="team_card_name"
                value = {teamData.name}
                placeholder={teamData.name}
                onChange={(e) => handleTeamNameChange(index, e.target.value)}
                className="team_card_input"
                autoFocus
            />
            <div className="team_participants-number-field">
                <h2>{teamData.participantsNames.length}</h2>
                <p className="team_participants" onClick={()=>{
                                                            setSelectedTeam({indx:index,teamData});
                                                            setIsPaticipantsPopupOpen(true)}}>Participants</p>
            </div>
            <div className="team-card_bottom">
                <div className="team_add-supervisor">
                    {
                        teamData.supervised && 
                        <div className="add-participants_to_group-button">
                            <LuUserRoundPlus strokeWidth={2}/>
                        </div>
                    }
                </div>
                <span className="delete_team" onClick={()=>handleDeleteTeam(index)}>
                    <HiTrash size={18} />
                </span>
            </div>

        </div>        
    )

} 

export default React.memo(TeamCard)