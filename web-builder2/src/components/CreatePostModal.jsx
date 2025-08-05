// CreatePostModal.jsx
import React, { useState, useEffect, useRef } from "react"; // Import useRef
import { X } from "lucide-react";
import { createPost, updatePost } from "@/api/postApi";
import { toast } from "react-toastify";
import { getPostTemplates } from "@/api/templateApi";
import { Editor } from "@tinymce/tinymce-react"; // Import TinyMCE Editor

// Utility function to convert Vietnamese string to slug
const toSlug = (str) => {
    if (!str) return "";
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/\s+/g, "-"); // Replace spaces with hyphens
    str = str.replace(/[^\w\-]+/g, ""); // Remove all non-word characters except hyphens
    str = str.replace(/\-\-+/g, "-"); // Replace multiple hyphens with a single hyphen
    str = str.replace(/^-+|-+$/g, ""); // Remove hyphens from start and end of string
    return str;
};

// Define status options for the frontend (must match backend)
const STATUS_OPTIONS = [
    { value: "draft", label: "Draft" },
    { value: "published", label: "Published" },
    { value: "scheduled", label: "Scheduled" },
    { value: "archived", label: "Archived" },
];

const CreatePostModal = ({ onClose, currentProjectId, onPostCreated, onPostUpdated, postToEdit }) => {
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    // Content will now store { html: "..." }
    const [content, setContent] = useState({ html: "" });
    // Add new states
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [thumbnailFile, setThumbnailFile] = useState(null); // State for the thumbnail file
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState(""); // Still a string for input
    const [status, setStatus] = useState(STATUS_OPTIONS[0].value); // Default to 'draft'
    const [scheduledAt, setScheduledAt] = useState(""); // ISO 8601 string format
    const [author, setAuthor] = useState(""); // Author
    const [relatedPosts, setRelatedPosts] = useState(""); // Related posts (comma-separated string)

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [postTemplates, setPostTemplates] = useState([]);
    const [selectedTemplateId, setSelectedTemplateId] = useState("");

    const editorRef = useRef(null); // Ref for TinyMCE Editor

    // Fetch templates when component mounts
    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const templates = await getPostTemplates();
                setPostTemplates(templates);
            } catch (err) {
console.error("Error loading post templates:", err);
                toast.error("Failed to load post templates.");
            }
        };

        fetchTemplates();
    }, []);

    // Fill form data if editing an existing post, or reset if creating new
    useEffect(() => {
        if (postToEdit) {
            setTitle(postToEdit.title);
            setSlug(postToEdit.slug);
            // Get HTML from content if available, or set to empty
            setContent(
                postToEdit.content && typeof postToEdit.content.html === "string"
                    ? { html: postToEdit.content.html }
                    : { html: "" }
            );

            setThumbnailUrl(postToEdit.thumbnail_url || "");
            setThumbnailFile(null); // Reset file when editing
            setCategory(postToEdit.category || "");
            setTags(postToEdit.tags ? postToEdit.tags.join(", ") : ""); // Convert tags array to string
            setStatus(postToEdit.status || STATUS_OPTIONS[0].value);
            setScheduledAt(postToEdit.scheduled_at ? new Date(postToEdit.scheduled_at).toISOString().slice(0, 16) : "");
            setAuthor(postToEdit.author || ""); // Fill author
            setRelatedPosts(postToEdit.related_posts || ""); // Fill related posts

            setSelectedTemplateId(""); // Clear selected template when editing
        } else {
            setTitle("");
            setSlug("");
            setContent({ html: "" });

            setThumbnailUrl("");
            setThumbnailFile(null);
            setCategory("");
            setTags("");
            setStatus(STATUS_OPTIONS[0].value);
            setScheduledAt("");
            setAuthor("");
            setRelatedPosts("");
            setSelectedTemplateId("");
        }
    }, [postToEdit]);

    const applyTemplate = (template) => {
        setTitle(template.name || "");

        let templateContentHtml = "";
        if (template.content && typeof template.content.html === "string") {
            templateContentHtml = template.content.html;
        } else if (template.content && template.content.blocks) {
            templateContentHtml = `<p>Sample Content (JSON):</p><pre>${JSON.stringify(
                template.content,
                null,
                2
            )}</pre>`;
        } else {
            templateContentHtml = JSON.stringify(template.content || {});
        }
        setContent({ html: templateContentHtml });

        setSlug(toSlug(template.name));
        setCategory(template.category || "");
        setTags(template.tags ? template.tags.join(", ") : "");

        setThumbnailUrl("");
        setThumbnailFile(null);
    };

    const handleTitleChange = (e) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        setSlug(toSlug(newTitle));
    };

    const handleSlugChange = (e) => {
        setSlug(toSlug(e.target.value));
    };

    const handleTemplateChange = (e) => {
        const templateId = e.target.value;
setSelectedTemplateId(templateId);

        if (templateId) {
            const selectedTemplate = postTemplates.find((template) => template.id === parseInt(templateId));
            if (selectedTemplate) {
                applyTemplate(selectedTemplate);
            }
        } else {
            setTitle("");
            setSlug("");
            setContent({ html: "" });
            setCategory("");
            setTags("");
            setThumbnailUrl("");
            setThumbnailFile(null); // Reset file
            setStatus(STATUS_OPTIONS[0].value);
            setScheduledAt("");
            setAuthor("");
            setRelatedPosts("");
        }
    };

    const handleClearTemplate = () => {
        setSelectedTemplateId("");
        setTitle("");
        setSlug("");
        setContent({ html: "" });
        setCategory("");
        setTags("");
        setThumbnailUrl("");
        setThumbnailFile(null);
        setStatus(STATUS_OPTIONS[0].value);
        setScheduledAt("");
        setAuthor("");
        setRelatedPosts("");
        toast.info("Selected template cleared.");
    };

    const handleThumbnailFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setThumbnailFile(file);
            setThumbnailUrl(URL.createObjectURL(file));
        } else {
            setThumbnailFile(null);
            setThumbnailUrl("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        if (!currentProjectId) {
            setError("No project selected. Please select a project.");
            setIsLoading(false);
            toast.error("No project selected. Please select a project.");
            return;
        }

        // Handle thumbnail file upload if present
        let finalThumbnailUrl = thumbnailUrl; // Default to current URL (from input or preview)
        if (thumbnailFile) {
            toast.warn(
                "Image upload to server is not yet implemented. Image will not be saved if only selected from local machine."
            );
        }

        const parsedTags = tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag !== "");

        // Get HTML content from TinyMCE
        const editorContentHtml = editorRef.current ? editorRef.current.getContent() : "";

        const postData = {
            title,
            slug,
            content: { html: editorContentHtml },
            thumbnail_url: finalThumbnailUrl,
            category,
            tags: parsedTags,
            status,
            scheduled_at: scheduledAt ? new Date(scheduledAt).toISOString() : null,
            author,
            related_posts: relatedPosts,
            project: currentProjectId,
        };

        console.log("POST Data being sent:", postData);
        console.log("Type of content:", typeof postData.content, postData.content);

        try {
let response;
            if (postToEdit) {
                response = await updatePost(postToEdit.id, postData);
                onPostUpdated(response);
                toast.success("Post updated successfully!");
            } else {
                response = await createPost(postData);
                onPostCreated(response);
                toast.success("Post created successfully!");
            }
            onClose();
        } catch (err) {
            console.error("Error submitting post:", err);
            const errorMessage = err.response?.data?.message || err.message || "An error occurred.";
            setError(errorMessage);
            toast.error(`Failed: ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    };

    const canSubmit = !isLoading && currentProjectId;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 relative overflow-y-auto max-h-[90vh]">
                <button className="absolute top-2 right-2 text-gray-500 hover:text-black" onClick={onClose}>
                    <X />
                </button>
                <h2 className="text-2xl font-bold mb-4">{postToEdit ? "Edit Post" : "Create New Post"}</h2>
                <form onSubmit={handleSubmit}>
                    {!postToEdit && (
                        <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                            <h3 className="text-lg font-semibold mb-3 text-gray-800">Choose Available Post Template</h3>

                            <div className="mb-3">
                                <label htmlFor="postTemplate" className="block text-sm font-medium text-gray-700 mb-1">
                                    Select from list
                                </label>
                                <select
                                    id="postTemplate"
                                    value={selectedTemplateId}
                                    onChange={handleTemplateChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">-- Select a template --</option>
                                    {postTemplates.map((template) => (
                                        <option key={template.id} value={template.id}>
                                            {template.name}
                                        </option>
                                    ))}
                                </select>
                                <p className="text-xs text-gray-500 mt-1">
                                    Select a template to auto-fill the fields below.
                                </p>
                            </div>
{postTemplates.length > 0 && (
                                <div className="mt-4">
                                    <p className="block text-sm font-medium text-gray-700 mb-2">
                                        Or choose from template library:
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {postTemplates.map((template) => (
                                            <div
                                                key={template.id}
                                                className={`p-4 border rounded-lg shadow-sm cursor-pointer transition-all duration-200
                                                    ${
                                                        selectedTemplateId === String(template.id)
                                                            ? "border-blue-500 ring-2 ring-blue-200 bg-blue-50"
                                                            : "border-gray-300 hover:border-blue-400 hover:shadow-md"
                                                    }`}
                                                onClick={() => {
                                                    setSelectedTemplateId(String(template.id));
                                                    applyTemplate(template);
                                                }}
                                            >
                                                <h4 className="font-semibold text-gray-900 mb-1">{template.name}</h4>
                                                <p className="text-sm text-gray-600 line-clamp-2">
                                                    {/* Display snippet from template content */}
                                                    {template.content && template.content.html
                                                        ? template.content.html
                                                              .replace(/<[^>]*>?/gm, "")
                                                              .substring(0, 100) + "..." // Get text from HTML
                                                        : template.content &&
                                                          template.content.blocks &&
                                                          template.content.blocks[0] &&
                                                          template.content.blocks[0].data &&
                                                          template.content.blocks[0].data.text
                                                        ? template.content.blocks[0].data.text
                                                        : JSON.stringify(template.content || {}).substring(0, 100) +
                                                          "..."}
                                                </p>
                                            </div>
))}
                                    </div>
                                </div>
                            )}

                            {selectedTemplateId && (
                                <div className="mt-4 text-right">
                                    <button
                                        type="button"
                                        onClick={handleClearTemplate}
                                        className="px-4 py-2 text-sm border border-red-300 rounded-md text-red-700 hover:bg-red-50 transition"
                                    >
                                        Clear Selected Template
                                    </button>
                                </div>
                            )}

                            {postTemplates.length === 0 && (
                                <p className="text-sm text-gray-500 mt-2">
                                    No post templates found. Please add templates from the backend.
                                </p>
                            )}
                        </div>
                    )}

                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={handleTitleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                            Slug (URL Friendly)
                        </label>
                        <input
                            type="text"
                            id="slug"
                            value={slug}
                            onChange={handleSlugChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    {/* Thumbnail field */}
                    <div className="mb-4">
                        <label htmlFor="thumbnailUrl" className="block text-sm font-medium text-gray-700 mb-1">
                            Featured Image
                        </label>

                        <div className="flex gap-2 mt-1">
                            <input
                                type="url"
                                id="thumbnailUrl"
                                value={thumbnailUrl}
onChange={(e) => {
                                    setThumbnailUrl(e.target.value);
                                    setThumbnailFile(null); // Clear selected file if user manually enters URL
                                }}
                                placeholder="Enter image URL or select a file"
                                className="flex-1 border border-gray-300 rounded-lg shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500 text-sm placeholder-gray-400"
                            />

                            <label
                                htmlFor="thumbnailFileInput"
                                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2  shadow-sm cursor-pointer flex items-center justify-center transition"
                            >
                                Choose File
                            </label>

                            <input
                                type="file"
                                id="thumbnailFileInput"
                                accept="image/*"
                                onChange={handleThumbnailFileChange}
                                className="hidden"
                            />
                        </div>

                        {thumbnailUrl && (
                            <div className="mt-2 relative">
                                <img
                                    src={thumbnailUrl}
                                    alt="Featured"
                                    className="max-h-32 object-cover rounded-md shadow border border-gray-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setThumbnailUrl("");
                                        setThumbnailFile(null);
                                    }}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs hover:bg-red-600 transition"
                                    title="Remove image"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        )}

                        <p className="text-xs text-gray-500 mt-1">
                            You can enter an image URL or upload an image from your computer.
                        </p>
                    </div>

                    {/* Category field */}
                    <div className="mb-4">
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                            Category
                        </label>
                        <input
                            type="text"
                            id="category"
value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., News, Technology"
                        />
                    </div>

                    {/* Tags field */}
                    <div className="mb-4">
                        <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                            Tags (comma-separated)
                        </label>
                        <input
                            type="text"
                            id="tags"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., SEO, Marketing, Web"
                        />
                    </div>

                    {/* Status field */}
                    <div className="mb-4">
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                            Status
                        </label>
                        <select
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            {STATUS_OPTIONS.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Scheduled At field */}
                    {status === "scheduled" && ( // Only display if status is 'Scheduled'
                        <div className="mb-4">
                            <label htmlFor="scheduledAt" className="block text-sm font-medium text-gray-700">
                                Scheduled Time
                            </label>
                            <input
                                type="datetime-local"
                                id="scheduledAt"
                                value={scheduledAt}
                                onChange={(e) => setScheduledAt(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <p className="text-xs text-gray-500 mt-1">
Select the date and time the post will be published.
                            </p>
                        </div>
                    )}

                    {/* Author field */}
                    <div className="mb-4">
                        <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                            Author
                        </label>
                        <input
                            type="text"
                            id="author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Author Name"
                        />
                    </div>

                    {/* Related Posts field */}
                    <div className="mb-4">
                        <label htmlFor="relatedPosts" className="block text-sm font-medium text-gray-700">
                            Related Posts (comma-separated)
                        </label>
                        <input
                            type="text"
                            id="relatedPosts"
                            value={relatedPosts}
                            onChange={(e) => setRelatedPosts(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="slug-post-1, slug-post-2"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Enter slugs or IDs of related posts, separated by commas.
                        </p>
                    </div>

                    {/* Content field (TinyMCE React Editor) */}
                    <div className="mb-4">
                        <label htmlFor="contentEditor" className="block text-sm font-medium text-gray-700 mb-1">
                            Post Content
                        </label>
                        <Editor
                            apiKey="l3wqxt7yt14cqt897uql5k72l6zy01p3h73ffgapgwecqmdm" // Replace with your TinyMCE API Key if using cloud version
                            onInit={(evt, editor) => (editorRef.current = editor)}
                            initialValue={content.html} // Use content.html
                            init={{
                                height: 400,
                                menubar: false,
                                plugins: [
                                    "advlist autolink lists link image charmap print preview anchor",
                                    "searchreplace visualblocks code fullscreen",
                                    "insertdatetime media table paste code help wordcount",
                                ],
toolbar:
                                    "undo redo | formatselect | bold italic backcolor | \
                                alignleft aligncenter alignright alignjustify | \
                                bullist numlist outdent indent | removeformat | help",
                                skin: "oxide", // Default skin
                                content_css: "default",
                                // Explicitly set text direction to left-to-right to fix reversed input
                                content_style:
                                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; direction: ltr; }",
                            }}
                            onEditorChange={(newHtmlContent, editor) => {
                                setContent({ html: newHtmlContent }); // Update state with HTML from editor
                            }}
                        />
                        <p className="text-xs text-gray-500 mt-1">Use the rich text editor to create post content.</p>
                    </div>

                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                    {!currentProjectId && (
                        <p className="text-red-500 text-sm mb-4">
                            No project selected. Please select a project in the main interface.
                        </p>
                    )}

                    <div className="flex justify-end gap-2 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={!canSubmit}
                        >
                            {isLoading ? "Processing..." : postToEdit ? "Update" : "Create Post"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePostModal;