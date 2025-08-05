import React from "react";

const TabsOptions = ({ block, handleChange }) => {
    const handleTabChange = (index, key, value) => {
        const newTabs = [...(block.props.tabs || [])];
        newTabs[index][key] = value;
        handleChange("tabs", newTabs);
    };

    const addTab = () => {
        handleChange("tabs", [...(block.props.tabs || []), { title: "New Tab", content: "Tab content" }]);
    };

    const removeTab = (index) => {
        const newTabs = block.props.tabs.filter((_, i) => i !== index);
        handleChange("tabs", newTabs);
    };

    const renderStyleInput = (label, key, type = "text") => (
        <div className="mb-3">
            <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
            <input
                type={type}
                value={block.props[key] || ""}
                onChange={(e) => handleChange(key, e.target.value)}
                className="w-full border rounded px-2 py-1 text-sm"
            />
        </div>
    );

    return (
        <div>
            {(block.props.tabs || []).map((tab, index) => (
                <div key={index} className="border p-3 mb-3 rounded bg-gray-50">
                    <div className="mb-2">
                        <label className="block text-xs font-medium text-gray-600 mb-1">Tab Title</label>
                        <input
                            value={tab.title || ""}
                            onChange={(e) => handleTabChange(index, "title", e.target.value)}
                            className="w-full border rounded px-2 py-1 text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Tab Content</label>
                        <textarea
                            value={tab.content || ""}
                            onChange={(e) => handleTabChange(index, "content", e.target.value)}
                            className="w-full border rounded px-2 py-1 text-sm"
                            rows="3"
                        />
                    </div>
                    <button
                        className="mt-2 bg-red-500 text-white px-3 py-1 text-xs rounded"
                        onClick={() => removeTab(index)}
                    >
                        Remove
                    </button>
                </div>
            ))}

            <button className="bg-green-500 text-white px-3 py-1 text-sm rounded" onClick={addTab}>
                Add Tab
            </button>

            <hr className="my-4" />

            <h4 className="text-sm font-semibold text-gray-700 mb-2">Tab Styles</h4>
            {renderStyleInput("Margin", "margin")}
            {renderStyleInput("Max Width", "maxWidth")}
            {renderStyleInput("Tab List Border", "tabListBorder")}
            {renderStyleInput("Tab List Background", "tabListBgColor", "color")}
            {renderStyleInput("Tab Button Padding", "tabButtonPadding")}
            {renderStyleInput("Tab Button Border Radius", "tabButtonBorderRadius")}
            {renderStyleInput("Tab Button Font Size", "tabButtonFontSize")}
            {renderStyleInput("Tab Button Font Weight", "tabButtonFontWeight")}
            {renderStyleInput("Active Border Color", "activeTabBorderColor", "color")}
            {renderStyleInput("Active Background", "activeTabBgColor", "color")}
            {renderStyleInput("Active Text Color", "activeTabTextColor", "color")}
            {renderStyleInput("Text Color", "tabTextColor", "color")}
            {renderStyleInput("Hover Background", "tabHoverBgColor", "color")}
            {renderStyleInput("Content Padding", "tabContentPadding")}
            {renderStyleInput("Content Border", "tabContentBorder")}
            {renderStyleInput("Content Background", "tabContentBgColor", "color")}
            {renderStyleInput("Content Text Color", "tabContentTextColor", "color")}
            {renderStyleInput("Content Font Size", "tabContentFontSize")}
        </div>
    );
};

export default TabsOptions;
