import React from "react";
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react";

const ImageOptions = ({ block, onChange }) => {
    // Hàm helper để cập nhật các thuộc tính có hỗ trợ responsive
    const handleResponsiveChange = (propName, device, value) => {
        const currentPropValue = block.props[propName] || {};
        const newPropValue = {
            ...(typeof currentPropValue === 'object' ? currentPropValue : { desktop: currentPropValue }),
            [device]: value,
        };
        // Gọi hàm onChange tổng để cập nhật toàn bộ block
        onChange({
            ...block,
            props: {
                ...block.props,
                [propName]: newPropValue,
            },
        });
    };
    
    // Hàm helper cho các thuộc tính đơn giản
    const handleSimpleChange = (propName, value) => {
        onChange({
            ...block,
            props: {
                ...block.props,
                [propName]: value,
            },
        });
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append("image", file);
            try {
                const response = await fetch("http://localhost:8000/api/images/upload/", {
                    method: "POST",
                    body: formData,
                });
                if (response.ok) {
                    const data = await response.json();
                    const fullImageUrl = `http://localhost:8000${data.image}`;
                    handleSimpleChange("src", fullImageUrl);
                } else {
                    console.error("Image upload failed:", response.statusText);
                }
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
    };

    return (
        <div className="space-y-4 p-2">
            {/* Image URL */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                    className="w-full border rounded px-2 py-1 text-sm"
                    value={block.props.src || ""}
                    onChange={(e) => handleSimpleChange("src", e.target.value)}
                />
            </div>

            {/* Upload Image */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
                <input
                    type="file"
                    accept="image/*"
                    className="w-full text-sm"
                    onChange={handleFileUpload}
                />
            </div>

            {/* Alt Text */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text</label>
                <input
                    className="w-full border rounded px-2 py-1 text-sm"
                    value={block.props.alt || ""}
                    onChange={(e) => handleSimpleChange("alt", e.target.value)}
                />
            </div>
            
            {/* Alignment */}
            <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Alignment</label>
                <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-md w-min">
                    <button onClick={() => handleSimpleChange("align", "flex-start")} title="Align Left" className={`p-2 rounded-md ${(!block.props.align || block.props.align === 'flex-start') ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}>
                        <AlignLeft size={16} />
                    </button>
                    <button onClick={() => handleSimpleChange("align", "center")} title="Align Center" className={`p-2 rounded-md ${block.props.align === 'center' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}>
                        <AlignCenter size={16} />
                    </button>
                    <button onClick={() => handleSimpleChange("align", "flex-end")} title="Align Right" className={`p-2 rounded-md ${block.props.align === 'flex-end' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}>
                        <AlignRight size={16} />
                    </button>
                </div>
            </div>

            {/* Responsive Dimensions */}
            <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Dimensions (Width / Height)</label>
                {["desktop", "tablet", "mobile"].map((device) => (
                    <div key={device} className="grid grid-cols-[50px_1fr_1fr] gap-2 items-center mb-2">
                        <span className="text-xs capitalize text-gray-600">{device}:</span>
                        <input
                            type="text"
                            value={typeof block.props.width === 'object' ? block.props.width[device] || '' : (device === 'desktop' ? block.props.width : '')}
                            onChange={(e) => handleResponsiveChange("width", device, e.target.value)}
                            className="w-full border rounded px-2 py-1 text-sm"
                            placeholder="e.g. 100%"
                        />
                        <input
                            type="text"
                            value={typeof block.props.height === 'object' ? block.props.height[device] || '' : (device === 'desktop' ? block.props.height : '')}
                            onChange={(e) => handleResponsiveChange("height", device, e.target.value)}
                            className="w-full border rounded px-2 py-1 text-sm"
                            placeholder="e.g. auto"
                        />
                    </div>
                ))}
            </div>

            {/* Border Radius & Shadow */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Border Radius</label>
                    <input
                        className="w-full border rounded px-2 py-1 text-sm"
                        value={block.props.borderRadius || ""}
                        onChange={(e) => handleSimpleChange("borderRadius", e.target.value)}
                        placeholder="e.g. 8px"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Shadow</label>
                    <input
                        className="w-full border rounded px-2 py-1 text-sm"
                        value={block.props.shadow || ""}
                        onChange={(e) => handleSimpleChange("shadow", e.target.value)}
                        placeholder="e.g. none"
                    />
                </div>
            </div>

            {/* Click Action */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Link URL</label>
                <input
                    className="w-full border rounded px-2 py-1 text-sm"
                    value={block.props.url || ""}
                    onChange={(e) => handleSimpleChange("url", e.target.value)}
                    placeholder="https://example.com"
                />
            </div>
        </div>
    );
};

export default ImageOptions;
