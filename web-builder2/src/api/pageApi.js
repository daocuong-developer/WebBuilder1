// src/api/pageApi.js
import axios from "./axios";

export const getPages = async () => {
    const res = await axios.get("pages/");
    return res.data;
};

export const getPage = async (id) => {
    const res = await axios.get(`pages/${id}/`);
    return res.data;
};

export const createPage = async (data) => {
    const res = await axios.post("pages/", data);
    return res.data;
};

export const updatePage = async (id, data) => {
    const res = await axios.put(`pages/${id}/`, data);
    return res.data;
};

export const deletePage = async (id) => {
    const res = await axios.delete(`pages/${id}/`);
    return res.data;
};

// Lấy pages theo projectId
export const getPagesByProject = async (projectId) => {
    const res = await axios.get(`projects/${projectId}/pages/`);
    return res.data;
};
