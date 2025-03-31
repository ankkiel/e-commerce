import { API_ENDPOINTS } from '../api/index.ts';
import { getData } from './getData.ts';

export const getAllProducts = async (offset: number = 0, limit: number = 0) => {
  const data = await getData(`${API_ENDPOINTS.PRODUCTS}?offset=${offset}&limit=${limit}`);

  return data;
};
