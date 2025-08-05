// src/components/PropertyPanel/PropertyPanel.jsx
import React from "react";

// Import tất cả các component con render thuộc tính
import TextOptions from "./properties/textOptions";
import ButtonOptions from "./properties/buttonOptions";
import ImageOptions from "./properties/imageOptions";
import ContainerOptions from "./properties/containerOptions";
import QuoteOptions from "./properties/quoteOptions";
import RichtextOptions from "./properties/richtextOptions";
import IconOptions from "./properties/iconOptions";
import SectionOptions from "./properties/sectionOptions";
import ColumnsOptions from "./properties/columnsOptions";
import SpacerOptions from "./properties/spacerOptions";
import DividerOptions from "./properties/dividerOptions";
import GalleryOptions from "./properties/galleryOptions";
import VideoOptions from "./properties/videoOptions";
import AudioOptions from "./properties/audioOptions";
import FormOptions from "./properties/formOptions";
import CtaOptions from "./properties/ctaOptions";
import TestimonialOptions from "./properties/testimonialOptions";
import AccordionOptions from "./properties/accordionOptions";
import TabsOptions from "./properties/tabsOptions";
import SocialOptions from "./properties/socialOptions";
import MapOptions from "./properties/mapOptions";
import EmbedOptions from "./properties/embedOptions";
import HeaderOptions from "./properties/headerOptions";
import FooterOptions from "./properties/footerOptions";
import ParagraphOptions from "./properties/paragraphOptions";
import SwiperOptions from "./properties/SwiperOptions";
import VideoBackgroundOption from "./properties/VideoBackgroundOption";

export default function PropertyPanel({ block, onChange }) {
    if (!block) {
        return <p className="text-gray-600">Select a component to see its properties.</p>;
    }

    // Hàm chung để cập nhật props của block
    const handleChange = (key, value) => {
        const updatedBlock = {
            ...block,
            props: {
                ...block.props,
                [key]: value,
            },
        };
        onChange(updatedBlock);
    };

    // Hàm chung để cập nhật style của block (nếu có)
    const handleStyleChange = (key, value) => {
        const updatedBlock = {
            ...block,
            props: {
                ...block.props,
                style: {
                    ...block.props.style,
                    [key]: value,
                },
            },
        };
        onChange(updatedBlock);
    };

    const handleHeadingLevelChange = (value) => {
        // --- CHỈNH SỬA Ở ĐÂY ---
        const fontSizeMap = {
            h1: "40px",
            h2: "32px",
            h3: "28px",
            h4: "24px",
            h5: "20px",
            h6: "16px",
        };

        const updatedBlock = {
            ...block,
            props: {
                ...block.props,
                level: value,
                fontSize: fontSizeMap[value] || "16px",
            },
        };
        onChange(updatedBlock);
    };

    const commonProps = {
        block: block, // Truyền toàn bộ block
        handleChange: handleChange, // Hàm cập nhật props
        handleStyleChange: handleStyleChange, // Hàm cập nhật style
        handleHeadingLevelChange: handleHeadingLevelChange,
        onChange: onChange,
    };

    return (
        <div className="space-y-4 p-4 bg-white shadow rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Component Properties</h3>
            {block ? (
                (() => {
                    switch (block.type) {
                        case "heading":
                            return (
                                <>
                                    <TextOptions {...commonProps} />

                                    {/* Textarea để chỉnh sửa nội dung heading */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Heading Text
                                        </label>
                                        <textarea
                                            className="w-full border rounded px-2 py-1"
                                            rows={2}
                                            value={block.props.text || ""}
                                            onChange={(e) => handleChange("text", e.target.value)}
                                            placeholder="Your Heading"
                                        />
                                    </div>

                                    {/* Chọn cấp độ heading */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Heading Level
                                        </label>
                                        <select
                                            className="w-full border rounded px-2 py-1"
                                            value={block.props.level || "h1"}
                                            onChange={(e) => handleHeadingLevelChange(e.target.value)}
                                        >
                                            <option value="h1">H1</option>
                                            <option value="h2">H2</option>
                                            <option value="h3">H3</option>
                                            <option value="h4">H4</option>
                                            <option value="h5">H5</option>
                                            <option value="h6">H6</option>
                                        </select>
                                    </div>
                                </>
                            );

                        case "paragraph":
                            return (
                                <>
                                    <ParagraphOptions {...commonProps} />

                                    {/* Textarea để chỉnh sửa nội dung paragraph */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Paragraph Text
                                        </label>
                                        <textarea
                                            className="w-full border rounded px-2 py-1"
                                            rows={4}
                                            value={block.props.text || ""}
                                            onChange={(e) => handleChange("text", e.target.value)}
                                            placeholder="This is a paragraph of text."
                                        />
                                    </div>
                                </>
                            );

                        case "button":
                            return <ButtonOptions {...commonProps} />;
                        case "image":
                            return <ImageOptions {...commonProps} />;
                        case "container":
                            return <ContainerOptions {...commonProps} />;
                        case "quote":
                            return <QuoteOptions {...commonProps} />;
                        case "richtext":
                            return <RichtextOptions {...commonProps} />;
                        case "icon":
                            return <IconOptions {...commonProps} />;
                        case "section":
                            return <SectionOptions {...commonProps} />;
                        case "columns":
                            return <ColumnsOptions block={block} onChange={onChange} />;
                        case "spacer":
                            return <SpacerOptions {...commonProps} />;
                        case "divider":
                            return <DividerOptions {...commonProps} />;
                        case "gallery":
                            return <GalleryOptions {...commonProps} />;
                        case "video":
                            return <VideoOptions {...commonProps} />;
                        case "audio":
                            return <AudioOptions {...commonProps} />;
                        case "form":
                            return <FormOptions {...commonProps} />;
                        case "cta":
                            return <CtaOptions {...commonProps} />;
                        case "testimonial":
                            return <TestimonialOptions {...commonProps} />;
                        case "accordion":
                            return <AccordionOptions {...commonProps} />;
                        case "tabs":
                            return <TabsOptions {...commonProps} />;
                        case "social":
                            return <SocialOptions {...commonProps} />;
                        case "map":
                            return <MapOptions {...commonProps} />;
                        case "embed":
                            return <EmbedOptions {...commonProps} />;
                        case "header":
                            return <HeaderOptions block={block} onChange={onChange} />;
                        case "footer":
                            return <FooterOptions {...commonProps} />;
                        case "swiper":
                            return <SwiperOptions {...commonProps}/>;
                        case "videoBackground":
                            return <VideoBackgroundOption {...commonProps}/>;
                        default:
                            return <p className="text-gray-600">No properties available for this component type.</p>;
                    }
                })()
            ) : (
                <p className="text-gray-600">Select a component to see its properties.</p>
            )}
        </div>
    );
}
