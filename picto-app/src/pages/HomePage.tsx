import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/authContext/authContext";
import StudioPage from "./EditorPage";

const HomePage = () => {
    const { userLoggedIn } = useAuth();

    if (userLoggedIn) {
        return <Navigate to="/dashboard" replace />;
    }

    return <StudioPage />;
};

export default React.memo(HomePage);
