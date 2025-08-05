import React, { useState } from "react";
import LayerItem from "@/components/LayerItem.jsx";
import ProjectLayoutSettings from "@/components/ProjectLayoutSettings";
import {
    Square,
    Heading,
    Text,
    MousePointerClick,
    Image as ImageIcon,
    LayoutTemplate,
    ChevronDown,
    ChevronRight,
    ArrowUp,
    ArrowDown,
    Italic,
    Quote,
    Star,
    Columns,
    Minus,
    Video,
    Music2,
    Images,
    FormInput,
    Megaphone,
    MessageSquare,
    LayoutPanelTop,
    Share2,
    MapPin,
    Code2,
    Menu,
    ChevronLeft,
} from "lucide-react";

import componentCategories from "@/utils/componentCategories.js";
import { motion } from "framer-motion";

const iconMap = {
    square: <Square className="w-4 h-4" />,
    heading: <Heading className="w-4 h-4" />,
    text: <Text className="w-4 h-4" />,
    mouse: <MousePointerClick className="w-4 h-4" />,
    image: <ImageIcon className="w-4 h-4" />,
    layout: <LayoutTemplate className="w-4 h-4" />,
    italic: <Italic className="w-4 h-4" />,
    quote: <Quote className="w-4 h-4" />,
    star: <Star className="w-4 h-4" />,
    columns: <Columns className="w-4 h-4" />,
    minus: <Minus className="w-4 h-4" />,
    video: <Video className="w-4 h-4" />,
    music: <Music2 className="w-4 h-4" />,
    images: <Images className="w-4 h-4" />,
    "form-input": <FormInput className="w-4 h-4" />,
    megaphone: <Megaphone className="w-4 h-4" />,
    "message-square": <MessageSquare className="w-4 h-4" />,
    "layout-panel-top": <LayoutPanelTop className="w-4 h-4" />,
    "share-2": <Share2 className="w-4 h-4" />,
    "map-pin": <MapPin className="w-4 h-4" />,
    code: <Code2 className="w-4 h-4" />,
    menu: <Menu className="w-4 h-4" />,
};

const Sidebar = ({ onAddComponent, canvasElements, selectedElement, onSelectElement, onMoveElement, setCanvasElements }) => {
    const [activeTab, setActiveTab] = useState("components");
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [openCategories, setOpenCategories] = useState(() => {
        const initial = {};
        componentCategories.forEach((cat) => {
            initial[cat.id] = true;
        });
        return initial;
    });

    const toggleCategory = (id) => {
        setOpenCategories((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const getRootElements = (elements) => {
        const childIds = new Set();
        elements.forEach((el) => {
            const children = el.props?.children || [];
            children.forEach((id) => childIds.add(id));
        });
        return elements.filter((el) => !childIds.has(el.id));
    };

    
    const renderLayers = (elements, level = 0, path = []) => {
        return elements.map((element, index) => {
            const isSelected = selectedElement?.id === element.id;
            const childrenIds = element.props?.children || [];
            const childBlocks = childrenIds.map((id) => canvasElements.find((el) => el.id === id)).filter(Boolean);
            const currentPath = [...path, index + 1];
            const displayIndex = currentPath.join(".");
    const duplicateBlock = (blockId) => {
  const blockToCopy = canvasElements.find(b => b.id === blockId);
  if (!blockToCopy) return;

  const newIdMap = new Map();

  const deepCloneBlock = (block) => {
    const newId = crypto.randomUUID();
    newIdMap.set(block.id, newId);

    const cloned = {
      ...structuredClone(block),
      id: newId,
    };

    if (cloned.props?.children) {
      cloned.props.children = cloned.props.children.map(childId => {
        const child = canvasElements.find(b => b.id === childId);
        if (child) {
          const clonedChild = deepCloneBlock(child);
          clonedChildren.push(clonedChild);
          return clonedChild.id;
        }
        return childId;
      });
    }

    return cloned;
  };

  const clonedChildren = [];
  const clonedRoot = deepCloneBlock(blockToCopy);

  const newCanvas = [...canvasElements, clonedRoot, ...clonedChildren];
  setCanvasElements(newCanvas); // ✅ đây là dòng quan trọng
  
  setTimeout(() => {
  const el = document.querySelector(`[data-block-id="${clonedRoot.id}"]`);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
}, 100);


};
            return (
                <div key={element.id} className={`space-y-1 pl-${Math.min(level * 4, 16)}`}>
                    <div
                        className={`flex items-center gap-2 group hover:bg-gray-100 rounded cursor-pointer px-2 py-1 border ${
                            isSelected ? "bg-blue-50 border-blue-500" : "border-transparent"
                        }`}
                        onClick={() => onSelectElement(element)}
                    >
                        <div className="flex items-center gap-2">
                            {level > 0 && (
                                <span className="text-xs text-gray-400 ml-[-6px] mr-1">
                                    {index === elements.length - 1 ? "└──" : "├──"}
                                </span>
                            )}
                            <div className="text-sm text-gray-500 w-8 text-right">{displayIndex}</div>
                        </div>

                        <div className="flex-1">
                            <LayerItem element={element} isSelected={isSelected} onSelectElement={onSelectElement} />
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
  <button
    className="text-gray-600 hover:text-black"
    title="Move up"
    onClick={(e) => {
      e.stopPropagation();
      onMoveElement(element.id, -1);
    }}
  >
    <ArrowUp size="18px" />
  </button>
  <button
    className="text-gray-600 hover:text-black"
    title="Move down"
    onClick={(e) => {
      e.stopPropagation();
      onMoveElement(element.id, 1);
    }}
  >
    <ArrowDown size="18px" />
  </button>
  <button
    className="text-gray-600 hover:text-green-600"
    title="Duplicate block"
    onClick={(e) => {
      e.stopPropagation();
      duplicateBlock(element.id);
    }}
  >
    📋
  </button>
</div>
                    </div>

                    {childBlocks.length > 0 && renderLayers(childBlocks, level + 1, currentPath)}
                </div>
            );
        });
    };

    return (
        <motion.aside
            animate={{ width: isCollapsed ? 60 : 260 }}
            className="bg-white border-r border-gray-200 flex flex-col h-screen overflow-hidden relative transition-all"
        >
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute  -right-0 top-1/2 transform -translate-y-1/2 bg-white border rounded-full shadow p-1 z-100 "
            >
                {isCollapsed ? <ChevronRight size={22} /> : <ChevronLeft size={22} />}
            </button>

            <div className={`flex ${isCollapsed ? "flex-col items-center py-2 gap-2" : "border-b"}`}>
                {["components", "layers"].map((tab) => (
                    <button
                        key={tab}
                        className={`flex items-center ${
                            isCollapsed ? "justify-center w-full py-3" : "px-4 py-3 w-1/2 justify-center"
                        } text-sm font-medium ${
                            activeTab === tab
                                ? "text-blue-600 border-b-2 border-blue-600"
                                : "text-gray-600 hover:bg-gray-100"
                        }`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            <div className="flex-grow overflow-y-auto">
                {activeTab === "components" && !isCollapsed && (
                    <div className="p-4">
                        <h3 className="text-sm font-semibold mb-4 text-gray-500">Drag or click to add</h3>
                        {componentCategories.map((cat) => {
                            const isOpen = openCategories[cat.id] ?? true;
                            return (
                                <div key={cat.id} className="mb-4 border rounded">
                                    <button
                                        className="w-full flex items-center justify-between px-2 py-2 bg-gray-100 font-medium text-gray-700 hover:bg-gray-200"
                                        onClick={() => toggleCategory(cat.id)}
                                    >
                                        <div className="flex items-center gap-2">
                                            {iconMap[cat.icon]} {cat.label}
                                        </div>
                                        {isOpen ? (
                                            <ChevronDown className="w-4 h-4 ml-1" />
                                        ) : (
                                            <ChevronRight className="w-4 h-4" />
                                        )}
                                    </button>
                                    {isOpen && (
                                        <div className="p-2 space-y-2">
                                            {cat.components.map((comp) => (
                                                <button
                                                    key={comp.type}
                                                    onClick={() => onAddComponent(comp.type)}
                                                    className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded bg-gray-50 hover:bg-gray-100 border"
                                                >
                                                    {iconMap[comp.icon] || <Square className="w-4 h-4" />} {comp.label}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                        <ProjectLayoutSettings allBlocks={canvasElements} />
                    </div>
                )}

                {activeTab === "layers" && !isCollapsed && (
                    <div className="p-4">
                        <h3 className="text-sm font-semibold mb-4 text-gray-500">
                            Drag or click to reorder layers. Top items appear in front.
                        </h3>
                        {canvasElements.length === 0 ? (
                            <p className="text-gray-500">No elements added yet. Drag components to the canvas!</p>
                        ) : (
                            <div className="space-y-1">{renderLayers(getRootElements(canvasElements))}</div>
                        )}
                    </div>
                )}
            </div>
        </motion.aside>
    );
};

export default Sidebar;
