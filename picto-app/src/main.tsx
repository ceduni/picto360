import "./index.css";
import "./App.css";
import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom";
import { BannerProvider } from "./contexts/BannerContext";
import { AuthProvider, useAuth } from "./authContext/authContext";
import { ActivityProvider } from "./contexts/ActivityContext";
import HomePage from "./pages/HomePage";
import VisualisationPage from "./pages/VisualisationPage";
import StudioPage from "./pages/DashboardPages/StudioPage";
import HomePageSignedOutView from "./pages/HomePageSignedOutView";

const RequireAuth: React.FC = () => {
    const { userLoggedIn } = useAuth();
    return userLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

const adminRouteObjects = (() => {
    if (!__ENABLE_ADMIN__) return [];

    const ActivityCreationPage = lazy(() => import("./pages/DashboardPages/ActivityCreationPage"));
    const ActivitiesListPage  = lazy(() => import("./pages/DashboardPages/ActivitiesListPage"));
    const DashboardPage       = lazy(() => import("./pages/DashboardPages/DashboardPage"));

    return [
        {
            path: "/login",
            element: <Suspense fallback={null}> <HomePageSignedOutView view="auth" /></Suspense>,
        },
        {
            element: <RequireAuth />,
            children: [
                { path: "/dashboard",                    element: <Suspense fallback={null}><DashboardPage /></Suspense> },
                { path: "/dashboard/studio",             element: <StudioPage /> },
                { path: "/dashboard/your-activities",    element: <Suspense fallback={null}><ActivitiesListPage /></Suspense> },
                { path: "/dashboard/activity-editor/:id",element: <Suspense fallback={null}><ActivityCreationPage /></Suspense> },
                { path: "/dashboard/activity-creation",  element: <Suspense fallback={null}><ActivityCreationPage /></Suspense> },
            ],
        },
    ];
})();

const router = createBrowserRouter([
    { path: "/",              element: <HomePage /> },
    { path: "/view/:viewerId", element: <VisualisationPage /> },
    ...adminRouteObjects,
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BannerProvider>
            <AuthProvider>
                <ActivityProvider>
                    <RouterProvider router={router} />
                </ActivityProvider>
            </AuthProvider>
        </BannerProvider>
    </React.StrictMode>
);
