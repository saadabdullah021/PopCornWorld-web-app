import axiosInstance from '../../axios'
import { get_single_product, get_single_collection } from './endpoints'

export const api = {
  get: (url, config = {}) => axiosInstance.get(url, config),
  post: (url, data = {}, config = {}) => axiosInstance.post(url, data, config),
  put: (url, data = {}, config = {}) => axiosInstance.put(url, data, config),
  patch: (url, data = {}, config = {}) => axiosInstance.patch(url, data, config),
  delete: (url, config = {}) => axiosInstance.delete(url, config),
}

export const getSingleProduct = async (slug, success, fail) => {
  try {
    const response = await axiosInstance.get(`${get_single_product}?slug=${slug}`);
    if (response?.data?.status === 200) {
      let data = response?.data?.data;
      success && success(data);
      return response?.data?.data;
    }
  } catch (error) {
    fail && fail();
    return error;
  }
};

export const getSingleCollection = async (slug, success, fail) => {
  try {
    const response = await axiosInstance.get(`${get_single_collection}?slug=${slug}`);
    if (response?.data?.status === 200) {
      let data = response?.data?.data;
      success && success(data);
      return response?.data?.data;
    }
  } catch (error) {
    fail && fail();
    return error;
  }
};

export default axiosInstance
