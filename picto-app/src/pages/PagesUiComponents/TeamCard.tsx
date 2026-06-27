import { TeamInstance } from "@/utils/Types";
import React from "react";
import { TrashIcon, UserPlusIcon } from "@heroicons/react/24/outline";

interface TeamCardProps {
    index:number,
    teamData:TeamInstance,
    supervised:boolean,
    setSelectedTeam : React.Dispatch<React.SetStateAction<{
                            indx: number;
                            teamData: TeamInstance;
                        } | undefined>>,
    setIsPaticipantsPopupOpen:React.Dispatch<React.SetStateAction<boolean>>,
    handleDeleteTeam : (toRemove:number)=>void, 
    
}

const TeamCard : React.FC<TeamCardProps> = ({index,teamData,supervised,setSelectedTeam,setIsPaticipantsPopupOpen,handleDeleteTeam}) =>{
    return (
        <div className="team_card" >
            <p className="team_card_name" onClick={()=>{
                                                setSelectedTeam({indx:index,teamData});
                                                setIsPaticipantsPopupOpen(true)}}>
                            {teamData.name}
            </p>

            <div className="team_participants-number-field">
                <h2>{teamData.participantsNames.length}</h2>
                <p className="team_participants">Participants</p>
            </div>
            <div className="team-card_bottom">
                <div className="team_add-supervisor">
                    {
                        supervised && 
                        <div className="add-participants_to_group-button">
                            <UserPlusIcon width={18} height={18} />
                        </div>
                    }
                </div>
                <span className="delete_team" onClick={()=>handleDeleteTeam(index)}>
                    <TrashIcon width={18} height={18} />
                </span>
            </div>

        </div>        
    )

} 

export default React.memo(TeamCard)