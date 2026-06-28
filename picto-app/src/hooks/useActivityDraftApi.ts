import { useAuth } from "@/authContext/authContext";
import type { ActivityFull } from "@/utils/Types";

interface DraftTaskPayload {
    title: string;
    level: "EASY" | "MEDIUM" | "HARD";
}

interface DraftTeamPayload {
    _id?: string;
    name: string;
    participants: { id: string; name: string }[];
    supervised: boolean;
    supervisor_id?: string;
}

interface ConstraintPayload {
    constraint_type: string;
    constraint_value: Record<string, unknown>;
    is_enabled: boolean;
}

export interface UpdateDraftPayload {
    title?: string;
    description?: string;
    mode?: "SOLO" | "COLLABORATIVE" | "COMPETITIVE";
    tags?: string[];
    tasks?: DraftTaskPayload[];
    authoriseEdit?: boolean;
    constraints?: ConstraintPayload[];
    teamsList?: DraftTeamPayload[];
}

export function useActivityDraftApi() {
    const { currentUser } = useAuth();

    const getToken = async () => {
        if (!currentUser) throw new Error("Not authenticated");
        return currentUser.getIdToken();
    };

    const createDraft = async (title: string): Promise<string> => {
        const token = await getToken();
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/activities`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify({ title }),
        });
        if (!res.ok) throw new Error("Failed to create draft");
        const data = await res.json();
        return data._id as string;
    };

    const updateDraft = async (id: string, payload: UpdateDraftPayload): Promise<void> => {
        const token = await getToken();
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/activities/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to update draft");
    };

    const publishDraft = async (id: string): Promise<void> => {
        const token = await getToken();
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/activities/${id}/publish`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to publish activity");
    };

    const fetchActivity = async (id: string): Promise<ActivityFull> => {
        const token = await getToken();
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/activities/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch activity");
        return res.json() as Promise<ActivityFull>;
    };

    return { createDraft, updateDraft, publishDraft, fetchActivity };
}
