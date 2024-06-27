import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import DataDictionary from "./pages/DataDictionary.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/afmc-dashboard",
    element: <App />
  },
  {
    path: "/afmc-dashboard/data-dictionary",
    element: <DataDictionary />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
