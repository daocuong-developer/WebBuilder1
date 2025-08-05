// src/components/Blocks/TestimonialBlock.jsx

import React from "react";
import getDefaultProps from "@/utils/defaultProps";

const TestimonialBlock = ({ block, onSelect, isPreview }) => {
    const props = {
        ...getDefaultProps(block.type),
        ...block.props,
    };

    const containerStyle = {
        backgroundColor: props.backgroundColor || "#f9f9f9",
        padding: "30px",
        borderRadius: "12px",
        maxWidth: "700px",
        margin: "30px auto",
        textAlign: props.textAlign || "center",
        color: props.textColor || "#333",
        fontSize: props.fontSize || "1rem",
        fontStyle: props.fontStyle || "normal",
        fontWeight: props.fontWeight || "normal",
        fontFamily: props.fontFamily || "sans-serif",
        lineHeight: props.lineHeight || "normal",
    };

    const avatarStyle = {
        width: "70px",
        height: "70px",
        borderRadius: "50%",
        objectFit: "cover",
        marginBottom: "15px",
    };

    const authorStyle = {
        fontWeight: "bold",
        fontSize: "1.1rem",
        marginTop: "15px",
    };

    const titleStyle = {
        color: "#777",
        fontSize: "0.95rem",
    };

    const stars = "★".repeat(props.rating || 5) + "☆".repeat(5 - (props.rating || 5));

    return (
        <div style={containerStyle} onClick={onSelect}>
            {props.authorImage && <img src={props.authorImage} alt="Avatar" style={avatarStyle} />}
            <p style={{ fontStyle: "italic", marginBottom: "20px" }}>
                “{props.content || "This is a great product. Highly recommended!"}”
            </p>
            <div>
                <div style={authorStyle}>{props.authorName || "Jane Doe"}</div>
                <div style={titleStyle}>{props.authorTitle || "Marketing Director"}</div>
            </div>
            {props.rating && <div className="mt-2 text-yellow-500 text-lg">{stars}</div>}
        </div>
    );
};

export default TestimonialBlock;
