// hooks/useFetchActivities.ts
import { useEffect, useState } from "react";
import { getIdToken } from "firebase/auth";
import { useAuth } from "@/authContext/authContext";


interface FetchedActivity {
  _id: string;
  title: string;
  description?: string;
  createdBy: {
    _id: string;
    firebaseUid: string;
    email: string;
    displayName?: string;
    photoUrl?: string;
  };
  teams: {
    _id: string;
    teamId: string;
    teamName: string;
    supervisorId: string;
    participantsList: {
      participantId: string;
      name: string;
      joinLink: string;
    }[];
  }[];
  ownership: "creator" | "supervisor";
  totalParticipants: number;
  createdAt: string;
}

export function useFetchActivities() {
  const { currentUser } = useAuth();
  const [userActivities, setActivities] = useState<FetchedActivity[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [getActivitiesError,setGetActivitiesError] = useState <string|null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      if (!currentUser) return;

      try {
        const token = await currentUser.getIdToken();
        const response = await fetch("http://localhost:5000/activities", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setActivities(data);
      } catch (error:any) {
        setGetActivitiesError(error);
        // console.error("Failed to fetch activities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [currentUser]);

  return { userActivities, loading, getActivitiesError };
}
