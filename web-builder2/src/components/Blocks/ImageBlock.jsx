import React, { useRef } from "react";
import getDefaultProps from "@/utils/defaultProps";
import getResponsivePropValue from "@/utils/getResponsivePropValue";

const ImageBlock = ({ block, onSelect, onChange, isPreview, device }) => {
    const fileInputRef = useRef(null);

    const props = {
        ...getDefaultProps(block.type),
        ...block.props,
    };

    // Style cho thẻ div bao ngoài để CĂN CHỈNH
    const wrapperStyle = {
        display: 'flex',
        justifyContent: getResponsivePropValue(props.align, device) || 'flex-start', // Mặc định căn trái
    };

    // Style cho chính thẻ <img>
    const imageStyle = {
        width: getResponsivePropValue(props.width, device) || "100%",
        height: getResponsivePropValue(props.height, device) || "auto",
        objectFit: props.objectFit || "cover",
        borderRadius: props.borderRadius || "0",
        boxShadow: props.shadow || "none",
    };

    const handleFileChange = async (e) => {
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
                    onChange({
                        ...block,
                        props: { ...props, src: fullImageUrl },
                    });
                } else {
                    console.error("Image upload failed");
                }
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
    };
    
    // Component con để render ảnh, có thể là thẻ <a> hoặc chỉ là <img>
    const ImageComponent = () => (
        <img
            src={props.src || "https://via.placeholder.com/400x300?text=Placeholder+Image"}
            alt={props.alt || "Placeholder Image"}
            style={imageStyle}
        />
    );

    return (
        <div
            className="image-block-wrapper w-full"
            style={wrapperStyle}
            onClick={(e) => {
                if (!isPreview) {
                    e.stopPropagation();
                    onSelect(block.id);
                }
            }}
            onDoubleClick={(e) => {
                if (!isPreview) {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                }
            }}
            title={!isPreview ? "Double-click to upload" : ""}
        >
            {!isPreview && (
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                />
            )}

            {isPreview && props.url ? (
                <a href={props.url} target={props.target || "_self"}>
                    <ImageComponent />
                </a>
            ) : (
                <ImageComponent />
            )}
        </div>
    );
};

export default ImageBlock;
