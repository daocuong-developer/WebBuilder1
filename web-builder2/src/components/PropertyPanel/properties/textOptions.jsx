import React from "react";
import useGoogleFontLoader from "@/hooks/useGoogleFontLoader";
import GoogleFontsSelector from "@/components/GoogleFontsSelector";

const TextOptions = ({ block, handleChange }) => {
    const fontFamily = block.props.fontFamily || "sans-serif";

    // Load Google Font khi chọn
    useGoogleFontLoader(fontFamily);

    return (
        <>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Font Family</label>
                <GoogleFontsSelector value={fontFamily} onChange={(value) => handleChange("fontFamily", value)} />
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

            {/* Thêm Font Weight */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Font Weight</label>
                <select
                    className="w-full border rounded px-2 py-1"
                    value={block.props.fontWeight || "normal"}
                    onChange={(e) => handleChange("fontWeight", e.target.value)}
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

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Line Height</label>
                <input
                    type="number"
                    step="0.1"
                    className="w-full border rounded px-2 py-1"
                    value={block.props.lineHeight || "1.5"}
                    onChange={(e) => handleChange("lineHeight", e.target.value)}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Width (px, auto, %)</label>
                <input
                    type="text" // Dùng text để nhập px, %, auto
                    className="w-full border rounded px-2 py-1"
                    value={block.props.maxWidth || "100%"}
                    onChange={(e) => handleChange("maxWidth", e.target.value)}
                    placeholder="e.g., 500px, 80%, auto"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Letter Spacing (px)</label>
                <input
                    type="number"
                    className="w-full border rounded px-2 py-1"
                    value={block.props.letterSpacing || "0"}
                    onChange={(e) => handleChange("letterSpacing", parseInt(e.target.value))}
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
};

export default TextOptions;