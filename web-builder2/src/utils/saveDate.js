export const handleSave = () => {
    try {
        const pages = JSON.parse(localStorage.getItem("pages")) || [];
        const posts = JSON.parse(localStorage.getItem("posts")) || [];
        const projects = JSON.parse(localStorage.getItem("projects")) || [];

        localStorage.setItem("pages", JSON.stringify(pages));
        localStorage.setItem("posts", JSON.stringify(posts));
        localStorage.setItem("projects", JSON.stringify(projects));

        console.log("Data saved successfully!");
        alert("Your work has been saved!");
    } catch (error) {
        console.error("Failed to save data:", error);
        alert("Failed to save your work. Please try again.");
    }
};
