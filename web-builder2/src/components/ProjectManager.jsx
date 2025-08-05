import React, { useState, useEffect } from "react";
import { Plus, Upload, MoreHorizontal, X, Pencil, Copy, Trash2, Download, ArrowUpRight } from "lucide-react";
import ConfirmModal from "./ConfirmModal";
import { getProjects, createProject, deleteProject } from "@/api/projectApi";
import { useProject } from "@/contexts/ProjectContext";
import { toast } from "react-toastify";

export default function ProjectManager({ onClose, onProjectsUpdate }) {
    const [projects, setProjects] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [activeMenuId, setActiveMenuId] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [loading, setLoading] = useState(true);

    const { currentProject, updateProject } = useProject();
    const currentProjectId = currentProject?.id;

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const data = await getProjects();
            setProjects(data);
        } catch (err) {
            console.error("Không thể tải projects", err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async () => {
        if (!name.trim()) return;

        try {
            const newProject = await createProject({ name, description });
            const updated = [...projects, newProject];
            setProjects(updated);
            if (onProjectsUpdate) onProjectsUpdate(updated);
            setName("");
            setDescription("");
            setShowForm(false);
            toast.success("Project created successfully!");
        } catch (err) {
            console.error("Tạo project thất bại", err);
            toast.error("Failed to create project.");
        }
    };

    const handleDuplicate = async (project) => {
        try {
            const newProject = await createProject({
                name: `${project.name} Copy`,
                description: project.description,
            });
            const updated = [...projects, newProject];
            setProjects(updated);
            if (onProjectsUpdate) onProjectsUpdate(updated);
            setActiveMenuId(null);
        } catch (err) {
            console.error("Duplicate thất bại", err);
            alert("Không thể duplicate.");
        }
    };

    const handleDelete = (id) => {
        setDeleteId(id);
        setShowConfirm(true);
        setActiveMenuId(null);
    };

    const confirmDelete = async () => {
        try {
            await deleteProject(deleteId);
            const updated = projects.filter((p) => p.id !== deleteId);
            setProjects(updated);

            if (onProjectsUpdate) {
                onProjectsUpdate(updated, deleteId === currentProjectId ? null : currentProject);
            }

            setDeleteId(null);
            setShowConfirm(false);
        } catch (err) {
            console.error("Xóa thất bại", err);
            alert("Không thể xóa project.");
        }
    };

    const handleSetCurrent = async (id) => {
        const selected = projects.find((p) => p.id === id);
        if (!selected) return;

        await updateProject(selected);
        if (onProjectsUpdate) onProjectsUpdate(projects, selected);
        onClose();
    };

    const handleExport = (project) => {
        const blob = new Blob([JSON.stringify([project], null, 2)], {
            type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${project.name}.json`;
        a.click();
        URL.revokeObjectURL(url);
        setActiveMenuId(null);
    };

    const handleImport = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const imported = JSON.parse(e.target.result);
                if (Array.isArray(imported)) {
                    for (const item of imported) {
                        await createProject({ name: item.name, description: item.description });
                    }
                    await fetchProjects();
                    alert("Import thành công!");
                } else {
                    alert("File không hợp lệ.");
                }
            } catch (err) {
                alert("Lỗi khi đọc file JSON.");
            }
        };
        reader.readAsText(file);
    };

    const handleEdit = (project) => {
        setName(project.name);
        setDescription(project.description);
        setShowForm(true);
        setActiveMenuId(null);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white w-full max-w-4xl rounded-lg shadow-xl p-6 relative max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <div className="text-xl font-semibold">Project Manager</div>
                    <button
                        onClick={onClose}
                        className="flex items-center gap-2 px-4 py-2 rounded text-sm text-gray-500 hover:text-black"
                    >
                        <X size={16} />
                    </button>
                </div>

                <div className="flex justify-between items-center mb-4">
                    <button
                        onClick={() => {
                            setShowForm((prev) => !prev);
                            setName("");
                            setDescription("");
                        }}
                        className="px-4 py-2 border rounded bg-black text-white hover:bg-gray-800 flex items-center gap-2"
                    >
                        <Plus size={16} /> New Project
                    </button>

                    <label className="px-4 py-2 border rounded flex items-center gap-2 cursor-pointer hover:bg-gray-100">
                        <Upload size={16} /> Import Project
                        <input type="file" accept=".json" className="hidden" onChange={handleImport} />
                    </label>
                </div>

                {showForm && (
                    <div className="border rounded p-4 mb-6 bg-white space-y-2">
                        <input
                            className="w-full p-2 border rounded"
                            placeholder="Project name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <textarea
                            className="w-full p-2 border rounded"
                            placeholder="Project description (optional)"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => {
                                    setName("");
                                    setDescription("");
                                    setShowForm(false);
                                }}
                                className="px-4 py-2 border rounded"
                            >
                                Cancel
                            </button>
                            <button onClick={handleCreate} className="px-4 py-2 bg-black text-white rounded">
                                Create Project
                            </button>
                        </div>
                    </div>
                )}

                {loading ? (
                    <div className="text-center py-10 text-gray-500">Loading projects...</div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-4">
                        {projects.map((project) => (
                            <div key={project.id} className="border rounded shadow-sm">
                                <div className="bg-gray-100 text-center p-4 text-lg font-medium text-gray-600">
                                    {project.name}
                                </div>
                                <div className="p-4 text-sm space-y-2">
                                    <div className="font-medium">{project.name}</div>
                                    <div className="text-gray-500">{project.description || "No description"}</div>
                                    <div className="text-xs text-gray-400">
                                        {project.pages?.length || 0} pages • Created{" "}
                                        {new Date(project.created_at).toLocaleDateString()}
                                    </div>
                                    <div className="flex justify-between items-center mt-2">
                                        {project.id === currentProjectId ? (
                                            <span className="text-xs px-3 py-1 rounded-full bg-black text-white">
                                                Current
                                            </span>
                                        ) : (
                                            <button
                                                onClick={() => handleSetCurrent(project.id)}
                                                className="text-xs px-3 py-1 border rounded hover:bg-gray-100"
                                            >
                                                Current
                                            </button>
                                        )}
                                        <div className="text-gray-500 hover:text-black">
                                            <div className="relative">
                                                <button
                                                    onClick={() =>
                                                        setActiveMenuId(activeMenuId === project.id ? null : project.id)
                                                    }
                                                    className="text-gray-500 hover:text-black"
                                                >
                                                    <MoreHorizontal size={16} />
                                                </button>

                                                {activeMenuId === project.id && (
                                                    <div className="absolute right-[22px] top-0 bg-white border shadow-md rounded w-40 text-sm z-10">
                                                        <button
                                                            onClick={() => handleSetCurrent(project.id)}
                                                            className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                                                        >
                                                            <ArrowUpRight size={16} /> Open
                                                        </button>
                                                        <button
                                                            onClick={() => handleEdit(project)}
                                                            className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                                                        >
                                                            <Pencil size={16} /> Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDuplicate(project)}
                                                            className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                                                        >
                                                            <Copy size={16} /> Duplicate
                                                        </button>
                                                        <button
                                                            onClick={() => handleExport(project)}
                                                            className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                                                        >
                                                            <Download size={16} /> Export
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(project.id)}
                                                            className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-100"
                                                        >
                                                            <Trash2 size={16} /> Delete
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <ConfirmModal
                isOpen={showConfirm}
                onCancel={() => {
                    setShowConfirm(false);
                    setDeleteId(null);
                }}
                onConfirm={confirmDelete}
            />
        </div>
    );
}
