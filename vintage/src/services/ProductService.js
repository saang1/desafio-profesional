import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/products';

export const ListProducts = () => axios.get(REST_API_BASE_URL);

export const createProduct = (product, file) => {
  const formData = new FormData();
  formData.append('product', JSON.stringify(product)); // Convert product object to JSON string
  formData.append('file', file);

  return axios.post(REST_API_BASE_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getProductById = (id) => {
  return ListProducts().then(response => {
    return response.data.find(product => product.id === parseInt(id));
  });
};


export const deleteProduct = (productId) => axios.delete(REST_API_BASE_URL + '/' + productId);