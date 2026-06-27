import { useAuth } from "@/authContext/authContext"
import "./css/ProfilePage.css"
import { doSignOut } from "@/firebase/authentification";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useState } from "react";
import {
    ArrowRightOnRectangleIcon,
    CheckIcon,
    XMarkIcon,
    PencilIcon,
    UserIcon,
    EnvelopeIcon,
    CalendarIcon,
    BoltIcon,
    UsersIcon,
} from "@heroicons/react/24/outline";
import {
    CheckBadgeIcon,
} from "@heroicons/react/24/solid";

import { updateUserName } from "@/firebase/userProfileUpdates";
import { useFeedbackBanner } from "@/hooks/useFeedbackbanner";
import { useFetchActivities } from "@/hooks/useGetUserActivities";
import ErrorBanner from "@/components/FeedbackBanner";
import DashboardLayout from "./DashboardPages/layout/DashboardLayout";

const ProfilePage: React.FC = () => {
    const navigate = useNavigate();
    const { userLoggedIn, currentUser } = useAuth();
    const { userActivities } = useFetchActivities();
    const [uname, setUname] = useState<string | null | undefined>(currentUser?.displayName);
    const [isEditing, setIsEditing] = useState(false);
    const { setBannerMessage, bannerRef } = useFeedbackBanner();

    const onLoggOut = async () => {
        if (userLoggedIn) {
            await doSignOut();
            navigate('/', { replace: true });
        }
    };

    const handleUpdateUserName = async (newName: string) => {
        try {
            if (currentUser) {
                await updateUserName(newName);
                setBannerMessage({ message: "Nom actualisé avec succès", type: "success" });
            } else {
                setBannerMessage({ message: "Utilisateur pas connecté", type: "failure" });
            }
        } catch (error) {
            console.error("Error on Update name: ", error);
            setBannerMessage({ message: "Erreur lors de la mise à jour du nom, Réessayer", type: "failure" });
        }
    };

    const handleSave = async () => {
        if (uname) await handleUpdateUserName(uname);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setUname(currentUser?.displayName);
        setIsEditing(false);
    };

    const getUnameFromEmail = () => currentUser?.email?.split("@")[0];

    const formatMemberSince = (creationTime?: string) => {
        if (!creationTime) return "—";
        return new Date(creationTime).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
        });
    };

    return (
        <DashboardLayout title="Mon Profil">
            <ErrorBanner ref={bannerRef} />
            <div className="profile_main_content">
                <div className="profile_card">

                    {/* Banner */}
                    <div className="profile_banner">
                        <img
                            src="/images/profile_background_image.png"
                            className="profile_banner__img"
                            alt=""
                        />
                    </div>

                    {/* Hero row: avatar (overlaps banner) + edit/save controls */}
                    <div className="profile_hero">
                        <img
                            src={currentUser?.photoURL ?? "https://picsum.photos/200/300"}
                            alt="Photo de profil"
                            className="profile_avatar"
                        />
                        {isEditing ? (
                            <div className="profile_hero__edit-actions">
                                <button className="profile_save-btn" onClick={handleSave}>
                                    <CheckIcon width={14} height={14} />
                                    Enregistrer
                                </button>
                                <button className="profile_cancel-btn" onClick={handleCancel}>
                                    <XMarkIcon width={14} height={14} />
                                </button>
                            </div>
                        ) : (
                            <button className="profile_edit-btn" onClick={() => setIsEditing(true)}>
                                <PencilIcon width={14} height={14} />
                                Modifier le profil
                            </button>
                        )}
                    </div>

                    {/* Identity: display name + verified badge + member since */}
                    <div className="profile_identity">
                        <div className="profile_name-badge-row">
                            <h2 className="profile_display-name">
                                {uname || getUnameFromEmail()}
                            </h2>
                            {currentUser?.emailVerified && (
                                <span className="profile_verified-badge">
                                    <CheckBadgeIcon width={12} height={12} />
                                    Profil vérifié
                                </span>
                            )}
                        </div>
                        <p className="profile_member-since-line">
                            <CalendarIcon width={14} height={14} />
                            Membre depuis {formatMemberSince(currentUser?.metadata?.creationTime)}
                        </p>
                    </div>

                    {/* Section 1: Profile details */}
                    <div className="profile_section">
                        <div className="profile_section__header">
                            <h3 className="profile_section__title">Détails du profil</h3>
                            {isEditing && (
                                <span className="profile_section__editing-hint">Mode édition</span>
                            )}
                        </div>
                        <div className="profile_fields-grid">

                            <div className="profile_field">
                                <div className="profile_field__label-row">
                                    <UserIcon width={13} height={13} />
                                    <span>Nom complet</span>
                                </div>
                                {isEditing ? (
                                    <input
                                        className="profile_field__input"
                                        value={uname ?? ""}
                                        onChange={(e) => setUname(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleSave()}
                                        autoFocus
                                    />
                                ) : (
                                    <span className="profile_field__value">
                                        {uname || getUnameFromEmail()}
                                    </span>
                                )}
                            </div>

                            <div className="profile_field">
                                <div className="profile_field__label-row">
                                    <EnvelopeIcon width={13} height={13} />
                                    <span>Email</span>
                                </div>
                                <div className="profile_field__value-row">
                                    <span className="profile_field__value">{currentUser?.email}</span>
                                    {currentUser?.emailVerified && (
                                        <span className="profile_badge profile_badge--green">
                                            <CheckBadgeIcon width={10} height={10} />
                                            Email vérifié
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="profile_field">
                                <div className="profile_field__label-row">
                                    <CalendarIcon width={13} height={13} />
                                    <span>Membre depuis</span>
                                </div>
                                <span className="profile_field__value">
                                    {formatMemberSince(currentUser?.metadata?.creationTime)}
                                </span>
                            </div>

                        </div>
                    </div>

                    {/* Section 2: Metrics */}
                    <div className="profile_section profile_section--last">
                        <div className="profile_section__header">
                            <h3 className="profile_section__title">Métriques</h3>
                        </div>
                        <div className="profile_metrics">
                            <div className="profile_metric">
                                <BoltIcon width={22} height={22} className="profile_metric__icon" />
                                <span className="profile_metric__value">
                                    {userActivities?.length ?? 0}
                                </span>
                                <span className="profile_metric__label">Activités créées</span>
                            </div>
                            <div className="profile_metric">
                                <UsersIcon width={22} height={22} className="profile_metric__icon" />
                                <span className="profile_metric__value">0</span>
                                <span className="profile_metric__label">Groupes</span>
                            </div>
                        </div>
                    </div>

                    {/* Danger zone */}
                    <div className="profile_danger">
                        <button className="profile_logout-btn" onClick={onLoggOut}>
                            <ArrowRightOnRectangleIcon width={15} height={15} />
                            Déconnexion
                        </button>
                        <button className="profile_danger-btn">
                            <Icon icon="fluent:delete-16-filled" width="15" height="15" />
                            Supprimer mon compte
                        </button>
                    </div>

                </div>
            </div>
        </DashboardLayout>
    );
};

export default ProfilePage;
