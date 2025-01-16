import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/attributes';

const getToken = () => localStorage.getItem('authToken');

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getAttributes = async () => {
  const response = await axiosInstance.get(API_BASE_URL);
  return response.data;
};

export const addAttributes = async (attribute, image) => {
  const formData = new FormData();
  formData.append('name', attribute.name);
  if (image) formData.append('icon', image);

  const response = await axiosInstance.post(API_BASE_URL, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const updateAttributes = async (id, attribute, image) => {
  const formData = new FormData();
  formData.append('name', attribute.name);
  if (image) formData.append('icon', image);

  const response = await axiosInstance.put(`${API_BASE_URL}/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const deleteAttributes = async (id) => {
  const response = await axiosInstance.delete(`${API_BASE_URL}/${id}`);
  return response.data;
};
