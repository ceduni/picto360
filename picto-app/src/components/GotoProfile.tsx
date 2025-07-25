import { useAuth } from "@/authContext/authContext";
import React, { useCallback } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./css/GotoProfile.css"
import { randomInt } from "crypto";

interface GotoProfileProps {
}



const GotoProfile : React.FC<GotoProfileProps> = () =>{
    const {userLoggedIn,currentUser} = useAuth();

    const navigate = useNavigate();
    const getrandomImageProfile = () => {
        
        // if(value===0){
        //     return "./public/images/profile/Professor-PNG-File.png";
        // }
       
            return "./public/images/profile/R.png";
    }
    const onProfileClick = useCallback(() =>{

        userLoggedIn ? navigate('/profile') : navigate('/login')
    },[]);

    return ( 

    <div className="profile-button" onClick={onProfileClick}>
        <img alt="profile_picture" src={(currentUser?.photoURL===null)? "/public/images/profile/R.png" : currentUser?.photoURL} className="profile_image_card"/>
        {/* <img alt="profile_picture" src={"./images/logo_picto360.png"}  className="profile_image_card"/> */}
        
        <h2 className="profil_user-name" >
            {userLoggedIn ? currentUser?.displayName: "Se connecter"}
        </h2>
        <MdKeyboardArrowRight size={24} />
    </div>
    )
}

export default React.memo(GotoProfile);