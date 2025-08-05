import React from "react";

export default function PreviewLayout({ children }) {
    return <div style={{ minHeight: "100vh", width: "100vw", overflowX: "hidden" }}>{children}</div>;
}