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
        <div className="team_card" onClick={()=>{
                                                setSelectedTeam({indx:index,teamData});
                                                setIsPaticipantsPopupOpen(true)}
                                                }>
            <button className="team-card__delete" onClick={(e)=>{e.stopPropagation(); handleDeleteTeam(index)}}>
                <TrashIcon width={14} height={14} />
            </button>

            <div className="team-card__count">
                <span className="team-card__count-number">{teamData.participantsNames.length}</span>
                <span className="team-card__count-label">participants</span>
            </div>

            <p className="team_card_name">{teamData.name}</p>

            {supervised && (
                <div className="add-participants_to_group-button">
                    <UserPlusIcon width={14} height={14} />
                </div>
            )}
        </div>
    )

} 

export default React.memo(TeamCard)