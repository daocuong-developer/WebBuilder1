// src/api/templateApi.js
import axios from "axios";

const API_URL = "http://localhost:8000/api"; 

export const getPostTemplates = async () => {
    try {
        const response = await axios.get(`${API_URL}/post-templates/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching post templates:", error);
        throw error;
    }
};