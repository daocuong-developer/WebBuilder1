import React from "react";
import getDefaultProps from "@/utils/defaultProps";

const RichtextBlock = ({ block, onSelect }) => {
    const props = {
        ...getDefaultProps(block.type),
        ...block.props,
    };

    return (
        <div
            onClick={onSelect}
            className="richtext-content"
            style={{
                color: props.color || "#333",
                fontSize: props.fontSize || "1rem",
                lineHeight: props.lineHeight || "1.6",
            }}
            dangerouslySetInnerHTML={{ __html: props.html || "<p>Your <b>rich text</b> content goes here.</p>" }}
        />
    );
};

export default RichtextBlock;
