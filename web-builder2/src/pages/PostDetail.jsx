// src/pages/PostDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentProject = JSON.parse(localStorage.getItem("currentProject"));
    if (!currentProject) return;

    const allPosts = JSON.parse(localStorage.getItem("posts")) || {};
    const projectPosts = allPosts[currentProject.id] || [];

    const found = projectPosts.find((p) => p.id === id);
    setPost(found);
  }, [id]);

  if (!post) {
    return <div className="p-6 text-gray-500">Post not found.</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
      <div className="text-gray-700 whitespace-pre-line">{post.content}</div>

      <div className="mt-6 space-x-3">
        <button
          onClick={() => navigate(`/edit-post/${post.id}`)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={() => navigate("/manage-posts")}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          Back to Manage
        </button>
      </div>
    </div>
  );
}
