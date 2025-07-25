import { useAuth } from "@/authContext/authContext"

import "./css/ProfilePage.css"
import { doSignOut } from "@/firebase/authentification";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { FaArrowRightToBracket } from "react-icons/fa6";


interface ProfileProps {
    
}



  const ProfilePage: React.FC<ProfileProps> = () => {

    const navigate = useNavigate();

    const { userLoggedIn,currentUser } = useAuth();

    const [uname,setUname] = useState(currentUser?.displayName );

    const [isTyping, setIsTyping] = useState(false);
    const [hasFocused, setHasFocused] = useState(false);

    const onLoggOut = async (e: { preventDefault: () => void })=> {
            e.preventDefault();
            if(userLoggedIn){
                await doSignOut();
                navigate('/');
            }
        }


    const handleGoBack = () => {
        navigate(-1); // Goes back one step in the history stack
    };

    const onTypingUname = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUname(e.target.value);
        setIsTyping(true);
    };

    const handleBlur = () => {
        setIsTyping(false);
    };
    
    const handleFocus = () => {
        if (!isTyping) {
            setIsTyping(true);
        }
    };

    const getUnameFromEmail = () =>{
        const email = currentUser?.email;
        let splitEmail = email?.split("@");
        return splitEmail?.at(0);
    }
        

    return(
        <div className="profile_page-background">
            <div className="profile_page-content">

                <div className="profile_top">
                    <img className="login-page__logo" 
                    src="/images/logo_picto360.png" alt="Logo-picto360" />     
                    <Icon   icon="fluent:arrow-circle-left-12-filled" 
                            width="26" 
                            height="26" 
                            onClick={handleGoBack}
                            className="back_button"
                            
                            />       
                    <h2> Votre profil</h2>
                </div>

                <div className="profile_main_content">

                    <div className="profile_background">
                        <img src="/images/profile_background_image.png" 
                            className="profile_background_image" 
                            alt="background_picture"/>
                    </div>

                    <div className="profile_context">
                        <div className="profile_context-top">
                            <img src={(currentUser?.photoURL===null)? "https://picsum.photos/200/300" : currentUser?.photoURL} 
                                    alt="profile_pictute"
                                    className="profile_picture" />
                            <div className="profile_context_top-right">
                                <div className="profile_info">
                                    <label className="user_name_container">
                                        <input
                                            type="text"
                                            value={uname || getUnameFromEmail()}
                                            onFocus={handleFocus}
                                            onChange={onTypingUname}
                                            onBlur={handleBlur}
                                            className={
                                                isTyping ?
                                                "user_name_typing"
                                                :
                                                "user_name"
                                            }
                                            />
                                            <Icon icon="tabler:edit" className="edit_button" width="26" height="26" />
                                    </label>

                                    <h2 className="user_email">
                                        {userLoggedIn && currentUser?.email}
                                    </h2>
                                </div>
                                <div className="profile_top_right">
                                    <div className="profile_top_right_group">
                                        <p>Activités</p>
                                        <h2>03</h2>
                                    </div>

                                    <div className="profile_top_right_group">
                                        <p>Groupes</p>
                                        <h2>03</h2>
                                    </div>
                                    <div title="Se déconnecter" className="profile_logout-button" onClick={onLoggOut}>
                                        <FaArrowRightToBracket size={18}/>
                                        <p>
                                            Déconnexion
                                        </p>
                                    </div>

                                </div>

                            </div>
                        </div>
                        <div className="context_options">
                            <div className="option_baniere">
                                <Icon icon="fluent:broad-activity-feed-24-filled" width="20" height="20" />
                                <p> Voir toutes vos activité </p>
                            </div>

                            <div className="option_baniere">
                                <Icon icon="dashicons:groups" width="22" height="22" />
                                <p> Voir touts vos groupes </p>
                            </div>       

                            <div className="option_baniere">
                                <Icon icon="mdi:image-sync" width="22" height="22" />
                                <p> Voir vos images récentes </p>
                            </div>                                                 
                        </div>

                        <div className="option_baniere_delete_account">
                            <Icon icon="fluent:delete-16-filled" width="20" height="20" />
                            <p> Supprimer mon compte </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
  }

  export default ProfilePage
