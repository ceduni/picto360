import { useAuth } from "@/authContext/authContext"

import "./css/ProfilePage.css"
import { doSignOut } from "@/firebase/authentification";
import { useNavigate } from "react-router-dom";


interface ProfileProps {
    
}



  const ProfilePage: React.FC<ProfileProps> = () => {

    const navigate = useNavigate();

    const { userLoggedIn,currentUser } = useAuth();

    const onLoggOut = async (e: { preventDefault: () => void })=> {
            e.preventDefault();
            if(userLoggedIn){
                await doSignOut();
                navigate('/');
            }
        }
        

    return(
        <div className="profile_page-background">
            <div className="profile_page-content">
                <div className="profile_main_content">

                    <div className="profile_background">
                        <img src="/images/profile_background_image.png" 
                            className="profile_background_image" 
                            alt="background_picture"/>
                    </div>

                    <div className="profile_context">
                        <div className="profile_context-top">
                            <img src={(currentUser?.photoURL==null)? "https://picsum.photos/200/300" : currentUser?.photoURL} 
                                    alt="profile_pictute"
                                    className="profile_picture" />
                            <div className="profile_context_top-right">
                                <div className="profile_info">
                                    <h2 className="user_name">{userLoggedIn && currentUser?.displayName}</h2>
                                    <h2 className="user_email">{userLoggedIn && currentUser?.email}</h2>
                                </div>
                                <button type="button" title="Se déconnecter" className="profile_logout-button" onClick={onLoggOut}>
                                    Déconnexion
                                </button>
                            </div>


                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
  }

  export default ProfilePage
