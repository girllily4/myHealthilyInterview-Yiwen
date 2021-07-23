import axios from 'axios';
import { Industry } from '../types';

(() => {
  const baseURL = 'https://pharaoh.candor-usa.com';
  axios.defaults.baseURL = baseURL;
})();

const getIndustryList = async (): Promise<Industry[]> => {
  const endpoint = '/industries';
  const response = await axios.get(endpoint);
  return response.data;
};

const ApiClient = {
  getIndustryList,
};

export default ApiClient;
