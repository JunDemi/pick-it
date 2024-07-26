import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthProvider from "./context/AuthContext";
import PopupProvider from "./context/PopupContext";
import { Provider } from "react-redux";
import store from "./store/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <AuthProvider>
      <PopupProvider>
        <App />
      </PopupProvider>
    </AuthProvider>
  </Provider>
);
