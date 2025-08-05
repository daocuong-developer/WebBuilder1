// src/pages/AddPost.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddPost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [pages, setPages] = useState([]);
    const [selectedPageId, setSelectedPageId] = useState("");
    const [currentProject, setCurrentProject] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const project = JSON.parse(localStorage.getItem("currentProject"));
        if (!project) {
            alert("Chưa chọn Project.");
            navigate("/"); // hoặc mở lại ProjectManager
            return;
        }

        setCurrentProject(project);

        const storedPages = JSON.parse(localStorage.getItem("pages")) || {};
        const projectPages = storedPages[`project_${project.id}`] || [];

        if (projectPages.length === 0) {
            alert("Chưa có Page nào trong Project này. Vui lòng tạo Page trước.");
            navigate("/add-page");
            return;
        }

        setPages(projectPages);
        setSelectedPageId(projectPages[0]?.id || "");
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedPageId) return alert("Chọn Page trước khi tạo bài viết.");

        const post = {
            id: Date.now().toString(),
            title,
            content,
            pageId: selectedPageId,
        };

        const storageKey = `posts_project_${currentProject.id}`;
        const existing = JSON.parse(localStorage.getItem(storageKey)) || [];
        const updated = [...existing, post];
        localStorage.setItem(storageKey, JSON.stringify(updated));

        setTitle("");
        setContent("");
        alert("Đã thêm bài viết!");
        navigate("/manage-posts");
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Thêm Bài Viết Mới</h2>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
                <div>
                    <label className="block mb-1 font-medium">Chọn Trang</label>
                    <select
                        value={selectedPageId}
                        onChange={(e) => setSelectedPageId(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                    >
                        {pages.map((page) => (
                            <option key={page.id} value={page.id}>
                                {page.title}
                            </option>
                        ))}
                    </select>
                </div>

                <input
                    type="text"
                    placeholder="Tiêu đề bài viết"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                />

                <textarea
                    placeholder="Nội dung"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full border px-3 py-2 rounded h-40"
                ></textarea>

                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                    Thêm Bài Viết
                </button>
            </form>
        </div>
    );
}
