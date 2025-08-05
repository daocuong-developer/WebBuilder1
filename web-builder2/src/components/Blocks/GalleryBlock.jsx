// src/components/Blocks/GalleryBlock.jsx
import React from 'react';
import getDefaultProps from "@/utils/defaultProps";

const GalleryBlock = ({ block, onSelect, isPreview }) => {
    const props = {
        ...getDefaultProps(block.type),
        ...block.props,
    };

    const images = Array.isArray(props.images) ? props.images : [];
    const layout = props.layout || "grid";
    const columns = props.columns || 3;
    const gap = props.gap || 10;

    const galleryStyle = {
        display: layout === "grid" ? "grid" : "block", // Hoặc flex/carousel layout
        gridTemplateColumns: layout === "grid" ? `repeat(${columns}, 1fr)` : "none",
        gap: `${gap}px`,
        padding: props.padding || "10px",
        margin: props.margin || "0",
    };

    return (
        <div style={galleryStyle} onClick={onSelect}>
            {images.length > 0 ? (
                images.map((image, index) => (
                    <img
                        key={index}
                        src={image.src || "https://via.placeholder.com/150?text=Image"}
                        alt={image.alt || `Gallery Image ${index + 1}`}
                        style={{
                            width: "100%",
                            height: props.imageHeight || "auto", // Tùy chọn chiều cao cho ảnh
                            objectFit: props.objectFit || "cover",
                            display: "block",
                        }}
                    />
                ))
            ) : (
                !isPreview && (
                    <div
                        className="text-sm text-gray-400 italic text-center p-4"
                        style={{
                            border: "1px dashed #d1d5db",
                            borderRadius: "6px",
                            minHeight: "100px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gridColumn: layout === "grid" ? `span ${columns}` : "auto", // placeholder chiếm toàn bộ nếu là grid
                        }}
                    >
                        (Empty Gallery – add images)
                    </div>
                )
            )}
        </div>
    );
};

export default GalleryBlock;