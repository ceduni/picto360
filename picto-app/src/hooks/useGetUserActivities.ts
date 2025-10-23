// hooks/useFetchActivities.ts
import { useEffect, useState } from "react";
// import { getIdToken } from "firebase/auth";
import { useAuth } from "@/authContext/authContext";
import { FetchedActivity } from "@/utils/Types";


export function useFetchActivities() {
  const { currentUser } = useAuth();
  const [userActivities, setActivities] = useState<FetchedActivity[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [getActivitiesError,setGetActivitiesError] = useState <string|null>(null);

  useEffect(() => {
    if (!currentUser ) return;

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
        setGetActivitiesError(null);
      } catch (error:any) {
        console.error(error);
        setActivities(null);
        setGetActivitiesError(error);
        console.error("Failed to fetch activities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [currentUser]);

  return { userActivities, loading, getActivitiesError };
}


export function useGetActivityById(activityId: string) {
    const [activity, setActivity] = useState<any>(null);
    const [activityLoading, setActivityLoading] = useState(true);
    const [activityError, setActivityError] = useState<string | null>(null);
    const { currentUser } = useAuth();


    useEffect ( () => {

        if (!currentUser || !activityId) return;
    const fetchActivity = async () =>{ 
        try {
            const token = await currentUser.getIdToken();
            const res = await fetch(`http://localhost:5000/activities/${activityId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || "Failed to fetch activity");
            }

            const data = await res.json();
            // return data;
            setActivity(data);
        } catch (err: any) {
            setActivityError(err.message);
        } finally {
            setActivityLoading(false);
        }
    }
    fetchActivity();
    },[activityId]);

    return { activity, activityLoading, activityError };
}
