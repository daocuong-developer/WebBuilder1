

// src/components/common/IconPicker.jsx
import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";

const AllIcons = { ...FaIcons };
const iconNames = Object.keys(AllIcons);

const IconPicker = ({ value, onSelect }) => {
    const [search, setSearch] = useState("");

    const filteredIcons = iconNames.filter((name) => name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="space-y-2">
            <input
                type="text"
                placeholder="Search icons..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border px-3 py-2 rounded text-sm"
            />

            <div className="grid grid-cols-6 gap-2 max-h-64 overflow-y-auto border rounded p-2 bg-white">
                {filteredIcons.map((name) => {
                    const Icon = AllIcons[name];
                    const isSelected = value === name;

                    return (
                        <button
                            key={name}
                            onClick={() => onSelect(name)}
                            title={name}
                            className={`flex items-center justify-center p-2 border rounded hover:bg-gray-100 ${
                                isSelected ? "bg-blue-100 border-blue-500" : ""
                            }`}
                        >
                            <Icon size={20} />
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default IconPicker;
