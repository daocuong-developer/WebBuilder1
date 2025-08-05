// src/components/Blocks/ParagraphBlock.jsx
import React from "react";
import getDefaultProps from "@/utils/defaultProps";
import getResponsivePropValue from "@/utils/getResponsivePropValue";

const ParagraphBlock = ({ block, onSelect, isPreview, device }) => { // ✅ NHẬN THÊM isPreview
    const props = {
        ...getDefaultProps(block.type),
        ...block.props,
    };

    const style = {
        fontFamily: props.fontFamily || "inherit",
        fontSize: getResponsivePropValue(props.fontSize, device) || "1rem",
        color: props.color || "#000",
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        fontWeight: props.fontWeight || (props.bold ? "bold" : "normal"),
        textAlign: getResponsivePropValue(props.textAlign, device) || "left",
        lineHeight: getResponsivePropValue(props.lineHeight, device) || "normal",
        letterSpacing: getResponsivePropValue(props.letterSpacing, device) || "normal",
        fontStyle: props.italic ? "italic" : "normal",
        textDecoration: props.underline ? "underline" : "none",
        maxWidth: props.maxWidth || "none",
        // Adjusted margin logic for centering with maxWidth
        margin: (props.maxWidth && (getResponsivePropValue(props.textAlign, device) || "left") === "center") ? "0 auto" : "initial",
    };


    const handleClick = (e) => {
        if (isPreview) {
            // If in preview mode and it's a link, allow default link behavior
            if (props.href) {
                // Do nothing, let the default link click happen
                return;
            }
            return; // If not a link, just return
        }
        e.stopPropagation();
        onSelect(block.id);
    };

    // Determine the content to be rendered
    const content = props.text || "Default paragraph text.";

    return (
        <p style={style} onClick={handleClick} className="cursor-pointer">
            {/* RENDER LINK IF href IS PROVIDED */}
            {props.href ? (
                <a
                    // Auto-prefix mailto: if it's an email, otherwise use as is
                    href={props.href.startsWith("mailto:") || props.href.startsWith("tel:") || props.href.startsWith("http") || props.href.startsWith("page://") ? props.href : `mailto:${props.href}`}
                    style={{ color: props.color || "#000", textDecoration: props.underline ? "underline" : "none" }}
                    onClick={(e) => e.stopPropagation()} // Prevent paragraph click handler from interfering
                    target={props.href.startsWith("http") || props.href.startsWith("tel:") ? "_blank" : "_self"} // Open external links in new tab, tel also in new tab for consistency
                    rel={props.href.startsWith("http") ? "noopener noreferrer" : ""} // Security for _blank
                >
                    {content}
                </a>
            ) : (
                content
            )}
        </p>
    );
};

export default ParagraphBlock;