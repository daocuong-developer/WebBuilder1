import React from "react";

const VideoBackgroundBlock = ({ block }) => {
    const props = block.props || {};
    const height = props.height || 600;

    return (
        <div className="relative w-full overflow-hidden group cursor-pointer" style={{ height: `${height}px` }}>
            {/* Video Background */}
            <video
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
                src={props.videoUrl || ""}
                autoPlay
                muted
                loop
                playsInline
                style={{ filter: props.filter || "none" }}
            />

            {/* Overlay */}
            <div
                className="absolute inset-0 z-10"
                style={{ backgroundColor: props.overlayColor || "rgba(0,0,0,0.4)" }}
            />

            {/* Content */}
            <div
                className={`relative z-20 mx-auto h-full flex flex-col justify-center px-4 ${
                    props.textAlign === "center"
                        ? "items-center text-center"
                        : props.textAlign === "right"
                        ? "items-end text-right"
                        : "items-start text-left"
                }`}
                style={{ color: props.textColor || "#ffffff", maxWidth: props.maxWidth || "1024px" }}
            >
                <h2 className="text-4xl font-bold mb-4">{props.title}</h2>
                <p className="text-lg mb-6">{props.description}</p>
                {props.buttonText && (
                    <button
                        className="font-medium px-6 py-2 transition"
                        style={{
                            backgroundColor: props.buttonColor || "#ffffff",
                            color: props.buttonTextColor || "#000000",
                            borderRadius: props.buttonRadius || "6px",
                        }}
                    >
                        {props.buttonText}
                    </button>
                )}
            </div>
        </div>
    );
};

export default VideoBackgroundBlock;