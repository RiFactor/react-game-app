import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GameDetailPage from "./pages/GameDetailPage.tsx";
import NoPageFound from "./pages/NoPageFound.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Layout */}
        <Route path="/" element={<App />} />
        {/* <Route index element={<App />} /> */}
        {/* capitalisation matters! */}
        <Route path="/:gameId" element={<GameDetailPage />} />
        <Route path="*" element={<NoPageFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
