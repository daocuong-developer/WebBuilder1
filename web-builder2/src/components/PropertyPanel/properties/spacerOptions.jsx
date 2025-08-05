// src/components/PropertyPanel/properties/spacerOptions.jsx
import React from 'react';

const SpacerOptions = ({ block, handleChange }) => (
    <>
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Height (px)</label>
            <input
                type="number"
                className="w-full border rounded px-2 py-1"
                value={block.props.height || 20}
                onChange={(e) => handleChange("height", parseInt(e.target.value))}
            />
        </div>
    </>
);

export default SpacerOptions;