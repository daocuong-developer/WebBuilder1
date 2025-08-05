import React from "react";
import * as FaIcons from "react-icons/fa";

const SocialBlock = ({ block }) => {
    const {
        shareUrl = window.location.href,
        iconColor = "#333",
        iconSize = 24,
        padding = "10px",
        margin = "20px auto",
        alignment = "center",
        selectedIconsList = [],
    } = block.props;

    return (
        <div
            style={{
                display: "flex",
                justifyContent: alignment,
                padding,
                margin,
                flexWrap: "wrap",
                gap: "12px",
            }}
        >
            {selectedIconsList.map((iconName, index) => {
                const IconComponent = FaIcons[iconName];
                if (!IconComponent) return null;

                return (
                    <a
                        key={index}
                        href={shareUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: iconColor }}
                        title={iconName}
                    >
                        <IconComponent size={iconSize} />
                    </a>
                );
            })}
        </div>
    );
};

export default SocialBlock;
