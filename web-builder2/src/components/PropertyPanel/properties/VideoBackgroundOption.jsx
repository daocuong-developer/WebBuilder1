import React from "react";

const VideoBackgroundOption = ({ block, onChange }) => {
    const props = block?.props || {};

    const handleChange = (key, value) => {
        onChange({ ...block, props: { ...props, [key]: value } });
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            handleChange("videoUrl", fileURL);
        }
    };

    return (
        <div className="space-y-4">
            <div>
                <label className="block font-medium mb-1">Title</label>
<input
                    type="text"
                    className="w-full border px-3 py-2 rounded"
                    value={props.title || ""}
                    onChange={(e) => handleChange("title", e.target.value)}
                />
            </div>

            <div>
                <label className="block font-medium mb-1">Description</label>
                <textarea
                    className="w-full border px-3 py-2 rounded"
                    value={props.description || ""}
                    onChange={(e) => handleChange("description", e.target.value)}
                />
            </div>

            <div>
                <label className="block font-medium mb-1">Video URL</label>
                <input
                    type="text"
                    className="w-full border px-3 py-2 rounded mb-2"
                    value={props.videoUrl || ""}
                    onChange={(e) => handleChange("videoUrl", e.target.value)}
                />
                <input
                    type="file"
                    accept="video/*"
                    className="w-full border px-3 py-2 rounded"
                    onChange={handleFileUpload}
                />
            </div>

            <div>
                <label className="block font-medium mb-1">CTA Button (optional)</label>
                <input
                    type="text"
                    className="w-full border px-3 py-2 rounded mb-2"
                    value={props.buttonText || ""}
                    onChange={(e) => handleChange("buttonText", e.target.value)}
                />
                <label className="block font-medium mb-1">CTA Button Color</label>
                <input
                    type="text"
                    className="w-full border px-3 py-2 rounded mb-2"
                    value={props.buttonColor || ""}
                    onChange={(e) => handleChange("buttonColor", e.target.value)}
                    placeholder="e.g. #ffffff"
                />
                <label className="block font-medium mb-1">CTA Button Text Color</label>
                <input
                    type="text"
                    className="w-full border px-3 py-2 rounded mb-2"
                    value={props.buttonTextColor || ""}
                    onChange={(e) => handleChange("buttonTextColor", e.target.value)}
                    placeholder="e.g. #000000"
                />
                <label className="block font-medium mb-1">CTA Button Border Radius</label>
                <input
                    type="text"
                    className="w-full border px-3 py-2 rounded"
                    value={props.buttonRadius || ""}
                    onChange={(e) => handleChange("buttonRadius", e.target.value)}
                    placeholder="e.g. 6px or 0.5rem"
                />
            </div>

            <div>
                <label className="block font-medium mb-1">Content Alignment</label>
<select
                    className="w-full border px-3 py-2 rounded"
                    value={props.textAlign || "left"}
                    onChange={(e) => handleChange("textAlign", e.target.value)}
                >
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                </select>
            </div>

            <div>
                <label className="block font-medium mb-1">Max Width (px)</label>
                <input
                    type="text"
                    className="w-full border px-3 py-2 rounded"
                    value={props.maxWidth || "1024px"}
                    onChange={(e) => handleChange("maxWidth", e.target.value)}
                    placeholder="e.g. 800px or 80%"
                />
            </div>

            <div>
                <label className="block font-medium mb-1">Overlay Color</label>
                <input
                    type="text"
                    className="w-full border px-3 py-2 rounded"
                    value={props.overlayColor || ""}
                    onChange={(e) => handleChange("overlayColor", e.target.value)}
                    placeholder="e.g. rgba(0,0,0,0.4)"
                />
            </div>

            <div>
                <label className="block font-medium mb-1">Text Color</label>
                <input
                    type="text"
                    className="w-full border px-3 py-2 rounded"
                    value={props.textColor || ""}
                    onChange={(e) => handleChange("textColor", e.target.value)}
                    placeholder="e.g. #ffffff"
                />
            </div>

            <div>
                <label className="block font-medium mb-1">Block Height (px)</label>
                <input
                    type="number"
                    className="w-full border px-3 py-2 rounded"
                    value={props.height || 600}
                    onChange={(e) => handleChange("height", e.target.value)}
                />
            </div>

            <div>
                <label className="block font-medium mb-1">Background Filter</label>
                <select
                    className="w-full border px-3 py-2 rounded"
                    value={props.filter || "none"}
                    onChange={(e) => handleChange("filter", e.target.value)}
                >
                    <option value="none">None</option>
                    <option value="blur(4px)">Blur</option>
                    <option value="grayscale(1)">Grayscale</option>
                    <option value="brightness(0.6)">Darken</option>
                    <option value="contrast(1.5)">High Contrast</option>
                </select>
            </div>
        </div>
    );
};

export default VideoBackgroundOption;