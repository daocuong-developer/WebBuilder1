// src/components/Blocks/AudioBlock.jsx
import React from "react";
import getDefaultProps from "@/utils/defaultProps";

const AudioBlock = ({ block, onSelect, isPreview }) => {
    const props = {
        ...getDefaultProps(block.type),
        ...block.props,
    };

    const audioSrc = props.src || "";

    const audioStyle = {
        width: props.width || "100%",
        margin: "10px 0",
        display: "block",
    };

    return (
        <div onClick={onSelect} className="audio-block-wrapper">
            {audioSrc ? (
                <audio
                    src={audioSrc}
                    controls={props.controls}
                    autoPlay={props.autoplay}
                    loop={props.loop}
                    muted={props.autoplay} // Mute autoplay audio for better UX
                    style={audioStyle}
                >
                    Your browser does not support the audio element.
                </audio>
            ) : (
                !isPreview && (
                    <div
                        className="text-sm text-gray-400 italic text-center p-4"
                        style={{
                            border: "1px dashed #d1d5db",
                            borderRadius: "6px",
                            minHeight: "80px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        (Invalid or missing audio URL)
                    </div>
                )
            )}
        </div>
    );
};

export default AudioBlock;
