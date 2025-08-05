import React from "react";

const AccordionOptions = ({ block, handleChange }) => {
    const handleItemChange = (index, key, value) => {
        const newItems = [...(block.props.items || [])];
        if (!newItems[index]) {
            newItems[index] = {};
        }
        newItems[index][key] = value;
        handleChange("items", newItems);
    };

    const addItem = () => {
        handleChange("items", [...(block.props.items || []), { title: "New Item", content: "Content here." }]);
    };

    const removeItem = (index) => {
        const newItems = (block.props.items || []).filter((_, i) => i !== index);
        handleChange("items", newItems);
    };

    const renderStyleInput = (label, propKey, type = "text") => (
        <div className="mb-2">
            <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
            <input
                type={type}
                value={block.props[propKey] || ""}
                onChange={(e) => handleChange(propKey, e.target.value)}
                className="w-full border rounded px-2 py-1 text-sm"
            />
        </div>
    );

    return (
        <>
            <p className="text-sm text-gray-600 italic mb-3">Tuỳ chỉnh nội dung và giao diện Accordion.</p>

            {/* Accordion Items */}
            {(block.props.items || []).map((item, index) => (
                <div key={index} className="border p-3 mb-3 rounded-md bg-gray-50">
                    <h5 className="text-sm font-semibold mb-2">Item {index + 1}</h5>
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
                        <input
                            className="w-full border rounded px-2 py-1 text-sm"
                            value={item.title || ""}
                            onChange={(e) => handleItemChange(index, "title", e.target.value)}
                        />
                    </div>
                    <div className="mt-2">
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                            Content (Markdown supported)
                        </label>
                        <textarea
                            className="w-full border rounded px-2 py-1 text-sm"
                            rows="3"
                            value={item.content || ""}
                            onChange={(e) => handleItemChange(index, "content", e.target.value)}
                        />
                    </div>
                    <button
                        className="mt-3 bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600"
                        onClick={() => removeItem(index)}
                    >
                        Remove Item
                    </button>
                </div>
            ))}

            <button
                className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 mt-2 mb-4"
                onClick={addItem}
            >
                Add Item
            </button>

            <hr className="my-4" />

            {/* Style Section */}
            <h4 className="text-sm font-semibold mb-2">Style Settings</h4>
            {renderStyleInput("Border", "border")}
            {renderStyleInput("Border Radius", "borderRadius")}
            {renderStyleInput("Margin", "margin")}
            {renderStyleInput("Max Width", "maxWidth")}

            {renderStyleInput("Header Background Color", "headerBgColor", "color")}
            {renderStyleInput("Header Text Color", "headerTextColor", "color")}
            {renderStyleInput("Header Padding", "headerPadding")}

            {renderStyleInput("Item Border", "itemBorder")}
            {renderStyleInput("Content Background Color", "contentBgColor", "color")}
            {renderStyleInput("Content Text Color", "contentTextColor", "color")}
            {renderStyleInput("Content Padding", "contentPadding")}
        </>
    );
};

export default AccordionOptions;
