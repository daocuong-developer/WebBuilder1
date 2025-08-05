// src/api/postApi.js
import axios from "./axios";

export const getPostsByProject = async (projectId) => {
    const res = await axios.get(`posts/?project=${projectId}`);
    return res.data;
};

export const getPost = async (id) => {
    const res = await axios.get(`posts/${id}/`);
    return res.data;
};

export const createPost = async (data) => {
    const res = await axios.post("posts/", data);
    return res.data;
};

export const updatePost = async (id, data) => {
    const res = await axios.put(`posts/${id}/`, data);
    return res.data;
};

export const deletePost = async (id) => {
    const res = await axios.delete(`posts/${id}/`);
    return res.data;
};