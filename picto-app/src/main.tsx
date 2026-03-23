import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { BannerProvider } from "./contexts/BannerContext";
// import { AuthProvider } from "./authContext/authContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <RouterProvider router= /> */}
    <BrowserRouter>
      <BannerProvider>
        {/* <AuthProvider> */}
            <App />
        {/* </AuthProvider> */}
      </BannerProvider>
    </BrowserRouter>
  </React.StrictMode>
);
