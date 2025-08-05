import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "@/styles/richtext.css";

const RichEditor = ({ value, onChange }) => {
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ script: "sub" }, { script: "super" }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ align: [] }],
            ["blockquote", "code-block"],
            ["link", "image"],
            ["clean"],
        ],
    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "script",
        "list",
        "bullet",
        "align",
        "blockquote",
        "code-block",
        "link",
        "image",
    ];

    return (
        <ReactQuill
            value={value}
            onChange={onChange}
            modules={modules}
            formats={formats}
            theme="snow"
            className="rich-editor"
        />
    );
};

export default RichEditor;
