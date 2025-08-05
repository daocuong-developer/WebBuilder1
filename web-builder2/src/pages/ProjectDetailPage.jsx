// src/pages/ProjectDetailPage.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { getProject } from "@/api/projectApi";
import { getPagesByProject } from "@/api/pageApi";
import { getPostsByProject } from "@/api/postApi";
import { toast } from "react-toastify";
import { Folder, FileText, Newspaper, ArrowLeft } from "lucide-react";

export default function ProjectDetailPage() {
    const { id: currentProjectId } = useParams(); // ✅ Get project ID from route
    const navigate = useNavigate();

    const [project, setProject] = useState(null);
    const [pages, setPages] = useState([]);
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!currentProjectId) {
                setIsLoading(false);
                setError("Project ID is missing in the URL.");
                toast.error("Invalid project ID. Redirecting...");
                navigate("/");
                return;
            }

            try {
                setIsLoading(true);
                const projectData = await getProject(currentProjectId);
                setProject(projectData);

                const projectPages = await getPagesByProject(currentProjectId);
                setPages(projectPages);

                const projectPosts = await getPostsByProject(currentProjectId);
                setPosts(projectPosts);
            } catch (err) {
                const message = err.response?.data?.detail || err.message;
                setError(`Error: ${message}`);
                toast.error(`Error: ${message}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [currentProjectId, navigate]);

    const renderContentPreview = (content) => {
        if (!content) return "No content available";
        if (typeof content === "object") return JSON.stringify(content);
        return String(content);
    };

    return (
        <div className="min-h-screen overflow-y-auto bg-gray-50 flex">
            <Sidebar />

            <main className="flex-1 p-6 lg:p-6" >
                <div className="max-w-7xl mx-auto">
                    {!isLoading && (
                        <>
                            {error ? (
                                <div className="text-center py-12 text-red-500 text-lg font-medium">{error}</div>
                            ) : !project ? (
                                <div className="text-center py-12 text-gray-500 text-lg">Project not found.</div>
                            ) : (
                                <>
                                    <Link
                                        to="/"
                                        className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200 mb-8 font-medium text-lg"
                                    >
                                        <ArrowLeft size={20} className="mr-2" /> Back to Project List
                                    </Link>

                                    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-2 border-b-4 border-indigo-600">
                                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
                                            <div className="flex items-center mb-4 md:mb-0">
                                                <Folder className="w-10 h-10 text-indigo-600 mr-4 flex-shrink-0" />
                                                <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
                                                    {project.name}
                                                </h1>
                                            </div>
                                        </div>
                                        {project.description && (
                                            <p className="text-gray-700 leading-relaxed mb-4 text-base lg:text-lg line-clamp-3">
                                                {project.description}
                                            </p>
                                        )}
                                        <div className="flex flex-wrap items-center text-sm text-gray-500 mt-4 pt-4 border-t border-gray-100">
                                            {project.created_at && (
                                                <span className="mr-6 mb-2 md:mb-0">
                                                    Created On:{" "}
                                                    <span className="font-semibold text-gray-700">
                                                        {new Date(project.created_at).toLocaleDateString()}
                                                    </span>
                                                </span>
                                            )}
                                            {project.updated_at && (
                                                <span>
                                                    Last Updated:{" "}
                                                    <span className="font-semibold text-gray-700">
                                                        {new Date(project.updated_at).toLocaleDateString()}
                                                    </span>
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Pages Section */}
                                    <h2 className="text-2xl font-bold text-gray-800 mt-6 mb-2 flex items-center gap-3">
                                        <FileText className="w-7 h-7 text-blue-600" />
                                        Pages ({pages.length})
                                    </h2>
                                    {pages.length > 0 ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                                            {pages.map((page) => (
                                                <div
                                                    key={page.id}
                                                    className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow duration-200 flex flex-col h-full"
                                                >
                                                    <h3 className="text-xl font-semibold text-blue-700 mb-2 leading-tight">
                                                        {page.title || page.name || "Untitled Page"}
                                                    </h3>
                                                    <p className="text-gray-600 text-sm mb-3">
                                                        <span className="font-medium">Slug:</span> {page.slug}
                                                    </p>
                                                    <p className="text-gray-700 text-base flex-grow line-clamp-3 mb-4">
                                                        {renderContentPreview(page.content)}
                                                    </p>
                                                    <div className="text-xs text-gray-500 mt-auto pt-3 border-t border-gray-100">
                                                        Last Updated: {new Date(page.updated_at).toLocaleDateString()}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="flex flex-col items-center justify-center py-10 text-gray-500 bg-white border border-dashed border-gray-300 rounded-lg shadow-inner text-center">
                                            <FileText className="w-12 h-12 text-emerald-400 mb-4" />
                                            <span className="text-lg font-medium">No pages found</span>
                                            <span className="text-sm text-gray-400 mt-1">
                                                This project doesn’t have any pages yet. Start creating one!
                                            </span>
                                        </p>
                                    )}

                                    {/* Posts Section */}
                                    <h2 className="text-2xl font-bold text-gray-800 mt-6  mb-2 flex items-center gap-3">
                                        <Newspaper className="w-7 h-7 text-emerald-600" />
                                        Posts ({posts.length})
                                    </h2>
                                    {posts.length > 0 ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {posts.map((post) => (
                                                <div
                                                    key={post.id}
                                                    className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow duration-200 flex flex-col h-full"
                                                >
                                                    <h3 className="text-xl font-semibold text-emerald-700 mb-2 leading-tight">
                                                        {post.title || "Untitled Post"}
                                                    </h3>
                                                    <p className="text-gray-600 text-sm mb-3">
                                                        <span className="font-medium">Slug:</span> {post.slug}
                                                    </p>
                                                    <p className="text-gray-700 text-base flex-grow line-clamp-3 mb-4">
                                                        {renderContentPreview(post.content)}
                                                    </p>
                                                    {post.category && (
                                                        <p className="text-gray-600 text-xs mb-1">
                                                            <span className="font-medium">Category:</span>{" "}
                                                            {post.category}
                                                        </p>
                                                    )}
                                                    {post.tags && post.tags.length > 0 && (
                                                        <p className="text-gray-600 text-xs mb-1">
                                                            <span className="font-medium">Tags:</span>{" "}
                                                            {Array.isArray(post.tags)
                                                                ? post.tags.join(", ")
                                                                : post.tags}
                                                        </p>
                                                    )}
                                                    <div className="text-xs text-gray-500 mt-auto pt-3 border-t border-gray-100">
                                                        Last Updated: {new Date(post.updated_at).toLocaleDateString()}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="flex flex-col items-center justify-center py-10 text-gray-500 bg-white border border-dashed border-gray-300 rounded-lg shadow-inner text-center">
                                            <Newspaper className="w-12 h-12 text-emerald-400 mb-4" />
                                            <span className="text-lg font-medium">No posts found</span>
                                            <span className="text-sm text-gray-400 mt-1">
                                                This project doesn’t have any posts yet. Start creating one!
                                            </span>
                                        </p>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}
