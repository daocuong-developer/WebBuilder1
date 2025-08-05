import React, { useState, useEffect, useRef } from "react"; // ADDED useEffect, useRef
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import { getPagesByProject } from "@/api/pageApi"; // ADDED getPagesByProject

const ButtonOptions = ({ block, onChange }) => {
    const props = block.props || {};

    const [projectPages, setProjectPages] = useState([]);
    const [showPageSelector, setShowPageSelector] = useState(false); // State for page selector visibility
    const linkInputRef = useRef(null); // Ref for the Link URL input
    const [pageSelectorPosition, setPageSelectorPosition] = useState({}); // State for page selector popup position

    // Hàm helper để cập nhật props, giờ nó sẽ xử lý toàn bộ block
    const handleChange = (propName, value) => {
        onChange({
            ...block,
            props: {
                ...props,
                [propName]: value,
            },
        });
    };

    // Fetch project pages on component mount
    useEffect(() => {
        const currentProject = JSON.parse(localStorage.getItem("currentProject"));
        if (currentProject?.id) {
            getPagesByProject(currentProject.id)
                .then(pages => setProjectPages(pages))
                .catch(err => console.error("Failed to fetch project pages", err));
        }
    }, []);

    // Effect to calculate and set popup position when page selector opens
    useEffect(() => {
        if (showPageSelector && linkInputRef.current) {
            const rect = linkInputRef.current.getBoundingClientRect();
            const POPUP_WIDTH = 250; // Desired width for the page selector popup

            let newTop = rect.top; // Default to aligning with the top of the input
            let newLeft = rect.left;
            let finalWidth = POPUP_WIDTH;

            // Adjust position if popup overflows viewport
            if (rect.left + POPUP_WIDTH > window.innerWidth) {
                newLeft = window.innerWidth - POPUP_WIDTH - 10; // 10px padding from right
            }
            if (newLeft < 0) { // If it goes off left side
                newLeft = 10; // 10px padding from left
            }

            // Prefer opening below the input, but check if there's enough space
            const estimatedPopupHeight = projectPages.length * 32 + 20; // 32px per item + padding
            if (rect.bottom + estimatedPopupHeight + 10 > window.innerHeight && rect.top - estimatedPopupHeight - 10 > 0) {
                // Not enough space below, but enough above, so open above
                newTop = rect.top - estimatedPopupHeight - 10;
            } else {
                // Default to opening below
                newTop = rect.bottom + 10; // 10px below the input
            }


            setPageSelectorPosition({
                top: newTop,
                left: newLeft,
                width: finalWidth,
            });
        }
    }, [showPageSelector, projectPages]); // Re-run when selector opens or pages load

    // Function to handle selecting a page
    const handleSelectPage = (pageId) => {
        handleChange("href", `page://${pageId}`); // Set href to page://pageId
        setShowPageSelector(false); // Close the popup
    };

    return (
        <div className="space-y-4 p-2">
            {/* --- CONTENT --- */}
            <section className="space-y-3">
                <h4 className="text-md font-semibold text-gray-700 border-b pb-2">Content</h4>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                    <input
                        className="w-full border rounded px-2 py-1 text-sm"
                        value={props.text || "Click Me"}
                        onChange={(e) => handleChange("text", e.target.value)}
                    />
                </div>
                {/* Link URL with Page Selector Button */}
                <div className="relative"> {/* Make this div relative for positioning the popup */}
                    <label className="block text-sm font-medium text-gray-700 mb-1">Link URL</label>
                    <div className="flex gap-2 items-center">
                        <input
                            ref={linkInputRef} // Assign ref to the input
                            type="text"
                            className="w-full border rounded px-2 py-1 text-sm flex-grow"
                            value={props.href || ""}
                            onChange={(e) => handleChange("href", e.target.value)}
                            placeholder="https://example.com or page://{id}"
                        />
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent parent click
                                setShowPageSelector(prev => !prev);
                            }}
                            className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600"
                        >
                            Page
                        </button>
                    </div>

                    {showPageSelector && pageSelectorPosition && ( // Render popup if visible and position is calculated
                        <div
                            style={{
                                position: 'fixed', // Position fixed to prevent clipping
                                zIndex: 100000, // Very high z-index
                                ...pageSelectorPosition, // Apply calculated position
                                maxHeight: '300px', // Max height for scrollable list
                                overflowY: 'auto',
                                backgroundColor: 'white',
                                border: '1px solid #d1d5db',
                                borderRadius: '0.375rem',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                            }}
                        >
                            {projectPages.length > 0 ? (
                                projectPages.map(page => (
                                    <button
                                        key={page.id}
                                        onClick={(e) => {
                                            e.stopPropagation(); // Stop propagation to prevent selecting the block
                                            handleSelectPage(page.id);
                                        }}
                                        className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                                    >
                                        {page.title}
                                    </button>
                                ))
                            ) : (
                                <div className="px-3 py-2 text-sm text-gray-500">No pages found.</div>
                            )}
                        </div>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Link Target</label>
                    <select
                        className="w-full border rounded px-2 py-1"
                        value={props.target || "_self"}
                        onChange={(e) => handleChange("target", e.target.value)}
                    >
                        <option value="_self">Same Tab (_self)</option>
                        <option value="_blank">New Tab (_blank)</option>
                    </select>
                </div>
            </section>

            {/* --- STYLING --- */}
            <section className="space-y-3">
                <h4 className="text-md font-semibold text-gray-700 border-b pb-2">Styling</h4>

                {/* Colors */}
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Text Color</label>
                        <input
                            type="color"
                            className="w-full border rounded px-1 py-0.5 h-8"
                            value={props.color || "#ffffff"}
                            onChange={(e) => handleChange("color", e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Background</label>
                        <input
                            type="color"
                            className="w-full border rounded px-1 py-0.5 h-8"
                            value={props.backgroundColor || "#007bff"}
                            onChange={(e) => handleChange("backgroundColor", e.target.value)}
                        />
                    </div>
                </div>

                {/* Colors Hover*/}
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Hover Text</label>
                        <input
                            type="color"
                            className="w-full border rounded px-2 py-1 h-8"
                            value={props.hoverTextColor || "#ffffff"}
                            onChange={(e) => handleChange("hoverTextColor", e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Hover BG</label>
                        <input
                            type="color"
                            className="w-full border rounded px-2 py-1 h-8"
                            value={props.hoverBackgroundColor || "#0056b3"}
                            onChange={(e) => handleChange("hoverBackgroundColor", e.target.value)}
                        />
                    </div>
                </div>

                {/* Typography */}
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Font Size</label>
                        <input
                            type="text"
                            className="w-full border rounded px-2 py-1 text-sm"
                            value={props.fontSize || "16px"}
                            onChange={(e) => handleChange("fontSize", e.target.value)}
                            placeholder="e.g. 16px"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Font Weight</label>
                        <select
                            className="w-full border rounded px-2 py-1 text-sm"
                            value={props.fontWeight || "normal"}
                            onChange={(e) => handleChange("fontWeight", e.target.value)}
                        >
                            <option value="normal">Normal</option>
                            <option value="bold">Bold</option>
                            <option value="300">Light</option>
                            <option value="500">Medium</option>
                            <option value="700">Bold</option>
                        </select>
                    </div>
                </div>

                {/* Layout */}
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Padding</label>
                        <input
                            type="text"
                            className="w-full border rounded px-2 py-1 text-sm"
                            value={props.padding || "10px 20px"}
                            onChange={(e) => handleChange("padding", e.target.value)}
                            placeholder="10px 20px"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Border Radius</label>
                        <input
                            type="text"
                            className="w-full border rounded px-2 py-1 text-sm"
                            value={props.borderRadius || "8px"}
                            onChange={(e) => handleChange("borderRadius", e.target.value)}
                            placeholder="e.g. 8px"
                        />
                    </div>
                </div>
            </section>

            {/* --- ALIGNMENT --- */}
            <section>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alignment</label>
                <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-md w-min">
                    <button onClick={() => handleChange("blockAlignment", "left")} title="Align Left" className={`p-2 rounded-md ${(!props.blockAlignment || props.blockAlignment === 'left') ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}>
                        <AlignLeft size={16} />
                    </button>
                    <button onClick={() => handleChange("blockAlignment", "center")} title="Align Center" className={`p-2 rounded-md ${props.blockAlignment === 'center' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}>
                        <AlignCenter size={16} />
                    </button>
                    <button onClick={() => handleChange("blockAlignment", "right")} title="Align Right" className={`p-2 rounded-md ${props.blockAlignment === 'right' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}>
                        <AlignRight size={16} />
                    </button>
                </div>
            </section>

        </div>
    );
};

export default ButtonOptions;