// src/components/SectionBlock.jsx
import React, { useState, useRef, useEffect } from "react"; // Added useRef, useEffect
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { PlusCircle, Trash2 } from "lucide-react";
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

export default function SectionBlock({
    block,
    blocks,
    onSelect,
    onChange,
    isPreview,
    selectedBlockId,
    setBlocks,
    onAddBlock,
    device,
}) {
    const { style = {}, children = [] } = block.props;

    const [openAddMenu, setOpenAddMenu] = useState(false);
    const addButtonRef = useRef(null); // Ref for the "Add Block" button
    const [popupPosition, setPopupPosition] = useState({}); // State for popup position

    const getChildBlocksInSection = () => {
        return children.map((childId) => blocks.find((b) => b.id === childId)).filter(Boolean);
    };

    const handleAddBlockToSection = (type) => {
        const newBlockProps = getDefaultProps(type);
        const newBlockId = uuid();
        const newBlock = { id: newBlockId, type: type, props: newBlockProps, parentId: block.id };

        const updatedChildren = [...children, newBlockId];

        onChange({
            ...block,
            props: {
                ...block.props,
                children: updatedChildren,
            },
        });
        setBlocks((prevBlocks) => [...prevBlocks, newBlock]);
        setOpenAddMenu(false);
        onSelect(newBlockId);
    };

    const handleDeleteChildBlock = (childId) => {
        const updatedChildren = children.filter((id) => id !== childId);
        onChange({
            ...block,
            props: {
                ...block.props,
                children: updatedChildren,
            },
        });
        setBlocks((prevBlocks) => prevBlocks.filter((b) => b.id !== childId));
        if (selectedBlockId === childId) {
            onSelect(block.id);
        }
    };

    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            const currentChildren = getChildBlocksInSection();
            const oldIndex = currentChildren.findIndex((b) => b.id === active.id);
            const newIndex = currentChildren.findIndex((b) => b.id === over.id);

            if (oldIndex !== -1 && newIndex !== -1) {
                const updatedChildIds = arrayMove(children, oldIndex, newIndex);
                onChange({
                    ...block,
                    props: {
                        ...block.props,
                        children: updatedChildIds,
                    },

                });
            }
        }
    };

    const commonPropsForChildren = {
        blocks,
        onSelect,
        onChange,
        isPreview,
        selectedBlock: blocks.find((b) => b.id === selectedBlockId),
        selectedBlockId,
        setBlocks,
        onAddBlock,
        onDeleteBlock: handleDeleteChildBlock,
        device,
    };

    const sectionStyle = {
        overflow: 'hidden',
        ...style,
        backgroundImage: style.backgroundImage ? `url(${style.backgroundImage})` : "none",
        backgroundSize: style.backgroundSize || "cover",
        backgroundPosition: style.backgroundPosition || "center center",
        backgroundRepeat: "no-repeat",
        border:
            selectedBlockId === block.id && !isPreview
                ? "2px dashed #3B82F6"
                : style.border || "1px dashed transparent",
        backgroundColor: style.backgroundColor || "transparent",
        maxWidth: style.maxWidth || "100%",
        margin: style.margin || (style.maxWidth ? "0 auto" : "0"),
    };

    if (sectionStyle.maxWidth && sectionStyle.margin !== "0 auto" && !isPreview) {
        sectionStyle.margin = "0 auto";
    }

    // Effect to calculate and set popup position when menu opens
    useEffect(() => {
        if (openAddMenu && addButtonRef.current) {
            const rect = addButtonRef.current.getBoundingClientRect();
            // Calculate position relative to the viewport (fixed positioning)
            setPopupPosition({
                top: rect.top - 2, // Position slightly above the button
                left: rect.left,
                width: rect.width, // Match the button's width
                // OR a fixed width if you prefer consistent popup width:
                // width: 300,
                // left: rect.left + (rect.width / 2) - 150, // For fixed width, center it on the button
            });
        }
    }, [openAddMenu]); // Re-run when openAddMenu changes

    return (
        <div
            style={sectionStyle}
            onClick={(e) => {
                e.stopPropagation();
                if (!isPreview) onSelect(block.id);
            }}
            className="section-block-wrapper relative flex flex-col min-h-[200px] px-4"
        >
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext
                    items={getChildBlocksInSection().map((b) => b.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {getChildBlocksInSection().length > 0 ? (
                        getChildBlocksInSection().map((childBlock) => (
                            <SortableChildItem
                                key={childBlock.id}
                                block={childBlock}
                                commonProps={commonPropsForChildren}
                            />
                        ))
                    ) : (
                        <div className="text-center text-gray-400 text-sm py-8 cursor-pointer flex-1 flex items-center justify-center">
                            Drag components here or add below
                        </div>
                    )}
                </SortableContext>
            </DndContext>

            {!isPreview && (
                <div className="relative mt-auto p-2">
                    <button
                        ref={addButtonRef} // Assign the ref to the button
                        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 flex items-center justify-center text-sm"
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpenAddMenu((prev) => !prev);
                        }}
                    >
                        <PlusCircle size={16} className="mr-1" /> Add Block to Section
                    </button>
                    {openAddMenu && (
                        // Apply calculated position and styling
                        <div
                            style={{
                                position: 'fixed', // Fixed positioning
                                zIndex: 99999, // Super high z-index
                                ...popupPosition, // Apply calculated top, left, width
                                maxHeight: '70vh', // Max height for scrolling
                                overflowY: 'auto', // Enable vertical scrolling
                                backgroundColor: 'white',
                                border: '1px solid #d1d5db',
                                borderRadius: '0.375rem',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                            }}
                        >
                            {BLOCK_TYPES.map((type) => (
                                <button
                                    key={type}
                                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 capitalize"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleAddBlockToSection(type);
                                    }}
                                >
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