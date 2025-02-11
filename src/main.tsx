import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GameDetailPage from "./pages/GameDetailPage.tsx";
import NoPageFound from "./pages/NoPageFound.tsx";
import { ChakraProvider, ColorModeScript, theme } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Routes>
          {/* Layout */}

          <Route path="/" element={<App />} />
          {/* <Route index element={<App />} /> */}
          {/* capitalisation matters! */}
          <Route path="/:gameId" element={<GameDetailPage />} />
          <Route path="*" element={<NoPageFound />} />
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
