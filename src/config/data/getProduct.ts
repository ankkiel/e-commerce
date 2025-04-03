import { API_ENDPOINTS } from '../api';
import { getData } from './getData';

export const getProduct = async (id: number) => {
  const data = await getData(`${API_ENDPOINTS.PRODUCTS}${id}`);

  return data;
};
