import React, { useState, useEffect } from "react";
import getDefaultProps from "@/utils/defaultProps";
import ReactMarkdown from "react-markdown";

const TabsBlock = ({ block, onSelect }) => {
    const props = {
        ...getDefaultProps(block.type),
        ...block.props,
    };

    const [activeTab, setActiveTab] = useState(props.defaultActiveTab || 0);

    useEffect(() => {
        // Reset tab nếu defaultActiveTab thay đổi từ bên ngoài
        if (props.defaultActiveTab !== undefined) {
            setActiveTab(props.defaultActiveTab);
        }
    }, [props.defaultActiveTab]);

    const tabs = Array.isArray(props.tabs) ? props.tabs : [];

    const tabsContainerStyle = {
        margin: props.margin || "20px 0",
        maxWidth: props.maxWidth || "800px",
        boxSizing: "border-box",
    };

    const tabListStyle = {
        display: "flex",
        borderBottom: props.tabListBorder || "1px solid #ddd",
        backgroundColor: props.tabListBgColor || "#f8f8f8",
    };

    const tabButtonStyle = (index) => ({
        padding: props.tabButtonPadding || "10px 15px",
        cursor: "pointer",
        border: "none",
        backgroundColor: activeTab === index ? props.activeTabBgColor || "#fff" : "transparent",
        color: activeTab === index ? props.activeTabTextColor || "#007bff" : props.tabTextColor || "#555",
        fontWeight: activeTab === index ? "bold" : "normal",
        borderBottom: `2px solid ${activeTab === index ? props.activeTabBorderColor || "#007bff" : "transparent"}`,
        borderRadius: props.tabButtonBorderRadius || "0",
        fontSize: props.tabButtonFontSize || "16px",
        transition: "all 0.3s ease",
        outline: "none",
    });

    const tabContentStyle = {
        padding: props.tabContentPadding || "20px",
        border: props.tabContentBorder || "1px solid #ddd",
        borderTop: props.tabContentBorderTop || "none",
        backgroundColor: props.tabContentBgColor || "#fff",
        color: props.tabContentTextColor || "#333",
        fontSize: props.tabContentFontSize || "15px",
        minHeight: "100px",
    };

    return (
        <div style={tabsContainerStyle} onClick={onSelect}>
            {tabs.length > 0 ? (
                <>
                    <div style={tabListStyle}>
                        {tabs.map((tab, index) => (
                            <button
                                key={index}
                                style={tabButtonStyle(index)}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveTab(index);
                                }}
                            >
                                {tab.title || `Tab ${index + 1}`}
                            </button>
                        ))}
                    </div>
                    <div style={tabContentStyle}>
                        <ReactMarkdown>{tabs[activeTab]?.content || "No content for this tab."}</ReactMarkdown>
                    </div>
                </>
            ) : (
                <div
                    className="text-sm text-gray-400 italic text-center p-4"
                    style={{
                        border: "1px dashed #d1d5db",
                        borderRadius: "6px",
                        minHeight: "150px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    (Empty Tabs Block – add tabs in properties)
                </div>
            )}
        </div>
    );
};

export default TabsBlock;
