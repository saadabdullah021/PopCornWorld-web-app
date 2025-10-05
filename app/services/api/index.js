import axiosInstance from '../../axios'
import { get_single_product, get_single_collection, send_otp, verify_otp, create_order } from './endpoints'

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

export const sendOTP = async (phoneNumber, otpType, success, fail) => {
  try {
    const response = await axiosInstance.post(send_otp, { 
      phone_number: phoneNumber,
      otp_type: otpType
    });
    if (response?.data?.status === 200) {
      success && success(response?.data);
      return response?.data;
    } else {
      // Handle non-200 responses
      fail && fail(response?.data?.message || 'Failed to send OTP');
      return response?.data;
    }
  } catch (error) {
    fail && fail(error?.response?.data?.message || 'Network error occurred');
    return error;
  }
};

export const verifyOTP = async (phoneNumber, otpCode, otpType, success, fail) => {
  try {
    const response = await axiosInstance.post(verify_otp, { 
      phone_number: phoneNumber, 
      otp_code: otpCode,
      otp_type: otpType
    });
    if (response?.data?.status === 200) {
      success && success(response?.data);
      return response?.data;
    } else {
      // Handle non-200 responses
      fail && fail(response?.data?.message || 'OTP verification failed');
      return response?.data;
    }
  } catch (error) {
    fail && fail(error?.response?.data?.message || 'Network error occurred');
    return error;
  }
};

export const createOrder = async (orderData, success, fail) => {
  try {
    const response = await axiosInstance.post(create_order, orderData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response?.data?.status === 200 || response?.status === 200) {
      success && success(response?.data);
      return response?.data;
    } else {
      fail && fail(response?.data?.message || 'Order creation failed');
      return response?.data;
    }
  } catch (error) {
    fail && fail(error?.response?.data?.message || 'Network error occurred');
    return error;
  }
};

export default axiosInstance
