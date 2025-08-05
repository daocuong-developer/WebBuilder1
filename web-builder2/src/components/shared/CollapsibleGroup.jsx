import { useState } from "react";

const CollapsibleGroup = ({ title, children }) => {
    const [open, setOpen] = useState(true);

    return (
        <div className="border rounded p-3">
            <button
                className="w-full text-left font-semibold text-gray-800"
                onClick={() => setOpen(!open)}
            >
                {title}
            </button>
            {open && <div className="mt-3">{children}</div>}
        </div>
    );
};

export default CollapsibleGroup;
