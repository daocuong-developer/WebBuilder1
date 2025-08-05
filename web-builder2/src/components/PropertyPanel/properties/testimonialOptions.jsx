
import React from "react";
import TextOptions from "./textOptions";
import ColorPicker from "./colorPicker";

const TestimonialOptions = ({ block, handleChange }) => {
    console.log("TestimonialOptions block", block);
    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Testimonial Text</label>
                <textarea
                    className="w-full border rounded px-3 py-2 resize-none"
                    rows={4}
                    value={block.props.content || ""}
                    onChange={(e) => handleChange("content", e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Author Name</label>
                    <input
                        type="text"
                        className="w-full border rounded px-3 py-2"
                        value={block.props.authorName || ""}
                        onChange={(e) => handleChange("authorName", e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Author Title</label>
                    <input
                        type="text"
                        className="w-full border rounded px-3 py-2"
                        value={block.props.authorTitle || ""}
                        onChange={(e) => handleChange("authorTitle", e.target.value)}
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Avatar Image URL</label>
                <input
                    type="url"
                    className="w-full border rounded px-3 py-2"
                    value={block.props.authorImage || ""}
                    onChange={(e) => handleChange("authorImage", e.target.value)}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5)</label>
                <input
                    type="number"
                    min="1"
                    max="5"
                    className="w-full border rounded px-3 py-2"
                    value={block.props.rating || 5}
                    onChange={(e) => handleChange("rating", parseInt(e.target.value))}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <ColorPicker
                    label="Text Color"
                    value={block.props.textColor || "#333"}
                    onChange={(val) => handleChange("textColor", val)}
                />
                <ColorPicker
                    label="Background"
                    value={block.props.backgroundColor || "#f9f9f9"}
                    onChange={(val) => handleChange("backgroundColor", val)}
                />
            </div>

            <TextOptions block={block} handleChange={handleChange} />
        </div>
    );
};

export default TestimonialOptions;
