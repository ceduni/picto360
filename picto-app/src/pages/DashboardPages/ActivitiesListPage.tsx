import React, { useMemo } from "react";
import UseAnimations from "react-useanimations";
import loading2 from "react-useanimations/lib/loading2";
import {
    PencilSquareIcon,
    TrashIcon,
    UserIcon,
    UsersIcon,
    PlusIcon,
    MagnifyingGlassIcon,
    FunnelIcon,
    Squares2X2Icon,
    QueueListIcon,
} from "@heroicons/react/24/outline";

import {
    BoltIcon,
    DocumentIcon,
    ClipboardDocumentListIcon,
    UserGroupIcon,    
} from "@heroicons/react/24/solid";


import DashboardLayout from "./layout/DashboardLayout";
import { useActivity } from "@/contexts/ActivityContext";
import { useAuth } from "@/authContext/authContext";
import { useNavigate } from "react-router-dom";
import { FetchedActivity } from "@/utils/Types";
import "./css/ActivitiesListPage.css";

// ── Helpers ──────────────────────────────────────────────────────────────────

function getGreeting() {
    const h = new Date().getHours();
    if (h < 12) return "Bonjour";
    if (h < 18) return "Bonne après-midi";
    return "Bonsoir";
}

function formatDate() {
    return new Date().toLocaleDateString("fr-FR", {
        weekday: "long", day: "numeric", month: "long", year: "numeric",
    });
}

function capitalize(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

function initials(name?: string, email?: string) {
    if (name) return name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase();
    return (email?.[0] ?? "?").toUpperCase();
}

const STATUS_MAP: Record<string, { label: string; cls: string }> = {
    DRAFT:     { label: "Brouillon", cls: "alpage__status--draft" },
    PUBLISHED: { label: "Publié",    cls: "alpage__status--published" },
    ARCHIVED:  { label: "Archivé",   cls: "alpage__status--archived" },
};

// ── Stat card ────────────────────────────────────────────────────────────────

type BadgeColor = "green" | "accent" | "slate" | "amber";

function StatCard({ label, value, badge, badgeColor, subtitle, icon }: {
    label: string; value: number; badge: string; badgeColor: BadgeColor;
    subtitle: string; icon: React.ReactNode;
}) {
    return (
        <div className="alpage__stat">
            <div className="alpage__stat-top">
                <p className="alpage__stat-label">{label}</p>
                <span className={`alpage__stat-icon-box alpage__stat-icon-box--${badgeColor} `}>
                    {icon}
                </span>
            </div>
            <div className="alpage__stat-main">
                <span className="alpage__stat-value">{value.toLocaleString("fr-FR")}</span>
                <span className="alpage__stat-dot"/>
                <span className={`alpage__stat-badge alpage__stat-badge--${badgeColor}`}>{badge}</span>
            </div>
        </div>
    );
}

// ── ActivityRow ───────────────────────────────────────────────────────────────

interface RowProps {
    activity: FetchedActivity;
    onEdit: () => void;
    onDelete: () => void;
}

const ActivityRow: React.FC<RowProps> = ({ activity, onEdit, onDelete }) => {
    const teamCount = activity.teams?.length ?? 0;
    const status = STATUS_MAP[activity.status] ?? { label: activity.status, cls: "alpage__status--draft" };
    const creator = activity.createdBy;
    const dateStr = new Date(activity.createdAt).toLocaleDateString("fr-FR", {
        day: "numeric", month: "short", year: "numeric",
    });

    return (
        <tr className="alpage__row">
            {/* Activity name + meta counts */}
            <td>
                <div className="alpage__cell-name">
                <span className="alpage__row-title">{activity.title}</span>
                <div className="alpage__row-meta">
                    <span className="alpage__row-meta-item">
                        <UserIcon width={11} height={11} />
                        {activity.totalParticipants}
                    </span>
                    {teamCount > 0 && (
                        <span className="alpage__row-meta-item">
                            <UsersIcon width={11} height={11} />
                            {teamCount}
                        </span>
                    )}
                </div>
                </div>
            </td>

            {/* Date */}
            <td className="alpage__cell-muted">{dateStr}</td>

            {/* Creator */}
            <td>
                <div className="alpage__creator">
                    {creator.photoUrl
                        ? <img src={creator.photoUrl} className="alpage__creator-avatar" alt="" />
                        : <span className="alpage__creator-avatar">{initials(creator.displayName, creator.email)}</span>
                    }
                    <span className="alpage__creator-name">
                        {creator.displayName ?? creator.email}
                    </span>
                </div>
            </td>

            {/* Status */}
            <td>
                <span className={`alpage__status ${status.cls}`}>{status.label}</span>
            </td>

            {/* Actions */}
            <td>
                <div className="alpage__actions">
                    <button className="btn__outlined alpage__btn-edit" onClick={onEdit} title="Modifier">
                        <PencilSquareIcon width={14} height={14} />
                        Modifier
                    </button>
                    <button className="alpage__btn-delete" onClick={onDelete} title="Supprimer">
                        <TrashIcon width={14} height={14} />
                    </button>
                </div>
            </td>
        </tr>
    );
};

// ── Page ─────────────────────────────────────────────────────────────────────

const ActivitiesListPage: React.FC = () => {
    const { userActivities, loading, error } = useActivity();
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const firstName = currentUser?.displayName?.split(" ")[0] ?? "";

    // Future: apply search/filter transformations here before rendering
    const displayedActivities = useMemo<FetchedActivity[]>(() => {
        return userActivities ?? [];
    }, [userActivities]);

    const stats = useMemo(() => {
        const total        = displayedActivities.length;
        const published    = displayedActivities.filter(a => a.status === "PUBLISHED").length;
        const drafts       = displayedActivities.filter(a => a.status === "DRAFT").length;
        const participants = displayedActivities.reduce((s, a) => s + a.totalParticipants, 0);
        const pctPublished = total > 0 ? Math.round((published / total) * 100) : 0;
        const pctDrafts    = total > 0 ? Math.round((drafts    / total) * 100) : 0;
        return { total, published, drafts, participants, pctPublished, pctDrafts };
    }, [displayedActivities]);

    const goToActivity = (id: string) => navigate(`/dashboard/activity-editor/${id}`);
    const goToCreate   = () => navigate("/dashboard/activity-creation");

    const handleDelete = (_id: string) => {
        // TODO: call DELETE /activities/:id then refresh()
        console.warn("Delete not yet implemented for", _id);
    };

    return (
        <DashboardLayout title="">
            {loading ? (
                <div className="alpage__loading">
                    <UseAnimations animation={loading2} size={72} fillColor="var(--accent)" />
                    <p className="t-label" style={{ color: "var(--accent)" }}>Chargement de vos activités…</p>
                </div>
            ) : (
                <div className="alpage">
                    {/* ── Hero ── */}
                    <div className="alpage__topbar">
                        <div>
                            <h1 className="alpage__greeting">
                                {getGreeting()}{firstName ? `, ${firstName}` : ""} !
                            </h1>
                            <p className="alpage__date">{capitalize(formatDate())}</p>
                        </div>
                        <button className="button__primary alpage_new_activity_btn" onClick={goToCreate}>
                            <PlusIcon width={16} height={16} strokeWidth={2}/>
                            Nouvelle activité
                        </button>
                    </div>

                    {/* ── Analytics ── */}
                    <div className="alpage__stats">
                        <StatCard
                            label="Total activités"
                            value={stats.total}
                            badge="toutes catégories"
                            badgeColor="accent"
                            subtitle="activités créées"
                            icon={<ClipboardDocumentListIcon width={16} height={16} />}
                        />
                        <StatCard
                            label="Participants"
                            value={stats.participants}
                            badge="au total"
                            badgeColor="accent"
                            subtitle="toutes activités confondues"
                            icon={<UserGroupIcon width={16} height={16} />}
                        />
                        <StatCard
                            label="Activités publiées"
                            value={stats.published}
                            badge={`${stats.pctPublished}% du total`}
                            badgeColor="green"
                            subtitle="disponibles aux participants"
                            icon={<BoltIcon width={16} height={16} />}
                        />
                        <StatCard
                            label="Brouillons"
                            value={stats.drafts}
                            badge={`${stats.pctDrafts}% du total`}
                            badgeColor="slate"
                            subtitle="en cours de création"
                            icon={<DocumentIcon width={16} height={16} />}
                        />
                    </div>

                    {/*-- Activity List Header --*/}
                    <div className="alpage__table-header">
                        <div className="modal__section_horizontal">
                            <BoltIcon width={16} height={16} className="alpage__table-header-icon"/>
                            <p className="t-card-heading">Liste d'activités</p>
                        </div>
                        <div className="modal__section_horizontal">
                            <div className="modal__section_horizontal modal__input alpage_seach_field">
                                <MagnifyingGlassIcon width={25} height={25}/>
                                <input
                                    type="text"
                                    placeholder="Cherchez ici ..."
                                    className="t-input alpage_seach_field-input"
                                />
                            </div>
                            <div className="icon-button__secondary alpage_button-filter">
                                <FunnelIcon width={20} height={20} strokeWidth={2}/>
                                <p className="t-label">Filtre</p>
                            </div>
                            <div className="alpage_button-toggle">
                                <div className="alpage_button-toggle-active">
                                    <QueueListIcon width={20} height={20} strokeWidth={2}/>
                                </div>     
                                <div className="alpage_button-toggle-inactive">
                                    <Squares2X2Icon width={20} height={20} strokeWidth={2}/>
                                </div>                                                           
                            </div>
                        </div>
                    </div>

                    {/* ── Table card ── */}
                    <div className="alpage__table-wrap">

                        {/* Filter slot — wire up search/filter bar here */}

                        {error || displayedActivities.length === 0 ? (
                            <div className="alpage__empty">
                                <p className="t-label" style={{ color: "var(--blue-slate)" }}>
                                    {error ? "Impossible de charger les activités." : "Aucune activité trouvée."}
                                </p>
                            </div>
                        ) : (
                            <table className="alpage__table">
                                <thead>
                                    <tr>
                                        <th>Activité</th>
                                        <th>Créé le</th>
                                        <th>Créateur</th>
                                        <th>Statut</th>
                                        <th />
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayedActivities.map(a => (
                                        <ActivityRow
                                            key={a._id}
                                            activity={a}
                                            onEdit={() => goToActivity(a._id)}
                                            onDelete={() => handleDelete(a._id)}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
};

export default React.memo(ActivitiesListPage);
