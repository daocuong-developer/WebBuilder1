// src/components/PropertyPanel/properties/paragraphOptions.jsx
import React from "react";
import useGoogleFontLoader from "@/hooks/useGoogleFontLoader"; // ADDED
import GoogleFontsSelector from "@/components/GoogleFontsSelector"; // ADDED

const ParagraphOptions = ({ block, onChange }) => {
    const props = block.props || {};

    // Get current font family to load with useGoogleFontLoader and pass to selector
    const fontFamily = props.fontFamily || "sans-serif"; // Default to a common sans-serif
    useGoogleFontLoader(fontFamily); // Load the selected font

    const handlePropChange = (key, value) => {
        onChange({ ...block, props: { ...block.props, [key]: value } });
    };

    return (
        <div className="space-y-4">
            <h3 className="text-md font-semibold mb-4">Paragraph Properties</h3>

            {/* Link/Href Input */}
            <div>
                <label htmlFor="paragraphHref" className="block text-sm font-medium text-gray-700 mb-1">
                    Link (URL or Email)
                </label>
                <input
                    id="paragraphHref"
                    type="text"
                    value={props.href || ""}
                    onChange={(e) => handlePropChange("href", e.target.value)}
                    className="w-full border rounded px-2 py-1"
                    placeholder="e.g., info@example.com, tel:+1234567890, https://example.com"
                />
                <p className="text-xs text-gray-500 mt-1">
                    For email, just type the address (e.g., `info@example.com`). For phone, use `tel:+...`. For internal pages, use `page://PAGE_ID`.
                </p>
            </div>

            <hr className="my-4" />

            {/* NEW: Font Family Selector */}
            <div>
                <label htmlFor="fontFamily" className="block text-sm font-medium text-gray-700 mb-1">Font Family</label>
                <GoogleFontsSelector
                    value={fontFamily}
                    onChange={(value) => handlePropChange("fontFamily", value)}
                />
            </div>

            {/* Font Size */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Font Size (px)</label>
                <input
                    id="fontSize"
                    type="text"
                    value={props.fontSize || "16px"}
                    onChange={(e) => handlePropChange("fontSize", e.target.value)}
                    className="w-full border rounded px-2 py-1"
                    placeholder="e.g., 16px, 1.2rem"
                />
            </div>

            {/* Font Weight */}
            <div>
                <label htmlFor="fontWeight" className="block text-sm font-medium text-gray-700 mb-1">Font Weight</label>
                <select
                    id="fontWeight"
                    value={props.fontWeight || "normal"}
                    onChange={(e) => handlePropChange("fontWeight", e.target.value)}
                    className="w-full border rounded px-2 py-1"
                >
                    <option value="normal">Normal (400)</option>
                    <option value="bold">Bold (700)</option>
                    <option value="lighter">Lighter</option>
                    <option value="bolder">Bolder</option>
                    <option value="100">100 (Thin)</option>
                    <option value="200">200 (Extra Light)</option>
                    <option value="300">300 (Light)</option>
                    <option value="400">400 (Normal)</option>
                    <option value="500">500 (Medium)</option>
                    <option value="600">600 (Semi Bold)</option>
                    <option value="700">700 (Bold)</option>
                    <option value="800">800 (Extra Bold)</option>
                    <option value="900">900 (Black)</option>
                </select>
            </div>

            {/* Line Height */}
            <div>
                <label htmlFor="lineHeight" className="block text-sm font-medium text-gray-700 mb-1">Line Height</label>
                <input
                    id="lineHeight"
                    type="text"
                    step="0.1"
                    className="w-full border rounded px-2 py-1"
                    value={props.lineHeight || "1.5"}
                    onChange={(e) => handlePropChange("lineHeight", e.target.value)}
                    placeholder="e.g., 1.5, 24px"
                />
            </div>

            {/* Max Width */}
            <div>
                <label htmlFor="maxWidth" className="block text-sm font-medium text-gray-700 mb-1">Max Width (px, auto, %)</label>
                <input
                    id="maxWidth"
                    type="text"
                    className="w-full border rounded px-2 py-1"
                    value={props.maxWidth || "100%"}
                    onChange={(e) => handlePropChange("maxWidth", e.target.value)}
                    placeholder="e.g., 500px, 80%, auto"
                />
            </div>

            {/* Letter Spacing */}
            <div>
                <label htmlFor="letterSpacing" className="block text-sm font-medium text-gray-700 mb-1">Letter Spacing (px)</label>
                <input
                    id="letterSpacing"
                    type="text"
                    className="w-full border rounded px-2 py-1"
                    value={props.letterSpacing || "0px"}
                    onChange={(e) => handlePropChange("letterSpacing", e.target.value)}
                    placeholder="e.g., 0.5px"
                />
            </div>

            {/* Color */}
            <div>
                <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                <input
                    id="color"
                    type="color"
                    value={props.color || "#000000"}
                    onChange={(e) => handlePropChange("color", e.target.value)}
                    className="w-full h-8 border rounded"
                />
            </div>

            {/* Text Align */}
            <div>
                <label htmlFor="textAlign" className="block text-sm font-medium text-gray-700 mb-1">Text Align</label>
                <select
                    id="textAlign"
                    value={props.textAlign || "left"}
                    onChange={(e) => handlePropChange("textAlign", e.target.value)}
                    className="w-full border rounded px-2 py-1"
                >
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                    <option value="justify">Justify</option>
                </select>
            </div>

            {/* Styling Checkboxes */}
            <div className="flex items-center space-x-4">
                <label className="flex items-center text-sm font-medium text-gray-700">
                    <input
                        type="checkbox"
                        checked={!!props.bold}
                        onChange={(e) => handlePropChange("bold", e.target.checked)}
                        className="mr-2"
                    />
                    Bold
                </label>
                <label className="flex items-center text-sm font-medium text-gray-700">
                    <input
                        type="checkbox"
                        checked={!!props.italic}
                        onChange={(e) => handlePropChange("italic", e.target.checked)}
                        className="mr-2"
                    />
                    Italic
                </label>
                <label className="flex items-center text-sm font-medium text-gray-700">
                    <input
                        type="checkbox"
                        checked={!!props.underline}
                        onChange={(e) => handlePropChange("underline", e.target.checked)}
                        className="mr-2"
                    />
                    Underline
                </label>
            </div>
        </div>
    );
};

export default ParagraphOptions;