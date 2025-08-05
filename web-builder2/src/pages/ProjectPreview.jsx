import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom"; // ✅ THÊM useNavigate
import { getPagesByProject } from "@/api/pageApi";
import { getProject } from "@/api/projectApi";
import RenderBlock from "@/components/RenderBlock";
import SiteLayout from "@/components/SiteLayout";
import { ChevronLeft, ChevronRight } from "lucide-react";


export default function ProjectPreview() {
    const { projectId, pageId } = useParams();
    const navigate = useNavigate(); // ✅ KHAI BÁO useNavigate
    const [pages, setPages] = useState([]);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [projectName, setProjectName] = useState("Loading Project...");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const contentRef = useRef(null);

    // useEffect để fetch dữ liệu trang ban đầu
    useEffect(() => {
        const fetchProjectData = async () => {
            try {
                const projectDetails = await getProject(projectId);
                setProjectName(projectDetails?.name || `Project ${projectId}`);
                const projectPages = await getPagesByProject(projectId);
                setPages(projectPages);
                
                // Set trang ban đầu dựa trên pageId từ URL
                const initialPageIndex = projectPages.findIndex(p => p.id === parseInt(pageId, 10));
                setCurrentPageIndex(initialPageIndex !== -1 ? initialPageIndex : 0);

                setLoading(false);
            } catch (err) {
                setError("Failed to load project. Please try again.");
                setLoading(false);
            }
        };
        fetchProjectData();
    }, [projectId, pageId]); // Thêm pageId vào dependency array

    // useEffect để xử lý click vào link nội bộ
    useEffect(() => {
        const container = contentRef.current;
        const handleClick = (e) => {
            const anchor = e.target.closest("a");
            const href = anchor?.getAttribute("href");
            if (href?.startsWith("page://")) {
                e.preventDefault();
                const targetPageId = parseInt(href.replace("page://", ""), 10);
                const targetIndex = pages.findIndex((p) => p.id === targetPageId);
                if (targetIndex !== -1) {
                    // ✅ THAY ĐỔI: Dùng navigate để cập nhật URL
                    navigate(`/preview/project/${projectId}/page/${targetPageId}`);
                    // Không cần setCurrentPageIndex ở đây vì useEffect sẽ chạy lại và lo việc đó
                    container?.scrollTo({ top: 0, behavior: "smooth" });
                }
            }
        };
        container?.addEventListener("click", handleClick, true);
        return () => container?.removeEventListener("click", handleClick, true);
    }, [pages, projectId, navigate]); // ✅ Thêm projectId và navigate vào dependency array

    const getTopLevelBlocks = (blocks) => {
        return blocks.filter((block) => {
            return !blocks.some((parent) => {
                return (
                    parent.props?.children?.includes(block.id) ||
                    parent.props?.columns?.some((col) => col.children?.includes(block.id))
                );
            });
        });
    };

    const currentPage = pages[currentPageIndex];
    const currentBlocks = currentPage?.content?.blocks || [];

    const layoutConfig = JSON.parse(localStorage.getItem("layoutConfig")) || {};
    const headerProps = layoutConfig?.header?.props || null;
    const footerProps = layoutConfig?.footer?.props || null;
    const bodyBlocks = getTopLevelBlocks(currentBlocks).filter(
        (block) => block.type !== "header" && block.type !== "footer"
    );

    if (loading) return <div className="p-20 text-center">Loading...</div>;
    if (error) return <div className="p-20 text-center text-red-500">{error}</div>;

    return (
        <div className="font-roboto w-full min-h-screen">
            <div ref={contentRef} className="w-full">
                <SiteLayout
                    headerData={headerProps}
                    footerData={footerProps}
                    isPreview={true}
                >
                    {bodyBlocks.map((block) => (
                        <RenderBlock
                            key={block.id}
                            block={block}
                            blocks={currentBlocks}
                            isPreview={true}
                        />
                    ))}
                </SiteLayout>
            </div>
        </div>
    );
}