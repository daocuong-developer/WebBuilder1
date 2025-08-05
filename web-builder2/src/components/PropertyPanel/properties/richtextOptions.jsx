import React from "react";
import RichEditor from "@/components/RichEditor";

const RichtextOptions = ({ block, handleChange }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Rich Text Content (HTML)</label>

        <RichEditor value={block.props.html || ""} onChange={(value) => handleChange("html", value)} />

        <p className="text-xs text-gray-500 mt-1">Trình soạn thảo WYSWYG.</p>
    </div>
);

export default RichtextOptions;
