import { createContext, useContext, useState } from "react";

const SaveContext = createContext();

export const SaveProvider = ({ children }) => {
    const [saveFn, setSaveFn] = useState(null);

    return <SaveContext.Provider value={{ saveFn, setSaveFn }}>{children}</SaveContext.Provider>;
};


export const useSave = () => {
    const context = useContext(SaveContext);
    if (!context) {
        throw new Error("useSave must be used within a SaveProvider");
    }
    return context;
};
