import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
// import { ApiProvider } from "@reduxjs/toolkit/query/react";
// import { astrologersApi } from "./Redux/api.ts";
import { Provider } from "react-redux";
import { store } from "./Redux/Store.ts";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <ApiProvider api={astrologersApi}> */}
      <Provider store={store}>
        <App />
      </Provider>
      {/* </ApiProvider> */}
    </BrowserRouter>
  </React.StrictMode>
);
