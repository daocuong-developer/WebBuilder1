import React, { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight, Monitor, TabletSmartphone, Smartphone, Ruler, ChevronDown } from "lucide-react";
import { getPagesByProject } from "@/api/pageApi";
import RenderBlock from "@/components/RenderBlock";
import SiteLayout from "@/components/SiteLayout";

const devicePresets = {
    desktop: { width: 1366, height: 768, name: "Desktop" },
    tablet: { width: 768, height: 1024, name: "Tablet" },
    mobile: {
        "iphone-12": { width: 390, height: 844, name: "iPhone 12/13/14" },
        "samsung-s21": { width: 360, height: 800, name: "Samsung S21" },
    },
};

export default function PreviewModal({ open, onClose }) {
    const previewContainerRef = useRef(null);
    const [pages, setPages] = useState([]);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [projectName, setProjectName] = useState("");
    const [device, setDevice] = useState("desktop");
    const [mobileDevice, setMobileDevice] = useState("iphone-12");
    const [showMobileDropdown, setShowMobileDropdown] = useState(false);
    const [customWidth, setCustomWidth] = useState(1366);
    const [customHeight, setCustomHeight] = useState(768);
    const [currentBlocks, setCurrentBlocks] = useState([]);

    // ✅ GỘP LOGIC FETCH VÀ CẬP NHẬT BLOCKS VÀO CHUNG MỘT USEEFFECT
    useEffect(() => {
        const fetchAndSetPageData = async () => {
            if (!open) return;

            // Nếu chưa có danh sách trang, fetch từ API
            if (pages.length === 0) {
                const currentProject = JSON.parse(localStorage.getItem("currentProject"));
                if (!currentProject?.id) return;
                setProjectName(currentProject.name);
                try {
                    const projectPages = await getPagesByProject(currentProject.id);
                    if (projectPages?.length > 0) {
                        setPages(projectPages);
                        const currentPageId = parseInt(localStorage.getItem("currentPageId"));
                        const currentIndex = projectPages.findIndex((p) => p.id === currentPageId);
                        const validIndex = currentIndex > -1 ? currentIndex : 0;
                        setCurrentPageIndex(validIndex);
                        // Cập nhật blocks ngay lập tức
                        setCurrentBlocks(projectPages[validIndex]?.content?.blocks || []);
                    }
                } catch (e) { console.error("Error loading project pages", e); }
            } else {
                // Nếu đã có danh sách trang, chỉ cần cập nhật blocks theo index mới
                if (pages[currentPageIndex]) {
                    setCurrentBlocks(pages[currentPageIndex]?.content?.blocks || []);
                }
            }
        };

        fetchAndSetPageData();
    }, [open, currentPageIndex, pages]); // Chạy khi mở, khi chuyển trang, hoặc khi pages được fetch lần đầu

    // EFFECT XỬ LÝ CLICK LINK NỘI BỘ (Không đổi)
    useEffect(() => {
        const container = previewContainerRef.current;
        if (!container) return;
        const handleClick = (e) => {
             const anchor = e.target.closest('a');
             const href = anchor?.getAttribute("href");
             if (href?.startsWith("page://")) {
                 e.preventDefault();
                 const pageId = parseInt(href.replace("page://", ""), 10);
                 const pageIndex = pages.findIndex(p => p.id === pageId);
                 if (pageIndex !== -1) {
                     setCurrentPageIndex(pageIndex);
                 }
             }
        };
        container.addEventListener('click', handleClick, true);
        return () => container.removeEventListener('click', handleClick, true);
    }, [pages, currentBlocks]);

    const getDeviceSize = () => {
        if (device === "mobile") return devicePresets.mobile[mobileDevice];
        if (device === "custom") return { width: parseInt(customWidth, 10), height: parseInt(customHeight, 10) };
        return devicePresets[device];
    };
    const layoutConfig = JSON.parse(localStorage.getItem("layoutConfig")) || {};
    const headerProps = layoutConfig?.header?.props || null;
    const footerProps = layoutConfig?.footer?.props || null;
    const currentDimensions = getDeviceSize();

    // const topLevelBlocks = currentBlocks.filter(block => 
    //     !currentBlocks.some(parent => 
    //         parent.props?.children?.includes(block.id) ||
    //         parent.props?.columns?.some(col => col.children?.includes(block.id))
    //     )
    // );

    const bodyBlocks = currentBlocks.filter(
  block =>
    block.type !== "header" &&
    block.type !== "footer" &&
    !currentBlocks.some(parent =>
      parent.props?.children?.includes(block.id) ||
      parent.props?.columns?.some(col => col.children?.includes(block.id))
    )
    );

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col max-w-full max-h-full">
                
                <div className="p-2 flex items-center justify-between border-b shrink-0">
                    <h2 className="text-md font-semibold truncate px-2">
                        Preview: {projectName} - {pages[currentPageIndex]?.title || `Page ${currentPageIndex + 1}`}
                    </h2>
                    <div className="flex items-center gap-2">
                        <button onClick={() => setCurrentPageIndex(p => Math.max(0, p - 1))} disabled={currentPageIndex === 0} className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"><ChevronLeft size={20}/></button>
                        <button onClick={() => setCurrentPageIndex(p => Math.min(pages.length - 1, p + 1))} disabled={currentPageIndex >= pages.length - 1} className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"><ChevronRight size={20}/></button>
                        <button onClick={onClose} className="p-1 rounded hover:bg-red-100 hover:text-red-500"><X size={20} /></button>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2 p-2 items-center border-b shrink-0 bg-gray-50">
                    <button onClick={() => setDevice("desktop")} title="Desktop" className={`p-2 rounded ${device === 'desktop' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'}`}><Monitor size={20}/></button>
                    <button onClick={() => setDevice("tablet")} title="Tablet" className={`p-2 rounded ${device === 'tablet' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'}`}><TabletSmartphone size={20}/></button>
                    <div className="relative">
                        <button onClick={() => { setDevice("mobile"); setShowMobileDropdown(p => !p); }} title="Mobile" className={`p-2 rounded flex items-center gap-1 ${device === 'mobile' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'}`}>
                            <Smartphone size={20}/> <ChevronDown size={16} />
                        </button>
                        {showMobileDropdown && device === 'mobile' && (
                            <div className="absolute top-full mt-2 w-56 bg-white border rounded-md shadow-lg z-10">
                                {Object.keys(devicePresets.mobile).map(key => (
                                    <button key={key} className={`block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${mobileDevice === key ? 'font-bold text-blue-600' : ''}`}
                                        onClick={() => { setMobileDevice(key); setShowMobileDropdown(false); }}>
                                        {devicePresets.mobile[key].name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <button onClick={() => setDevice("custom")} title="Custom Size" className={`p-2 rounded ${device === 'custom' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'}`}><Ruler size={20}/></button>
                    {device === 'custom' && (
                        <div className="flex items-center gap-2 border-l pl-2 ml-2">
                           <input type="number" value={customWidth} onChange={e => setCustomWidth(e.target.value)} className="w-20 border rounded px-2 py-1" />
                           <span className="text-gray-500">×</span>
                           <input type="number" value={customHeight} onChange={e => setCustomHeight(e.target.value)} className="w-20 border rounded px-2 py-1" />
                        </div>
                    )}
                </div>
                
                <div className="overflow-auto bg-gray-200 p-4">
                    {/* DIV BÊN NGOÀI CHỈ ĐỂ TẠO KHUNG VÀ ĐỔ BÓNG */}
                    <div 
                        style={{ 
                            width: `${currentDimensions.width}px`, 
                            height: `${currentDimensions.height}px`,
                            margin: 'auto',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                            transition: 'width 0.3s ease, height 0.3s ease'
                        }}
                    >
                        {/* ✅ GẮN REF VÀO ĐÚNG DIV CHỨA NỘI DUNG */}
                        <div ref={previewContainerRef} className="h-full w-full overflow-y-auto bg-white">
                            <SiteLayout
                                headerData={headerProps}
                                footerData={footerProps}
                                isPreview={true}
                                device={device}
                            >
                                {bodyBlocks.map((block) => (
                                    <RenderBlock
                                        key={block.id}
                                        block={block}
                                        blocks={currentBlocks}
                                        isPreview={true}
                                        device={device}
                                    />
                                ))}
                            </SiteLayout>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}