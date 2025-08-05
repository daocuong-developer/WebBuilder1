import React from "react";
import { X, Code2, FileText, Download, Upload } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";

export default function ExportModal({ currentProject, onClose }) {
    const handleExport = async (type) => {
        if (!currentProject?.id) {
            toast.warning("Please select a project.");
            return;
        }

        // let url = `/api/projects/${currentProject.id}/export/`;
        let url = `http://localhost:8000/api/projects/${currentProject.id}/export/`;
        let filename = `${currentProject.name.replace(/\s+/g, "-")}-${type}-${new Date().toISOString().slice(0, 10)}`;

        if (type === "html") {
            url += "?format=html";
            filename += ".html";
        } else if (type === "zip") {
            url += "?format=zip";
            filename += ".zip";
        } else {
            filename += ".json";
        }

        try {
            const response = await axios.get(url, { responseType: "blob" });

            const blob = new Blob([response.data]);
            const downloadUrl = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = downloadUrl;
            a.download = filename;
            a.click();
            window.URL.revokeObjectURL(downloadUrl);

            toast.success(`Export ${type.toUpperCase()} thành công!`);
        } catch (err) {
            console.error(`Export ${type} failed`, err);
            toast.error("Export thất bại.");
        }
    };

    const handleImport = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            await axios.post("/api/projects/import/", formData);
            toast.success("Import thành công!");
            onClose();
        } catch (err) {
            toast.error("Import thất bại.");
            console.error(err);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md relative space-y-4">
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-600 hover:text-black">
                    <X />
                </button>
                <h2 className="text-xl font-semibold mb-4">Export / Import Options</h2>
                <div className="space-y-2">
                    <button
                        onClick={() => handleExport("json")}
                        className="w-full border px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-100"
                    >
                        <Code2 size={16} /> Export as JSON
                    </button>
                    <button
                        onClick={() => handleExport("html")}
className="w-full border px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-100"
                    >
                        <FileText size={16} /> Export as HTML
                    </button>
                    <button
                        onClick={() => handleExport("zip")}
                        className="w-full border px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-100"
                    >
                        <Download size={16} /> Export as ZIP
                    </button>
                    <label className="w-full border px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-100 cursor-pointer">
                        <Upload size={16} /> Import Project JSON
                        <input type="file" hidden accept=".json" onChange={handleImport} />
                    </label>
                </div>
            </div>
        </div>
    );
}