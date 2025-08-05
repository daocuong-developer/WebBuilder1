import React from "react";
import { useFormik } from "formik"; // Keep this import
import getDefaultProps from "@/utils/defaultProps";
import * as Yup from "yup"; // Import Yup for more robust validation

const FormBlock = ({ block, onSelect, isPreview }) => {
    const props = {
        ...getDefaultProps(block.type),
        ...block.props,
    };

    const formStyle = {
        padding: props.padding,
        border: props.border,
        borderRadius: props.borderRadius,
        backgroundColor: props.backgroundColor,
        maxWidth: props.maxWidth,
        // Apply form alignment
        marginLeft: props.formAlignment === "center" ? "auto" : props.formAlignment === "right" ? "auto" : "20px",
        marginRight: props.formAlignment === "center" ? "auto" : props.formAlignment === "left" ? "auto" : "20px",
        boxShadow: props.formBoxShadow || "none",
        fontFamily: props.formFontFamily || "inherit",
    };

    const labelStyle = {
        display: "block",
        marginBottom: "5px",
        fontSize: props.labelFontSize || "14px",
        color: props.labelColor || "#333",
    };

    const inputStyle = {
        width: "100%",
        padding: "8px",
        fontSize: props.inputFontSize || "15px",
        color: props.inputColor || "#000",
        border: "1px solid #ccc",
        borderRadius: "4px",
        marginBottom: props.fieldSpacing || "16px",
    };

    const errorStyle = {
        color: "red",
        fontSize: "12px",
        marginTop: "-10px", // Adjust to position it right below the input
        marginBottom: props.fieldSpacing || "16px",
    };

    // Mapping for formNameSize to actual font sizes
    const formNameSizeMap = {
        sm: "1.125rem", // text-sm
        base: "1.25rem", // text-base
        lg: "1.5rem", // text-lg
        xl: "1.875rem", // text-xl
        "2xl": "2.25rem", // text-2xl
        "3xl": "3rem", // text-3xl
    };

    // --- Formik Setup ---
    const initialValues = {};
    const validationSchemaFields = {};

    (props.fields || []).forEach((field) => {
        initialValues[field.id] = ""; // Initialize all fields
        let schema = Yup.string(); // Default to string schema

        if (field.required) {
            schema = schema.required(`${field.label || field.id} is required`);
        }

        if (field.type === "email") {
            schema = schema.email("Invalid email address");
        }

        // Add other validation rules here if needed (e.g., min, max length)
        // if (field.minLength) {
        //     schema = schema.min(field.minLength, `Must be at least ${field.minLength} characters`);
        // }
        // if (field.maxLength) {
        //     schema = schema.max(field.maxLength, `Must be at most ${field.maxLength} characters`);
        // }

        validationSchemaFields[field.id] = schema;
    });

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object().shape(validationSchemaFields), // Use Yup for schema validation
        onSubmit: (values) => {
            if (isPreview) {
                console.log("Preview mode – no submission");
                return;
            }
            console.log("Form Submitted:", values);
            alert("Form submitted! Check the console for data.");
        },
    });

    const renderField = (field, index) => {
        const id = `${block.id}-${field.id}`;
        const commonProps = {
            id,
            name: field.id,
            disabled: isPreview,
            placeholder: field.placeholder || "",
            style: inputStyle,
            // Connect to Formik
            value: formik.values[field.id],
            onChange: formik.handleChange,
            onBlur: formik.handleBlur,
        };

        // Special handling for checkboxes and radios for Formik
        if (field.type === "checkbox") {
            commonProps.checked = formik.values[field.id];
        }

        // Note: File inputs generally don't work well with Formik's value/onChange directly
        // You'd typically handle them with a separate onChange and setFieldValue
        if (field.type === "file") {
            delete commonProps.value; // Remove value prop for file input
            commonProps.onChange = (e) => {
                formik.setFieldValue(field.id, e.target.files[0] || null);
            };
        }

        const label = (
            <label htmlFor={id} style={labelStyle}>
                {field.label || field.id} {field.required ? "*" : ""}
            </label>
        );

        return (
            <div key={index}>
                {label}
                {field.type === "textarea" ? (
                    <textarea rows="4" {...commonProps} />
                ) : field.type === "select" ? (
                    <select {...commonProps}>
                        {(field.options || []).map((opt, i) => (
                            <option key={i} value={opt}>
                                {opt}
                            </option>
                        ))}
                    </select>
                ) : field.type === "checkbox" || field.type === "radio" ? (
                    <div style={{ marginBottom: "15px" }}>
                        <span style={labelStyle}>{field.label || field.id}</span>
                        <div>
                            {(field.options || ["Option 1"]).map((opt, i) => (
                                <label key={i} style={{ display: "inline-block", marginRight: "15px" }}>
                                    <input
                                        type={field.type}
                                        name={field.id}
                                        value={opt}
                                        required={field.required}
                                        disabled={isPreview}
                                        style={{ marginRight: "5px" }}
                                        // Formik connection for checkbox/radio group
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        checked={formik.values[field.id] === opt} // For radio
                                        // For checkboxes, if multiple options are allowed for one field ID,
                                        // you'd typically manage an array in Formik state and use `includes`
                                        // checked={formik.values[field.id] && formik.values[field.id].includes(opt)}
                                    />
                                    {opt}
                                </label>
                            ))}
                        </div>
                    </div>
                ) : (
                    <input type={field.type || "text"} {...commonProps} />
                )}
                {formik.touched[field.id] && formik.errors[field.id] && (
                    <div style={errorStyle}>{formik.errors[field.id]}</div>
                )}
            </div>
        );
    };

    const getAlignment = (align) => {
        switch (align) {
            case "left":
                return "flex-start";
            case "right":
                return "flex-end";
            case "center":
            default:
                return "center";
        }
    };

    return (
        <form
            onSubmit={formik.handleSubmit} // Use Formik's handleSubmit
            onClick={onSelect}
            style={formStyle}
            action={props.action}
            method={props.method || "POST"}
            noValidate // Important: Disable browser's built-in validation when using Formik
        >
            <h4
                style={{
                    color: props.titleColor || "#333",
                    marginBottom: "20px",
                    textAlign: props.formNamePosition || "center",
                    fontSize: formNameSizeMap[props.formNameSize] || formNameSizeMap["2xl"],
                }}
            >
                {props.formName || "Contact Form"}
            </h4>

            {(props.fields || []).map(renderField)}

            <div
                style={{
                    display: "flex",
                    justifyContent: getAlignment(props.submitAlignment),
                    marginTop: props.submitMarginTop || "20px",
                }}
            >
                <button
                    type="submit"
                    disabled={isPreview || formik.isSubmitting} // Disable if preview or Formik is submitting
                    style={{
                        backgroundColor: props.buttonBgColor || "#007bff",
                        color: props.buttonTextColor || "#fff",
                        fontSize: props.buttonFontSize || "16px",
                        padding: props.buttonPadding || "12px 24px",
                        border: "none",
                        borderRadius: props.buttonBorderRadius || "4px",
                        cursor: "pointer",
                        transition: "background 0.3s ease",
                    }}
                    onMouseOver={(e) => {
                        if (!isPreview && props.buttonHoverColor) {
                            e.target.style.backgroundColor = props.buttonHoverColor;
                        }
                    }}
                    onMouseOut={(e) => {
                        if (!isPreview && props.buttonBgColor) {
                            e.target.style.backgroundColor = props.buttonBgColor;
                        }
                    }}
                >
                    {props.submitText || "Submit"}
                </button>
            </div>
        </form>
    );
};

export default FormBlock;
