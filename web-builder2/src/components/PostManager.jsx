// // PostManager.jsx
// import React, { useState, useEffect } from "react";
// import { X, Plus, Search } from "lucide-react";
// import CreatePostModal from "./CreatePostModal";

// const dummyPosts = [
//     {
//         id: "1",
//         title: "Welcome Post",
//         category: "General",
//         tags: ["intro", "start"],
//         updatedAt: new Date(),
//     },
//     {
//         id: "2",
//         title: "Chào em nha",
//         category: "Blog",
//         tags: ["life"],
//         updatedAt: new Date(),
//     },
// ];

// const formatDate = (date) => new Date(date).toLocaleDateString();

// const PostManager = ({ onClose }) => {
//     const [posts, setPosts] = useState([]);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [showCreateModal, setShowCreateModal] = useState(false);

//     useEffect(() => {
//         setPosts(dummyPosts);
//     }, []);

//     const filteredPosts = posts.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()));

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//             <div className="bg-white rounded-xl shadow-xl w-[90%] max-w-5xl pt-12 pb-6 px-6 relative min-h-[400px]">
//                 {/* Close Button */}
//                 <button className="absolute top-2 right-4 text-gray-500 hover:text-black" onClick={onClose}>
//                     <X />
//                 </button>

//                 {/* Header */}
//                 <div className="flex justify-between items-center mb-4">
//                     <h2 className="text-2xl font-bold">Post Manager</h2>
//                     <button
//                         className="bg-black text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-800 transition"
//                         onClick={() => setShowCreateModal(true)}
//                     >
//                         <Plus size={16} /> New Post
//                     </button>
//                 </div>

//                 {/* Search */}
//                 <div className="mb-4 relative">
//                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//                     <input
//                         type="text"
//                         placeholder="Search posts..."
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                         className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
//                     />
//                 </div>

//                 {/* Table */}
//                 <div className="overflow-auto rounded-md border">
//                     <table className="min-w-full text-sm">
//                         <thead className="bg-gray-100 text-gray-600">
//                             <tr>
//                                 <th className="text-left px-4 py-3 font-semibold">Title</th>
//                                 <th className="text-left px-4 py-3 font-semibold">Category</th>
//                                 <th className="text-left px-4 py-3 font-semibold">Tags</th>
//                                 <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">Last Updated</th>
//                                 <th className="text-right px-4 py-3 font-semibold">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {filteredPosts.length === 0 ? (
//                                 <tr>
//                                     <td colSpan="5" className="text-center px-4 py-6 text-gray-500">
//                                         No posts found matching your search
//                                     </td>
//                                 </tr>
//                             ) : (
//                                 filteredPosts.map((post) => (
//                                     <tr key={post.id} className="hover:bg-gray-50 transition">
//                                         <td className="px-4 py-3">{post.title}</td>
//                                         <td className="px-4 py-3">{post.category}</td>
//                                         <td className="px-4 py-3 whitespace-nowrap">{post.tags?.join(", ")}</td>
//                                         <td className="px-4 py-3 whitespace-nowrap">{formatDate(post.updatedAt)}</td>
//                                         <td className="px-4 py-3 text-right">
//                                             <button className="inline-flex items-center gap-1 px-3 py-1 text-md text-blue-600 border border-blue-200 rounded-md hover:bg-blue-50 hover:text-blue-700 transition">
//                                                 <svg
//                                                     xmlns="http://www.w3.org/2000/svg"
//                                                     className="h-6 w-6"
//                                                     fill="none"
//                                                     viewBox="0 0 24 24"
//                                                     stroke="currentColor"
//                                                 >
//                                                     <path
//                                                         strokeLinecap="round"
//                                                         strokeLinejoin="round"
//                                                         strokeWidth={2}
//                                                         d="M15.232 5.232l3.536 3.536M9 13l6-6 3 3-6 6H9v-3z"
//                                                     />
//                                                 </svg>
//                                                 Edit
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))
//                             )}
//                         </tbody>
//                     </table>
//                 </div>

//                 {/* Modal */}
//                 {showCreateModal && <CreatePostModal onClose={() => setShowCreateModal(false)} />}
//             </div>
//         </div>
//     );
// };

// export default PostManager;

// PostManager.jsx
import React, { useState, useEffect } from "react";
import { X, Plus, Search, Edit2, Trash2 } from "lucide-react";
import CreatePostModal from "./CreatePostModal";
import { toast } from "react-toastify";
import { getPostsByProject, createPost, updatePost, deletePost } from "@/api/postApi";

const formatDate = (date) => new Date(date).toLocaleDateString();

// PostManager giờ sẽ nhận currentProject (hoặc currentProjectId)
const PostManager = ({ onClose, currentProjectId }) => {
    const [posts, setPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Thêm trạng thái loading
    const [error, setError] = useState(null); // Thêm trạng thái lỗi
    const [editingPost, setEditingPost] = useState(null); // Trạng thái để chỉnh sửa bài viết

    // Hàm để tải bài viết
    const fetchPosts = async () => {
        if (!currentProjectId) {
            setPosts([]);
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const data = await getPostsByProject(currentProjectId);
            console.log(data)
            setPosts(data);
        } catch (err) {
            console.error("Lỗi khi tải bài viết:", err);
            setError("Không thể tải bài viết. Vui lòng thử lại.");
            toast.error("Không thể tải bài viết.");
        } finally {
            setIsLoading(false);
        }
    };

    // useEffect để tải bài viết khi component mount hoặc currentProjectId thay đổi
    useEffect(() => {
        fetchPosts();
    }, [currentProjectId]); // Dependency array: chạy lại khi currentProjectId thay đổi

    // Hàm xử lý khi một bài viết mới được tạo
    const handlePostCreated = (newPost) => {
        setPosts((prevPosts) => [...prevPosts, newPost]);
        setShowCreateModal(false);
        toast.success("Bài viết đã được tạo thành công!");
    };

    // Hàm xử lý khi một bài viết được cập nhật
    const handlePostUpdated = (updatedPost) => {
        setPosts((prevPosts) => prevPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post)));
        setEditingPost(null); // Đóng modal chỉnh sửa
        toast.success("Bài viết đã được cập nhật thành công!");
    };

    // Hàm xử lý xóa bài viết
    const handleDeletePost = async (postId) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa bài viết này?")) {
            try {
                await deletePost(postId);
                setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
                toast.success("Bài viết đã được xóa thành công!");
            } catch (err) {
                console.error("Lỗi khi xóa bài viết:", err);
                toast.error("Không thể xóa bài viết.");
            }
        }
    };

    const filteredPosts = posts.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-xl shadow-xl w-[90%] max-w-5xl pt-12 pb-6 px-6 relative min-h-[400px]">
                {/* Close Button */}
                <button className="absolute top-2 right-4 text-gray-500 hover:text-black" onClick={onClose}>
                    <X />
                </button>

                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Post Manager</h2>
                    <button
                        className="bg-black text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-800 transition"
                        onClick={() => {
                            setEditingPost(null); // Đảm bảo không ở chế độ chỉnh sửa khi mở modal tạo mới
                            setShowCreateModal(true);
                        }}
                    >
                        <Plus size={16} /> New Post
                    </button>
                </div>

                {/* Search */}
                <div className="mb-4 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search posts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </div>

                {/* Loading/Error State */}
                {isLoading && <div className="text-center py-8 text-gray-500">Đang tải bài viết...</div>}
                {error && <div className="text-center py-8 text-red-500">{error}</div>}

                {!isLoading && !error && (
                    <div className="overflow-auto rounded-md border">
                        <table className="min-w-full text-sm">
                            <thead className="bg-gray-100 text-gray-600">
                                <tr>
                                    <th className="text-left px-4 py-3 font-semibold">Title</th>
                                    <th className="text-left px-4 py-3 font-semibold">Category</th>
                                    <th className="text-left px-4 py-3 font-semibold">Tags</th>
                                    <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">
                                        Last Updated
                                    </th>
                                    <th className="text-right px-4 py-3 font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPosts.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center px-4 py-6 text-gray-500">
                                            {searchTerm
                                                ? "Không tìm thấy bài viết nào khớp với tìm kiếm của bạn."
                                                : "Chưa có bài viết nào trong dự án này. Hãy thêm một bài mới!"}
                                        </td>
                                    </tr>
                                ) : (
                                    filteredPosts.map((post) => (
                                        <tr key={post.id} className="hover:bg-gray-50 transition">
                                            <td className="px-4 py-3">{post.title}</td>
                                            <td className="px-4 py-3">{post.category || "N/A"}</td>{" "}
                                            {/* Có thể category là tùy chọn */}
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                {post.tags?.join(", ") || "N/A"}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                {formatDate(post.updated_at || post.updatedAt)}
                                            </td>{" "}
                                            {/* Sử dụng post.updated_at nếu API trả về như vậy */}
                                            <td className="px-4 py-3 text-right space-x-2">
                                                <button
                                                    className="inline-flex items-center gap-1 px-3 py-1 text-md text-blue-600 border border-blue-200 rounded-md hover:bg-blue-50 hover:text-blue-700 transition"
                                                    onClick={() => {
                                                        setEditingPost(post);
                                                        setShowCreateModal(true);
                                                    }}
                                                >
                                                    <Edit2 size={16} /> Edit
                                                </button>
                                                <button
                                                    className="inline-flex items-center gap-1 px-3 py-1 text-md text-red-600 border border-red-200 rounded-md hover:bg-red-50 hover:text-red-700 transition"
                                                    onClick={() => handleDeletePost(post.id)}
                                                >
                                                    <Trash2 size={16} /> Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Create/Edit Post Modal */}
                {showCreateModal && (
                    <CreatePostModal
                        onClose={() => setShowCreateModal(false)}
                        currentProjectId={currentProjectId}
                        onPostCreated={handlePostCreated}
                        onPostUpdated={handlePostUpdated} // Truyền handler cho cập nhật
                        postToEdit={editingPost} // Truyền bài viết cần chỉnh sửa
                    />
                )}
            </div>
        </div>
    );
};

export default PostManager;
