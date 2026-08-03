import { useAuth } from "@/authContext/authContext";
import { doSignOut } from "@/firebase/authentification";
import { useFeedbackBanner } from "@/hooks/useFeedbackbanner";
import { useActivity } from "@/contexts/ActivityContext";
import ErrorBanner from "@/components/FeedbackBanner";
import {
    ArrowRightOnRectangleIcon,
    CheckIcon,
    XMarkIcon,
    UserIcon,
    EnvelopeIcon,
    CalendarIcon,
    BoltIcon,
    UsersIcon,
} from "@heroicons/react/24/outline";

import{
    PencilIcon
} from "@heroicons/react/24/solid";

import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./css/DrawerStyle.css";
import "./css/ProfileDrawer.css";

interface ProfileDrawerProps {
    open: boolean;
    onClose: () => void;
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({ open, onClose }) => {
    const navigate = useNavigate();
    const { userLoggedIn, currentUser, updateUserName, updateUserProfilePic } = useAuth();
    const { userActivities } = useActivity();
    const [uname, setUname] = useState<string | null | undefined>(currentUser?.displayName);
    const [profilePic, setProfilePic] = useState<string>(currentUser?.photoURL ?? "");
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const { setBannerMessage, bannerRef } = useFeedbackBanner();

    useEffect(() => {
        setUname(currentUser?.displayName);
        setProfilePic(currentUser?.photoURL ?? "");
    }, [currentUser?.displayName, currentUser?.photoURL]);

    if (!open) return null;

    const onLogOut = async () => {
        if (userLoggedIn) {
            await doSignOut();
            navigate("/", { replace: true });
        }
    };

    const handleSave = async () => {
        if (!currentUser) return;

        const nextName = uname?.trim();
        const nextProfilePic = profilePic.trim() || null;
        const profileUpdates: Promise<void>[] = [];

        if (!nextName) {
            setBannerMessage({ message: "Le nom ne peut pas être vide", type: "failure" });
            return;
        }

        if (nextName !== (currentUser.displayName ?? "")) {
            profileUpdates.push(updateUserName(nextName));
        }

        if (nextProfilePic !== (currentUser.photoURL ?? null)) {
            profileUpdates.push(updateUserProfilePic(nextProfilePic));
        }

        try {
            setIsSaving(true);
            await Promise.all(profileUpdates);
            setUname(nextName);
            setProfilePic(nextProfilePic ?? "");
            setBannerMessage({ message: "Profil actualisé avec succès", type: "success" });
            setIsEditing(false);
        } catch {
            setBannerMessage({ message: "Erreur lors de la mise à jour", type: "failure" });
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        setUname(currentUser?.displayName);
        setProfilePic(currentUser?.photoURL ?? "");
        setIsEditing(false);
    };

    const getUnameFromEmail = () => currentUser?.email?.split("@")[0];

    const formatMemberSince = (creationTime?: string) => {
        if (!creationTime) return "—";
        return new Date(creationTime).toLocaleDateString("fr-FR", { year: "numeric", month: "long" });
    };

    return (
        <>
            <div className="pdrawer__backdrop" onClick={onClose} />

            <div className="pdrawer">
                {/* Header */}
                <div className="pdrawer__header">
                    <h2 className="pdrawer__title">Mon Profil</h2>
                    <button className="pdrawer__close" onClick={onClose} aria-label="Fermer">
                        <XMarkIcon width={18} height={18} />
                    </button>
                </div>

                {/* Body */}
                <div className="pdrawer__body">
                    <ErrorBanner ref={bannerRef} />

                    <div className="profile_card">
                        {/* Banner */}
                        <div className="profile_banner">
                            <img src="/images/profile_background_image.png" className="profile_banner__img" alt="" />
                        </div>

                        {/* Hero */}
                        <div className="profile_hero">
                            <img
                                src={profilePic || currentUser?.photoURL || "https://picsum.photos/200/300"}
                                alt="Photo de profil"
                                className="profile_avatar"
                            />
                            {isEditing ? (
                                <div className="profile_hero__edit-actions">
                                    <button className="button__primary" onClick={handleSave} disabled={isSaving}>
                                        <CheckIcon width={14} height={14} /> {isSaving ? "Enregistrement" : "Enregistrer"}
                                    </button>
                                    <button className="button__secondary" onClick={handleCancel} disabled={isSaving}>
                                        <XMarkIcon width={14} height={14} />
                                    </button>
                                </div>
                            ) : (
                                <button className="button__primary" onClick={() => setIsEditing(true)}>
                                    <PencilIcon width={14} height={14} /> Editer
                                </button>
                            )}
                        </div>

                        {/* Identity */}
                        <div className="profile_identity">
                            <div className="profile_name-badge-row">
                                <h2 className="profile_display-name">{uname || getUnameFromEmail()}</h2>
                                {currentUser?.emailVerified && (
                                    <span className="profile_verified-badge">
                                        <CheckBadgeIcon width={12} height={12} /> Profil vérifié
                                    </span>
                                )}
                            </div>
                            <p className="profile_member-since-line">
                                <CalendarIcon width={14} height={14} />
                                Membre depuis {formatMemberSince(currentUser?.metadata?.creationTime)}
                            </p>
                        </div>

                        {/* Profile details */}
                        <div className="profile_section">
                            <div className="profile_section__header">
                                <h3 className="profile_section__title">Détails du profil</h3>
                                {isEditing && <span className="profile_section__editing-hint">Mode édition</span>}
                            </div>
                            <div className="profile_fields-grid">
                                <div className="profile_field">
                                    <div className="profile_field__label-row">
                                        <UserIcon width={13} height={13} /><span>Nom complet</span>
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
                                        <span className="profile_field__value">{uname || getUnameFromEmail()}</span>
                                    )}
                                </div>

                                <div className="profile_field">
                                    <div className="profile_field__label-row">
                                        <EnvelopeIcon width={13} height={13} /><span>Email</span>
                                    </div>
                                    <div className="profile_field__value-row">
                                        <span className="profile_field__value">{currentUser?.email}</span>
                                        {currentUser?.emailVerified && (
                                            <span className="profile_badge profile_badge--green">
                                                <CheckBadgeIcon width={10} height={10} /> Email vérifié
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="profile_field">
                                    <div className="profile_field__label-row">
                                        <CalendarIcon width={13} height={13} /><span>Membre depuis</span>
                                    </div>
                                    <span className="profile_field__value">
                                        {formatMemberSince(currentUser?.metadata?.creationTime)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Metrics */}
                        <div className="profile_section profile_section--last">
                            <div className="profile_section__header">
                                <h3 className="profile_section__title">Métriques</h3>
                            </div>
                            <div className="profile_metrics">
                                <div className="profile_metric">
                                    <BoltIcon width={22} height={22} className="profile_metric__icon" />
                                    <span className="profile_metric__value">{userActivities?.length ?? 0}</span>
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
                            <button className="btn__outlined" onClick={onLogOut}>
                                <ArrowRightOnRectangleIcon width={15} height={15} /> Déconnexion
                            </button>
                            <button className="profile_danger-btn">
                                <Icon icon="fluent:delete-16-filled" width="15" height="15" /> Supprimer mon compte
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileDrawer;
