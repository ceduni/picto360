import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { auth } from "@/firebase/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

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
    const [currentUser,setCurrentUser] = useState(null);
    const [userLoggedIn,setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,initializeUser);
        return unsubscribe;
    },[])

    async function initializeUser (user) {
        if(user){
            setCurrentUser({ ...user });
            setUserLoggedIn(true)
        }else{
            setCurrentUser(null);
            setUserLoggedIn(false)
        }

        setLoading(false);
        
    }
    

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