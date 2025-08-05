import React from "react";

export default function PropertyPanel({ block, onChange }) {
    const handleChange = (key, value) => {
        if (key === "level") {
            const fontSizeMap = {
                h1: 32,
                h2: 28,
                h3: 24,
                h4: 20,
                h5: 16,
                h6: 14,
            };
            onChange({
                ...block,
                props: {
                    ...block.props,
                    [key]: value,
                    fontSize: fontSizeMap[value] || 16,
                },
            });
            return;
        }

        onChange({
            ...block,
            props: {
                ...block.props,
                [key]: value,
            },
        });
    };

    const renderTextFormattingOptions = () => (
        <>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Font Family</label>
                <select
                    className="w-full border rounded px-2 py-1"
                    value={block.props.fontFamily || "sans-serif"}
                    onChange={(e) => handleChange("fontFamily", e.target.value)}
                >
                    <option value="sans-serif">Sans Serif</option>
                    <option value="serif">Serif</option>
                    <option value="monospace">Monospace</option>
                    <option value="monospace">Monospace</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Font Size (px)</label>
                <input
                    type="number"
                    className="w-full border rounded px-2 py-1"
                    value={block.props.fontSize || 16}
                    onChange={(e) => handleChange("fontSize", parseInt(e.target.value))}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Text Color</label>
                <input
                    type="color"
                    className="w-full border rounded px-2 py-1"
                    value={block.props.color || "#000000"}
                    onChange={(e) => handleChange("color", e.target.value)}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Text Align</label>
                <select
                    className="w-full border rounded px-2 py-1"
                    value={block.props.textAlign || "left"}
                    onChange={(e) => handleChange("textAlign", e.target.value)}
                >
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                    <option value="justify">Justify</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Line Height</label>
                <input
                    className="w-full border rounded px-2 py-1"
                    value={block.props.lineHeight || "1.5"}
                    onChange={(e) => handleChange("lineHeight", e.target.value)}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Letter Spacing</label>
                <input
                    className="w-full border rounded px-2 py-1"
                    value={block.props.letterSpacing || "normal"}
                    onChange={(e) => handleChange("letterSpacing", e.target.value)}
                />
            </div>

            <div className="flex space-x-2">
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={block.props.bold || false}
                        onChange={(e) => handleChange("bold", e.target.checked)}
                    />
                    <span className="ml-1">Bold</span>
                </label>
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={block.props.italic || false}
                        onChange={(e) => handleChange("italic", e.target.checked)}
                    />
                    <span className="ml-1">Italic</span>
                </label>
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={block.props.underline || false}
                        onChange={(e) => handleChange("underline", e.target.checked)}
                    />
                    <span className="ml-1">Underline</span>
                </label>
            </div>
        </>
    );

    const renderButtonOptions = () => (
        <>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                <input
                    className="w-full border rounded px-2 py-1"
                    value={block.props.text || ""}
                    onChange={(e) => handleChange("text", e.target.value)}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Link (URL/Scroll/Submit)</label>
                <input
                    className="w-full border rounded px-2 py-1"
                    value={block.props.link || ""}
                    onChange={(e) => handleChange("link", e.target.value)}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Background Color</label>
                <input
                    type="color"
                    className="w-full border rounded px-2 py-1"
                    value={block.props.bgColor || "#000000"}
                    onChange={(e) => handleChange("bgColor", e.target.value)}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Text Color</label>
                <input
                    type="color"
                    className="w-full border rounded px-2 py-1"
                    value={block.props.textColor || "#ffffff"}
                    onChange={(e) => handleChange("textColor", e.target.value)}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Padding</label>
                <input
                    className="w-full border rounded px-2 py-1"
                    value={block.props.padding || "8px 16px"}
                    onChange={(e) => handleChange("padding", e.target.value)}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Border Radius</label>
                <input
                    className="w-full border rounded px-2 py-1"
                    value={block.props.borderRadius || "4px"}
                    onChange={(e) => handleChange("borderRadius", e.target.value)}
                />
            </div>
            <div className="flex space-x-2">
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={block.props.disabled || false}
                        onChange={(e) => handleChange("disabled", e.target.checked)}
                    />
                    <span className="ml-1">Disabled</span>
                </label>
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={block.props.hoverEffect || false}
                        onChange={(e) => handleChange("hoverEffect", e.target.checked)}
                    />
                    <span className="ml-1">Hover Effect</span>
                </label>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Icon (URL or class)</label>
                <input
                    className="w-full border rounded px-2 py-1"
                    value={block.props.icon || ""}
                    onChange={(e) => handleChange("icon", e.target.value)}
                />
            </div>
        </>
    );

    const renderImageOptions = () => (
        <>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                    className="w-full border rounded px-2 py-1"
                    value={block.props.src || ""}
                    onChange={(e) => handleChange("src", e.target.value)}
                />
            </div>

            <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
                <input
                    type="file"
                    accept="image/*"
                    className="w-full"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            const localUrl = URL.createObjectURL(file);
                            handleChange("src", localUrl);
                        }
                    }}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 mt-3">Width (px)</label>
                <input
                    className="w-full border rounded px-2 py-1"
                    type="number"
                    value={block.props.width || ""}
                    onChange={(e) => handleChange("width", e.target.value)}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Height (px)</label>
                <input
                    className="w-full border rounded px-2 py-1"
                    type="number"
                    value={block.props.height || ""}
                    onChange={(e) => handleChange("height", e.target.value)}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Border Radius</label>
                <input
                    className="w-full border rounded px-2 py-1"
                    value={block.props.borderRadius || ""}
                    onChange={(e) => handleChange("borderRadius", e.target.value)}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Shadow</label>
                <input
                    className="w-full border rounded px-2 py-1"
                    value={block.props.shadow || ""}
                    onChange={(e) => handleChange("shadow", e.target.value)}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text</label>
                <input
                    className="w-full border rounded px-2 py-1"
                    value={block.props.alt || ""}
                    onChange={(e) => handleChange("alt", e.target.value)}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Click Action (URL/Popup)</label>
                <input
                    className="w-full border rounded px-2 py-1"
                    value={block.props.onClickAction || ""}
                    onChange={(e) => handleChange("onClickAction", e.target.value)}
                />
            </div>
        </>
    );

    const renderContainerOptions = () => (
        <>
            {/* Shared controls */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Layout Type</label>
                <select
                    className="w-full border rounded px-2 py-1"
                    value={block.props.layoutType || "block"}
                    onChange={(e) => handleChange("layoutType", e.target.value)}
                >
                    <option value="block">Block</option>
                    <option value="flex">Flexbox</option>
                    <option value="grid">Grid</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Width</label>
                <input
                    className="w-full border rounded px-2 py-1"
                    value={block.props.width || ""}
                    onChange={(e) => handleChange("width", e.target.value)}
                    placeholder="e.g. 100%, 400px"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Height</label>
                <input
                    className="w-full border rounded px-2 py-1"
                    value={block.props.height || ""}
                    onChange={(e) => handleChange("height", e.target.value)}
                    placeholder="e.g. auto, 300px"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Padding</label>
                <input
                    className="w-full border rounded px-2 py-1"
                    value={block.props.padding || ""}
                    onChange={(e) => handleChange("padding", e.target.value)}
                    placeholder="e.g. 1rem, 20px"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Margin</label>
                <input
                    className="w-full border rounded px-2 py-1"
                    value={block.props.margin || ""}
                    onChange={(e) => handleChange("margin", e.target.value)}
                    placeholder="e.g. 0 auto"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Background Color</label>
                <input
                    type="color"
                    className="w-full border rounded px-2 py-1 h-10"
                    value={block.props.backgroundColor || "#ffffff"}
                    onChange={(e) => handleChange("backgroundColor", e.target.value)}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Border</label>
                <input
                    className="w-full border rounded px-2 py-1"
                    value={block.props.border || ""}
                    onChange={(e) => handleChange("border", e.target.value)}
                    placeholder="e.g. 1px solid #ccc"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Box Shadow</label>
                <input
                    className="w-full border rounded px-2 py-1"
                    value={block.props.boxShadow || ""}
                    onChange={(e) => handleChange("boxShadow", e.target.value)}
                    placeholder="e.g. 0 4px 6px rgba(0,0,0,0.1)"
                />
            </div>

            {/* Flex Layout Options */}
            {block.props.layoutType === "flex" && (
                <>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Flex Direction</label>
                        <select
                            className="w-full border rounded px-2 py-1"
                            value={block.props.flexDirection || "row"}
                            onChange={(e) => handleChange("flexDirection", e.target.value)}
                        >
                            <option value="row">Row</option>
                            <option value="row-reverse">Row Reverse</option>
                            <option value="column">Column</option>
                            <option value="column-reverse">Column Reverse</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Justify Content</label>
                        <select
                            className="w-full border rounded px-2 py-1"
                            value={block.props.justifyContent || "flex-start"}
                            onChange={(e) => handleChange("justifyContent", e.target.value)}
                        >
                            <option value="flex-start">Flex Start</option>
                            <option value="center">Center</option>
                            <option value="flex-end">Flex End</option>
                            <option value="space-between">Space Between</option>
                            <option value="space-around">Space Around</option>
                            <option value="space-evenly">Space Evenly</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Align Items</label>
                        <select
                            className="w-full border rounded px-2 py-1"
                            value={block.props.alignItems || "stretch"}
                            onChange={(e) => handleChange("alignItems", e.target.value)}
                        >
                            <option value="stretch">Stretch</option>
                            <option value="flex-start">Flex Start</option>
                            <option value="center">Center</option>
                            <option value="flex-end">Flex End</option>
                            <option value="baseline">Baseline</option>
                        </select>
                    </div>
                </>
            )}

            {/* Grid Layout Options */}
            {block.props.layoutType === "grid" && (
                <>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Grid Template Columns</label>
                        <input
                            className="w-full border rounded px-2 py-1"
                            value={block.props.gridTemplateColumns || ""}
                            onChange={(e) => handleChange("gridTemplateColumns", e.target.value)}
                            placeholder="e.g. 1fr 2fr, repeat(3, 1fr)"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Grid Template Rows</label>
                        <input
                            className="w-full border rounded px-2 py-1"
                            value={block.props.gridTemplateRows || ""}
                            onChange={(e) => handleChange("gridTemplateRows", e.target.value)}
                            placeholder="e.g. auto, 100px 200px"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Justify Content</label>
                        <select
                            className="w-full border rounded px-2 py-1"
                            value={block.props.justifyContent || "start"}
                            onChange={(e) => handleChange("justifyContent", e.target.value)}
                        >
                            <option value="start">Start</option>
                            <option value="center">Center</option>
                            <option value="end">End</option>
                            <option value="space-between">Space Between</option>
                            <option value="space-around">Space Around</option>
                            <option value="space-evenly">Space Evenly</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Align Items</label>
                        <select
                            className="w-full border rounded px-2 py-1"
                            value={block.props.alignItems || "start"}
                            onChange={(e) => handleChange("alignItems", e.target.value)}
                        >
                            <option value="start">Start</option>
                            <option value="center">Center</option>
                            <option value="end">End</option>
                            <option value="stretch">Stretch</option>
                        </select>
                    </div>
                </>
            )}
        </>
    );

    return (
        <div className=" space-y-4">
            {(block.type === "heading" || block.type === "paragraph") && (
                <>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Text</label>
                        <input
                            className="w-full border rounded px-2 py-1"
                            value={block.props.text || ""}
                            onChange={(e) => handleChange("text", e.target.value)}
                        />
                    </div>
                    {block.type === "heading" && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Heading Level</label>
                            <select
                                className="w-full border rounded px-2 py-1"
                                value={block.props.level || "h1"}
                                onChange={(e) => handleChange("level", e.target.value)}
                            >
                                <option value="h1">H1</option>
                                <option value="h2">H2</option>
                                <option value="h3">H3</option>
                                <option value="h4">H4</option>
                                <option value="h5">H5</option>
                                <option value="h6">H6</option>
                            </select>
                        </div>
                    )}
                    {renderTextFormattingOptions()}
                </>
            )}
            {block.type === "button" && renderButtonOptions()}
            {block.type === "image" && renderImageOptions()}
            {block.type === "container" && renderContainerOptions()}
        </div>
    );
}
