import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function EditPage() {
    const { id } = useParams();
    const [page, setPage] = useState(null);
    const [content, setContent] = useState("");

    useEffect(() => {
        const pages = JSON.parse(localStorage.getItem("pages")) || [];
        const found = pages.find((p) => p.id === id);
        setPage(found);

        const savedContent = localStorage.getItem(`pageContent:${id}`) || "";
        setContent(savedContent);
    }, [id]);

    const handleSave = () => {
        localStorage.setItem(`pageContent:${id}`, content);
        alert("Đã lưu nội dung trang!");
    };

    if (!page) return <div className="p-6">Không tìm thấy trang.</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Chỉnh sửa: {page.name}</h1>
            <textarea
                className="w-full h-64 p-2 border rounded"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <div className="mt-4">
                <button className="bg-black text-white px-4 py-2 rounded" onClick={handleSave}>
                    Lưu cec
                </button>
            </div>
        </div>
    );
}

