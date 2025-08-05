// import React from "react";
// import getDefaultProps from "@/utils/defaultProps";

// const HeadingBlock = ({ block, onSelect }) => {
//     // Kết hợp defaultProps và props từ block
//     const props = {
//         ...getDefaultProps(block.type),
//         ...block.props,
//     };

//     const HeadingTag = props.level || "h1";

//     const commonStyle = {
//         fontFamily: props.fontFamily || "inherit",
//         fontSize: props.fontSize || "1rem",
//         color: props.color || "#000",
//         fontWeight: props.fontWeight || (props.bold ? "bold" : "normal"),
//         textAlign: props.textAlign || "left",
//         lineHeight: props.lineHeight || "normal",
//         letterSpacing: props.letterSpacing || "normal",
//         fontStyle: props.italic ? "italic" : "normal",
//         textDecoration: props.underline ? "underline" : "none",

//         maxWidth: props.maxWidth || "none",
//         margin: props.maxWidth && props.textAlign === "center" ? "0 auto" : "initial",
//     };
//     const handleClick = (e) => {
//         if (isPreview) return; // Không làm gì nếu đang ở chế độ preview

//         // 1. Ngăn sự kiện lan ra component cha (Container)
//         e.stopPropagation();
        
//         // 2. Gọi hàm onSelect đã được truyền vào để cập nhật state
//         onSelect(block.id);
//     };
//     return (
//         <HeadingTag style={commonStyle} onClick={handleClick} className="heading-block cursor-pointer">
//             {props.text}
//         </HeadingTag>
//     );
// };

// export default HeadingBlock;
// src/components/Blocks/HeadingBlock.jsx
import React from "react";
import getDefaultProps from "@/utils/defaultProps";
import getResponsivePropValue from "@/utils/getResponsivePropValue";

const HeadingBlock = ({ block, onSelect, isPreview, device }) => { // ✅ NHẬN THÊM isPreview
    const props = {
        ...getDefaultProps(block.type),
        ...block.props,
    };

    const HeadingTag = props.level || "h1";

    const style = {
        fontFamily: props.fontFamily || "inherit",
        fontSize: getResponsivePropValue(props.fontSize, device) || "1rem",
        color: props.color || "#000",
        fontWeight: props.fontWeight || (props.bold ? "bold" : "normal"),
        textAlign: getResponsivePropValue(props.textAlign, device) || "left",
        lineHeight: getResponsivePropValue(props.lineHeight, device) || "normal",
        letterSpacing: getResponsivePropValue(props.letterSpacing, device) || "normal",
        fontStyle: props.italic ? "italic" : "normal",
        textDecoration: props.underline ? "underline" : "none",
        maxWidth: props.maxWidth || "none",
        margin: props.maxWidth && props.textAlign === "center" ? "0 auto" : "initial",
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
    };

    const handleClick = (e) => {
        if (isPreview) return; // Giờ điều kiện này sẽ hoạt động
        e.stopPropagation();
        onSelect(block.id);
    };

    return (
        <HeadingTag style={style} onClick={handleClick} className="cursor-pointer">
            {props.text || "Default Heading"}
        </HeadingTag>
    );
};

export default HeadingBlock;