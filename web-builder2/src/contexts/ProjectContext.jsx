import React, { createContext, useContext, useState, useEffect } from "react";
import { getCurrentProject, setCurrentProject } from "@/api/projectApi";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
    const [currentProject, setCurrentProjectState] = useState(null);

    useEffect(() => {
        // Lấy current project từ backend khi app load
        const fetchCurrent = async () => {
            try {
                const data = await getCurrentProject();
                setCurrentProjectState(data);
            } catch (err) {
                console.error("Lỗi khi fetch current project", err);
            }
        };

        fetchCurrent();
    }, []);

    const updateProject = async (project) => {
        try {
            await setCurrentProject(project.id);
            setCurrentProjectState(project);
        } catch (err) {
            console.error("Không thể set current project", err);
        }
    };

    return <ProjectContext.Provider value={{ currentProject, updateProject }}>{children}</ProjectContext.Provider>;
};

export const useProject = () => useContext(ProjectContext);
