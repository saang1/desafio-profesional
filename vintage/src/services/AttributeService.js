// Attributeservice.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/attributes';

export const getAttributes = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

export const addAttributes = async (Attributes) => {
  const response = await axios.post(API_BASE_URL, Attributes);
  return response.data;
};

export const updateAttributes = async (id, Attributes) => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, Attributes);
  return response.data;
};

export const deleteAttributes = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/${id}`);
  return response.data;
};
