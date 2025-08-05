import React, { useState, useRef } from "react"; // ADDED useRef for file input

const SwiperOptions = ({ block, handleChange }) => {
    const props = block.props || {};
    const slides = props.slides || [];

    // Ref cho mỗi input file của slide (để kích hoạt chương trình)
    const fileInputRefs = useRef({});

    // Hàm cập nhật thuộc tính chung của swiper (ví dụ: height, autoplay)
    const handlePropChange = (key, value) => {
        handleChange(key, value);
    };

    // Cập nhật URL ảnh của một slide cụ thể
    const updateSlideImage = (index, imageUrl) => {
        const updatedSlides = [...slides];
        if (!updatedSlides[index]) { // Ensure slide exists before updating
            updatedSlides[index] = {};
        }
        updatedSlides[index].image = imageUrl;
        handleChange("slides", updatedSlides);
    };

    // Xử lý khi chọn file ảnh từ máy
    const handleFileChange = async (index, e) => {
        const file = e.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append("image", file); // 'image' should match the field name in your Django Serializer

            try {
                // Gửi file đến API upload của Django
                const response = await fetch("http://localhost:8000/api/images/upload/", {
                    method: "POST",
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();
                    const fullImageUrl = `http://localhost:8000${data.image}`;
                    updateSlideImage(index, fullImageUrl); // Cập nhật slide với URL từ server
                } else {
                    const errorText = await response.text();
                    console.error("Image upload failed:", response.status, response.statusText, errorText);
                    alert("Failed to upload image: " + errorText);
                }
            } catch (error) {
                console.error("Error uploading image:", error);
                alert("An error occurred during image upload.");
            }
        }
        // Clear the input value so the same file can be selected again
        e.target.value = null;
    };

    // Hàm kích hoạt input file ẩn
    const triggerFileInput = (index) => {
        fileInputRefs.current[index]?.click();
    };

    const addSlide = () => {
        const updatedSlides = [...slides, { id: Date.now(), image: "" }]; // Thêm ID duy nhất cho mỗi slide
        handleChange("slides", updatedSlides);
    };

    const removeSlide = (index) => {
        const updatedSlides = slides.filter((_, i) => i !== index);
        handleChange("slides", updatedSlides);
    };

    return (
        <div className="space-y-4">
            <h3 className="text-md font-semibold mb-4">Swiper Settings</h3>

            {/* General Swiper Options */}
            <section className="space-y-3 border-b pb-4">
                <h4 className="text-sm font-semibold text-gray-700">General Options</h4>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Swiper Height (px)</label>
                    <input
                        type="number"
                        className="w-full border rounded px-2 py-1"
                        value={props.height || 400}
                        onChange={(e) => handlePropChange("height", parseInt(e.target.value))}
                        placeholder="e.g., 400"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">Autoplay</label>
                    <input
                        type="checkbox"
                        checked={!!props.autoplay}
                        onChange={(e) => handlePropChange("autoplay", e.target.checked)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                </div>
                {props.autoplay && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Autoplay Delay (ms)</label>
                        <input
                            type="number"
                            className="w-full border rounded px-2 py-1"
                            value={props.delay || 3000}
                            onChange={(e) => handlePropChange("delay", parseInt(e.target.value))}
                            placeholder="e.g., 3000 (3 seconds)"
                        />
                    </div>
                )}
                <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">Loop Slides</label>
                    <input
                        type="checkbox"
                        checked={!!props.loop}
                        onChange={(e) => handlePropChange("loop", e.target.checked)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">Show Navigation (Arrows)</label>
                    <input
                        type="checkbox"
                        checked={!!props.navigation}
                        onChange={(e) => handlePropChange("navigation", e.target.checked)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">Show Pagination (Dots)</label>
                    <input
                        type="checkbox"
                        checked={!!props.pagination}
                        onChange={(e) => handlePropChange("pagination", e.target.checked)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                </div>
            </section>

            {/* Slide Management */}
            <h4 className="text-md font-semibold text-gray-700 border-b pb-2 mb-2">Slides</h4>
            <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm" onClick={addSlide} type="button">
                + Add New Slide
            </button>

            {slides.map((slide, index) => (
                <div key={slide.id || index} className="border p-3 rounded space-y-2 bg-gray-50 relative"> {/* Used slide.id for key */}
                    <button
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm"
                        onClick={() => removeSlide(index)}
                        type="button"
                        title="Remove Slide"
                    >
                        &times; Remove
                    </button>
                    <label className="block text-sm font-medium text-gray-700">Slide {index + 1} Image URL</label>
                    <input
                        type="text"
                        value={slide.image || ""} // Ensure value is not null/undefined
                        onChange={(e) => updateSlideImage(index, e.target.value)}
                        className="w-full border px-2 py-1 rounded"
                        placeholder="https://your-image-url.jpg"
                    />
                    {slide.image && (
                        <div className="mt-2">
                            <img src={slide.image} alt={`Slide ${index + 1} Preview`} className="max-w-full h-auto rounded-md object-cover max-h-40 mx-auto" />
                        </div>
                    )}
                    <div className="flex gap-2 mt-2">
                        <input
                            type="file"
                            accept="image/*"
                            ref={el => fileInputRefs.current[index] = el} // Assign ref dynamically
                            onChange={(e) => handleFileChange(index, e)}
                            className="hidden" // Hide default file input
                        />
                        <button
                            type="button"
                            onClick={() => triggerFileInput(index)}
                            className="bg-green-500 text-white text-xs px-3 py-1 rounded hover:bg-green-600"
                        >
                            Upload Image
                        </button>
                        {slide.image && (
                            <button
                                type="button"
                                onClick={() => updateSlideImage(index, "")} // Clear image
                                className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600"
                            >
                                Clear Image
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SwiperOptions;