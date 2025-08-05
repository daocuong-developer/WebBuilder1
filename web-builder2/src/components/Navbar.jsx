import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Rocket } from "lucide-react";
import {
    Folder,
    LayoutGrid,
    FileText,
    Eye,
    Code2,
    Save,
    Home,
    ChevronDown,
    Menu,
    File,
    Plus,
    Settings,
    Layers,
    Undo,
    Redo,
} from "lucide-react";

import ProjectManager from "@/components/ProjectManager";
import PageManager from "@/components/PageManager";
import PostManager from "@/components/PostManager";
import ExportModal from "@/components/ExportModal";
import { useSave } from "@/contexts/SaveContext";
import { toast } from "react-toastify";
import PreviewModal from "@/pages/PreviewModal";
import { useUndo } from "@/contexts/UndoContext";
import { getProjects, setCurrentProject as setBackendCurrentProject, getCurrentProject } from "@/api/projectApi";
import { getPages } from "@/api/pageApi";

import axios from "axios";

export default function Navbar() {
    const [showPosts, setShowPosts] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showProjectDropdown, setShowProjectDropdown] = useState(false);
    const [showProjectManager, setShowProjectManager] = useState(false);
    const [showPageManager, setShowPageManager] = useState(false);
    const [showPagesDropdown, setShowPagesDropdown] = useState(false);

    const [projects, setProjects] = useState([]);
    const [currentProject, setCurrentProject] = useState(null);
    const [pages, setPages] = useState([]);
    const { pageId } = useParams(); // Lấy pageId từ URL của builder
    const [currentPageId, setCurrentPageId] = useState(pageId || null);

    const pagesRef = useRef();
    const postsRef = useRef();
    const projectDropdownRef = useRef();
    const navigate = useNavigate();
    const { handleUndo, handleRedo, canUndo, canRedo } = useUndo();
    const { saveFn } = useSave();

    const [showPreviewModal, setShowPreviewModal] = useState(false);
    const [showExportModal, setShowExportModal] = useState(false);

    const handleClick = () => {
        if (saveFn) {
            saveFn();
        } else toast.success("Nothing to save or not on edit page yet");
    }; 

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const projectList = await getProjects();
                setProjects(projectList);

                const current = await getCurrentProject();
                if (current) {
                    setCurrentProject(current);
                }
            } catch (err) {
                console.error("Lỗi khi tải projects:", err);
            }
        };

        fetchInitialData();
    }, []);

    // ✅ Lấy pageId từ URL và cập nhật localStorage và state
    useEffect(() => {
        if (pageId) {
            setCurrentPageId(pageId);
            localStorage.setItem("currentPageId", pageId);
        }
    }, [pageId]);
    
    useEffect(() => {
        const handleStorageChange = () => {
            setCurrentPageId(localStorage.getItem("currentPageId") || null);
        };
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, [])

    const fetchPagesForCurrentProject = async () => {
        if (currentProject) {
            try {
                const allPages = await getPages();
                const filteredPages = allPages.filter((p) => p.project === currentProject.id);
                setPages(filteredPages);

                if (!pageId && filteredPages.length > 0) {
                    setCurrentPageId(filteredPages[0].id);
                }
            } catch (err) {
                console.error("Lỗi khi tải pages:", err);
                setPages([]);
            }
        } else {
            setPages([]);
            setCurrentPageId(null);
        }
    };

    useEffect(() => {
        fetchPagesForCurrentProject();
    }, [currentProject, pageId]); // Thêm pageId vào dependency array để cập nhật lại pages khi URL thay đổi

    const handleProjectsUpdate = (updatedProjects, newCurrentProject = null) => {
        setProjects(updatedProjects);
        if (newCurrentProject) {
            setCurrentProject(newCurrentProject);
            localStorage.setItem("currentProject", JSON.stringify(newCurrentProject));
        }
    };

    const projectPages = pages;
    const currentPage = pages.find((p) => p.id === currentPageId);

    useEffect(() => {
        const handleCloseProject = () => setShowProjectManager(false);
        const handleClosePage = () => setShowPageManager(false);

        window.addEventListener("close-project-manager", handleCloseProject);
        window.addEventListener("close-page-manager", handleClosePage);
        return () => {
            window.removeEventListener("close-project-manager", handleCloseProject);
            window.removeEventListener("close-page-manager", handleClosePage);
        };
    }, []);

    // ✅ TẠO HÀM MỚI ĐỂ CẬP NHẬT TRUNG TÂM
    const handlePageChange = (newId) => {
        setCurrentPageId(newId);
        localStorage.setItem("currentPageId", newId);

    // ⚠️ Điều quan trọng: cập nhật cả URL luôn!
        navigate(`/edit-page/${newId}`, { replace: true });
    };

    const handleExportProject = async () => {
        if (!currentProject?.id) {
            toast.warning("Please select a project before exporting.");
            return;
        }

        try {
            const response = await axios.get(`/api/projects/${currentProject.id}/export/`, {
                responseType: "blob", // Để tải file
            });

            const blob = new Blob([response.data], { type: "application/json" });
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            const filename = `${currentProject.name.replace(/\s+/g, "-")}-export-${new Date()
                .toISOString()
                .slice(0, 10)}.json`;
            a.download = filename;
            a.click();
            window.URL.revokeObjectURL(url);

            toast.success("Export thành công!");
        } catch (error) {
            console.error("Export failed:", error);
            toast.error("Export thất bại.");
        }
    };

    const handleDeployProject = async () => {
    if (!currentProject?.id) {
        toast.warning("Please select a project before deploying.");
        return;
    }

    try {
        const response = await axios.post(`/api/projects/${currentProject.id}/deploy/`);
        const deployedUrl = response?.data?.url; // Sửa dòng này
        console.log("Deploy URL:", deployedUrl);
        window.open(deployedUrl, "_blank");
        toast.success("Deploy thành công!");
    } catch (error) {
        console.error("Deploy failed:", error);
        toast.error("Deploy thất bại.");
    }

};


 const handlePagesUpdate = async () => {
        if (currentProject) {
            try {
                const allPages = await getPages();
                const filteredPages = allPages.filter((p) => p.project === currentProject.id);
                setPages(filteredPages);
            } catch (err) {
                console.error("Lỗi khi cập nhật pages:", err);
            }
        }
    };

    return (
        <div className="border-b shadow-sm bg-white">
            <div className="flex justify-between items-center px-4 py-3">
                <div className="flex items-center gap-4">
                    <Link to="/" className="flex items-center text-xl font-bold">
                        <span className="mr-2">
                            <Layers size={24} />
                        </span>
                        Web Builder
                    </Link>

                    <div className="hidden sm:flex items-center gap-4">
                        <div className="relative" ref={projectDropdownRef}>
                            <button
                                onClick={() => setShowProjectDropdown((prev) => !prev)}
                                className="min-w-[200px] border px-3 py-1 rounded flex items-center justify-between gap-2"
                            >
                                <div className="flex items-center gap-2 truncate">
                                    <Folder size={16} />
                                    {currentProject?.name || "Select Project"}
                                </div>
                                <ChevronDown size={16} />
                            </button>

                            {showProjectDropdown && (
                                <div className="absolute z-50 left-0 mt-1 w-[200px] bg-white border rounded shadow-md animate-in fade-in slide-in-from-top-1 duration-100">
                                    {projects.map((project) => (
                                        <button
                                            key={project.id}
                                            onClick={async () => {
                                                await setBackendCurrentProject(project.id);
                                                setCurrentProject(project);
                                                localStorage.setItem("currentProject", JSON.stringify(project));
                                                setShowProjectDropdown(false);
                                                navigate(`/projects/${project.id}`);
                                            }}
                                            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                                        >
                                            <Folder size={16} /> {project.name}
                                        </button>
                                    ))}
                                    <div className="border-t my-1" />
                                    <button
                                        onClick={() => {
                                            setShowProjectDropdown(false);
                                            setShowProjectManager(true);
                                        }}
                                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                                    >
                                        <Plus size={16} /> New Project
</button>
                                    <button
                                        onClick={() => {
                                            setShowProjectDropdown(false);
                                            setShowProjectManager(true);
                                        }}
                                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                                    >
                                        <Settings size={16} /> Manage Projects
                                    </button>
                                </div>
                            )}

                            {showProjectManager && (
                                <ProjectManager
                                    onClose={() => setShowProjectManager(false)}
                                    onProjectsUpdate={handleProjectsUpdate}
                                />
                            )}
                        </div>

                        <div className="relative" ref={pagesRef}>
                            <button
                                onClick={() => setShowPagesDropdown(!showPagesDropdown)}
                                className="w-56 border px-3 py-1 rounded flex items-center justify-between gap-2"
                            >
                                <div className="flex items-center gap-2 truncate">
                                    {currentPage?.id === currentPageId ? <Home size={16} /> : <File size={16} />}
                                    {currentPage?.title || "Home"}
                                </div>
                                <ChevronDown size={16} />
                            </button>

                            {showPagesDropdown && (
                                <div className="absolute left-0 mt-1 w-56 bg-white border rounded shadow-md z-50">
                                    {projectPages.length > 0 ? (
                                        projectPages.map((page) => (
                                            <button
                                                key={page.id}
                                                onClick={() => handlePageChange(page.id)}
                                                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                                            >
                                                {page.title?.toLowerCase() === "home" ? (
                                                    <Home size={16} />
) : (
                                                    <File size={16} />
                                                )}
                                                {page.title}
                                            </button>
                                        ))
                                    ) : (
                                        <div className="px-4 py-2 text-gray-500 text-center">
                                            No pages. Add a new page!
                                        </div>
                                    )}
                                    <div className="border-t my-1"></div>
                                    <button
                                        onClick={() => {
                                            if (!currentProject) {
                                                toast.warning("Please select a Project before creating a Page.");
                                                setShowPagesDropdown(false); // Đóng dropdown
                                                return;
                                            }
                                            setShowPageManager(true);
                                            setShowPagesDropdown(false); // Đóng dropdown
                                        }}
                                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                                    >
                                        <Plus size={16} /> Add New Page
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (!currentProject) {
                                                toast.warning("Please select a Project before managing Pages.");
                                                setShowPagesDropdown(false); // Đóng dropdown
                                                return;
                                            }
                                            setShowPageManager(true);
                                            setShowPagesDropdown(false); // Đóng dropdown
                                        }}
                                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                                    >
                                        <Settings size={16} /> Manage Pages
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="sm:hidden">
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="border p-2 rounded">
                        <Menu size={20} />
                    </button>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                    {/* Các nút Project, Pages (button) */}
                    <button
                        onClick={() => setShowProjectManager(true)}
                        className="border px-3 py-1 rounded flex items-center gap-2"
                    >
                        <Folder size={16} /> Project
                    </button>

                    {showProjectManager && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                            <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6 relative">
                                <ProjectManager
                                    onClose={() => setShowProjectManager(false)}
                                    onProjectsUpdate={handleProjectsUpdate}
                                />
                            </div>
                        </div>
                    )}

                    <div className="relative" ref={pagesRef}>
                        <button
                            onClick={() => {
                                if (!currentProject) {
                                    toast.warning("Please select a Project before creating a Page.");
                                    return;
                                }
                                setShowPageManager(true);
                            }}
                            className="border px-3 z-50 py-1 rounded flex items-center gap-2"
                        >
                            <LayoutGrid size={16} /> Pages
                        </button>
                        {showPageManager && currentProject && <PageManager currentProject={currentProject} onPagesUpdate={handlePagesUpdate} />}{" "}
                        {/* TRUYỀN currentProject XUỐNG */}
                    </div>
                    {/* ... các nút khác */}
                    <div className="relative" ref={postsRef}>
                        <button
                            onClick={() => setShowPosts(!showPosts)}
                            className="border px-3 py-1 rounded flex items-center gap-2"
                        >
                            <FileText size={16} /> Posts
                        </button>
                        {showPosts && (
                            <div
                                className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-fade-in"
                                onClick={(e) => {
                                    if (e.target === e.currentTarget) setShowPosts(false);
                                }}
                            >
                                <PostManager
                                    onClose={() => setShowPosts(false)}
                                    currentProjectId={currentProject?.id}
                                />
                            </div>
                        )}
                    </div>
<div className="flex gap-2">
                        <button
                            onClick={handleUndo}
                            disabled={!canUndo}
                            className="hover:bg-gray-300 disabled:opacity-50 px-3 py-1 rounded shadow"
                        >
                            <Undo />
                        </button>
                        <button
                            onClick={handleRedo}
                            disabled={!canRedo}
                            className="hover:bg-gray-300 disabled:opacity-50 px-3 py-1 rounded shadow"
                        >
                            <Redo />
                        </button>
                    </div>

                    <button
                        onClick={() => setShowPreviewModal(true)}
                        className="border px-3 py-1 rounded flex items-center gap-2"
                    >
                        <Eye size={16} /> Preview
                    </button>

                    <button
                        onClick={() => setShowExportModal(true)}
                        className="border px-3 py-1 rounded flex items-center gap-2"
                    >
                        <Code2 size={16} /> Export
                    </button>
                    {currentProject && currentProject.id && currentPageId ? (
                       <Link
                            to={`/preview/project/${currentProject.id}/page/${currentPageId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <button className="border px-3 py-1 rounded flex items-center gap-2">
                                View 
                            </button>
                        </Link>
                    ) : (
                        <button className="border px-3 py-1 rounded flex items-center gap-2" disabled>
                            View 
                        </button>
                    )}
                    

                    <button onClick={handleClick} className="border px-3 py-1 rounded flex items-center gap-2">
                        <Save size={16} /> Save
                    </button>
                </div>
                
            </div>

            {showPreviewModal && <PreviewModal open={showPreviewModal} onClose={() => setShowPreviewModal(false)} />}
            {showExportModal && (
                <ExportModal currentProject={currentProject} onClose={() => setShowExportModal(false)} />
            )}
        </div>
    );
}