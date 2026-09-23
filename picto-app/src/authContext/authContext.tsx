import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { auth } from "@/firebase/firebase";
import {  onAuthStateChanged, updateProfile, User } from "firebase/auth";
import { useFeedbackBanner } from "@/hooks/useFeedbackbanner";

interface AuthContextType {
  currentUser: User | null;
  userLoggedIn: boolean;
  loading: boolean;
  updateUserName: (newName: string) => Promise<void>;
  updateUserProfilePic: (newPicture: string | null) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider ({ children }: { children: ReactNode }){
    const [currentUser,setCurrentUser] = useState<User | null>(null);
    const [userLoggedIn,setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [, setProfileRevision] = useState(0);
    const  {setBannerMessage} = useFeedbackBanner()

    // Memoize the initializeUser function to prevent unnecessary re-renders
    const initializeUser = useCallback(async (user: User | null) => {
        if (user!=null) {
            setCurrentUser(user);
            setUserLoggedIn(true);
            await createUserInDatabase(user);
            setBannerMessage({message:"Connecté avec succès",type:"success"});
        } else {
            setCurrentUser(null);
            setUserLoggedIn(false);
        }
        // Set loading to false once the initial authentication state is determined
        setLoading(false);
    }, []); // No dependencies, as it only uses state setters    

    const createUserInDatabase = async (user:User|null) =>{
        try{
            if(!user) {
                setBannerMessage({message:"Le compte utilisateur n'a pas été créé.",type:"failure"});
                return;
            };

            const token = await user.getIdToken();
            
            await fetch(`${import.meta.env.VITE_BACKEND_URL}/users`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setBannerMessage({message:"Profile créé avec succès",type:"success"});

        }catch{
            setBannerMessage({message:"Erreur de connexion.",type:"failure"});
        }
    } 

    const updateUserInDatabase = async (updates: { displayName?: string; photoUrl?: string | null }) => {
        const user = auth?.currentUser;
        if (!user) {
            setBannerMessage({message:"Le compte utilisateur n'a pas été trouvé.",type:"failure"});
            throw new Error("No authenticated user");
        }

        const token = await user.getIdToken();
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updates),
        });

        if (!response.ok) {
            throw new Error("Failed to update user profile");
        }
    }

    const refreshCurrentUser = () => {
        if (!auth) {
            return;
        }
        setCurrentUser(auth.currentUser);
        setProfileRevision((revision) => revision + 1);
    }

    const updateUserName = async (newName : string) => {
        const user = auth?.currentUser;
        if(!user) {
            setBannerMessage({message:"Le compte utilisateur n'a pas été trouvé.",type:"failure"});
            throw new Error("No authenticated user");
        }

        await updateProfile(user, {displayName:newName});
        await updateUserInDatabase({displayName:newName});
        refreshCurrentUser();
    }

    const updateUserProfilePic = async (newPicture : string | null) => {
        const user = auth?.currentUser;
        if(!user) {
            setBannerMessage({message:"Le compte utilisateur n'a pas été trouvé.",type:"failure"});
            throw new Error("No authenticated user");
        }

        await updateProfile(user, {photoURL:newPicture});
        await updateUserInDatabase({photoUrl:newPicture});
        refreshCurrentUser();
    }    


    useEffect(()=>{
        // Firebase non configuré: mode local, aucune session à attendre.
        if (!auth) {
            setLoading(false);
            return;
        }

        const unsubscribe = onAuthStateChanged(auth,initializeUser);

        // Fail-safe: without a reachable Firebase backend the auth state may
        // never arrive; unblock rendering so the local (signed-out) features
        // stay usable. Real environments resolve in milliseconds.
        const authTimeout = setTimeout(() => {
            setLoading(false);
        }, 4000);

        return () => {
            clearTimeout(authTimeout);
            unsubscribe();
        }
    },[])

    

    const value:AuthContextType = {
        currentUser,
        userLoggedIn,
        loading,
        updateUserName,
        updateUserProfilePic,
    }

    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
