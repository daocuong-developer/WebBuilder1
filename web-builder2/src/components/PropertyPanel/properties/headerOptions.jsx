import React, { useState, useEffect, useRef } from 'react';
import { getPagesByProject } from "@/api/pageApi";
import { v4 as uuid } from 'uuid';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2, Link } from "lucide-react";

// SortableNavLinkItem (No functional changes here, only receives the ref update function)
function SortableNavLinkItem({ link, index, onUpdate, onRemove, onSelectPage, onSelectSubPage, setPageButtonRef }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: link.id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} className="border p-2 rounded mb-2 space-y-2 bg-white">
            <div className="flex items-center gap-2">
                <span {...attributes} {...listeners} className="cursor-grab text-gray-400"><GripVertical size={20} /></span>
                <input
                    type="text"
                    value={link.text}
                    onChange={(e) => onUpdate(index, "text", e.target.value)}
                    placeholder="Link Text"
                    className="border rounded px-2 py-1 text-sm flex-grow"
                />
                <button type="button" onClick={() => onRemove(index)} className="text-red-500 hover:text-red-700 p-1">
                    <Trash2 size={16}/>
                </button>
            </div>
            <div className="flex items-center gap-2 pl-8">
                <input
                    type="text"
                    value={link.href}
                    onChange={(e) => onUpdate(index, "href", e.target.value)}
                    placeholder="URL (e.g., /about)"
                    className="border rounded px-2 py-1 text-sm flex-grow"
                />
                <button
                    type="button"
                    ref={el => setPageButtonRef(index, el)} // Assign ref dynamically for each button
                    onClick={() => onSelectPage(index)}
                    className="text-xs text-blue-600 p-1 bg-blue-50 rounded hover:bg-blue-100"
                >
                    Page
                </button>
            </div>

            {/* Submenu Section */}
            {(link.submenu || []).map((sub, subIndex) => (
                <div key={sub.id} className="flex items-center gap-2 pl-12 mt-1">
                    <input
                        type="text"
                        value={sub.text}
                        onChange={(e) => onUpdate(index, "submenu", {
                            type: "update",
                            subIndex,
                            key: "text",
                            value: e.target.value,
                        })}
                        placeholder="Submenu Text"
                        className="border rounded px-2 py-1 text-sm w-1/2"
                    />
                    <input
                        type="text"
                        value={sub.href}
                        onChange={(e) => onUpdate(index, "submenu", {
                            type: "update",
                            subIndex,
                            key: "href",
                            value: e.target.value,
                        })}
                        placeholder="URL"
                        className="border rounded px-2 py-1 text-sm w-1/2"
                    />
                    <button
                        type="button"
                        onClick={() => onUpdate(index, "submenu", { type: "remove", subIndex })}
                        className="text-red-500 hover:text-red-700"
                    >
                        🗑
                    </button>
                    <button
                        type="button"
                        onClick={() => onSelectSubPage(index, subIndex)}
                        className="text-xs text-blue-600 p-1 bg-blue-50 rounded hover:bg-blue-100"
                    >
                        Page
                    </button>
                </div>
            ))}
            <button
                type="button"
                onClick={() => onUpdate(index, "submenu", { type: "add" })}
                className="text-xs text-blue-600 pl-12 mt-1 hover:underline"
            >
                + Add Submenu
            </button>
        </div>
    );
}

export default function HeaderOptions({ block, onChange }) {
    const props = block.props || {};

    const [projectPages, setProjectPages] = useState([]);
    const [showNavLinkPageSelector, setShowNavLinkPageSelector] = useState(-1); // Index of nav link with open selector
    const [showSubPageSelector, setShowSubPageSelector] = useState({}); // For submenu page selectors

    // NEW: Refs and state for NavLink page selectors
    const navLinkPageButtonRefs = useRef({}); // To store refs for each nav link's "Page" button
    const [navLinkPopupPositions, setNavLinkPopupPositions] = useState({}); // To store calculated positions for nav link popups

    // New states for Contact Button
    const [showContactButtonPageSelector, setShowContactButtonPageSelector] = useState(false);
    const contactButtonHrefInputRef = useRef(null);
    const [contactButtonPopupPosition, setContactButtonPopupPosition] = useState({});

    // New states for Search
    const [isSearchEnabled, setIsSearchEnabled] = useState(props.enableSearch || false);


    const fileInputRef = useRef(null);

    useEffect(() => {
        const currentProject = JSON.parse(localStorage.getItem("currentProject"));
        if (currentProject?.id) {
            getPagesByProject(currentProject.id)
                .then(pages => setProjectPages(pages))
                .catch(err => console.error("Failed to fetch project pages", err));
        }
    }, []);

    // Effect for Contact Button Page Selector Position (unchanged)
    useEffect(() => {
        if (showContactButtonPageSelector && contactButtonHrefInputRef.current) {
            const rect = contactButtonHrefInputRef.current.getBoundingClientRect();
            const POPUP_WIDTH = 250;

            let newTop = rect.top;
            let newLeft = rect.left;

            if (rect.left + POPUP_WIDTH > window.innerWidth) {
                newLeft = window.innerWidth - POPUP_WIDTH - 10;
            }
            if (newLeft < 0) {
                newLeft = 10;
            }

            const estimatedPopupHeight = projectPages.length * 32 + 20;
            if (rect.bottom + estimatedPopupHeight + 10 > window.innerHeight && rect.top - estimatedPopupHeight - 10 > 0) {
                newTop = rect.top - estimatedPopupHeight - 10;
            } else {
                newTop = rect.bottom + 10;
            }

            setContactButtonPopupPosition({
                top: newTop,
                left: newLeft,
                width: POPUP_WIDTH,
            });
        } else if (!showContactButtonPageSelector) { // Clear position when closed
            setContactButtonPopupPosition({});
        }
    }, [showContactButtonPageSelector, projectPages]);

    // NEW EFFECT: For NavLink Page Selector Position
    useEffect(() => {
        if (showNavLinkPageSelector !== -1 && navLinkPageButtonRefs.current[showNavLinkPageSelector]) {
            const rect = navLinkPageButtonRefs.current[showNavLinkPageSelector].getBoundingClientRect();
            const POPUP_WIDTH = 250;

            let newTop = rect.top;
            let newLeft = rect.left;

            if (rect.left + POPUP_WIDTH > window.innerWidth) {
                newLeft = window.innerWidth - POPUP_WIDTH - 10;
            }
            if (newLeft < 0) {
                newLeft = 10;
            }

            const estimatedPopupHeight = projectPages.length * 32 + 20;
            if (rect.bottom + estimatedPopupHeight + 10 > window.innerHeight && rect.top - estimatedPopupHeight - 10 > 0) {
                newTop = rect.top - estimatedPopupHeight - 10;
            } else {
                newTop = rect.bottom + 10;
            }

            setNavLinkPopupPositions((prev) => ({
                ...prev,
                [showNavLinkPageSelector]: {
                    top: newTop,
                    left: newLeft,
                    width: POPUP_WIDTH,
                },
            }));
        } else if (showNavLinkPageSelector === -1) { // Clear position when closed
            setNavLinkPopupPositions({});
        }
    }, [showNavLinkPageSelector, projectPages]);


    const handlePropChange = (key, value) => {
        onChange({ ...block, props: { ...block.props, [key]: value } });
    };

    const handleNavLinkChange = (index, key, value) => {
        const updatedLinks = [...(block.props.navLinks || [])];
        const link = { ...updatedLinks[index] };

        if (key === "submenu") {
            const submenu = [...(link.submenu || [])];
            if (value.type === "add") {
                submenu.push({ id: uuid(), text: "Sub Item", href: "#" });
            } else if (value.type === "update") {
                submenu[value.subIndex] = {
                    ...submenu[value.subIndex],
                    [value.key]: value.value,
                };
            } else if (value.type === "remove") {
                submenu.splice(value.subIndex, 1);
            }
            link.submenu = submenu;
        } else {
            link[key] = value;
        }

        updatedLinks[index] = link;
        onChange({ ...block, props: { ...block.props, navLinks: updatedLinks } });
    };

    const handleLinkToPage = (navIndex, pageId) => {
        handleNavLinkChange(navIndex, "href", `page://${pageId}`);
        setShowNavLinkPageSelector(-1); // Use for nav links
    };

    const handleLinkToSubPage = (navIndex, subIndex, pageId) => {
        handleNavLinkChange(navIndex, "submenu", {
            type: "update",
            subIndex,
            key: "href",
            value: `page://${pageId}`,
        });
        setShowSubPageSelector((prev) => ({ ...prev, [`${navIndex}-${subIndex}`]: false }));
    };

    const handleContactButtonLinkToPage = (pageId) => {
        handlePropChange("contactButtonHref", `page://${pageId}`);
        setShowContactButtonPageSelector(false);
    };


    const addNavLink = () => {
        const newLink = { id: uuid(), text: "New Link", href: "#", submenu: [] };
        const updatedLinks = [...(block.props.navLinks || []), newLink];
        handlePropChange("navLinks", updatedLinks);
    };

    const removeNavLink = (index) => {
        const updatedLinks = (block.props.navLinks || []).filter((_, i) => i !== index);
        handlePropChange("navLinks", updatedLinks);
    };

    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));
    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = block.props.navLinks.findIndex(link => link.id === active.id);
            const newIndex = block.props.navLinks.findIndex(link => link.id === over.id);
            const updatedLinks = arrayMove(block.props.navLinks, oldIndex, newIndex);
            handlePropChange("navLinks", updatedLinks);
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                handlePropChange("logoSrc", reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    // Helper to assign ref for NavLink page buttons
    const setNavLinkPageButtonRef = (index, el) => {
        navLinkPageButtonRefs.current[index] = el;
    };


    return (
        <div className="space-y-4">
            <h3 className="text-md font-semibold">Header Settings</h3>
            <div>
                <label className="block text-sm font-medium">Brand Name</label>
                <input type="text" value={block.props.brandName || ""} onChange={(e) => handlePropChange("brandName", e.target.value)} className="w-full border rounded px-2 py-1 mt-1" />
            </div>

            <div>
                <label className="block text-sm font-medium">Logo</label>
                <div className="flex items-center space-x-2 mt-1">
                    {block.props.logoSrc && (
                        <img src={block.props.logoSrc} alt="Logo Preview" className="h-10 w-auto object-contain border rounded p-1" />
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        className="hidden"
                    />
                    <button
                        type="button"
                        onClick={triggerFileInput}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                    >
                        Choose Image
                    </button>
                    {block.props.logoSrc && (
                        <button
                            type="button"
                            onClick={() => handlePropChange("logoSrc", "")}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                        >
                            Remove
                        </button>
                    )}
                </div>
                {block.props.logoSrc && !block.props.logoSrc.startsWith('data:') && (
                    <input
                        type="text"
                        value={block.props.logoSrc}
                        onChange={(e) => handlePropChange("logoSrc", e.target.value)}
                        placeholder="Or paste image URL"
                        className="w-full border rounded px-2 py-1 mt-2 text-sm"
                    />
                )}
                 {!block.props.logoSrc && (
                    <input
                        type="text"
                        value={block.props.logoSrc || ""}
                        onChange={(e) => handlePropChange("logoSrc", e.target.value)}
                        placeholder="Or paste image URL"
                        className="w-full border rounded px-2 py-1 mt-2 text-sm"
                    />
                )}
            </div>

            <div className="flex items-center justify-between">
                <label className="text-sm">Fixed Header</label>
                <input type="checkbox" checked={!!block.props.isFixed} onChange={(e) => handlePropChange("isFixed", e.target.checked)} />
            </div>

            <hr />

            <div>
                <label className="block text-sm font-medium mb-2">Navigation Links</label>
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={block.props.navLinks?.map(link => link.id) || []} strategy={verticalListSortingStrategy}>
                        {(block.props.navLinks || []).map((link, index) => (
                            <div key={link.id} className="relative">
                                <SortableNavLinkItem
                                    link={link}
                                    index={index}
                                    onUpdate={handleNavLinkChange}
                                    onRemove={removeNavLink}
                                    onSelectPage={() => setShowNavLinkPageSelector(showNavLinkPageSelector === index ? -1 : index)}
                                    onSelectSubPage={(i, subI) => {
                                        const key = `${i}-${subI}`;
                                        setShowSubPageSelector(prev => ({ ...prev, [key]: !prev[key] }));
                                    }}
                                    setPageButtonRef={setNavLinkPageButtonRef} // Pass ref function
                                />
                                {showNavLinkPageSelector === index && navLinkPopupPositions[index] && ( // Check if position is calculated
                                    <div
                                        style={{
                                            position: 'fixed',
                                            zIndex: 100001,
                                            top: navLinkPopupPositions[index].top,
                                            left: navLinkPopupPositions[index].left,
                                            width: navLinkPopupPositions[index].width,
                                            maxHeight: '200px', // Adjusted max height for nav link popup
                                            overflowY: 'auto',
                                            backgroundColor: 'white', border: '1px solid #d1d5db', borderRadius: '0.375rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                        }}
                                    >
                                        {projectPages.length > 0 ? (
                                            projectPages.map(page => (
                                                <button
                                                    key={page.id}
                                                    onClick={(e) => { e.stopPropagation(); handleLinkToPage(index, page.id); }}
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
                                {Object.entries(showSubPageSelector).map(([key, isVisible]) => {
                                    const [navIdx, subIdx] = key.split('-').map(Number);
                                    if (navIdx === index && isVisible) {
                                        return (
                                            // Submenu page selector's position needs its own ref/calculation for robustness
                                            <div key={key} className="absolute top-0 right-0 mt-12 w-48 bg-white border shadow-lg z-20 rounded-md">
                                                {projectPages.length > 0 ? (
                                                    projectPages.map(page => (
                                                        <button
                                                            key={page.id}
                                                            onClick={() => handleLinkToSubPage(navIdx, subIdx, page.id)}
                                                            className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                                                        >
                                                            {page.title}
                                                        </button>
                                                    ))
                                                ) : (
                                                    <div className="px-3 py-2 text-sm text-gray-500">No pages found.</div>
                                                )}
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                        ))}
                    </SortableContext>
                </DndContext>
                <button type="button" onClick={addNavLink} className="mt-2 text-sm text-blue-600 hover:underline">+ Add Navigation Link</button>
            </div>

            <hr />

            {/* --- CONTACT BUTTON SETTINGS --- */}
            <section className="space-y-3">
                <h4 className="text-md font-semibold text-gray-700 border-b pb-2">Contact Button</h4>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Enable Contact Button</label>
                    <input
                        type="checkbox"
                        checked={!!props.enableContactButton}
                        onChange={(e) => handlePropChange("enableContactButton", e.target.checked)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                </div>

                {props.enableContactButton && (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                            <input
                                type="text"
                                className="w-full border rounded px-2 py-1 text-sm"
                                value={props.contactButtonText || "Liên hệ ngay"}
                                onChange={(e) => handlePropChange("contactButtonText", e.target.value)}
                            />
                        </div>
                        <div className="relative"> {/* Added relative for popup */}
                            <label className="block text-sm font-medium text-gray-700 mb-1">Link URL</label>
                            <div className="flex gap-2 items-center">
                                <input
                                    ref={contactButtonHrefInputRef} // Assign ref
                                    type="text"
                                    className="w-full border rounded px-2 py-1 text-sm flex-grow"
                                    value={props.contactButtonHref || ""}
                                    onChange={(e) => handlePropChange("contactButtonHref", e.target.value)}
                                    placeholder="https://example.com or page://{id} or mailto:..."
                                />
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowContactButtonPageSelector(prev => !prev);
                                    }}
                                    className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600"
                                >
                                    Page
                                </button>
                            </div>
                            {showContactButtonPageSelector && contactButtonPopupPosition.top !== undefined && ( // Render popup
                                <div
                                    style={{
                                        position: 'fixed',
                                        zIndex: 100002, // Higher z-index than nav link selector
                                        top: contactButtonPopupPosition.top,
                                        left: contactButtonPopupPosition.left,
                                        width: contactButtonPopupPosition.width,
                                        maxHeight: '300px',
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
                                                onClick={(e) => { e.stopPropagation(); handleContactButtonLinkToPage(page.id); }}
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
                                className="w-full border rounded px-2 py-1 text-sm"
                                value={props.contactButtonTarget || "_self"}
                                onChange={(e) => handlePropChange("contactButtonTarget", e.target.value)}
                            >
                                <option value="_self">Same Tab (_self)</option>
                                <option value="_blank">New Tab (_blank)</option>
                            </select>
                        </div>
                        {/* Add style options for the button itself (colors, padding, border radius) */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Text Color</label>
                                <input type="color" className="w-full border rounded px-1 py-0.5 h-8" value={props.contactButtonTextColor || "#ffffff"} onChange={(e) => handlePropChange("contactButtonTextColor", e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Background</label>
                                <input type="color" className="w-full border rounded px-1 py-0.5 h-8" value={props.contactButtonBgColor || "#f0f0f0"} onChange={(e) => handlePropChange("contactButtonBgColor", e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Hover Text</label>
                                <input type="color" className="w-full border rounded px-1 py-0.5 h-8" value={props.contactButtonHoverTextColor || "#000000"} onChange={(e) => handlePropChange("contactButtonHoverTextColor", e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Hover BG</label>
                                <input type="color" className="w-full border rounded px-1 py-0.5 h-8" value={props.contactButtonHoverBgColor || "#e0e0e0"} onChange={(e) => handlePropChange("contactButtonHoverBgColor", e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Padding</label>
                            <input type="text" className="w-full border rounded px-2 py-1 text-sm" value={props.contactButtonPadding || "8px 16px"} onChange={(e) => handlePropChange("contactButtonPadding", e.target.value)} placeholder="e.g., 8px 16px" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Border Radius</label>
                            <input type="text" className="w-full border rounded px-2 py-1 text-sm" value={props.contactButtonBorderRadius || "4px"} onChange={(e) => handlePropChange("contactButtonBorderRadius", e.target.value)} placeholder="e.g., 4px" />
                        </div>
                    </>
                )}
            </section>

            <hr />

            {/* --- SEARCH BAR SETTINGS --- */}
            <section className="space-y-3">
                <h4 className="text-md font-semibold text-gray-700 border-b pb-2">Search Bar</h4>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Enable Search Bar</label>
                    <input
                        type="checkbox"
                        checked={!!props.enableSearch}
                        onChange={(e) => handlePropChange("enableSearch", e.target.checked)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                </div>
                {props.enableSearch && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Placeholder Text</label>
                        <input
                            type="text"
                            className="w-full border rounded px-2 py-1 text-sm"
                            value={props.searchPlaceholder || "Search..."}
                            onChange={(e) => handlePropChange("searchPlaceholder", e.target.value)}
                        />
                    </div>
                )}
            </section>


            {/* Existing general header options */}
            <hr />

            {/* NEW: Max Width for Header Content */}
            <div>
                <label htmlFor="headerMaxWidth" className="block text-sm font-medium text-gray-700 mb-1">
                    Max Width (Header Content)
                </label>
                <input
                    id="headerMaxWidth"
                    type="text"
                    value={props.maxWidth || ""}
                    onChange={(e) => handlePropChange("maxWidth", e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                    placeholder="e.g., 1200px or max-w-screen-xl"
                />
            </div>

            <div>
                <label htmlFor="backgroundColor" className="block text-sm font-medium text-gray-700 mb-1">
                    Background Color
                </label>
                <input type="color" value={props.backgroundColor || "#FFFFFF"} onChange={(e) => handlePropChange("backgroundColor", e.target.value)} className="w-full h-8 border rounded" />
            </div>
            <div>
                <label htmlFor="padding" className="block text-sm font-medium text-gray-700 mb-1">
                    Padding
                </label>
                <input type="text" value={props.padding || "1rem"} onChange={(e) => handlePropChange("padding", e.target.value)} className="w-full border rounded px-2 py-1 mt-1" placeholder="e.g., 1rem or 10px 20px" />
            </div>
        </div>
    );
}