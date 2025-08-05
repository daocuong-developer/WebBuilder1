import React from "react";

const ColorPicker = ({ label, value, onChange }) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
                type="color"
                className="w-full h-10 rounded cursor-pointer border"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};

export default ColorPicker;
