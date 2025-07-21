import { useAuth } from "@/authContext/authContext";
import React, { useCallback } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./css/GotoProfile.css"

interface GotoProfileProps {
}



const GotoProfile : React.FC<GotoProfileProps> = () =>{
    const {userLoggedIn,currentUser} = useAuth();

    const navigate = useNavigate();
    
    const onProfileClick = useCallback(() =>{

        userLoggedIn ? navigate('/profile') : navigate('/login')
    },[]);

    return ( 

    <div className="profile-button" onClick={onProfileClick}>
        <span className="material-icons" >
        account_circle
        </span>
        
        <h2 className="profil_user-name" >
            {userLoggedIn ? currentUser?.displayName: "Se connecter"}
        </h2>
        <MdKeyboardArrowRight size={24} color="#364A9D" />
    </div>
    )
}

export default React.memo(GotoProfile);