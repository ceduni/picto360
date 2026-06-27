import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/authContext/authContext";
import EditorPage from "./EditorPage";

const HomePage = () => {
    const { userLoggedIn } = useAuth();

    if (userLoggedIn) {
        return <Navigate to="/dashboard" replace />;
    }

    return <EditorPage />;
};

export default React.memo(HomePage);
