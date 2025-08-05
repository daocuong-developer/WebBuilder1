import axios from "./axios";

// Lấy toàn bộ danh sách project
export async function getProjects() {
    const res = await axios.get("projects/");
    return res.data;
}

export async function createProject(data) {
    const res = await axios.post("projects/", {
        ...data,
        layout: [],
    });
    return res.data;
}

// Lấy chi tiết project theo ID
export async function getProject(id) {
    const res = await axios.get(`projects/${id}/`);
    return res.data;
}

// Cập nhật project (layout, name...)
export async function updateProject(id, data) {
    const res = await axios.put(`projects/${id}/`, data);
    return res.data;
}

// Xoá project
export async function deleteProject(id) {
    const res = await axios.delete(`projects/${id}/`);
    return res.data;
}

// // Lấy project hiện tại
// export const getCurrentProject = async () => {
//     const res = await axios.get("/current-project/");
//     return res.data.project;
// };
export const getCurrentProject = async () => {
    const res = await axios.get("/current-project/");
    return res.data.current_project;
};

getCurrentProject();
// set lại project
export const setCurrentProject = async (projectId) => {
    const res = await axios.post("/current-project/", {
        current_project: projectId,
    });
    return res.data;
}