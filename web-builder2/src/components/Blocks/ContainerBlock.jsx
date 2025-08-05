// src/components/Blocks/ContainerBlock.jsx
import React, { useState, useRef, useEffect } from "react";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable"; // CORRECTED IMPORT
import { CSS } from "@dnd-kit/utilities"; // Correct
import { PlusCircle } from "lucide-react";
import { v4 as uuid } from "uuid";
import getDefaultProps, { BLOCK_TYPES } from "@/utils/defaultProps";

import RenderBlock from "@/components/RenderBlock";

// Component con để render block con có thể kéo thả được
function SortableChildItem({ block, commonProps }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: block.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        position: "relative",
    };

    const isSelected = commonProps.selectedBlockId === block.id;

    return (
        <div
            ref={setNodeRef}
            style={style}
            // ✅ Đảm bảo `min-w-0` ở đây để các khối con trong một flex/grid container có thể co lại
            className={`
                w-full
                min-w-0
                relative
                ${
                    isSelected && !commonProps.isPreview
                        ? "border-2 border-blue-500 bg-blue-50"
                        : "border-2 border-transparent hover:border-gray-300"
                }
                p-2 rounded cursor-pointer transition
                ${commonProps.isPreview ? "" : "group"}
            `}
            onClick={(e) => {
                e.stopPropagation();
                if (!commonProps.isPreview) commonProps.onSelect(block.id);
            }}
        >
            <div
                className="absolute top-0 right-0 p-1 bg-white border border-gray-300 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
                {...attributes}
                {...listeners}
            >
                {!commonProps.isPreview && (
                    <div className="flex space-x-1">
                        <button
                            className="text-red-500 hover:text-red-700"
                            onClick={(e) => {
                                e.stopPropagation();
                                commonProps.onDeleteBlock(block.id);
                            }}
                            title="Delete Block"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                )}
            </div>
            <RenderBlock block={block} {...commonProps} />
        </div>
    );
}

export default function ContainerBlock({
    block,
    blocks,
    onSelect,
    onChange,
    isPreview,
    onAddBlock,
    selectedBlockId,
    onDeleteBlock,
    device,
}) {
    const props = {
        ...getDefaultProps(block.type),
        ...block.props,
    };

    const [openAddMenu, setOpenAddMenu] = useState(false);
    const addButtonRef = useRef(null); // Ref for the add button
    const [popupPosition, setPopupPosition] = useState({}); // State to store popup's position

    const layoutType = props.layoutType || "block";
    const children = props.children || [];

    const commonPropsForChildren = {
        blocks, onSelect, onChange, isPreview, selectedBlockId, onAddBlock, onDeleteBlock, device
    };

    const layoutClass = layoutType === 'flex' ? 'flex flex-col md:flex-row' : '';

    const layoutStyle = {
        width: props.width || "100%",
        minHeight: props.minHeight || "50px",
        padding: props.padding,
        margin: props.margin,
        backgroundColor: props.backgroundColor,
        border: !isPreview && selectedBlockId === block.id ? "2px dashed #3B82F6" : "1px dashed #ccc",
        position: "relative",
        gap: props.gap,
    };

    // Logic cho Grid (nếu có)
    if (layoutType === 'grid') {
        layoutStyle.display = 'grid';
        layoutStyle.gridTemplateColumns = props.gridTemplateColumns || '1fr';
    }

    // Effect to calculate and set popup position when menu opens
    useEffect(() => {
        if (openAddMenu && addButtonRef.current) {
            const rect = addButtonRef.current.getBoundingClientRect();
            const POPUP_FIXED_WIDTH = 250; // <--- Tăng chiều rộng cố định tại đây (ví dụ 250px)

            // Calculate position relative to the viewport (for fixed positioning)
            let newTop = rect.top - (BLOCK_TYPES.length * 32) - 10; // Initial attempt to open above
            const popupHeightEstimate = BLOCK_TYPES.length * 32 + 20; // Estimated height of list + padding

            // Check if opening above will go off screen
            if (rect.top - popupHeightEstimate - 10 < 0) {
                newTop = rect.bottom + 10; // If not enough space above, open below
            }

            setPopupPosition({
                top: newTop,
                left: rect.left + (rect.width / 2) - (POPUP_FIXED_WIDTH / 2), // Center the fixed-width popup on the button
                width: POPUP_FIXED_WIDTH, // Use fixed width
            });
        }
    }, [openAddMenu, block.id]);

    return (
        <div
            style={layoutStyle}
            className={layoutClass}
            onClick={(e) => {
                e.stopPropagation();
                if (!isPreview) onSelect(block.id);
            }}
        >
            {children.length > 0 ? (
                children.map((childId) => {
                    const childBlock = blocks?.find((b) => b.id === childId);
                    return childBlock ? <RenderBlock key={childBlock.id} {...commonPropsForChildren} block={childBlock} /> : null;
                })
            ) : !isPreview ? (
                <div className="text-sm text-gray-400 italic text-center p-4 m-2 border border-dashed rounded-md flex items-center justify-center min-h-[50px]">
                    Empty Container
                </div>
            ) : null}

            {!isPreview && selectedBlockId === block.id && (
                <div className="absolute bottom-2 right-2 z-10">
                    <button
                        ref={addButtonRef} // Assign ref to the button
                        className="bg-green-500 text-white p-2 rounded-full shadow-lg hover:bg-green-600"
                        onClick={(e) => { e.stopPropagation(); setOpenAddMenu((p) => !p); }}
                    >
                        <PlusCircle size={24} />
                    </button>
                    {openAddMenu && (
                        <div
                            style={{
                                position: 'fixed', // Force fixed positioning
                                zIndex: 99999, // Extremely high z-index
                                ...popupPosition, // Apply calculated position (includes top, left, width)
                                maxHeight: '70vh', // Max height for scrolling (70% of viewport height)
                                overflowY: 'auto', // Enable vertical scrolling
                                backgroundColor: 'white',
                                border: '1px solid #d1d5db',
                                borderRadius: '0.375rem',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                            }}
                        >
                           {BLOCK_TYPES.map((type) => (
                                <button key={type} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 capitalize"
                                    onClick={(e) => { e.stopPropagation(); onAddBlock(type, block.id); setOpenAddMenu(false); }}>
                                    {type}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}