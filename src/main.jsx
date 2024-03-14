import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import AuthProvider from "./providers/AuthProvider.jsx";
import AvatarProvider from "./providers/AvatarProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <AvatarProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AvatarProvider>
    </AuthProvider>
  </React.StrictMode>
);
