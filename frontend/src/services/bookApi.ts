import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export const getBooks = async () => {
  const response = await axios.get(`${API_BASE_URL}/books`);
  return response.data;
};

export const getBookById = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/books/${id}`);
  return response.data;
};

export const createBook = async (bookData: any) => {
  const response = await axios.post('http://localhost:3000/api/books', bookData);
  return response.data;
};

export const updateBook = async (id: string, bookData: any) => {
  const response = await axios.put(`${API_BASE_URL}/books/${id}`, bookData);
  return response.data;
};

export const deleteBook = async (id: string) => {
  const response = await axios.delete(`${API_BASE_URL}/books/${id}`);
  return response.data;
};
