import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, RouterProvider } from "react-router-dom";
// import { AuthProvider } from "./authContext/authContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <RouterProvider router= /> */}
    <BrowserRouter>
      {/* <AuthProvider> */}
          <App />
      {/* </AuthProvider> */}
    </BrowserRouter>
  </React.StrictMode>
);
