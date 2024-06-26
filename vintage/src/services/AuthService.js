import axios from 'axios';

// import { jwtDecode } from "jwt-decode";


const API_BASE_URL = 'http://localhost:8080/auth';
const USER_API_URL = 'http://localhost:8080/api';



// Function to get the token from local storage
const getToken = () => localStorage.getItem('authToken');

// Create an instance of axios with a request interceptor
const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(config => {
  const token = getToken();
  if (token && !config.url.includes('/products')) { // Exclude product endpoints
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const login = async (username, password) => {
  try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
          username,
          password,
      }, {
          headers: {
              'Content-Type': 'application/json',
          }
      });
      console.log('Login response:', response.data); // Log response for debugging
      return response.data;
  } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      throw error;
  }
};

export const register = async (username, password, firstname, lastname, country) => {
  const response = await axios.post(`${API_BASE_URL}/register`, {
      username,
      password,
      firstname,
      lastname,
      country,
  }, {
      headers: {
          'Content-Type': 'application/json',
      }
  });
  return response.data;
};



export const isLoggedIn = () => {
  return !!localStorage.getItem('authToken');
};

export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
};



export const getUserDetails = async () => {
  try {
    const response = await axiosInstance.get(`${USER_API_URL}/user/details`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    return null;
  }
};

export const setUserDetails = (userDetails) => {
  localStorage.setItem('user', JSON.stringify(userDetails));
};

export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};



export const getUsers = async () => {
  try {
    const response = await axiosInstance.get(`${USER_API_URL}/user/list`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};


export const updateUserRole = async (id, role) => {
  const response = await axiosInstance.put(`${USER_API_URL}/user/list/${id}/role`, null, {
    params: { role },
  });
  return response.data;
};

