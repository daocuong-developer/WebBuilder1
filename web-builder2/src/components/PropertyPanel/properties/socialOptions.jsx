import React from "react";
import IconPicker from "@/components/common/IconPicker"; // Bạn đã có sẵn

const SocialOptions = ({ block, handleChange }) => {
    const selectedIconsList = block.props.selectedIconsList || [];

    const addIcon = (iconName) => {
        if (!selectedIconsList.includes(iconName)) {
            handleChange("selectedIconsList", [...selectedIconsList, iconName]);
        }
    };

    const removeIcon = (iconName) => {
        handleChange(
            "selectedIconsList",
            selectedIconsList.filter((icon) => icon !== iconName)
        );
    };

    const renderInput = (label, key, type = "text") => (
        <div className="mb-3">
            <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
            <input
                type={type}
                value={block.props[key] || ""}
                onChange={(e) => handleChange(key, type === "number" ? Number(e.target.value) : e.target.value)}
                className="w-full border rounded px-2 py-1 text-sm"
            />
        </div>
    );

    return (
        <div>
            <p className="text-sm text-gray-600 italic mb-3">Customize social share icons.</p>

            {renderInput("Share URL", "shareUrl")}
            {renderInput("Share Text", "shareText")}
            {renderInput("Icon Color", "iconColor", "color")}
            {renderInput("Icon Size", "iconSize", "number")}
            {renderInput("Padding", "padding")}
            {renderInput("Margin", "margin")}

            <div className="mb-4">
                <label className="block text-xs font-medium text-gray-600 mb-1">Alignment</label>
                <select
                    className="w-full border rounded px-2 py-1 text-sm"
                    value={block.props.alignment || "center"}
                    onChange={(e) => handleChange("alignment", e.target.value)}
                >
                    <option value="flex-start">Left</option>
                    <option value="center">Center</option>
                    <option value="flex-end">Right</option>
                </select>
            </div>

            <h4 className="text-sm font-semibold text-gray-700 mb-2">Selected Icons</h4>
            <div className="flex flex-wrap gap-3 mb-3">
                {selectedIconsList.map((iconName, index) => (
                    <div key={index} className="flex items-center gap-2 border px-2 py-1 rounded bg-gray-50">
                        <span>{iconName}</span>
                        <button onClick={() => removeIcon(iconName)} className="text-red-500 text-xs hover:underline">
                            Remove
                        </button>
                    </div>
                ))}
            </div>

            <IconPicker
                onSelect={(icon) => addIcon(icon)}
                excludeIcons={selectedIconsList} // để ẩn icon đã chọn khỏi picker
            />
        </div>
    );
};

export default SocialOptions;
