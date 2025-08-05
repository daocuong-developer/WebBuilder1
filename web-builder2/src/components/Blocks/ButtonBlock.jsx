import React, { useState } from "react";
import getDefaultProps from "@/utils/defaultProps";
import getResponsivePropValue from "@/utils/getResponsivePropValue"; // Import hàm responsive

const ButtonBlock = ({ block, onSelect, isPreview, device }) => {
    const props = {
        ...getDefaultProps(block.type),
        ...block.props,
    };

    const [isHovered, setIsHovered] = useState(false);

    // Xử lý sự kiện click
    const handleClick = (e) => {
        if (!isPreview) {
            e.stopPropagation();
            onSelect(block.id);
        }
    };

    // Áp dụng style cho nút
    const buttonStyle = {
        fontFamily: props.fontFamily || "inherit",
        fontSize: getResponsivePropValue(props.fontSize, device) || "16px",
        fontWeight: props.fontWeight || "normal",
        lineHeight: props.lineHeight || "1.5",
        padding: props.padding || "10px 20px",
        borderRadius: props.borderRadius || "8px",
        border: "none", // Thường nút không cần border mặc định
        cursor: "pointer",
        display: 'inline-flex', // Dùng inline-flex để icon và text căn giữa
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        transition: "background-color 0.2s ease, color 0.2s ease, transform 0.2s ease",
        
        // ✅ SỬA Ở ĐÂY: Đọc từ 'color' thay vì 'textColor'
        color: props.color || "#ffffff", 
        backgroundColor: props.backgroundColor || "#007bff",
    };

    // Áp dụng hiệu ứng hover nếu có
    if (props.hoverEffect && isHovered) {
        buttonStyle.backgroundColor = props.hoverBackgroundColor || "#0056b3";
        buttonStyle.color = props.hoverTextColor || "#ffffff";
        buttonStyle.transform = "scale(1.05)";
    }
    
    // Wrapper style để xử lý căn chỉnh toàn bộ khối nút
    const wrapperStyle = {
        width: '100%',
        textAlign: props.blockAlignment || 'left',
    };

    // Component để render icon
    const Icon = () => {
        if (!props.icon) return null;
        return (
            <img
                src={props.icon}
                alt="icon"
                style={{
                    width: props.iconSize || 16,
                    height: props.iconSize || 16,
                    marginRight: props.text ? 8 : 0,
                }}
            />
        );
    };

    // Chọn thẻ <a> nếu có href, ngược lại dùng <button>
    const Tag = isPreview && props.href ? "a" : "button";
    
    const tagProps = {
        style: buttonStyle,
        onClick: handleClick,
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        disabled: props.disabled,
    };

    if (Tag === 'a') {
        tagProps.href = props.href;
        tagProps.target = props.target || "_self";
        if (props.target === '_blank') {
            tagProps.rel = "noopener noreferrer";
        }
    }

    return (
        <div style={wrapperStyle}>
            <Tag {...tagProps}>
                <Icon />
                <span>{props.text || "Click Me"}</span>
            </Tag>
        </div>
    );
};

export default ButtonBlock;
