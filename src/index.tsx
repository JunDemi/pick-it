import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthProvider from "./context/AuthContext";
import PopupProvider from "./context/PopupContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <AuthProvider>
    <PopupProvider>
      <App />
    </PopupProvider>
  </AuthProvider>
);
