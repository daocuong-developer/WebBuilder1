import React from "react";

const MapOptions = ({ block, handleChange }) => {
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
            <p className="text-sm text-gray-600 italic mb-3">Customize Google Map settings.</p>

            {renderInput("Location (address or city)", "location")}
            {renderInput("Zoom Level (1-20)", "zoom", "number")}

            <div className="mb-3">
                <label className="block text-xs font-medium text-gray-600 mb-1">Map Type</label>
                <select
                    value={block.props.mapType || "roadmap"}
                    onChange={(e) => handleChange("mapType", e.target.value)}
                    className="w-full border rounded px-2 py-1 text-sm"
                >
                    <option value="roadmap">Roadmap</option>
                    <option value="satellite">Satellite</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="terrain">Terrain</option>
                </select>
            </div>

            {renderInput("Width (e.g. 100%, 800px)", "width")}
            {renderInput("Height (e.g. 400px)", "height")}
        </div>
    );
};

export default MapOptions;
