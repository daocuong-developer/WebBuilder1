import React from "react";

const FontOptions = ({ value = {}, onChange }) => (
    <div className="flex flex-wrap items-center gap-3 mb-3">
        <label className="text-sm w-full font-medium text-gray-700">Font Options:</label>
        <div className="flex items-center gap-2">
            <label className="text-sm">Weight</label>
            <select
                className="border rounded px-2 py-1 text-sm"
                value={value.fontWeight || "normal"}
                onChange={(e) => onChange({ ...value, fontWeight: e.target.value })}
            >
                <option value="normal">Normal</option>
                <option value="bold">Bold</option>
            </select>
        </div>
        <div className="flex items-center gap-2">
            <label className="text-sm">Style</label>
            <select
                className="border rounded px-2 py-1 text-sm"
                value={value.fontStyle || "normal"}
                onChange={(e) => onChange({ ...value, fontStyle: e.target.value })}
            >
                <option value="normal">Normal</option>
                <option value="italic">Italic</option>
            </select>
        </div>
        <div className="flex items-center gap-2">
            <label className="text-sm">Size</label>
            <select
                className="border rounded px-2 py-1 text-sm"
                value={value.fontSize || "base"}
                onChange={(e) => onChange({ ...value, fontSize: e.target.value })}
            >
                <option value="sm">Small</option>
                <option value="base">Base</option>
                <option value="lg">Large</option>
                <option value="xl">Extra Large</option>
            </select>
        </div>
    </div>
);

export default FontOptions;
