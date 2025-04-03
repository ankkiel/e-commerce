import { API_ENDPOINTS } from '../api/index.ts';
import { getData } from './getData.ts';

export const getProductsCategory = async () => {
  const data = await getData(`${API_ENDPOINTS.CATEGORIES}`);

  return data;
};
