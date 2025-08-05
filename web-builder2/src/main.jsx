import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { SaveProvider } from "@/contexts/SaveContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UndoProvider } from "@/contexts/UndoContext";
import { ProjectProvider } from "@/contexts/ProjectContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <SaveProvider>
        <UndoProvider>
            <ProjectProvider>   
                <React.StrictMode>
                    <App />
                    <ToastContainer />
                </React.StrictMode>
            </ProjectProvider>
        </UndoProvider>
    </SaveProvider>
);
