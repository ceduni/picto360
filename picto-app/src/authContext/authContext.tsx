import React, { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { auth } from "@/firebase/firebase";
import { getRedirectResult, onAuthStateChanged, User } from "firebase/auth";
import { useNavigate } from "react-router-dom";

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

    const navigate = useNavigate();

    // Memoize the initializeUser function to prevent unnecessary re-renders
    const initializeUser = useCallback(async (user: User | null) => {
        if (user!=null) {
            setCurrentUser(user);
            setUserLoggedIn(true);
            await createUserInDatabase(user);
            console.log("onAuthStateChanged: User is logged in:", user.uid);
        } else {
            setCurrentUser(null);
            setUserLoggedIn(false);
            console.log("onAuthStateChanged: User is logged out.");
        }
        // Set loading to false once the initial authentication state is determined
        setLoading(false);
    }, []); // No dependencies, as it only uses state setters    

    const createUserInDatabase = async (user:User|null) =>{
        try{
            if(!user) {
                console.log("User not found")
                return;
            };
            console.log("Phase 1 db")
            const token = await user.getIdToken();
            
            const response = await fetch("http://localhost:5000/users", {
                method: "POST",
                headers: {
                    // "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log("User logged in database", response)
            // return response;
        }catch(error:any){
            console.log(error);
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