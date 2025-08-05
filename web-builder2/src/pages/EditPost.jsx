// // src/pages/EditPost.jsx
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// export default function EditPost() {
//     const { id } = useParams();
//     const [title, setTitle] = useState("");
//     const [content, setContent] = useState("");
//     const navigate = useNavigate();

//     useEffect(() => {
//         const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
//         const post = storedPosts.find((p) => p.id === id);
//         if (post) {
//             setTitle(post.title);
//             setContent(post.content);
//         }
//     }, [id]);

//     const handleSave = () => {
//         const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
//         const updatedPosts = storedPosts.map((p) => (p.id === id ? { ...p, title, content } : p));
//         localStorage.setItem("posts", JSON.stringify(updatedPosts));
//         navigate(`/post/${id}`);
//     };

//     return (
//         <div className="p-6 max-w-xl mx-auto">
//             <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
//             <div className="mb-4">
//                 <label className="block mb-1 font-medium">Title</label>
//                 <input
//                     type="text"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     className="w-full border rounded px-3 py-2"
//                 />
//             </div>
//             <div className="mb-4">
//                 <label className="block mb-1 font-medium">Content</label>
//                 <textarea
//                     value={content}
//                     onChange={(e) => setContent(e.target.value)}
//                     className="w-full border rounded px-3 py-2 h-40"
//                 />
//             </div>
//             <button onClick={handleSave} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
//                 Save Changes
//             </button>
//         </div>
//     );
// }


// src/pages/EditPost.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditPost() {
  const { id } = useParams();
  const [post, setPost] = useState({ title: "", content: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const currentProject = JSON.parse(localStorage.getItem("currentProject"));
    const allPosts = JSON.parse(localStorage.getItem("posts")) || {};
    const projectId = currentProject?.id;
    const projectPosts = allPosts[projectId] || [];

    const found = projectPosts.find((p) => p.id === id);
    if (found) setPost(found);
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentProject = JSON.parse(localStorage.getItem("currentProject"));
    const allPosts = JSON.parse(localStorage.getItem("posts")) || {};
    const projectId = currentProject?.id;
    const projectPosts = allPosts[projectId] || [];

    const updated = projectPosts.map((p) =>
      p.id === id ? { ...p, title: post.title, content: post.content } : p
    );
    allPosts[projectId] = updated;

    localStorage.setItem("posts", JSON.stringify(allPosts));
    alert("Cập nhật bài viết thành công!");
    navigate("/manage-posts");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Chỉnh sửa bài viết</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <textarea
          value={post.content}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
          className="w-full p-2 border rounded h-40"
        ></textarea>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Cập nhật bài viết
        </button>
      </form>
    </div>
  );
}
