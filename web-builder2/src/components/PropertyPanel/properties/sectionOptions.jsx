// src/components/PropertyPanel/properties/sectionOptions.jsx
import React from "react";

export default function SectionOptions({ block, handleStyleChange }) {
    const styles = block.props.style || {};

    const handleFileChange = async (e) => { // Make the function async
        const file = e.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append("image", file); // 'image' should match the field name in your Django Serializer

            try {
                // Gửi file đến API upload của Django
                const response = await fetch("http://localhost:8000/api/images/upload/", {
                    method: "POST",
                    body: formData,
                    // Headers 'Content-Type': 'multipart/form-data' sẽ được tự động thêm khi dùng FormData
                });

                console.log("Response from image upload:", response);

                if (response.ok) {
                    const data = await response.json();
                    // Django trả về đường dẫn tương đối, cần ghép với base URL của Django
                    const fullImageUrl = `http://localhost:8000${data.image}`;

                    console.log("Uploaded image URL from server:", fullImageUrl); // Debugging: Check this URL

                    // Gọi hàm handleStyleChange để cập nhật backgroundImage với URL từ server
                    handleStyleChange("backgroundImage", fullImageUrl);
                } else {
                    const errorText = await response.text(); // Đọc lỗi chi tiết từ server
                    console.error("Image upload failed:", response.status, response.statusText, errorText);
                    alert("Failed to upload image: " + errorText); // Thông báo cho người dùng
                }
            } catch (error) {
                console.error("Error uploading image:", error);
                alert("An error occurred during image upload.");
            }
        }
    };

    return (
        <div className="space-y-2">
            <h3 className="text-md font-semibold mt-4">Section Properties</h3>

            {/* Background Color */}
            <div>
                <label htmlFor="backgroundColor" className="block text-sm font-medium text-gray-700 mb-1">
                    Background Color
                </label>
                <input
                    id="backgroundColor"
                    type="color"
                    value={styles.backgroundColor || "#ffffff"}
                    onChange={(e) => handleStyleChange("backgroundColor", e.target.value)}
                    className="mt-1 block w-full h-8 border border-gray-300 rounded-md shadow-sm"
                />
            </div>

            {/* --- PHẦN MỚI: BACKGROUND IMAGE --- */}
            {/* --- PHẦN BACKGROUND IMAGE --- */}
            <div className="space-y-2 border-t pt-4 mt-4">
                <h4 className="text-sm font-semibold">Background Image</h4>
                <div>
                    <label htmlFor="backgroundImage" className="block text-sm font-medium text-gray-700 mb-1">
                        Image URL
                    </label>
                    <input
                        id="backgroundImage"
                        type="text"
                        value={styles.backgroundImage || ""}
                        onChange={(e) => handleStyleChange("backgroundImage", e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                        placeholder="https://example.com/image.jpg"
                    />
                </div>

                {/* --- NÚT UPLOAD --- */}
                <div className="mt-2">
                    <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-700 mb-1">
                        Or Upload From Computer
                    </label>
                    <input
                        id="imageUpload"
                        type="file"
                        accept="image/*"
                        className="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                        onChange={handleFileChange}
                    />
                </div>

                <div>
                    <label htmlFor="backgroundSize" className="block text-sm font-medium text-gray-700 mb-1">
                        Background Size
                    </label>
                    <select
                        id="backgroundSize"
                        value={styles.backgroundSize || "cover"}
                        onChange={(e) => handleStyleChange("backgroundSize", e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                    >
                        <option value="cover">Cover</option>
                        <option value="contain">Contain</option>
                        <option value="auto">Auto</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="backgroundPosition" className="block text-sm font-medium text-gray-700 mb-1">
                        Background Position
                    </label>
                    <input
                        id="backgroundPosition"
                        type="text"
                        value={styles.backgroundPosition || "center center"}
                        onChange={(e) => handleStyleChange("backgroundPosition", e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                        placeholder="e.g., center center"
                    />
                </div>
            </div>
            {/* --- KẾT THÚC NÚT UPLOAD MỚI --- */}

            {/* Padding */}
            <div>
                <label htmlFor="padding" className="block text-sm font-medium text-gray-700 mb-1">
                    Padding (e.g., 20px, 10px 20px)
                </label>
                <input
                    id="padding"
                    type="text"
                    value={styles.padding || "20px"}
                    onChange={(e) => handleStyleChange("padding", e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                    placeholder="e.g., 1rem or 10px 20px"
                />
            </div>

            {/* Max Width (for centering content) */}
            <div>
                <label htmlFor="maxWidth" className="block text-sm font-medium text-gray-700 mb-1">
                    Max Width (e.g., 1200px, 100%)
                </label>
                <input
                    id="maxWidth"
                    type="text"
                    value={styles.maxWidth || "100%"} // Default to 100% to allow it to shrink
                    onChange={(e) => handleStyleChange("maxWidth", e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                />
            </div>
            {/* Margin */}
            <div>
                <label htmlFor="margin" className="block text-sm font-medium text-gray-700 mb-1">
                    Margin
                </label>
                <input
                    id="margin"
                    type="text"
                    value={styles.margin || "0 auto"}
                    onChange={(e) => handleStyleChange("margin", e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                    placeholder="e.g., 0 auto"
                />
                <p className="text-xs text-gray-500 mt-1">Note: Use '0 auto' with a Max Width to center the section.</p>
            </div>
        </div>
    );
}