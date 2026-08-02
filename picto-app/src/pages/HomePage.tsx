import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/authContext/authContext";
import HomePageSignedOutView from "./HomePageSignedOutView";

const HomePage = () => {
    const { userLoggedIn } = useAuth();

    if (userLoggedIn) {
        return <Navigate to="/dashboard" replace />;
    }

    return <HomePageSignedOutView />;
};

export default React.memo(HomePage);
