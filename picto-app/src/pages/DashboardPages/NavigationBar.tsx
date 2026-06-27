import React, { useState } from "react";
import { ListBulletIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import "./css/NavigationBar.css"
import { useNavigate } from "react-router-dom";
import GotoProfile from "@/components/GotoProfile";

interface NavigationBarProps {
    selected?:"activities" | "edit"
}


const NavigationBar :React.FC<NavigationBarProps> = ({selected}) =>{
    const navigate = useNavigate();

    const [selectedIcon,setSelectedIcon] = useState (selected);

    const handleActivitiesClick = () =>{
        setSelectedIcon("activities")
        navigate("/dashboard/your-activities")
    }

    const handleEditiActivityClick = () =>{
        setSelectedIcon("edit")
        
        // retrieve last activity Id from localStorage
        const data = localStorage.getItem("lastActivityId");   

        navigate(`/dashboard/activity-editor/${data}`)
    }

    return (
        <div className="dashboard-navigation_bar">
            <div className="logo-container">
                <img    src="/images/logo_picto360.png" 
                        alt="Acceuil" 
                        title="Acceuil" 
                        className="logo-to-home" 
                        onClick={()=>navigate("/")}/>
            </div>

            <div className="button-separator"/>

            <div className="nav-bar-icons">
                <div className={selectedIcon==="activities"? "nav-bar_button-field" : "nav-bar_button-field-inactive"} onClick={handleActivitiesClick}>
                    <ListBulletIcon width={20} height={20} />
                    <p>Activités</p>
                </div>
                <div className={selectedIcon==="edit"? "nav-bar_button-field" : "nav-bar_button-field-inactive"} onClick={handleEditiActivityClick}>
                    <PencilSquareIcon width={20} height={20} />
                    <p>Editer</p>
                </div>
            </div>

            <div className="goto_profile">
                <GotoProfile displayType="image"/>
            </div>

        </div>
    )
}

export default React.memo(NavigationBar);