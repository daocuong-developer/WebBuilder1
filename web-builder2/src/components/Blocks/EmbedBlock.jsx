import React from "react";
import getDefaultProps from "@/utils/defaultProps";

const EmbedBlock = ({ block, onSelect }) => {
    const props = {
        ...getDefaultProps(block.type),
        ...block.props,
    };

    const containerStyle = {
        padding: props.padding || "10px",
        margin: props.margin || "0",
        width: props.width || "100%",
        height: props.height || "auto",
        boxSizing: "border-box",
    };

    return (
        <div style={containerStyle} onClick={onSelect}>
            <div
                dangerouslySetInnerHTML={{ __html: props.code || "<p style='color: gray;'>No embed code provided.</p>" }}
            />
        </div>
    );
};

export default EmbedBlock;
