// import React from "react";
// import getDefaultProps from "@/utils/defaultProps";

// const VideoBlock = ({ block, onSelect, isPreview }) => {
//     const props = {
//         ...getDefaultProps(block.type),
//         ...block.props,
//     };

//     const videoSrc = props.src || "";
//     let embedSrc = "";

//     if (videoSrc.includes("youtube.com/watch")) {
//         const videoId = videoSrc.split("v=")[1]?.split("&")[0];
//         embedSrc = `https://www.youtube.com/embed/${videoId}?autoplay=${props.autoplay ? 1 : 0}&controls=${
//             props.controls ? 1 : 0
//         }&loop=${props.loop ? 1 : 0}`;
//     } else if (videoSrc.includes("vimeo.com")) {
//         const videoId = videoSrc.split("vimeo.com/")[1]?.split("?")[0];
//         embedSrc = `https://player.vimeo.com/video/${videoId}?autoplay=${props.autoplay ? 1 : 0}&controls=${
//             props.controls ? 1 : 0
//         }&loop=${props.loop ? 1 : 0}`;
//     } else if (videoSrc.match(/\.(mp4|webm|ogg)$/i)) {
//         embedSrc = videoSrc;
//     } else {
//         embedSrc = "";
//     }

//     const videoStyle = {
//         width: props.width || "100%",
//         height: props.height || "315px",
//         display: "block",
//         margin: "0 auto",
//     };

//     return (
//         <div onClick={onSelect} className="video-block-wrapper">
//             {embedSrc ? (
//                 embedSrc.includes("youtube.com") || embedSrc.includes("vimeo.com") ? (
//                     <iframe
//                         title="video-embed"
//                         src={embedSrc}
//                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                         allowFullScreen
//                         style={videoStyle}
//                         frameBorder="0"
//                     ></iframe>
//                 ) : (
//                     <video
//                         src={embedSrc}
//                         controls={props.controls}
//                         autoPlay={props.autoplay}
//                         loop={props.loop}
//                         muted={props.autoplay}
//                         style={videoStyle}
//                     />
//                 )
//             ) : (
//                 !isPreview && (
//                     <div
//                         className="text-sm text-gray-400 italic text-center p-4"
//                         style={{
//                             border: "1px dashed #d1d5db",
//                             borderRadius: "6px",
//                             minHeight: "150px",
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                         }}
//                     >
//                         (Invalid or missing video URL)
//                     </div>
//                 )
//             )}
//         </div>
//     );
// };

// export default VideoBlock;

import React from "react";
import getDefaultProps from "@/utils/defaultProps";

const VideoBlock = ({ block, onSelect, isPreview }) => {
    const props = {
        ...getDefaultProps(block.type),
        ...block.props,
    };

    const videoSrc = props.src || "";
    let embedSrc = "";

    const isYouTube = videoSrc.includes("youtube.com/watch");
    const isVimeo = videoSrc.includes("vimeo.com");
    const isDirectVideo = videoSrc.match(/\.(mp4|webm|ogg)$/i);
    const isBlob = videoSrc.startsWith("blob:");

    if (isYouTube) {
        const videoId = videoSrc.split("v=")[1]?.split("&")[0];
        embedSrc = `https://www.youtube.com/embed/${videoId}?autoplay=${props.autoplay ? 1 : 0}&controls=${
            props.controls ? 1 : 0
        }&loop=${props.loop ? 1 : 0}`;
    } else if (isVimeo) {
        const videoId = videoSrc.split("vimeo.com/")[1]?.split("?")[0];
        embedSrc = `https://player.vimeo.com/video/${videoId}?autoplay=${props.autoplay ? 1 : 0}&controls=${
            props.controls ? 1 : 0
        }&loop=${props.loop ? 1 : 0}`;
    } else if (isDirectVideo || isBlob) {
        embedSrc = videoSrc;
    } else {
        embedSrc = "";
    }

    const videoStyle = {
        width: props.width || "100%",
        height: props.height || "315px",
        display: "block",
        margin: "0 auto",
        objectFit: props.objectFit || "cover",
        cursor: props.onClickAction ? "pointer" : "default",
    };

    const handleVideoClick = (e) => {
        if (props.onClickAction) {
            window.open(props.onClickAction, "_blank");
            e.stopPropagation();
        }
    };

    return (
        <div onClick={onSelect} className="video-block-wrapper">
            {embedSrc ? (
                isYouTube || isVimeo ? (
                    <iframe
                        title="video-embed"
                        src={embedSrc}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={videoStyle}
                        frameBorder="0"
                        onClick={handleVideoClick}
                    ></iframe>
                ) : (
                    <video
                        src={embedSrc}
                        controls={props.controls}
                        autoPlay={props.autoplay}
                        loop={props.loop}
                        muted={props.autoplay}
                        playsInline
                        poster={props.poster}
                        style={videoStyle}
                    />
                )
            ) : (
                !isPreview && (
                    <div
                        className="text-sm text-gray-400 italic text-center p-4"
                        style={{
                            border: "1px dashed #d1d5db",
                            borderRadius: "6px",
                            minHeight: "150px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        (Invalid or missing video URL)
                    </div>
                )
            )}
        </div>
    );
};

export default VideoBlock;
