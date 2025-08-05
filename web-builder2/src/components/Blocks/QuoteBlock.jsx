// src/components/Blocks/QuoteBlock.jsx
import React from "react";
import getDefaultProps from "@/utils/defaultProps";

const QuoteBlock = ({ block, onSelect }) => {
    const props = {
        ...getDefaultProps(block.type),
        ...block.props,
    };

    const {
        text,
        author,
        title,
        avatarSrc,
        textAlign = "center",
        lineHeight = "1.5",
        padding = "30px",
        margin = "20px auto",
        maxWidth = "700px",
        backgroundColor = "transparent",
        borderColor = "#e0e0e0",
        borderWidth = "0px",
        borderRadius = "8px",
        boxShadow = "none",
        variant = "quote",
        authorImageSize = "80px",
        authorNameColor = "#333333",
        authorTitleColor = "#777777",
        contentColor = "#444444",
        contentFontSize = "18px",
    } = props;

    const quoteContainerStyle = {
        padding,
        margin,
        maxWidth,
        backgroundColor,
        borderRadius,
        boxShadow,
        textAlign: variant === "testimonial" ? "center" : textAlign,
        border: `${borderWidth} solid ${borderColor}`,
        display: "flex",
        flexDirection: "column",
        alignItems: variant === "testimonial" ? "center" : "stretch",
        justifyContent: "center",
        boxSizing: "border-box",
    };

    const quoteContentStyle = {
        fontStyle: "italic",
        fontSize: contentFontSize,
        color: contentColor,
        lineHeight,
        marginBottom: author || avatarSrc || title ? "15px" : "0",
        position: "relative",
    };

    const avatarStyle = {
        width: authorImageSize,
        height: authorImageSize,
        borderRadius: "50%",
        objectFit: "cover",
        marginBottom: "10px",
        border: `2px solid ${borderColor}`,
    };

    const authorNameStyle = {
        fontWeight: "bold",
        color: authorNameColor,
        fontSize: "16px",
        marginBottom: title ? "5px" : "0",
    };

    const authorTitleStyle = {
        color: authorTitleColor,
        fontSize: "14px",
    };

    return (
        <figure style={quoteContainerStyle} onClick={onSelect}>
            <blockquote style={{ ...quoteContentStyle, position: "relative", padding: "1em 22px" }}>
                {variant === "testimonial" && (
                    <span
                        style={{
                            fontSize: "32px",
                            position: "absolute",
                            left: "0.25em",
                            top: "0",
                            opacity: 0.2,
                            pointerEvents: "none",
                        }}
                    >
                        “
                    </span>
                )}
                <p style={{ position: "relative", zIndex: 1 }}>{text || "This is a profound quote or testimonial."}</p>
                {variant === "testimonial" && (
                    <span
                        style={{
                            fontSize: "32px",
                            position: "absolute",
                            right: "0.25em",
                            bottom: "0",
                            opacity: 0.2,
                            pointerEvents: "none",
                        }}
                    >
                        ”
                    </span>
                )}
            </blockquote>

            {(author || avatarSrc || title) && (
                <figcaption style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    {avatarSrc && <img src={avatarSrc} alt={author || "Author"} style={avatarStyle} />}
                    {author && <cite style={authorNameStyle}>{author}</cite>}
                    {title && <span style={authorTitleStyle}>{title}</span>}
                </figcaption>
            )}
            {!text && !author && !title && !avatarSrc && (
                <div
                    className="text-sm text-gray-400 italic text-center p-4"
                    style={{
                        border: "1px dashed #d1d5db",
                        borderRadius: "6px",
                        minHeight: "100px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    (Empty Quote/Testimonial Block – add text in properties)
                </div>
            )}
        </figure>
    );
};

export default QuoteBlock;
