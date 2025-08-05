import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ManagePosts() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const currentProject = JSON.parse(localStorage.getItem("currentProject"));
        console.log(currentProject)
        if (!currentProject) {
            alert("Chưa chọn Project.");
            return;
        }

        const allPosts = JSON.parse(localStorage.getItem("posts")) || {};
        const projectPosts = allPosts[currentProject.id] || [];

        setPosts(projectPosts);
    }, []);

    const handleDelete = (id) => {
        const currentProject = JSON.parse(localStorage.getItem("currentProject"));
        const allPosts = JSON.parse(localStorage.getItem("posts")) || {};
        const projectId = currentProject?.id;

        const updatedPosts = posts.filter((p) => p.id !== id);
        allPosts[projectId] = updatedPosts;

        localStorage.setItem("posts", JSON.stringify(allPosts));
        setPosts(updatedPosts);
    };

    const handleEdit = (id) => {
        navigate(`/edit-post/${String(id)}`);
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Manage Posts</h2>
            {posts.length === 0 ? (
                <p className="text-gray-500">No posts found.</p>
            ) : (
                <table className="min-w-full border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="text-left px-4 py-2 border">Title</th>
                            <th className="text-left px-4 py-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post) => (
                            <tr key={post.id}>
                                <td className="border px-4 py-2">{post.title}</td>
                                <td className="border px-4 py-2 space-x-2"> 
                                    <button
                                        onClick={() => handleEdit(post.id)}
                                        className="text-blue-500 hover:underline"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(post.id)}
                                        className="text-red-500 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
