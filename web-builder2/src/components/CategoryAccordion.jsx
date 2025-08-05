// src/components/CategoryAccordion.jsx
import React, { useState } from "react";
import { ChevronDown, ChevronRight, MousePointerClick } from "lucide-react";

const CategoryAccordion = ({ category }) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleAccordion = () => setIsOpen(!isOpen);

    return (
        <div className="mb-4 border rounded-md shadow-sm bg-white">
            <button
                onClick={toggleAccordion}
                className="w-full px-3 py-2 flex justify-between items-center hover:bg-gray-50"
            >
                <div className="flex items-center font-medium text-gray-700">
                    {category.icon && <span className="mr-2">{category.icon}</span>}
                    {category.label}
                </div>
                {isOpen ? (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                ) : (
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                )}
            </button>

            {isOpen && (
                <div className="p-2 space-y-2">
                    {category.components.map((component) => (
                        <div
                            key={component.type}
                            draggable
                            onDragStart={(e) => {
                                e.dataTransfer.setData(
                                    "component",
                                    JSON.stringify({ type: component.type, props: {} })
                                );
                            }}
                            className="flex items-center justify-between px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 cursor-move text-sm"
                        >
                            <span>{component.label}</span>
                            <MousePointerClick className="w-4 h-4 text-gray-400" />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryAccordion;
