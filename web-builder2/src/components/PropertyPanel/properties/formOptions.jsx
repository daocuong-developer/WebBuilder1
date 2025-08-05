import React from "react";

const FormOptions = ({ block, handleChange }) => {
    const props = block.props || {};

    const handleFieldChange = (index, key, value) => {
        const updatedFields = [...props.fields];
        updatedFields[index][key] = value;
        handleChange("fields", updatedFields);
    };

    const handleAddField = () => {
        const updatedFields = [
            ...props.fields,
            { id: `field-${props.fields.length}`, label: "New Field", type: "text", placeholder: "", required: false },
        ];
        handleChange("fields", updatedFields);
    };

    const handleRemoveField = (index) => {
        const updatedFields = [...props.fields];
        updatedFields.splice(index, 1);
        handleChange("fields", updatedFields);
    };

    return (
        <div className="space-y-6">
            {/* --- Form Fields Section --- */}
            <div>
                <h4 className="font-semibold text-gray-800 mb-2">Form Fields</h4>
                {(props.fields || []).map((field, index) => (
                    <div key={index} className="border rounded p-3 mb-3 space-y-2 bg-gray-50">
                        <div className="grid grid-cols-2 gap-2">
                            <input
                                className="border rounded px-2 py-1"
                                value={field.label}
                                onChange={(e) => handleFieldChange(index, "label", e.target.value)}
                                placeholder="Label"
                            />
                            <select
                                className="border rounded px-2 py-1"
                                value={field.type}
                                onChange={(e) => handleFieldChange(index, "type", e.target.value)}
                            >
                                <option value="text">Text</option>
                                <option value="email">Email</option>
                                <option value="textarea">Textarea</option>
                                <option value="select">Select</option>
                                <option value="checkbox">Checkbox</option>
                                <option value="radio">Radio</option>
                                <option value="file">File</option>
                                <option value="password">PassWord</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <input
                                className="border rounded px-2 py-1"
                                value={field.placeholder}
                                onChange={(e) => handleFieldChange(index, "placeholder", e.target.value)}
                                placeholder="Placeholder"
                            />
                            <label className="flex items-center space-x-2 text-sm">
                                <input
                                    type="checkbox"
                                    checked={field.required || false}
                                    onChange={(e) => handleFieldChange(index, "required", e.target.checked)}
                                />
                                <span>Required</span>
                            </label>
                        </div>
                        <button
                            className="text-sm text-red-600 hover:underline"
                            onClick={() => handleRemoveField(index)}
                        >
                            Remove Field
                        </button>
                    </div>
                ))}
                <button
                    onClick={handleAddField}
                    className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                >
                    Add Field
                </button>
            </div>

            {/* --- Form Settings Section --- */}
            <div className="space-y-4">
                <h4 className="font-semibold text-gray-800 mb-2">Form Settings</h4>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Form Name</label>
                    <input
                        className="w-full border rounded px-2 py-1"
                        value={props.formName || ""}
                        onChange={(e) => handleChange("formName", e.target.value)}
                        placeholder="Contact Us"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Form Name Size</label>
                    <select
                        className="w-full border rounded px-2 py-1"
                        value={props.formNameSize || "2xl"}
                        onChange={(e) => handleChange("formNameSize", e.target.value)}
                    >
                        <option value="sm">Small</option>
                        <option value="base">Normal</option>
                        <option value="lg">Large</option>
                        <option value="xl">X-Large</option>
                        <option value="2xl">2X-Large</option>
                        <option value="3xl">3X-Large</option>
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Submit Button Text</label>
                        <input
                            className="w-full border rounded px-2 py-1"
                            value={props.submitText || ""}
                            onChange={(e) => handleChange("submitText", e.target.value)}
                            placeholder="Send"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Button Alignment</label>
                        <select
                            className="w-full border rounded px-2 py-1"
                            value={props.submitAlignment || "center"}
                            onChange={(e) => handleChange("submitAlignment", e.target.value)}
                        >
                            <option value="left">Left</option>
                            <option value="center">Center</option>
                            <option value="right">Right</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Button Background</label>
                        <input
                            type="color"
                            className="w-full"
                            value={props.buttonBgColor || "#007bff"}
                            onChange={(e) => handleChange("buttonBgColor", e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Button Text Color</label>
                        <input
                            type="color"
                            className="w-full"
                            value={props.buttonTextColor || "#ffffff"}
                            onChange={(e) => handleChange("buttonTextColor", e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Submit Button Hover Color</label>
                    <input
                        type="color"
                        className="w-full"
                        value={props.buttonHoverColor || "#0056b3"}
                        onChange={(e) => handleChange("buttonHoverColor", e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Form Background</label>
                    <input
                        type="color"
                        className="w-full"
                        value={props.backgroundColor || "#ffffff"}
                        onChange={(e) => handleChange("backgroundColor", e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Form Alignment</label>
                    <select
                        className="w-full border rounded px-2 py-1"
                        value={props.formAlignment || "left"}
                        onChange={(e) => handleChange("formAlignment", e.target.value)}
                    >
                        <option value="left">Left</option>
                        <option value="center">Center</option>
                        <option value="right">Right</option>
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Padding</label>
                        <input
                            className="w-full border rounded px-2 py-1"
                            value={props.padding || "20px"}
                            onChange={(e) => handleChange("padding", e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Border Radius</label>
                        <input
                            className="w-full border rounded px-2 py-1"
                            value={props.borderRadius || "8px"}
                            onChange={(e) => handleChange("borderRadius", e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormOptions;
