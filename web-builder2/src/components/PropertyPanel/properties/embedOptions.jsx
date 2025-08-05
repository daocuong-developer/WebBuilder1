import React from "react";

const EmbedOptions = ({ block, handleChange }) => {
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
            <p className="text-sm text-gray-600 italic mb-3">Paste any embed code below (e.g. YouTube, Maps, Forms, etc).</p>

            <div className="mb-4">
                <label className="block text-xs font-medium text-gray-600 mb-1">Embed Code (HTML)</label>
                <textarea
                    className="w-full border rounded px-2 py-1 text-sm"
                    rows="5"
                    value={block.props.code || ""}
                    onChange={(e) => handleChange("code", e.target.value)}
                    placeholder='<iframe src="..."></iframe>'
                />
            </div>

            {renderInput("Padding", "padding")}
            {renderInput("Margin", "margin")}
            {renderInput("Width", "width")}
            {renderInput("Height", "height")}
        </div>
    );
};

export default EmbedOptions;
