// src/components/Blocks/SpacerBlock.js
import React from "react";

export default function SpacerBlock({ block }) {
    const height = block?.props?.height || 20;

    return <div style={{ height }} className="w-full" />;
}