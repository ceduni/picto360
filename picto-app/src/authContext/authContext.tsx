import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { auth } from "@/firebase/firebase";
import {  onAuthStateChanged, User } from "firebase/auth";
import { useFeedbackBanner } from "@/hooks/useFeedbackbanner";

interface AuthContextType {
  currentUser: User | null;
  userLoggedIn: boolean;
  loading: boolean;
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
                setBannerMessage({message:"Le compte utilisateur n'a pas été trouvé.",type:"failure"});
                return;
            };

            const token = await user.getIdToken();
            
            await fetch("http://localhost:5000/users", {
                method: "POST",
                headers: {
                    // "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            // return response;
        }catch(error){
                console.error("Failed to update hotspot:", error);
            setBannerMessage({message:"Erreur de connexion.",type:"failure"});
        }
    } 


    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,initializeUser);
        return unsubscribe;
    },[])

    

    const value:AuthContextType = {
        currentUser,
        userLoggedIn,
        loading
    }

    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}