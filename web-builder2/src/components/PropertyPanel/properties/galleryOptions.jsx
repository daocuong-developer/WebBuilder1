import React from "react";

const GalleryOptions = ({ block, handleChange }) => {
    const handleImageChange = (index, key, value) => {
        const newImages = [...(block.props.images || [])];
        if (!newImages[index]) {
            newImages[index] = {};
        }
        newImages[index][key] = value;
        handleChange("images", newImages);
    };

    const addImage = () => {
        handleChange("images", [...(block.props.images || []), { src: "", alt: "" }]);
    };

    const removeImage = (index) => {
        const newImages = (block.props.images || []).filter((_, i) => i !== index);
        handleChange("images", newImages);
    };

    return (
        <>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gallery Layout</label>
                <select
                    className="w-full border rounded px-2 py-1"
                    value={block.props.layout || "grid"}
                    onChange={(e) => handleChange("layout", e.target.value)}
                >
                    <option value="grid">Grid</option>
                    <option value="carousel">Carousel</option>
                    <option value="masonry">Masonry</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Columns (for Grid)</label>
                <input
                    type="number"
                    min="1"
                    max="6"
                    className="w-full border rounded px-2 py-1"
                    value={block.props.columns || 3}
                    onChange={(e) => handleChange("columns", parseInt(e.target.value))}
                />
            </div>

            <h4 className="text-md font-medium text-gray-700 mt-4 mb-2">Images</h4>
            {(block.props.images || []).map((image, index) => (
                <div key={index} className="border p-3 mb-3 rounded-md bg-gray-50">
                    <h5 className="text-sm font-semibold mb-2">Image {index + 1}</h5>

                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">URL</label>
                        <input
                            type="url"
                            className="w-full border rounded px-2 py-1 text-sm"
                            value={image.src || ""}
                            onChange={(e) => handleImageChange(index, "src", e.target.value)}
                        />
                    </div>

                    <div className="mt-2">
                        <label className="block text-xs font-medium text-gray-600 mb-1">Upload Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="w-full border rounded px-2 py-1 text-sm"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    const localUrl = URL.createObjectURL(file);
                                    handleImageChange(index, "src", localUrl);
                                }
                            }}
                        />
                    </div>

                    <div className="mt-2">
                        <label className="block text-xs font-medium text-gray-600 mb-1">Alt Text</label>
                        <input
                            className="w-full border rounded px-2 py-1 text-sm"
                            value={image.alt || ""}
                            onChange={(e) => handleImageChange(index, "alt", e.target.value)}
                        />
                    </div>

                    <button
                        className="mt-3 bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600"
                        onClick={() => removeImage(index)}
                    >
                        Remove Image
                    </button>
                </div>
            ))}

            <button
                className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 mt-2"
                onClick={addImage}
            >
                Add Image
            </button>
        </>
    );
};

export default GalleryOptions;
