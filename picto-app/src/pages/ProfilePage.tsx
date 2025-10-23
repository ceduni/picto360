import { useAuth } from "@/authContext/authContext"

import "./css/ProfilePage.css"
import { doSignOut } from "@/firebase/authentification";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { LuArrowLeft, LuCheck, LuGitFork, LuImageDown, LuPenLine, LuX } from "react-icons/lu";
import { updateUserName } from "@/firebase/userProfileUpdates";
import { useFeedbackBanner } from "@/hooks/useFeedbackbanner";
import ErrorBanner from "@/components/FeedbackBanner";

const ProfilePage: React.FC = () => {

    const navigate = useNavigate();

    const { userLoggedIn, currentUser } = useAuth();

    const [uname, setUname] = useState<string | null | undefined>(currentUser?.displayName);
    const [isTyping, setIsTyping] = useState(false);
    const { setBannerMessage, bannerRef } = useFeedbackBanner();

    const onLoggOut = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (userLoggedIn) {
            await doSignOut();
            navigate('/', { replace: true });
        }
    }

    const handleGoBack = () => {
        navigate(-1); // Goes back one step in the history stack
    };

    const onTypingUname = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUname(e.target.value);
        setIsTyping(true);
    };

    const handleUpdateUserName = async (newName: string) => {
        try {
            if (currentUser) {
                await updateUserName(newName);
                setBannerMessage({ message: "Nom actualisé avec succès", type: "success" });

            } else {
                setBannerMessage({ message: "Utilisateur pas connecté", type: "failure" });
                // console.log("User not logged in")
            }
        } catch (error) {
            console.error("Error on Update name: ", error)
            setBannerMessage({ message: "Erreur lors de la mise à jour du nom, Réessayer", type: "failure" });
        }
    }

    const handleBlur = () => {
        setIsTyping(false);
    };

    const handleFocus = () => {
        if (!isTyping) {
            setIsTyping(true);
        }
    };

    const getUnameFromEmail = () => {
        const email = currentUser?.email;
        const splitEmail = email?.split("@");
        return splitEmail?.at(0);
    }


    return (
        <div className="profile_page-background">
            <div className="profile_page-content">
                <ErrorBanner ref={bannerRef} />
                <div className="profile_top">

                    <div onClick={handleGoBack} className="back_button">
                        <LuArrowLeft size={24} strokeWidth={3} />
                        <h2>Back</h2>
                    </div>
                    <img className="login-page__logo"
                        src="/images/logo_picto360.png" alt="Logo-picto360" />
                </div>

                <div className="profile_main_content">

                    <div className="profile_background">
                        <img src="/images/profile_background_image.png"
                            className="profile_background_image"
                            alt="background_picture" />
                    </div>

                    <div className="profile_context">
                        <div className="profile_context-top">
                            <img src={(currentUser?.photoURL === null) ? "https://picsum.photos/200/300" : currentUser?.photoURL}
                                alt="profile_pictute"
                                className="profile_picture" />
                            <div className="profile_context_top-content">
                                <div className="profile_info">
                                    <div className="user_name_container">
                                        <input
                                            type="text"
                                            value={uname || getUnameFromEmail()}
                                            onFocus={handleFocus}
                                            onKeyDown={(e) => e.key === "Enter" && handleBlur}
                                            onChange={onTypingUname}
                                            className={
                                                isTyping ?
                                                    "user_name_typing"
                                                    :
                                                    "user_name"
                                            }
                                        />
                                        {
                                            isTyping ?
                                                <div className="icons-name-change-container">
                                                    <LuCheck strokeWidth={3}
                                                        size={20}
                                                        onClick={() => {
                                                            if (uname && uname != undefined) {
                                                                handleUpdateUserName(uname)
                                                            };
                                                            setIsTyping(false)
                                                        }
                                                        }
                                                        className="icon-name-change"
                                                    />
                                                    <LuX strokeWidth={3}
                                                        size={20}
                                                        onClick={
                                                            () => {
                                                                setIsTyping(false);
                                                                setUname(currentUser?.displayName)
                                                            }
                                                        }
                                                        className="icon-name-change"
                                                    />
                                                </div>
                                                :
                                                <LuPenLine size={15}
                                                    strokeWidth={2.2}
                                                    className="icon-name-change"
                                                    onClick={() => setIsTyping(true)} />
                                        }
                                    </div>

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
                                        <FaArrowRightToBracket size={18} />
                                        <p>
                                            Déconnexion
                                        </p>
                                    </div>

                                </div>

                            </div>
                        </div>
                        <div className="context_options">
                            <div className="option_baniere" onClick={() => navigate("/dashboard/your-activities")}>
                                <LuGitFork size={20} strokeWidth={2.5} />
                                <p>
                                    Voir toutes vos activité
                                </p>
                            </div>

                            {/* <div className="option_baniere">
                                <Icon icon="dashicons:groups" width="22" height="22" />
                                <p> Voir touts vos groupes </p>
                            </div>        */}

                            <div className="option_baniere">
                                <LuImageDown size={20} strokeWidth={2.5} />
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
