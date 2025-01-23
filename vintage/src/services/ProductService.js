import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/products";
const REST_API_RESERVATION_URL = "http://localhost:8080/api/reservation";

// Product-related functions
export const ListProducts = () => axios.get(REST_API_BASE_URL);

export const createProduct = (product, images) => {
  const formData = new FormData();
  formData.append("product", JSON.stringify(product));
  images.forEach((image) => {
    formData.append("images", image);
  });

  return axios.post(REST_API_BASE_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getProductById = (id) =>
  ListProducts().then((response) => {
    return response.data.find((product) => product.id === parseInt(id));
  });

export const deleteProduct = (productId) =>
  axios.delete(`${REST_API_BASE_URL}/${productId}`);

export const getProduct = (productId) =>
  axios.get(`${REST_API_BASE_URL}/${productId}`);

export const updateProduct = (productId, product) =>
  axios.put(`${REST_API_BASE_URL}/${productId}`, product);

// Reservation-related functions
export const getAvailableDates = async (productId) => {
  const response = await axios.get(
    `${REST_API_RESERVATION_URL}/available/${productId}`
  );
  return response.data;
};

export const createReservation = async (reservationData) => {
  try {
    const response = await axios.post("http://localhost:8080/api/reservation", reservationData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in createReservation:", error);
    throw error;
  }
};

