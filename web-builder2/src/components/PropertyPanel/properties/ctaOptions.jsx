import React from "react";
import InputField from "@/components/shared/InputField";
import TextAreaField from "@/components/shared/TextAreaField";
import ColorPicker from "@/components/shared/ColorPicker";
import FontOptions from "@/components/shared/FontOptions";
import AlignOptions from "@/components/shared/AlignOptions";
import CollapsibleGroup from "@/components/shared/CollapsibleGroup";

const CtaOptions = ({ block, handleChange }) => {
    const props = block.props;

    return (
        <div className="space-y-4">
            <CollapsibleGroup title="📝 Headline">
                <InputField
                    label="Headline Text"
                    value={props.headline || ""}
                    onChange={(val) => handleChange("headline", val)}
                    placeholder="Your call to action headline"
                />
                <FontOptions value={props.headlineStyle || {}} onChange={(val) => handleChange("headlineStyle", val)} />
                <AlignOptions
                    label="Text Alignment"
                    value={props.headlineAlign || "center"}
                    onChange={(val) => handleChange("headlineAlign", val)}
                />
            </CollapsibleGroup>

            <CollapsibleGroup title="📄 Description">
                <TextAreaField
                    label="Description"
                    value={props.description || ""}
                    onChange={(val) => handleChange("description", val)}
                    placeholder="Short description to support the headline"
                />
                <FontOptions
                    value={props.descriptionStyle || {}}
                    onChange={(val) => handleChange("descriptionStyle", val)}
                />
                <AlignOptions
                    label="Text Alignment"
                    value={props.descriptionAlign || "center"}
                    onChange={(val) => handleChange("descriptionAlign", val)}
                />
            </CollapsibleGroup>

            <CollapsibleGroup title="🔘 Button">
                <InputField
                    label="Button Text"
                    value={props.buttonText || ""}
                    onChange={(val) => handleChange("buttonText", val)}
                />
                <InputField
                    label="Button URL"
                    value={props.buttonUrl || "#"}
                    onChange={(val) => handleChange("buttonUrl", val)}
                    type="url"
                />
                <ColorPicker
                    label="Button Background"
                    value={props.buttonBgColor || "#007bff"}
                    onChange={(val) => handleChange("buttonBgColor", val)}
                />
                <ColorPicker
                    label="Button Text Color"
                    value={props.buttonTextColor || "#ffffff"}
                    onChange={(val) => handleChange("buttonTextColor", val)}
                />
                <ColorPicker
                    label="Hover Background"
                    value={props.buttonHoverBgColor || "#0056b3"}
                    onChange={(val) => handleChange("buttonHoverBgColor", val)}
                />
                <ColorPicker
                    label="Hover Text Color"
                    value={props.buttonHoverTextColor || "#ffffff"}
                    onChange={(val) => handleChange("buttonHoverTextColor", val)}
                />
            </CollapsibleGroup>

            <CollapsibleGroup title="🎨 Layout">
                <ColorPicker
                    label="Background Color"
                    value={props.backgroundColor || "#f9f9f9"}
                    onChange={(val) => handleChange("backgroundColor", val)}
                />
                <AlignOptions
                    label="CTA Block Alignment"
                    value={props.blockAlign || "center"}
                    onChange={(val) => handleChange("blockAlign", val)}
                />
            </CollapsibleGroup>
        </div>
    );
};

export default CtaOptions;
