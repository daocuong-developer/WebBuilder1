import React from "react";

const ContainerOptions = ({ block, handleChange }) => (
    <>
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Background Color</label>
            <input
                type="color"
                className="w-full border rounded px-2 py-1"
                value={block.props.backgroundColor || "#ffffff"}
                onChange={(e) => handleChange("backgroundColor", e.target.value)}
            />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Padding (CSS value)</label>
            <input
                type="text"
                className="w-full border rounded px-2 py-1"
                value={block.props.padding || "20px"}
                onChange={(e) => handleChange("padding", e.target.value)}
            />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Margin (CSS value)</label>
            <input
                type="text"
                className="w-full border rounded px-2 py-1"
                value={block.props.margin || "0"}
                onChange={(e) => handleChange("margin", e.target.value)}
            />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Border Radius (px)</label>
            <input
                type="number"
                className="w-full border rounded px-2 py-1"
                value={block.props.borderRadius || 0}
                onChange={(e) => handleChange("borderRadius", parseInt(e.target.value))}
            />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Min Height (px or auto)</label>
            <input
                type="text"
                className="w-full border rounded px-2 py-1"
                value={block.props.minHeight || "auto"}
                onChange={(e) => handleChange("minHeight", e.target.value)}
            />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Max Width (px or %)</label>
            <input
                type="text"
                className="w-full border rounded px-2 py-1"
                value={block.props.maxWidth || "100%"}
                onChange={(e) => handleChange("maxWidth", e.target.value)}
            />
        </div>
        <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Display</label>
            <select
                className="w-full border rounded px-2 py-1"
                value={block.props.display || "block"}
                onChange={(e) => handleChange("display", e.target.value)}
            >
                <option value="block">Block</option>
                <option value="flex">Flex</option>
                <option value="grid">Grid</option>
            </select>
            {block.props.display === "flex" && (
                <>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Flex Direction</label>
                    <select
                        className="w-full border rounded px-2 py-1"
                        value={block.props.flexDirection || "row"}
                        onChange={(e) => handleChange("flexDirection", e.target.value)}
                    >
                        <option value="row">Row</option>
                        <option value="column">Column</option>
                    </select>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Justify Content</label>
                    <select
                        className="w-full border rounded px-2 py-1"
                        value={block.props.justifyContent || "flex-start"}
                        onChange={(e) => handleChange("justifyContent", e.target.value)}
                    >
                        <option value="flex-start">Flex Start</option>
                        <option value="flex-end">Flex End</option>
                        <option value="center">Center</option>
                        <option value="space-between">Space Between</option>
                        <option value="space-around">Space Around</option>
                    </select>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Align Items</label>
                    <select
                        className="w-full border rounded px-2 py-1"
                        value={block.props.alignItems || "flex-start"}
                        onChange={(e) => handleChange("alignItems", e.target.value)}
                    >
                        <option value="flex-start">Flex Start</option>
                        <option value="flex-end">Flex End</option>
                        <option value="center">Center</option>
                        <option value="stretch">Stretch</option>
                    </select>
                </>
            )}
        </div>
    </>
);

export default ContainerOptions;
