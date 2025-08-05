import React from "react";
import getDefaultProps from "@/utils/defaultProps";

const MapBlock = ({ block, onSelect }) => {
    const props = {
        ...getDefaultProps(block.type),
        ...block.props,
    };

    const { location, zoom, mapType, width, height, borderRadius, shadow, margin, maxWidth } = props;

    const containerStyle = {
        width: width || "100%",
        height: height || "400px",
        borderRadius: borderRadius || "0",
        boxShadow: shadow || "none",
        overflow: "hidden",
        margin: margin || "20px auto",
        maxWidth: maxWidth || "800px",
    };

    const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(location)}&z=${zoom}&output=embed`;

    return (
        <div style={containerStyle} onClick={onSelect}>
            <iframe
                title="Map"
                src={mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            />
        </div>
    );
};

export default MapBlock;
