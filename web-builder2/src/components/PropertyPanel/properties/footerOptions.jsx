// src/components/PropertyPanel/properties/footerOptions.jsx
import React from "react";
import { Trash2 } from "lucide-react";

const FooterOptions = ({ block, handleChange }) => {
    const props = block.props || {};

    const handleColumnChange = (index, key, value) => {
        const updated = [...props.columns];
        updated[index][key] = value;
        handleChange("columns", updated);
    };

    const handleItemChange = (colIdx, itemIdx, value) => {
        const updated = [...props.columns];
        updated[colIdx].items[itemIdx] = value;
        handleChange("columns", updated);
    };

    const addColumn = () => {
        handleChange("columns", [...(props.columns || []), { title: "New Column", items: [] }]);
    };

    const removeColumn = (index) => {
        const updated = [...props.columns];
        updated.splice(index, 1);
        handleChange("columns", updated);
    };

    const addItem = (colIdx) => {
        const updated = [...props.columns];
        updated[colIdx].items.push("New Item"); // Default new item as string for now
        handleChange("columns", updated);
    };

    const removeItem = (colIdx, itemIdx) => {
        const updated = [...props.columns];
        updated[colIdx].items.splice(itemIdx, 1);
        handleChange("columns", updated);
    };

    const handlePropChange = (key, value) => {
        handleChange(key, value);
    };

    return (
        <div>
            <hr className="my-4" />
            <div className="mb-4 font-semibold">General</div>
            <div className="space-y-2">
                <div>
                    <label htmlFor="footerBgColor" className="block text-sm font-medium text-gray-700">Background Color</label>
                    <input
                        id="footerBgColor"
                        type="color"
                        value={props.backgroundColor || "#333333"}
                        onChange={(e) => handlePropChange("backgroundColor", e.target.value)}
                        className="mt-1 block w-full h-8 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label htmlFor="footerTextColor" className="block text-sm font-medium text-gray-700">Text Color</label>
                    <input
                        id="footerTextColor"
                        type="color"
                        value={props.color || "#ffffff"}
                        onChange={(e) => handlePropChange("color", e.target.value)}
                        className="mt-1 block w-full h-8 border border-gray-300 rounded-md"
                    />
                </div>
                 {/* NEW: Max Width for Footer Content */}
                <div>
                    <label htmlFor="footerMaxWidth" className="block text-sm font-medium text-gray-700">
                        Max Width (e.g., 1200px, 100%)
                    </label>
                    <input
                        id="footerMaxWidth"
                        type="text"
                        value={props.maxWidth || "1200px"} // Default value
                        onChange={(e) => handlePropChange("maxWidth", e.target.value)}
                        className="mt-1 block w-full border rounded px-2 py-1 text-sm"
                        placeholder="e.g., 1200px or max-w-screen-xl"
                    />
                </div>
                <div>
                    <label htmlFor="footerPadding" className="block text-sm font-medium text-gray-700">Padding</label>
                    <input
                        id="footerPadding"
                        type="text"
                        value={props.padding || "40px 20px"}
                        onChange={(e) => handlePropChange("padding", e.target.value)}
                        className="mt-1 block w-full border rounded px-2 py-1 text-sm"
                        placeholder="e.g., 20px or 10px 20px"
                    />
                </div>
                {/* Add other general style controls as needed, e.g., text alignment for the whole footer */}
                <div>
                    <label htmlFor="footerTextAlign" className="block text-sm font-medium text-gray-700">Text Align</label>
                    <select
                        id="footerTextAlign"
                        value={props.textAlign || "left"}
                        onChange={(e) => handlePropChange("textAlign", e.target.value)}
                        className="mt-1 block w-full border rounded px-2 py-1 text-sm"
                    >
                        <option value="left">Left</option>
                        <option value="center">Center</option>
                        <option value="right">Right</option>
                    </select>
                </div>
            </div>


            <div className="mb-4 mt-4 font-semibold">Columns</div>
            {(props.columns || []).map((col, colIdx) => (
                <div key={colIdx} className="mb-4 border p-2 rounded bg-gray-50">
                    <div className="flex justify-between items-center mb-2">
                        <input
                            className="flex-grow border px-2 py-1"
                            value={col.title}
                            onChange={(e) => handleColumnChange(colIdx, "title", e.target.value)}
                            placeholder="Column Title"
                        />
                        <button onClick={() => removeColumn(colIdx)} className="text-red-600 text-sm ml-2 p-1 rounded hover:bg-red-100">
                            <Trash2 size={16} />
                        </button>
                    </div>


                    {(col.items || []).map((item, itemIdx) => (
                        <div key={itemIdx} className="flex items-center gap-2 mb-1 pl-4">
                            <input
                                className="w-full border px-2 py-1 text-sm"
                                value={typeof item === "string" ? item : item.text || ''} // Handle object items
                                onChange={(e) =>
                                    handleItemChange(
                                        colIdx,
                                        itemIdx,
                                        typeof item === "string" ? e.target.value : { ...item, text: e.target.value }
                                    )
                                }
                                placeholder="Item Text"
                            />
                            {/* Input for link if item is an object */}
                            {typeof item !== "string" && (
                                <input
                                    className="w-full border px-2 py-1 text-sm"
                                    value={item.link || ''}
                                    onChange={(e) =>
                                        handleItemChange(
                                            colIdx,
                                            itemIdx,
                                            { ...item, link: e.target.value }
                                        )
                                    }
                                    placeholder="Item Link (URL)"
                                />
                            )}
                            <button onClick={() => removeItem(colIdx, itemIdx)} className="text-red-500 text-sm p-1 rounded hover:bg-red-100">
                                ✕
                            </button>
                        </div>
                    ))}

                    <button onClick={() => addItem(colIdx)} className="text-blue-600 text-sm mt-2 p-1 rounded hover:bg-blue-100">
                        + Add Item
                    </button>
                </div>
            ))}

            <button onClick={addColumn} className="text-blue-600 text-sm mt-2 p-1 rounded hover:bg-blue-100">
                + Add Column
            </button>

            <hr className="my-4" />
            <div className="font-semibold">Copyright</div>
            <div className="space-y-2">
                <div>
                    <label htmlFor="copyrightText" className="block text-sm font-medium text-gray-700">Copyright Text</label>
                    <input
                        id="copyrightText"
                        className="w-full border px-2 py-1 mt-1 text-sm"
                        value={props.copyrightText || ""}
                        onChange={(e) => handlePropChange("copyrightText", e.target.value)}
                        placeholder="e.g., © 2023 Your Company"
                    />
                </div>
                <div>
                    <label htmlFor="copyrightColor" className="block text-sm font-medium text-gray-700">Copyright Color</label>
                    <input
                        id="copyrightColor"
                        type="color"
                        className="mt-1 block w-full h-8 border rounded"
                        value={props.copyrightColor || "#cccccc"}
                        onChange={(e) => handlePropChange("copyrightColor", e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="showCopyright" className="flex items-center text-sm font-medium text-gray-700 mt-2">
                        <input
                            id="showCopyright"
                            type="checkbox"
                            checked={!!props.showCopyright}
                            onChange={(e) => handlePropChange("showCopyright", e.target.checked)}
                            className="mr-2"
                        />
                        Show Copyright
                    </label>
                </div>
            </div>
        </div>
    );
};

export default FooterOptions;