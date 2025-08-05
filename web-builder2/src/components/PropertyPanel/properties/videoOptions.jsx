// // src/components/PropertyPanel/properties/videoOptions.jsx
// import React from 'react';

// const VideoOptions = ({ block, handleChange }) => (
//     <>
//         <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Video URL (YouTube/Vimeo/MP4)</label>
//             <input
//                 type="url"
//                 className="w-full border rounded px-2 py-1"
//                 value={block.props.src || ""}
//                 onChange={(e) => handleChange("src", e.target.value)}
//                 placeholder="e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ"
//             />
//         </div>
//         <div className="flex items-center space-x-2">
//             <input
//                 type="checkbox"
//                 checked={block.props.autoplay || false}
//                 onChange={(e) => handleChange("autoplay", e.target.checked)}
//             />
//             <label className="text-sm font-medium text-gray-700">Autoplay</label>
//         </div>
//         <div className="flex items-center space-x-2">
//             <input
//                 type="checkbox"
//                 checked={block.props.controls || true}
//                 onChange={(e) => handleChange("controls", e.target.checked)}
//             />
//             <label className="text-sm font-medium text-gray-700">Show Controls</label>
//         </div>
//         <div className="flex items-center space-x-2">
//             <input
//                 type="checkbox"
//                 checked={block.props.loop || false}
//                 onChange={(e) => handleChange("loop", e.target.checked)}
//             />
//             <label className="text-sm font-medium text-gray-700">Loop</label>
//         </div>
//         <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Width (px or %)</label>
//             <input
//                 type="text"
//                 className="w-full border rounded px-2 py-1"
//                 value={block.props.width || "100%"}
//                 onChange={(e) => handleChange("width", e.target.value)}
//             />
//         </div>
//         <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Height (px or auto)</label>
//             <input
//                 type="text"
//                 className="w-full border rounded px-2 py-1"
//                 value={block.props.height || "auto"}
//                 onChange={(e) => handleChange("height", e.target.value)}
//             />
//         </div>
//     </>
// );

// export default VideoOptions;

import React from "react";

const VideoOptions = ({ block, handleChange }) => {
    const handleVideoUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const localUrl = URL.createObjectURL(file);
            handleChange("src", localUrl);
        }
    };

    return (
        <>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Video URL (YouTube/Vimeo/MP4)</label>
                <input
                    type="url"
                    className="w-full border rounded px-2 py-1"
                    value={block.props.src || ""}
                    onChange={(e) => handleChange("src", e.target.value)}
                    placeholder="e.g., https://www.youtube.com/watch?v=..."
                />
            </div>

            <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload Video (MP4)</label>
                <input type="file" accept="video/mp4" className="w-full" onChange={handleVideoUpload} />
            </div>

            <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail Image URL</label>
                <input
                    type="url"
                    className="w-full border rounded px-2 py-1"
                    value={block.props.poster || ""}
                    onChange={(e) => handleChange("poster", e.target.value)}
                    placeholder="Optional: preview image before playing"
                />
            </div>

            <div className="flex items-center space-x-2 mt-2">
                <input
                    type="checkbox"
                    checked={block.props.autoplay || false}
                    onChange={(e) => handleChange("autoplay", e.target.checked)}
                />
                <label className="text-sm font-medium text-gray-700">Autoplay</label>
            </div>

            <div className="flex items-center space-x-2 mt-1">
                <input
                    type="checkbox"
                    checked={block.props.controls ?? true}
                    onChange={(e) => handleChange("controls", e.target.checked)}
                />
                <label className="text-sm font-medium text-gray-700">Show Controls</label>
            </div>

            <div className="flex items-center space-x-2 mt-1">
                <input
                    type="checkbox"
                    checked={block.props.loop || false}
                    onChange={(e) => handleChange("loop", e.target.checked)}
                />
                <label className="text-sm font-medium text-gray-700">Loop</label>
            </div>

            <div className="flex items-center space-x-2 mt-1">
                <input
                    type="checkbox"
                    checked={block.props.muted || false}
                    onChange={(e) => handleChange("muted", e.target.checked)}
                />
                <label className="text-sm font-medium text-gray-700">Muted</label>
            </div>

            <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Object Fit</label>
                <select
                    className="w-full border rounded px-2 py-1"
                    value={block.props.objectFit || "cover"}
                    onChange={(e) => handleChange("objectFit", e.target.value)}
                >
                    <option value="fill">Fill</option>
                    <option value="contain">Contain</option>
                    <option value="cover">Cover</option>
                    <option value="none">None</option>
                    <option value="scale-down">Scale Down</option>
                </select>
            </div>

            <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Width (px or %)</label>
                <input
                    type="text"
                    className="w-full border rounded px-2 py-1"
                    value={block.props.width || "100%"}
                    onChange={(e) => handleChange("width", e.target.value)}
                />
            </div>

            <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Height (px or auto)</label>
                <input
                    type="text"
                    className="w-full border rounded px-2 py-1"
                    value={block.props.height || "auto"}
                    onChange={(e) => handleChange("height", e.target.value)}
                />
            </div>

            <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Click Action (URL)</label>
                <input
                    type="text"
                    className="w-full border rounded px-2 py-1"
                    value={block.props.onClickAction || ""}
                    onChange={(e) => handleChange("onClickAction", e.target.value)}
                />
            </div>
        </>
    );
};

export default VideoOptions;


