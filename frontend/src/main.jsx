import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  BrowserRouter,
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Signupin from "./pages/Signupin.jsx";
import Registerform from "./components/Registerform.jsx";
import Loginform from "./components/Loginform.jsx";
import Home from "./pages/Home.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { useAuthContext } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
