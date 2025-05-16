import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export const getPublishers = async () => {
  const response = await axios.get(`${API_BASE_URL}/publishers`);
  return response.data;
};

export const getPublisherById = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/publishers/${id}`);
  return response.data;
};

export const createPublisher = async (publisherData: any) => {
  const response = await axios.post(`${API_BASE_URL}/publishers`, publisherData);
  return response.data;
};

export const updatePublisher = async (id: string, publisherData: any) => {
  const response = await axios.put(`${API_BASE_URL}/publishers/${id}`, publisherData);
  return response.data;
};

export const deletePublisher = async (id: string) => {
  const response = await axios.delete(`${API_BASE_URL}/publishers/${id}`);
  return response.data;
};