// src/services/favoritesService.js
import axios from 'axios';

const API_BASE =  'http://localhost:8080/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('authToken');
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const favoritesService = {
  getFavorites: async () => {
    try {
      const response = await axios.get(`${API_BASE}/favorites`, getAuthHeader());
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch favorites: ' + error.response?.data?.message || error.message);
    }
  },

  addFavorite: async (productId) => {
    try {
      await axios.post(`${API_BASE}/favorites/${productId}`, {}, getAuthHeader());
    } catch (error) {
      throw new Error('Failed to add favorite: ' + error.response?.data?.message || error.message);
    }
  },

  removeFavorite: async (productId) => {
    try {
      await axios.delete(`${API_BASE}/favorites/${productId}`, getAuthHeader());
    } catch (error) {
      throw new Error('Failed to remove favorite: ' + error.response?.data?.message || error.message);
    }
  },

  checkFavoriteStatus: async (productId) => {
    try {
      const response = await axios.get(
        `${API_BASE}/favorites/check/${productId}`,
        getAuthHeader()
      );
      return response.data.isFavorite;
    } catch (error) {
      console.error('Error checking favorite status:', error);
      return false;
    }
  }
};