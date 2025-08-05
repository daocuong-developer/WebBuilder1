// // src/components/Blocks/CtaBlock.jsx
// import React from 'react';
// import getDefaultProps from "@/utils/defaultProps";

// const CtaBlock = ({ block, onSelect, isPreview }) => {
//     const props = {
//         ...getDefaultProps(block.type),
//         ...block.props,
//     };

//     const ctaStyle = {
//         backgroundColor: props.backgroundColor || "#f5f5f5",
//         padding: props.padding || "40px",
//         textAlign: props.textAlign || "center",
//         borderRadius: props.borderRadius || "8px",
//         margin: props.margin || "20px auto",
//         boxSizing: "border-box",
//         maxWidth: props.maxWidth || "800px",
//     };

//     const headlineStyle = {
//         color: props.headlineColor || "#333",
//         fontSize: props.headlineFontSize || "2rem",
//         marginBottom: "10px",
//     };

//     const descriptionStyle = {
//         color: props.descriptionColor || "#555",
//         fontSize: props.descriptionFontSize || "1.1rem",
//         marginBottom: "20px",
//     };

//     const buttonStyle = {
//         backgroundColor: props.buttonBgColor || "#007bff",
//         color: props.buttonTextColor || "#fff",
//         padding: props.buttonPadding || "12px 25px",
//         border: "none",
//         borderRadius: props.buttonBorderRadius || "5px",
//         cursor: isPreview ? "pointer" : "default",
//         textDecoration: "none",
//         display: "inline-block",
//         transition: "background-color 0.3s ease",
//         "&:hover": {
//             backgroundColor: props.buttonHoverBgColor || "#0056b3",
//         },
//     };

//     return (
//         <div style={ctaStyle} onClick={onSelect}>
//             <h2 style={headlineStyle}>{props.headline || "Call to Action Headline"}</h2>
//             <p style={descriptionStyle}>{props.description || "Compelling description to drive engagement."}</p>
//             {props.buttonText && props.buttonUrl && (
//                 <a
//                     href={isPreview ? props.buttonUrl : "#"}
//                     target={isPreview ? props.buttonTarget || "_self" : undefined}
//                     style={buttonStyle}
//                     onClick={isPreview ? undefined : (e) => e.preventDefault()} // Ngăn chặn chuyển hướng trong editor
//                 >
//                     {props.buttonText}
//                 </a>
//             )}
//         </div>
//     );
// };

// export default CtaBlock;

import React, { useState } from "react";
import getDefaultProps from "@/utils/defaultProps";

const CtaBlock = ({ block, onSelect, isPreview }) => {
    const props = {
        ...getDefaultProps(block.type),
        ...block.props,
    };

    const [isHovered, setIsHovered] = useState(false);

    const ctaStyle = {
        backgroundColor: props.backgroundColor || "#f5f5f5",
        padding: props.padding || "40px",
        textAlign: props.blockAlign || "center",
        borderRadius: props.borderRadius || "8px",
        margin: props.margin || "20px auto",
        boxSizing: "border-box",
        maxWidth: props.maxWidth || "800px",
    };

    const headlineStyle = {
        color: props.headlineColor || "#333",
        fontSize: props.headlineStyle?.fontSize || "2rem",
        fontWeight: props.headlineStyle?.fontWeight || "bold",
        fontStyle: props.headlineStyle?.fontStyle || "normal",
        textAlign: props.headlineAlign || "center",
        marginBottom: "10px",
    };

    const descriptionStyle = {
        color: props.descriptionColor || "#555",
        fontSize: props.descriptionStyle?.fontSize || "1.1rem",
        fontWeight: props.descriptionStyle?.fontWeight || "normal",
        fontStyle: props.descriptionStyle?.fontStyle || "normal",
        textAlign: props.descriptionAlign || "center",
        marginBottom: "20px",
    };

    const buttonStyle = {
        backgroundColor: isHovered
            ? props.buttonHoverBgColor || "#0056b3"
            : props.buttonBgColor || "#007bff",
        color: isHovered
            ? props.buttonHoverTextColor || "#fff"
            : props.buttonTextColor || "#fff",
        padding: props.buttonPadding || "12px 25px",
        border: "none",
        borderRadius: props.buttonBorderRadius || "5px",
        cursor: isPreview ? "pointer" : "default",
        textDecoration: "none",
        display: "inline-block",
        transition: "all 0.3s ease",
    };

    return (
        <div style={ctaStyle} onClick={onSelect}>
            {props.headline && (
                <h2 style={headlineStyle}>{props.headline}</h2>
            )}
            {props.description && (
                <p style={descriptionStyle}>{props.description}</p>
            )}
            {props.buttonText && props.buttonUrl && (
                <a
                    href={isPreview ? props.buttonUrl : "#"}
                    target={isPreview ? props.buttonTarget || "_self" : undefined}
                    rel="noopener noreferrer"
                    style={buttonStyle}
                    onClick={isPreview ? undefined : (e) => e.preventDefault()}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {props.buttonText}
                </a>
            )}
        </div>
    );
};

export default CtaBlock;
