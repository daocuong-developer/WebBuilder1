import React from "react";
import * as Icons from "lucide-react";
import getDefaultProps from "@/utils/defaultProps";

const IconBlock = ({ block, onSelect }) => {
    const props = {
        ...getDefaultProps(block.type),
        ...block.props,
    };

    const {
        iconName = "Star",
        size = 24,
        color = "#000000",
        textAlign = "center",
        padding = "5px",
        display = "block",
    } = props;

    const Icon = Icons[iconName] || Icons["Star"];

    return (
        <div
            onClick={onSelect}
            style={{
                textAlign,
                padding,
                display,
            }}
        >
            <Icon size={size} color={color} />
        </div>
    );
};

export default IconBlock;
