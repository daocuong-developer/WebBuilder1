import React, { useEffect, useState, useCallback } from "react";
import { X, Pencil, Trash, Check, File, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getPages, createPage, updatePage, deletePage } from "@/api/pageApi";

// Nhận currentProject từ props
export default function PageManager({ currentProject,onPagesUpdate }) {
    // Thêm onClose prop
    const [pages, setPages] = useState([]);
    const [newPageName, setNewPageName] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editedName, setEditedName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    // const currentProject = JSON.parse(localStorage.getItem("currentProject")); // KHÔNG ĐỌC TỪ LOCAL STORAGE NỮA
    const currentProjectId = currentProject?.id; // Lấy ID từ prop currentProject

    const slugify = (name) =>
        name
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]/g, "");

    const fetchPages = useCallback(async () => {
        if (!currentProjectId) {
            setPages([]);
            return;
        }
        setLoading(true);
        setError(null);
        try {
            // Giả sử getPages có thể nhận projectId để lọc pages từ server
            const data = await getPages(currentProjectId); // TRUYỀN currentProjectId VÀO API
            setPages(data); // Nếu API đã lọc, không cần filter nữa
        } catch (err) {
            console.error(err);
            setError("Failed to load pages.");
        } finally {
            setLoading(false);
        }
    }, [currentProjectId]);

    useEffect(() => {
        fetchPages();
    }, [fetchPages]);

    const handleAddPage = async () => {
        if (!newPageName.trim() || !currentProjectId) return;
        const slug = slugify(newPageName);
        const newPage = {
            title: newPageName,
            slug,
            content: {},
            project: currentProjectId,
        };

        setLoading(true);
        try {
            const created = await createPage(newPage);
            setPages((prev) => [...prev, created]);
            setNewPageName("");
            if (onPagesUpdate) {
                await onPagesUpdate();
            }
        } catch {
            setError("Failed to create page.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await deletePage(id);
            setPages((prev) => prev.filter((p) => p.id !== id));
            if (onPagesUpdate) {
                await onPagesUpdate();
            }
        } catch {
            setError("Failed to delete page.");
        } finally {
            setLoading(false);
        }
    };

    const handleStartEdit = (page) => {
        setEditingId(page.id);
        setEditedName(page.title);
    };

    const handleConfirmEdit = async (id) => {
        if (!editedName.trim()) return;
        const updatedData = {
            title: editedName,
            slug: slugify(editedName),
        };

        setLoading(true);
        try {
            const updated = await updatePage(id, updatedData);
            setPages((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
            setEditingId(null);
            setEditedName("");
        } catch {
            setError("Failed to update page.");
        } finally {
            setLoading(false);
        }
    };

    const onClose = () => {
        // Đổi tên hàm để tránh trùng với prop onClose
        window.dispatchEvent(new CustomEvent("close-page-manager"));
    };

    const filteredPages = pages.filter((p) => p.project === currentProjectId);

    return (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/40">
            <div className="bg-white w-full max-w-4xl min-h-[500px] rounded-lg shadow-xl p-6 relative">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Page Manager</h2>
                    <button onClick={onClose}>
                        {" "}
                        <X size={20} />
                    </button>
                </div>

                {!currentProjectId && (
                    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
                        <p className="font-bold">No Project Selected</p>
                        <p>Please select a project first.</p>
                    </div>
                )}

                {loading && <div className="text-center text-blue-500 mb-4">Loading...</div>}
                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
                        <p className="font-bold">Error</p>
                        <p>{error}</p>
                    </div>
                )}

                <div className="flex gap-2 mb-4">
                    <input
                        value={newPageName}
                        onChange={(e) => setNewPageName(e.target.value)}
                        placeholder="New page name"
                        className="flex-1 p-2 border rounded"
                        disabled={!currentProjectId || loading}
                    />
                    <button
                        onClick={handleAddPage}
                        className={`px-4 py-2 text-white rounded ${
                            !currentProjectId || loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-black hover:bg-gray-800"
                        }`}
                        disabled={!currentProjectId || loading}
                    >
                        + Add Page
                    </button>
                </div>

                <table className="w-full text-sm border-t">
                    <thead>
                        <tr className="text-left text-gray-500 border-b">
                            <th className="py-2">Page Name</th>
                            <th>URL</th>
                            <th>Last Updated</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentProjectId && filteredPages.length > 0 ? (
                            filteredPages.map((page) => (
                                <tr key={page.id} className="border-b hover:bg-gray-50">
                                    <td className="py-2 flex items-center gap-2">
                                        {page.title?.toLowerCase() === "home" ? <Home size={16} /> : <File size={16} />}
                                        {editingId === page.id ? (
                                            <input
                                                value={editedName}
                                                onChange={(e) => setEditedName(e.target.value)}
                                                className="border rounded px-2 py-1 text-sm w-full"
                                                disabled={loading}
                                            />
                                        ) : (
                                            <span>{page.title}</span>
                                        )}
                                    </td>
                                    <td>{page.slug}</td>
                                    <td>{page.created_at ? new Date(page.created_at).toLocaleDateString() : "N/A"}</td>
                                    <td className="flex gap-2 py-2 items-center">
                                        <button
                                            onClick={() => {
                                                navigate(`/edit-page/${page.id}`);
                                                onClose(); // Đóng PageManager sau khi navigate
                                            }}
                                            className="p-1 hover:bg-blue-100 rounded text-blue-600"
                                            title="Edit Page Content"
                                            disabled={loading}
                                        >
                                            Edit
                                        </button>

                                        {editingId === page.id ? (
                                            <button
                                                onClick={() => handleConfirmEdit(page.id)}
                                                className="p-1 hover:bg-green-100 rounded text-green-600"
                                                title="Save"
                                                disabled={loading}
                                            >
                                                <Check size={16} />
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleStartEdit(page)}
                                                className="p-1 hover:bg-gray-100 rounded"
                                                title="Rename"
                                                disabled={loading}
                                            >
                                                <Pencil size={16} />
                                            </button>
                                        )}

                                        <button
                                            onClick={() => handleDelete(page.id)}
                                            className="p-1 hover:bg-gray-100 rounded text-red-600"
                                            title="Delete"
                                            disabled={loading}
                                        >
                                            <Trash size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="text-center py-4 text-gray-500">
                                    {currentProjectId
                                        ? "No pages found for this project. Add a new page!"
                                        : "Select a project to view pages."}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
