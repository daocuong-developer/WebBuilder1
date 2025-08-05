import React, { useRef } from "react";

const AudioOptions = ({ block, handleChange }) => {
    const fileInputRef = useRef();

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const objectURL = URL.createObjectURL(file);
            handleChange("src", objectURL);
        }
    };

    return (
        <>
            {/* Audio URL Manual Input */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Audio URL (MP3/WAV/OGG)</label>
                <input
                    type="url"
                    className="w-full border rounded px-2 py-1"
                    value={block.props.src || ""}
                    onChange={(e) => handleChange("src", e.target.value)}
                    placeholder="https://example.com/audio.mp3"
                />
            </div>

            {/* Upload Local File */}
            <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Or upload audio file</label>
                <div className="flex items-center space-x-2">
                    <button
                        type="button"
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                        onClick={() => fileInputRef.current.click()}
                    >
                        Choose File
                    </button>
                    <span className="text-xs text-gray-600 truncate max-w-[200px]">
                        {block.props.src?.startsWith("blob:") ? "Local file selected" : ""}
                    </span>
                    <input
                        type="file"
                        accept="audio/*"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileUpload}
                    />
                </div>
            </div>

            {/* Audio Options */}
            <div className="flex items-center space-x-2 mt-4">
                <input
                    type="checkbox"
                    checked={block.props.autoplay || false}
                    onChange={(e) => handleChange("autoplay", e.target.checked)}
                />
                <label className="text-sm text-gray-700">Autoplay</label>
            </div>

            <div className="flex items-center space-x-2 mt-2">
                <input
                    type="checkbox"
                    checked={block.props.controls !== false}
                    onChange={(e) => handleChange("controls", e.target.checked)}
                />
                <label className="text-sm text-gray-700">Show Controls</label>
            </div>

            <div className="flex items-center space-x-2 mt-2">
                <input
                    type="checkbox"
                    checked={block.props.loop || false}
                    onChange={(e) => handleChange("loop", e.target.checked)}
                />
                <label className="text-sm text-gray-700">Loop</label>
            </div>

            <div className="flex items-center space-x-2 mt-2">
                <input
                    type="checkbox"
                    checked={block.props.muted || false}
                    onChange={(e) => handleChange("muted", e.target.checked)}
                />
                <label className="text-sm text-gray-700">Muted</label>
            </div>
        </>
    );
};

export default AudioOptions;
