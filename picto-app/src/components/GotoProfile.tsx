import { useAuth } from "@/authContext/authContext";
import React, { useCallback } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./css/GotoProfile.css"

interface GotoProfileProps {
    displayType? : "image" | "name"
}



const GotoProfile : React.FC<GotoProfileProps> = ({displayType}) =>{
    const {userLoggedIn,currentUser} = useAuth();

    const navigate = useNavigate();
    const onProfileClick = useCallback(() =>{

        userLoggedIn ? navigate('/profile') : navigate('/login')
    },[]);

    return ( 

    <div className={ displayType === "image" ? "profile-button profile-button-solo": "profile-button"} onClick={onProfileClick}>
        {
            (!displayType || displayType === "image") && 
                <img alt="profile_picture" 
                    src={(currentUser?.photoURL===null)? "/public/images/profile/R.png" : currentUser?.photoURL} 
                    className="profile_image_card"/>
        }

        {
            (!displayType || displayType === "name") && 
            <div>
                <h2 className="profil_user-name" >
                    {userLoggedIn ? currentUser?.displayName: "Se connecter"}
                </h2>
                <MdKeyboardArrowRight size={24} />
            </div>
        }
        
    </div>
    )
}

export default React.memo(GotoProfile);