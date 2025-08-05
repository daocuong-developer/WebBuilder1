import React from "react";
import TextOptions from "./textOptions"; // Import TextOptions nếu có

export default function QuoteOptions({ block, handleChange }) {
    const props = block.props || {};

    const handleNumericChange = (key, value, unit = "") => {
        if (value === "") {
            handleChange(key, null);
        } else if (!isNaN(parseFloat(value))) {
            handleChange(key, `${parseFloat(value)}${unit}`);
        }
    };

    const handleTextChange = (key, value) => {
        handleChange(key, value);
    };

    const handleCheckboxChange = (key, value) => {
        handleChange(key, value);
    };

    const [boxShadowType, setBoxShadowType] = React.useState(
        [
            "none",
            "0 1px 3px rgba(0,0,0,0.1)",
            "0 4px 6px rgba(0,0,0,0.1)",
            "0 10px 15px rgba(0,0,0,0.15)",
            "0 20px 25px rgba(0,0,0,0.2)",
        ].includes(props.boxShadow)
            ? "preset"
            : "custom"
    );

    return (
        <div className="space-y-6">
            {/* CONTENT SETTINGS */}
            <section>
                <h4 className="text-md font-semibold text-gray-700 border-b pb-2 mb-4">Content Settings</h4>
                <div>
                    <label htmlFor="quote-text" className="block text-sm font-medium text-gray-700">
                        Quote Text
                    </label>
                    <textarea
                        id="quote-text"
                        value={props.text || ""}
                        onChange={(e) => handleTextChange("text", e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        rows="4"
                    />
                </div>
                <div>
                    <label htmlFor="quote-author" className="block text-sm font-medium text-gray-700">
                        Author
                    </label>
                    <input
                        type="text"
                        id="quote-author"
                        value={props.author || ""}
                        onChange={(e) => handleTextChange("author", e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>
                <div>
                    <label htmlFor="quote-title" className="block text-sm font-medium text-gray-700">
                        Author Title
                    </label>
                    <input
                        type="text"
                        id="quote-title"
                        value={props.title || ""}
                        onChange={(e) => handleTextChange("title", e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>
                <div>
                    <label htmlFor="quote-avatarSrc" className="block text-sm font-medium text-gray-700">
                        Author Avatar URL
                    </label>
                    <input
                        type="text"
                        id="quote-avatarSrc"
                        value={props.avatarSrc || ""}
                        onChange={(e) => handleTextChange("avatarSrc", e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        placeholder="e.g., https://example.com/avatar.jpg"
                    />
                    {props.avatarSrc && (
                        <img
                            src={props.avatarSrc}
                            alt="Avatar Preview"
                            className="mt-2 w-16 h-16 rounded-full object-cover border border-gray-200"
                        />
                    )}
                </div>
            </section>

            {/* DISPLAY OPTIONS */}
            <section>
                <h4 className="text-md font-semibold text-gray-700 border-b pb-2 mb-4">Display Options</h4>

                <div>
                    <label htmlFor="quote-variant" className="block text-sm font-medium text-gray-700">
                        Variant
                    </label>
                    <select
                        id="quote-variant"
                        value={props.variant === "" ? "quote" : props.variant || "quote"}
                        onChange={(e) => handleTextChange("variant", e.target.value)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 rounded-md"
                    >
                        <option value="quote">Default Quote</option>
                        <option value="testimonial">Testimonial</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="text-align" className="block text-sm font-medium text-gray-700">
                        Text Align
                    </label>
                    <select
                        id="text-align"
                        value={props.textAlign || "center"}
                        onChange={(e) => handleTextChange("textAlign", e.target.value)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 rounded-md"
                    >
                        <option value="left">Left</option>
                        <option value="center">Center</option>
                        <option value="right">Right</option>
                    </select>
                </div>
            </section>

            {/* TYPOGRAPHY */}
            <section>
                <h4 className="text-md font-semibold text-gray-700 border-b pb-2 mb-4">Typography</h4>
                <div>
                    <label htmlFor="content-font-size" className="block text-sm font-medium text-gray-700">
                        Content Font Size (px)
                    </label>
                    <input
                        type="number"
                        id="content-font-size"
                        step="1"
                        value={
                            props.contentFontSize !== null && props.contentFontSize !== undefined
                                ? parseFloat(props.contentFontSize)
                                : 16
                        }
                        onChange={(e) => handleNumericChange("contentFontSize", e.target.value, "px")}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>
                <div>
                    <label htmlFor="line-height" className="block text-sm font-medium text-gray-700">
                        Line Height
                    </label>
                    <input
                        type="number"
                        id="line-height"
                        step="0.1"
                        value={
                            props.lineHeight !== null && props.lineHeight !== undefined
                                ? parseFloat(props.lineHeight)
                                : 1.5
                        }
                        onChange={(e) => handleNumericChange("lineHeight", e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>
                <div>
                    <label htmlFor="text-color" className="block text-sm font-medium text-gray-700">
                        Text Color
                    </label>
                    <input
                        type="color"
                        id="text-color"
                        value={props.contentColor || "#333333"}
                        onChange={(e) => handleTextChange("contentColor", e.target.value)}
                        className="mt-1 block w-full h-8"
                    />
                </div>
                <div>
                    <label htmlFor="author-name-color" className="block text-sm font-medium text-gray-700">
                        Author Name Color
                    </label>
                    <input
                        type="color"
                        id="author-name-color"
                        value={props.authorNameColor || "#333333"}
                        onChange={(e) => handleTextChange("authorNameColor", e.target.value)}
                        className="mt-1 block w-full h-8"
                    />
                </div>
                <div>
                    <label htmlFor="author-title-color" className="block text-sm font-medium text-gray-700">
                        Author Title Color
                    </label>
                    <input
                        type="color"
                        id="author-title-color"
                        value={props.authorTitleColor || "#777777"}
                        onChange={(e) => handleTextChange("authorTitleColor", e.target.value)}
                        className="mt-1 block w-full h-8"
                    />
                </div>
            </section>

            {/* LAYOUT & SPACING */}
            <section>
                <h4 className="text-md font-semibold text-gray-700 border-b pb-2 mb-4">Layout & Spacing</h4>
                <div>
                    <label htmlFor="padding" className="block text-sm font-medium text-gray-700">
                        Padding
                    </label>
                    <input
                        type="text"
                        id="padding"
                        value={props.padding || "30px"}
                        onChange={(e) => handleTextChange("padding", e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>
                <div>
                    <label htmlFor="margin" className="block text-sm font-medium text-gray-700">
                        Margin
                    </label>
                    <input
                        type="text"
                        id="margin"
                        value={props.margin || "20px auto"}
                        onChange={(e) => handleTextChange("margin", e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>
                <div>
                    <label htmlFor="max-width" className="block text-sm font-medium text-gray-700">
                        Max Width
                    </label>
                    <input
                        type="text"
                        id="max-width"
                        value={props.maxWidth || "700px"}
                        onChange={(e) => handleTextChange("maxWidth", e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>
                <div>
                    <label htmlFor="author-image-size" className="block text-sm font-medium text-gray-700">
                        Author Image Size (px)
                    </label>
                    <input
                        type="number"
                        id="author-image-size"
                        value={
                            props.authorImageSize !== null && props.authorImageSize !== undefined
                                ? parseFloat(props.authorImageSize)
                                : 80
                        }
                        onChange={(e) => handleNumericChange("authorImageSize", e.target.value, "px")}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>
            </section>

            {/* BACKGROUND & BORDER */}
            <section>
                <h4 className="text-md font-semibold text-gray-700 border-b pb-2 mb-4">Background & Border</h4>
                <div>
                    <label htmlFor="bg-color" className="block text-sm font-medium text-gray-700">
                        Background Color
                    </label>
                    <input
                        type="color"
                        id="bg-color"
                        value={props.backgroundColor || "transparent"}
                        onChange={(e) => handleTextChange("backgroundColor", e.target.value)}
                        className="mt-1 block w-full h-8"
                    />
                </div>
                <div>
                    <label htmlFor="border-color" className="block text-sm font-medium text-gray-700">
                        Border Color
                    </label>
                    <input
                        type="color"
                        id="border-color"
                        value={props.borderColor || "#e0e0e0"}
                        onChange={(e) => handleTextChange("borderColor", e.target.value)}
                        className="mt-1 block w-full h-8"
                    />
                </div>
                <div>
                    <label htmlFor="border-width" className="block text-sm font-medium text-gray-700">
                        Border Width (px)
                    </label>
                    <input
                        type="number"
                        id="border-width"
                        value={
                            props.borderWidth !== null && props.borderWidth !== undefined
                                ? parseFloat(props.borderWidth)
                                : 0
                        }
                        onChange={(e) => handleNumericChange("borderWidth", e.target.value, "px")}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>
                <div>
                    <label htmlFor="border-radius" className="block text-sm font-medium text-gray-700">
                        Border Radius
                    </label>
                    <input
                        type="text"
                        id="border-radius"
                        value={props.borderRadius || "8px"}
                        onChange={(e) => handleTextChange("borderRadius", e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        placeholder="e.g., 8px or 50%"
                    />
                </div>
                {/* <div>
                    <label htmlFor="box-shadow" className="block text-sm font-medium text-gray-700">
                        Box Shadow
                    </label>
                    <select
                        id="box-shadow"
                        value={props.boxShadow}
                        onChange={(e) => handleTextChange("boxShadow", e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    >
                        <option value="none">None</option>
                        <option value="0 1px 3px rgba(0,0,0,0.1)">Small</option>
                        <option value="0 4px 6px rgba(0,0,0,0.1)">Medium</option>
                        <option value="0 10px 15px rgba(0,0,0,0.15)">Large</option>
                        <option value="0 20px 25px rgba(0,0,0,0.2)">Extra Large</option>
                        <option value="custom">Custom…</option>
                    </select>
                </div> */}
                <select
                    id="box-shadow"
                    value={boxShadowType === "custom" ? "custom" : props.boxShadow}
                    onChange={(e) => {
                        const value = e.target.value;
                        if (value === "custom") {
                            setBoxShadowType("custom");
                        } else {
                            setBoxShadowType("preset");
                            handleTextChange("boxShadow", value);
                        }
                    }}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                >
                    <option value="none">None</option>
                    <option value="0 1px 3px rgba(0,0,0,0.1)">Small</option>
                    <option value="0 4px 6px rgba(0,0,0,0.1)">Medium</option>
                    <option value="0 10px 15px rgba(0,0,0,0.15)">Large</option>
                    <option value="0 20px 25px rgba(0,0,0,0.2)">Extra Large</option>
                    <option value="custom">Custom…</option>
                </select>
                {boxShadowType === "custom" && (
                    <input
                        type="text"
                        value={props.boxShadow}
                        onChange={(e) => handleTextChange("boxShadow", e.target.value)}
                        placeholder="e.g., 0 4px 6px rgba(0,0,0,0.1)"
                        className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                )}
            </section>
        </div>
    );
}
