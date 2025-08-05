// FooterBlock.jsx
import React from "react";

const FooterBlock = ({ block }) => {
    const props = block.props || {};

    const footerStyle = {
        backgroundColor: props.backgroundColor || "#333333", // Default background
        color: props.color || "#ffffff", // Default text color
        padding: props.padding || "40px 20px", // Default padding
        textAlign: props.textAlign || "left",
        // Add other direct styles for the <footer> tag itself here
    };

    // Determine inline style for the inner content container
    const contentContainerStyle = {
        display: "flex",
        // On small screens, columns will wrap and stack due to flex-wrap and default min-width on columns
        flexWrap: "wrap",
        justifyContent: "space-between", // Distribute columns
        gap: "40px", // Spacing between columns
        textAlign: "left", // Ensure column content aligns left inside each column

        // Apply maxWidth and margin for centering
        maxWidth: props.maxWidth || "1200px", // Use prop for maxWidth, default to 1200px
        margin: "0 auto", // Center the content container
        paddingLeft: "20px", // Add default horizontal padding inside the max-width container
        paddingRight: "20px", // to prevent content sticking to edges on smaller screens within the max-width
    };

    return (
        <footer style={footerStyle}>
            <div
                style={contentContainerStyle}
            >
                {(props.columns || []).map((col, idx) => (
                    <div
                        key={idx}
                        // Use flex-grow and min-width for responsive columns
                        // On small screens, they will stack due to flex-wrap and min-width
                        // On larger screens, they will distribute space
                        style={{ flex: "1 1 auto", minWidth: "200px" }} // flex: grow shrink basis; auto for basis makes it responsive
                    >
                        <h4 style={{ marginBottom: "10px", fontWeight: "bold" }}>{col.title}</h4>
                        <ul style={{ listStyle: "none", padding: 0 }}>
                            {(col.items || []).map((item, i) => {
                                // Assuming item can be a string or an object { text, link }
                                const itemText = typeof item === "string" ? item : item.text;
                                const itemLink = typeof item === "object" ? item.link : null;

                                return (
                                    <li key={i} style={{ marginBottom: "5px" }}>
                                        {itemLink ? (
                                            <a href={itemLink} style={{ color: props.color, textDecoration: "none", opacity: 0.8, ":hover": { opacity: 1 } }}>
                                                {itemText}
                                            </a>
                                        ) : (
                                            <span>{itemText}</span>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </div>

            {props.showCopyright && (
                <div
                    style={{
                        marginTop: "30px",
                        color: props.copyrightColor || "#cccccc", // Default copyright color
                        textAlign: props.textAlign || "center", // Align copyright text
                        // Apply maxWidth and margin-auto to copyright text as well if needed,
                        // or let it inherit from the main footer's textAlign.
                        // If you want it separate from the columns' max-width, you'd apply it here.
                        maxWidth: props.maxWidth || "1200px", // Match main content maxWidth
                        margin: "30px auto 0 auto", // Center and add top margin
                        paddingLeft: "20px", // Add padding like the main content
                        paddingRight: "20px",
                    }}
                >
                    {props.copyrightText || `© ${new Date().getFullYear()} Your Company. All rights reserved.`}
                </div>
            )}
        </footer>
    );
};

export default FooterBlock;