// // src/components/ProjectFormModal.jsx
// import React, { useState, useEffect } from "react";
// import { X, Save, PlusCircle } from "lucide-react";
// import { toast } from "react-toastify";

// const ProjectFormModal = ({ onClose, onSave, projectToEdit }) => {
//     const [name, setName] = useState("");
//     const [description, setDescription] = useState("");
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(null);

//     // Điền dữ liệu nếu đang chỉnh sửa
//     useEffect(() => {
//         if (projectToEdit) {
//             setName(projectToEdit.name || "");
//             setDescription(projectToEdit.description || "");
//         } else {
//             // Reset form khi tạo mới
//             setName("");
//             setDescription("");
//         }
//     }, [projectToEdit]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError(null);
//         if (!name.trim()) {
//             setError("Tên dự án không được để trống.");
//             toast.error("Tên dự án không được để trống.");
//             return;
//         }

//         setIsLoading(true);
//         try {
//             await onSave({ id: projectToEdit?.id, name, description });
//             toast.success(projectToEdit ? "Cập nhật dự án thành công!" : "Tạo dự án thành công!");
//             onClose(); // Đóng modal sau khi lưu
//         } catch (err) {
//             console.error("Lỗi khi lưu dự án:", err);
//             const errorMessage = err.response?.data?.detail || err.message || "Không thể lưu dự án.";
//             setError(errorMessage);
//             toast.error(`Lỗi: ${errorMessage}`);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fade-in">
//             <div
//                 className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative animate-zoom-in"
//                 onClick={(e) => e.stopPropagation()} // Ngăn chặn đóng modal khi click bên trong
//             >
//                 <button
//                     onClick={onClose}
//                     className="absolute top-3 right-3 p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition"
//                 >
//                     <X size={20} />
//                 </button>

//                 <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
//                     {projectToEdit ? "Chỉnh sửa Dự án" : "Tạo Dự án Mới"}
//                 </h2>

//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <div>
//                         <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-1">
//                             Tên dự án <span className="text-red-500">*</span>
//                         </label>
//                         <input
//                             type="text"
//                             id="projectName"
//                             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                             placeholder="Nhập tên dự án"
//                             required
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700 mb-1">
//                             Mô tả
//                         </label>
//                         <textarea
//                             id="projectDescription"
//                             rows="4"
//                             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
//                             value={description}
//                             onChange={(e) => setDescription(e.target.value)}
//                             placeholder="Mô tả về dự án này"
//                         ></textarea>
//                     </div>

//                     {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

//                     <div className="flex justify-end gap-3 pt-4 border-t mt-6">
//                         <button
//                             type="button"
//                             onClick={onClose}
//                             className="px-5 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
//                             disabled={isLoading}
//                         >
//                             Hủy
//                         </button>
//                         <button
//                             type="submit"
//                             className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition flex items-center gap-2"
//                             disabled={isLoading}
//                         >
//                             {isLoading ? (
//                                 <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                 </svg>
//                             ) : (
//                                 projectToEdit ? <Save size={18} /> : <PlusCircle size={18} />
//                             )}
//                             {projectToEdit ? "Lưu thay đổi" : "Tạo dự án"}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default ProjectFormModal;

// src/components/ProjectFormModal.jsx
import React, { useState, useEffect } from "react";
import { X, Save, PlusCircle } from "lucide-react";
import { toast } from "react-toastify";

const ProjectFormModal = ({ onClose, onSave, projectToEdit }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fill in data if editing
    useEffect(() => {
        if (projectToEdit) {
            setName(projectToEdit.name || "");
            setDescription(projectToEdit.description || "");
        } else {
            // Reset form when creating new project
            setName("");
            setDescription("");
        }
    }, [projectToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        if (!name.trim()) {
            setError("Project name is required.");
            toast.error("Project name is required.");
            return;
        }

        setIsLoading(true);
        try {
            await onSave({ id: projectToEdit?.id, name, description });
            toast.success(projectToEdit ? "Project updated successfully!" : "Project created successfully!");
            onClose(); // Close modal after saving
        } catch (err) {
            console.error("Error saving project:", err);
            const errorMessage = err.response?.data?.detail || err.message || "Failed to save project.";
            setError(errorMessage);
            toast.error(`Error: ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fade-in">
            <div
                className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative animate-zoom-in"
                onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition"
                >
                    <X size={20} />
                </button>

                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
                    {projectToEdit ? "Edit Project" : "Create New Project"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-1">
                            Project Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="projectName"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter project name"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            id="projectDescription"
                            rows="4"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe this project"
                        ></textarea>
                    </div>

                    {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

                    <div className="flex justify-end gap-3 pt-4 border-t mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition flex items-center gap-2"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <svg
                                    className="animate-spin h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                            ) : projectToEdit ? (
                                <Save size={18} />
                            ) : (
                                <PlusCircle size={18} />
                            )}
                            {projectToEdit ? "Save Changes" : "Create Project"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProjectFormModal;
