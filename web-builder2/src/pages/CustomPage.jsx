import React, { useEffect, useState } from "react";

export default function CustomPage({ page }) {
    const [content, setContent] = useState("");

    useEffect(() => {
        const saved = localStorage.getItem(`pageContent:${page.id}`) || "";
        setContent(saved);
    }, [page.id]);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">{page.name}</h1>
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );
}
