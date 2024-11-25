import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api";

export const getAll = async (endpoint) => {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const createItem = async (endpoint, data) => {
  try {
    const response = await axios.post(`${BASE_URL}${endpoint}`, data);
    return response.data;
  } catch (error) {
    console.error("Error creating item:", error);
    throw error;
  }
};

export const updateItem = async (endpoint, id, data) => {
  try {
    const response = await axios.put(`${BASE_URL}${endpoint}${id}/`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating item:", error);
    throw error;
  }
};


export const deleteItem = async (endpoint, id) => {
  try {
    await axios.delete(`${BASE_URL}${endpoint}${id}/`);
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
};

