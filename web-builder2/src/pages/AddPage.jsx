// src/pages/AddPost.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddPost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPost = {
            id: Date.now().toString(), // dùng toString() để đảm bảo là string
            title,
            content,
        };
        const stored = JSON.parse(localStorage.getItem("posts")) || [];
        localStorage.setItem("posts", JSON.stringify([...stored, newPost]));
        navigate("/manage-posts");
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Add New Post</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Content</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full border rounded px-3 py-2 h-40"
                        required
                    />
                </div>
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                    Create Post
                </button>
            </form>
        </div>
    );
}
