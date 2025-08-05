import Sidebar from "@/components/Sidebar";
import React, { useEffect, useState } from "react";
import { Folder, Plus, Settings, Trash2, Eye, Search, ChevronRight, FileText, Newspaper } from "lucide-react";
import { getProjects, createProject, updateProject, deleteProject } from "@/api/projectApi";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import ProjectFormModal from "@/components/ProjectFormModal";

export default function Home() {
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [projectToEdit, setProjectToEdit] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchProjects = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const projectsData = await getProjects();
            setProjects(projectsData);
            setFilteredProjects(projectsData);
        } catch (err) {
            console.error("Error loading projects:", err);
            const errorMessage = err.response?.data?.detail || err.message || "Failed to load projects.";
            setError(`Error: ${errorMessage}`);
            toast.error(`Failed to load projects: ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    useEffect(() => {
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        const results = projects.filter(
            (project) =>
                project.name.toLowerCase().includes(lowercasedSearchTerm) ||
                (project.description && project.description.toLowerCase().includes(lowercasedSearchTerm))
        );
        setFilteredProjects(results);
    }, [searchTerm, projects]);

    const handleSaveProject = async (projectData) => {
        try {
            if (projectData.id) {
                await updateProject(projectData.id, projectData);
            } else {
                await createProject(projectData);
            }
            await fetchProjects();
            return true;
        } catch (err) {
            console.error("Error saving project:", err);
            const errorMessage = err.response?.data?.detail || err.message || "Failed to save project.";
            toast.error(`Error: ${errorMessage}`);
            throw err;
        }
    };

    const handleDeleteProject = async (projectId) => {
        if (window.confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
            try {
                await deleteProject(projectId);
                toast.success("Project deleted successfully!");
                await fetchProjects();
            } catch (err) {
                console.error("Error deleting project:", err);
                const errorMessage = err.response?.data?.detail || err.message || "Failed to delete project.";
                toast.error(`Failed to delete project: ${errorMessage}`);
            }
        }
    };

    const handleEditClick = (project) => {
        setProjectToEdit(project);
        setShowCreateModal(true);
    };

    const handleCloseModal = () => {
        setShowCreateModal(false);
        setProjectToEdit(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-8 border-b pb-4">
                        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                            <Folder className="w-8 h-8 text-indigo-600" />
                            Project Management
                        </h2>
                        <button
                            onClick={() => {
                                setProjectToEdit(null);
                                setShowCreateModal(true);
                            }}
                            className="px-2 py-2 bg-black text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-200 flex items-center gap-2 text-lg font-medium"
                        >
                            <Plus size={20} /> Create New Project
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className="mb-8 relative">
                        <input
                            type="text"
                            placeholder="Search projects by name or description..."
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-lg"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    </div>

                    {isLoading && <div className="text-center py-12 text-gray-500 text-lg">Loading projects...</div>}
                    {error && <div className="text-center py-12 text-red-500 text-lg font-medium">{error}</div>}
                    {!isLoading && !error && (
                        <>
                            {filteredProjects.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {filteredProjects.map((project) => (
                                        <div
                                            key={project.id}
                                            className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                                        >
                                            <div className="p-6 flex flex-col flex-grow">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className="flex items-center">
                                                        <Folder className="w-6 h-6 text-indigo-500 mr-3" />
                                                        <h3 className="text-xl font-bold text-gray-900 truncate pr-2">
                                                            {project.name}
                                                        </h3>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleEditClick(project)}
                                                            className="p-2 rounded-full text-gray-500 hover:bg-yellow-100 hover:text-yellow-700 transition"
                                                            title="Edit project"
                                                        >
                                                            <Settings size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteProject(project.id)}
                                                            className="p-2 rounded-full text-gray-500 hover:bg-red-100 hover:text-red-700 transition"
                                                            title="Delete project"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                </div>
                                                {project.description && (
                                                    <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
                                                        {project.description}
                                                    </p>
                                                )}
                                                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                                                    {project.pages_count !== undefined && (
                                                        <span className="flex items-center gap-1">
                                                            <FileText size={16} className="text-blue-500" />{" "}
                                                            {project.pages_count} Pages
                                                        </span>
                                                    )}
                                                    {project.posts_count !== undefined && (
                                                        <span className="flex items-center gap-1">
                                                            <Newspaper size={16} className="text-emerald-500" />{" "}
                                                            {project.posts_count} Posts
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                                                    {project.created_at && (
                                                        <span>
                                                            Created on:{" "}
                                                            {new Date(project.created_at).toLocaleDateString()}
                                                        </span>
                                                    )}
                                                    {/* <Link
                                                        to={`/projects/${project.id}`}
                                                        className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 transition font-medium"
                                                        title="View project details"
                                                    >
                                                        View Details <ChevronRight className="w-4 h-4" />
                                                    </Link> */}
                                                    <Link
                                                        to={`/projects/${project.id}`}
                                                        className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 transition font-medium flex-shrink-0"
                                                        title="View project details"
                                                    >
                                                        View Details <ChevronRight className="w-4 h-4" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center mt-10 text-lg">
                                    {searchTerm
                                        ? "No matching projects found."
                                        : "No projects created yet. Start by creating a new one!"}
                                </p>
                            )}
                        </>
                    )}
                </div>
            </main>

            {/* Project Create/Edit Modal */}
            {showCreateModal && (
                <ProjectFormModal onClose={handleCloseModal} onSave={handleSaveProject} projectToEdit={projectToEdit} />
            )}
        </div>
    );
}
