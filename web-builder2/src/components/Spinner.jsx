// src/components/Spinner.jsx
import React from "react";

const Spinner = ({ size = 24, color = "currentColor", className = "" }) => {
    return (
        <div
            className={`block mx-auto animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] ${className}`}
            style={{
                width: `${size}px`,
                height: `${size}px`,
                color: color,
            }}
            role="status"
        >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
            </span>
        </div>
    );
};

export default Spinner;
