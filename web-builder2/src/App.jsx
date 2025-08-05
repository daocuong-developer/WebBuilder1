// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar"; // Navbar của bạn
import Home from "./pages/Home";
import AddPage from "./pages/AddPage";
import AddPost from "./pages/AddPost";
import ManagePosts from "./pages/ManagePosts";
import PostDetail from "./pages/PostDetail";
import EditPost from "./pages/EditPost";
import CustomPage from "./pages/CustomPage";
import EditablePage from "@/pages/EditablePage";
import PreviewModal from "@/pages/PreviewModal";
import ProjectManager from "@/components/ProjectManager";
import ProjectDetailPage from "@/pages/ProjectDetailPage";

// Import layout mới
import PreviewLayout from "@/layout/PreviewLayout";
import ProjectPreview from "@/pages/ProjectPreview";

export default function App() {
    // Các state và logic hiện tại của bạn
    const pages = JSON.parse(localStorage.getItem("pages")) || [];
    const currentPageId = localStorage.getItem("currentPage");
    const currentPage = pages.find((p) => p.id === currentPageId);

    return (
        <Router>
            <Routes>
                <Route
                    path="/preview/project/:projectId/page/:pageId"
                    element={
                        <PreviewLayout>
                            <ProjectPreview />
                        </PreviewLayout>
                    }
                />

                <Route
                    path="/*"
                    element={
                        <>
                            <Navbar />
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/add-page" element={<AddPage />} />
                                <Route path="/add-post" element={<AddPost />} />
                                <Route path="/manage-posts" element={<ManagePosts />} />
                                <Route path="/post/:id" element={<PostDetail />} />
                                <Route path="/edit-post/:id" element={<EditPost />} />
                                <Route path="/preview" element={<PreviewModal />} />
                                <Route path="/projects/:id" element={<ProjectDetailPage />} />
                                {pages.map((page) => (
                                    <Route key={page.id} path={page.slug} element={<CustomPage page={page} />} />
                                ))}
                                <Route path="/edit-page/:id" element={<EditablePage />} />
                            </Routes>
                        </>
                    }
                />
            </Routes>
        </Router>
    );
}