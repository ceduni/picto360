import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import {
    XMarkIcon, PlusIcon, ChevronDownIcon, TrashIcon,
    ArrowDownTrayIcon, UsersIcon, UserIcon,
} from "@heroicons/react/24/outline";
import { v4 as uuidv4 } from "uuid";
import "../css/DrawerStyle.css";
import "../css/EditTeamListDrawer.css";
import { ActivityIstance, ParticipantData, TeamInstance } from "@/utils/Types";
import { handleParticipantNameChange, handleDeleteParticipant } from "@/utils/ActivityCreactionUtils";
import ParticipantCard from "../DashboardPages/layout/ParticipantCard";
import IOSSwitch from "../PagesUiComponents/IOSSwitch";
import { useActivity } from "@/contexts/ActivityContext";
import { useUserSearch, UserSearchResult } from "@/hooks/useUserSearch";

interface Props {
    open: boolean;
    onClose: () => void;
    formValues: ActivityIstance;
    setFormValues: React.Dispatch<React.SetStateAction<ActivityIstance>>;
    initialTeamIdx?: number;
}

type ExpandedKey = `c-${number}` | `i-${number}`;

function addParticipants(team: TeamInstance, count: number): TeamInstance {
    if (count <= 0) return team;
    const existing = team.participantsNames;
    const entries: ParticipantData[] = Array.from({ length: count }, (_, i) => ({
        id: uuidv4(),
        name: `Participant ${existing.length + i + 1}`,
    }));
    return { ...team, participantsNames: [...existing, ...entries] };
}

// ── Supervisor search picker ─────────────────────────────────────────────────

function SupervisorPicker({ value, onChange }: { value: string; onChange: (uid: string) => void }) {
    const { search, getByUid, results, loading } = useUserSearch();
    const [query, setQuery] = useState("");
    const [resolvedName, setResolvedName] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Resolve display name for an already-assigned supervisor
    useEffect(() => {
        if (!value) { setResolvedName(null); return; }
        getByUid(value).then(u => setResolvedName(u ? (u.displayName || u.email) : value));
    }, [value, getByUid]);

    // Debounced search
    useEffect(() => {
        const t = setTimeout(() => { if (query.length >= 2) search(query); }, 300);
        return () => clearTimeout(t);
    }, [query, search]);

    // Close on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node))
                setIsOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const select = (u: UserSearchResult) => {
        onChange(u.uid);
        setResolvedName(u.displayName || u.email);
        setQuery("");
        setIsOpen(false);
    };

    const clear = () => {
        onChange("");
        setResolvedName(null);
        setQuery("");
        setIsOpen(true);
    };

    // Assigned state — show name + change button
    if (value && !isOpen) {
        return (
            <div className="etdrawer__supervisor-selected">
                <span className="etdrawer__supervisor-name">{resolvedName ?? "…"}</span>
                <button className="etdrawer__supervisor-change" onClick={clear} type="button">
                    Changer
                </button>
            </div>
        );
    }

    return (
        <div className="etdrawer__supervisor-picker" ref={containerRef}>
            <input
                className="etdrawer__input"
                value={query}
                onChange={e => { setQuery(e.target.value); setIsOpen(true); }}
                placeholder="Rechercher par nom ou email…"
                autoFocus
            />
            {isOpen && query.length >= 2 && (
                <div className="etdrawer__supervisor-dropdown">
                    {loading && <div className="etdrawer__supervisor-hint">Recherche…</div>}
                    {!loading && results.length === 0 && (
                        <div className="etdrawer__supervisor-hint">Aucun résultat</div>
                    )}
                    {results.map(u => (
                        <button
                            key={u.uid}
                            className="etdrawer__supervisor-result"
                            onMouseDown={() => select(u)}
                            type="button"
                        >
                            {u.photoUrl
                                ? <img src={u.photoUrl} className="etdrawer__supervisor-avatar" alt="" />
                                : <span className="etdrawer__supervisor-avatar etdrawer__supervisor-avatar--fallback">
                                    <UserIcon width={12} height={12} />
                                  </span>
                            }
                            <span className="etdrawer__supervisor-info">
                                <span className="etdrawer__supervisor-display">{u.displayName || "—"}</span>
                                <span className="etdrawer__supervisor-email">{u.email}</span>
                            </span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

// ── Editable team row (current activity) ────────────────────────────────────

function TeamRow({ team, isExpanded, onToggle, onUpdate, onDelete }: {
    team: TeamInstance;
    isExpanded: boolean;
    onToggle: () => void;
    onUpdate: (t: TeamInstance) => void;
    onDelete: () => void;
}) {

    const handleAdd = (count: number) => {
        onUpdate(addParticipants(team, count));
    };

    return (
        <div className={`etdrawer__row${isExpanded ? " etdrawer__row--open" : ""}`}>
            <button className="etdrawer__row-header" onClick={onToggle}>
                <span className="etdrawer__row-avatar">
                    <UsersIcon width={15} height={15} />
                </span>
                <span className="etdrawer__row-info">
                    <span className="etdrawer__row-name">{team.name || "Équipe sans nom"}</span>
                    <span className="etdrawer__row-meta">
                        {team.participantsNames.length} participant{team.participantsNames.length !== 1 ? "s" : ""}
                        {team.supervised && " · Supervisée"}
                    </span>
                </span>
                <ChevronDownIcon
                    className={`etdrawer__chevron${isExpanded ? " etdrawer__chevron--open" : ""}`}
                    width={15} height={15}
                />
            </button>

            <div className="etdrawer__expand">
                <div className="etdrawer__expand-inner">
                    <div className="etdrawer__expand-content">
                        {/* Name */}
                        <div className="etdrawer__field">
                            <label className="etdrawer__label">Nom de l'équipe</label>
                            <input
                                className="etdrawer__input"
                                value={team.name}
                                onChange={(e) => onUpdate({ ...team, name: e.target.value })}
                            />
                        </div>

                        {/* Participants */}
                        <div className="etdrawer__field">
                            <div className="etdrawer__field-header">
                                <label className="etdrawer__label">Participants</label>
                            </div>
                            {team.participantsNames.length > 0 && (
                                <div className="etdrawer__participant-list">
                                    {team.participantsNames.map((p) => (
                                        <ParticipantCard
                                            key={p.id}
                                            id={p.id}
                                            participantName={p.name}
                                            handleParticipantNameChange={(id, name) =>
                                                onUpdate({ ...team, participantsNames: handleParticipantNameChange(team.participantsNames, id, name) })
                                            }
                                            handleDeleteParticipant={(id) =>
                                                onUpdate({ ...team, participantsNames: handleDeleteParticipant(team.participantsNames, id) })
                                            }
                                        />
                                    ))}
                                </div>
                            )}
                            <div className="etdrawer__add-row">
                                <span className="etdrawer__count-badge">{team.participantsNames.length}</span>
                                <button className="etdrawer__btn etdrawer__btn--accent" onClick={() => handleAdd(1)}>
                                    <PlusIcon width={13} height={13} />
                                </button>
                            </div>
                        </div>

                        {/* Per-team supervisor toggle */}
                        <div className="etdrawer__field etdrawer__field--row">
                            <label className="etdrawer__label">Superviseur</label>
                            <IOSSwitch
                                checked={team.supervised}
                                onChange={(_, checked) => onUpdate({ ...team, supervised: checked, supervisor_id: checked ? team.supervisor_id : "" })}
                            />
                        </div>
                        {team.supervised && (
                            <div className="etdrawer__field">
                                <label className="etdrawer__label">Superviseur</label>
                                <SupervisorPicker
                                    value={team.supervisor_id ?? ""}
                                    onChange={(uid) => onUpdate({ ...team, supervisor_id: uid })}
                                />
                            </div>
                        )}

                        {/* Delete */}
                        <button className="etdrawer__delete-row" onClick={onDelete}>
                            <TrashIcon width={13} height={13} />
                            Supprimer l'équipe
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ── Read-only importable team row ────────────────────────────────────────────

function ImportableRow({ teamName, participants, activityTitle, isExpanded, onToggle, onImport }: {
    teamName: string;
    participants: { participantId: string; name: string }[];
    activityTitle: string;
    isExpanded: boolean;
    onToggle: () => void;
    onImport: () => void;
}) {
    return (
        <div className={`etdrawer__row etdrawer__row--importable${isExpanded ? " etdrawer__row--open" : ""}`}>
            <button className="etdrawer__row-header" onClick={onToggle}>
                <span className="etdrawer__row-avatar etdrawer__row-avatar--import">
                    <UsersIcon width={15} height={15} />
                </span>
                <span className="etdrawer__row-info">
                    <span className="etdrawer__row-name">{teamName || "Équipe sans nom"}</span>
                    <span className="etdrawer__row-meta">
                        {participants.length} participant{participants.length !== 1 ? "s" : ""} · {activityTitle}
                    </span>
                </span>
                <ChevronDownIcon
                    className={`etdrawer__chevron${isExpanded ? " etdrawer__chevron--open" : ""}`}
                    width={15} height={15}
                />
            </button>

            <div className="etdrawer__expand">
                <div className="etdrawer__expand-inner">
                    <div className="etdrawer__expand-content">
                        <div className="etdrawer__import-chips">
                            {participants.slice(0, 8).map((p) => (
                                <span key={p.participantId} className="etdrawer__import-chip">
                                    <UserIcon width={10} height={10} />
                                    {p.name || "Participant"}
                                </span>
                            ))}
                            {participants.length > 8 && (
                                <span className="etdrawer__import-chip etdrawer__import-chip--more">
                                    +{participants.length - 8} autres
                                </span>
                            )}
                        </div>
                        <button className="etdrawer__btn etdrawer__btn--import" onClick={onImport}>
                            <ArrowDownTrayIcon width={14} height={14} />
                            Importer dans cette activité
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ── Main drawer ──────────────────────────────────────────────────────────────

const EditTeamListDrawer: React.FC<Props> = ({ open, onClose, formValues, setFormValues, initialTeamIdx }) => {
    const [expandedKey, setExpandedKey] = useState<ExpandedKey | null>(
        initialTeamIdx != null ? `c-${initialTeamIdx}` : null
    );
    const { userActivities } = useActivity();

    const importableTeams = useMemo(() => {
        if (!userActivities) return [];
        return userActivities
            .filter(a => a._id !== formValues.id)
            .flatMap(a =>
                (a.teams ?? []).map(t => ({
                    teamId: t._id,
                    teamName: t.teamName,
                    supervisorId: t.supervisorId,
                    participants: t.participantsList,
                    activityTitle: a.title ?? "Activité",
                }))
            );
    }, [userActivities, formValues.id]);

    if (!open) return null;

    const toggle = (key: ExpandedKey) =>
        setExpandedKey(prev => prev === key ? null : key);

    const updateTeam = (idx: number, updated: TeamInstance) =>
        setFormValues(prev => {
            const list = [...prev.teamsList];
            list[idx] = updated;
            return { ...prev, teamsList: list };
        });

    const deleteTeam = (idx: number) => {
        setFormValues(prev => ({ ...prev, teamsList: prev.teamsList.filter((_, i) => i !== idx) }));
        setExpandedKey(null);
    };

    const importTeam = (t: typeof importableTeams[number]) => {
        const newTeam: TeamInstance = {
            id: uuidv4(),
            name: t.teamName,
            participantsNumber: t.participants.length,
            supervised: !!t.supervisorId,
            supervisor_id: t.supervisorId ?? "",
            participantsNames: t.participants.map(p => ({ id: p.participantId, name: p.name })),
        };
        setFormValues(prev => ({ ...prev, teamsList: [...prev.teamsList, newTeam] }));
    };

    return (
        <>
            <div className="pdrawer__backdrop" onClick={onClose} />

            <div className="pdrawer etdrawer">
                <div className="pdrawer__header">
                    <h2 className="pdrawer__title">Gérer les équipes</h2>
                    <button className="pdrawer__close" onClick={onClose} aria-label="Fermer">
                        <XMarkIcon width={18} height={18} />
                    </button>
                </div>

                <div className="pdrawer__body">
                    {/* Section 1 — Teams in this activity */}
                    <section className="etdrawer__section">
                        <div className="etdrawer__section-header">
                            <h3 className="etdrawer__section-title">
                                <UsersIcon width={13} height={13} />
                                Équipes de l'activité
                            </h3>
                            <span className="etdrawer__section-badge">{formValues.teamsList.length}</span>
                        </div>

                        {formValues.teamsList.length === 0 ? (
                            <p className="etdrawer__empty">Aucune équipe ajoutée.</p>
                        ) : (
                            <div className="etdrawer__list">
                                {formValues.teamsList.map((team, idx) => (
                                    <TeamRow
                                        key={team.id ?? idx}
                                        team={team}
                                        isExpanded={expandedKey === `c-${idx}`}
                                        onToggle={() => toggle(`c-${idx}`)}
                                        onUpdate={(updated) => updateTeam(idx, updated)}
                                        onDelete={() => deleteTeam(idx)}
                                    />
                                ))}
                            </div>
                        )}
                    </section>

                    {/* Section 2 — Importable teams */}
                    {importableTeams.length > 0 && (
                        <section className="etdrawer__section">
                            <div className="etdrawer__section-header">
                                <h3 className="etdrawer__section-title">
                                    <ArrowDownTrayIcon width={13} height={13} />
                                    Depuis d'autres activités
                                </h3>
                                <span className="etdrawer__section-badge etdrawer__section-badge--muted">
                                    {importableTeams.length}
                                </span>
                            </div>
                            <div className="etdrawer__list">
                                {importableTeams.map((t, idx) => (
                                    <ImportableRow
                                        key={t.teamId ?? idx}
                                        teamName={t.teamName}
                                        participants={t.participants}
                                        activityTitle={t.activityTitle}
                                        isExpanded={expandedKey === `i-${idx}`}
                                        onToggle={() => toggle(`i-${idx}`)}
                                        onImport={() => importTeam(t)}
                                    />
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </>
    );
};

export default React.memo(EditTeamListDrawer);
