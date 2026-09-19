import { useCallback, useState } from "react";
import { useAuth } from "@/authContext/authContext";

export interface UserSearchResult {
    uid: string;
    displayName?: string;
    email: string;
    photoUrl?: string;
}

export function useUserSearch() {
    const { currentUser } = useAuth();
    const [results, setResults] = useState<UserSearchResult[]>([]);
    const [loading, setLoading] = useState(false);

    const getToken = async () => {
        if (!currentUser) throw new Error("Not authenticated");
        return currentUser.getIdToken();
    };

    const search = useCallback(async (q: string) => {
        if (!currentUser || q.length < 2) { setResults([]); return; }
        setLoading(true);
        try {
            const token = await getToken();
            const res = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/users/search?q=${encodeURIComponent(q)}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (res.ok) setResults(await res.json());
            else setResults([]);
        } catch {
            setResults([]);
        } finally {
            setLoading(false);
        }
    }, [currentUser]);

    const getByUid = useCallback(async (uid: string): Promise<UserSearchResult | null> => {
        if (!currentUser) return null;
        try {
            const token = await getToken();
            const res = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/users/by-uid/${encodeURIComponent(uid)}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (res.ok) return await res.json();
            return null;
        } catch {
            return null;
        }
    }, [currentUser]);

    return { search, getByUid, results, loading };
}
