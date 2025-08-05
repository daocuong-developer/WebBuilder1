import React from "react";
// Import tất cả các component block của bạn
import HeadingBlock from "@/components/Blocks/HeadingBlock";
import ParagraphBlock from "@/components/Blocks/ParagraphBlock";
import ButtonBlock from "@/components/Blocks/ButtonBlock";
import ImageBlock from "@/components/Blocks/ImageBlock";
import ContainerBlock from "@/components/Blocks/ContainerBlock";
import QuoteBlock from "@/components/Blocks/QuoteBlock";
import RichtextBlock from "@/components/Blocks/RichtextBlock";
import IconBlock from "@/components/Blocks/IconBlock";
import SectionBlock from "@/components/Blocks/SectionBlock";
import ColumnsBlock from "@/components/Blocks/ColumnsBlock";
import SpacerBlock from "@/components/Blocks/SpacerBlock";
// import DividerBlock from "@/components/Blocks/DividerBlock"; // Giả sử bạn có file DividerBlock.jsx
import GalleryBlock from "@/components/Blocks/GalleryBlock";
import VideoBlock from "@/components/Blocks/VideoBlock";
import AudioBlock from "@/components/Blocks/AudioBlock";
import FormBlock from "@/components/Blocks/FormBlock";
import CtaBlock from "@/components/Blocks/CtaBlock";
import TestimonialBlock from "@/components/Blocks/TestimonialBlock";
import AccordionBlock from "@/components/Blocks/AccordionBlock";
import TabsBlock from "@/components/Blocks/TabsBlock";
import SocialBlock from "@/components/Blocks/SocialBlock";
import MapBlock from "@/components/Blocks/MapBlock";
import EmbedBlock from "@/components/Blocks/EmbedBlock";
import HeaderBlock from "@/components/Blocks/HeaderBlock";
import FooterBlock from "@/components/Blocks/FooterBlock";
import SwiperBlock from "./Blocks/SwiperBlock";
import VideoBackgroundBlock from "./Blocks/VideoBackgroundBlock";

export default function RenderBlock(props) {
    const { block } = props;


    // Kiểm tra đầu vào an toàn
    if (!block?.type) {
        return null;
    }

    // ✅ CÁCH LÀM ĐÚNG:
    // Dùng {...props} để truyền TẤT CẢ các props nhận được 
    // (bao gồm cả `device`) xuống component con một cách tự động.
    // Không cần truyền riêng lẻ `device={device}` nữa.
    switch (block.type) {
        case "heading":
            return <HeadingBlock {...props} />;
        case "paragraph":
            return <ParagraphBlock {...props} />;
        case "button":
            return <ButtonBlock {...props} />;
        case "image":
            return <ImageBlock {...props} />;
        case "videoBackground":
            return <VideoBackgroundBlock {...props} />;
        case "container":
            return <ContainerBlock {...props} />;
        case "quote":
            return <QuoteBlock {...props} />;
        case "richtext":
            return <RichtextBlock {...props} />;
        case "icon":
            return <IconBlock {...props} />;
        case "section":
            return <SectionBlock {...props} />;
        case "columns":
            return <ColumnsBlock {...props} />;
        case "spacer":
            return <SpacerBlock {...props} />;
        case "divider":
            return <DividerBlock {...props} />;
        case "gallery":
            return <GalleryBlock {...props} />;
        case "video":
            return <VideoBlock {...props} />;
        case "audio":
            return <AudioBlock {...props} />;
        case "form":
            return <FormBlock {...props} />;
        case "cta":
            return <CtaBlock {...props} />;
        case "testimonial":
            return <TestimonialBlock {...props} />;
        case "accordion":
            return <AccordionBlock {...props} />;
        case "tabs":
            return <TabsBlock {...props} />;
        case "social":
            return <SocialBlock {...props} />;
        case "map":
            return <MapBlock {...props} />;
        case "embed":
            return <EmbedBlock {...props} />;
        case "header":
            return <HeaderBlock {...props} />;
        case "footer":
            return <FooterBlock {...props} />;
        case "swiper":
            return <SwiperBlock {...props} />;
       
        default:
            return (
                <div className="p-2 bg-red-100 text-red-600 border border-red-300 rounded">
                    Unknown Block Type: <strong>{block.type}</strong>
                </div>
            );
    }
}