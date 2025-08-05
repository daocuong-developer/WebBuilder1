// src/components/PropertyPanel/properties/dividerOptions.jsx
import React from 'react';

const DividerOptions = ({ block, handleChange }) => (
    <>
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
            <input
                type="color"
                className="w-full border rounded px-2 py-1"
                value={block.props.color || "#cccccc"}
                onChange={(e) => handleChange("color", e.target.value)}
            />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Thickness (px)</label>
            <input
                type="number"
                className="w-full border rounded px-2 py-1"
                value={block.props.thickness || 1}
                onChange={(e) => handleChange("thickness", parseInt(e.target.value))}
            />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Style</label>
            <select
                className="w-full border rounded px-2 py-1"
                value={block.props.style || "solid"}
                onChange={(e) => handleChange("style", e.target.value)}
            >
                <option value="solid">Solid</option>
                <option value="dashed">Dashed</option>
                <option value="dotted">Dotted</option>
            </select>
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Width (%)</label>
            <input
                type="number"
                className="w-full border rounded px-2 py-1"
                value={block.props.width || 100}
                onChange={(e) => handleChange("width", parseInt(e.target.value))}
            />
        </div>
    </>
);

export default DividerOptions; 