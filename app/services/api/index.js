import axiosInstance from '../../axios'
import { get_single_product, get_single_collection, get_single_campaign, send_otp, verify_otp, create_order, track_order, check_email_exists, get_organization_info, fundraiser_register, get_products_slider, get_user_orders } from './endpoints'

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

export const getSingleCampaign = async (slug, success, fail) => {
  try {
    const response = await axiosInstance.get(`${get_single_campaign}?slug=${slug}`);
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
    const cleanPhoneNumber = phoneNumber.replace(/[^\d]/g, '');
    const response = await axiosInstance.post(send_otp, {
      phone_number: cleanPhoneNumber,
      otp_type: otpType
    });
    if (response?.data?.status === 200) {
      success && success(response?.data);
      return response?.data;
    } else {
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
    const cleanPhoneNumber = phoneNumber.replace(/[^\d]/g, '');
    const response = await axiosInstance.post(verify_otp, {
      phone_number: cleanPhoneNumber,
      otp_code: otpCode,
      otp_type: otpType
    });
    if (response?.data?.status === 200) {
      success && success(response?.data);
      return response?.data;
    } else {
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

export const trackOrder = async (emailAddress, success, fail) => {
  try {
    const response = await axiosInstance.get(track_order, {
      params: {
        email_address: emailAddress
      }
    });

    if (response?.data?.status === 200 || response?.status === 200) {
      success && success(response?.data);
      return response?.data;
    } else {
      fail && fail(response?.data?.message || 'Order tracking failed');
      return response?.data;
    }
  } catch (error) {
    fail && fail(error?.response?.data?.message || 'Network error occurred');
    return error;
  }
};

export const checkEmailExists = async (emailAddress, userType, success, fail) => {

  try {
    const response = await axiosInstance.get(check_email_exists, {
      params: {
        user_type: userType,
        email_address: emailAddress
      }
    });

    if (response?.data?.status == 200) {
      success && success(response?.data);
      return response?.data;
    } else {
      fail && fail(response?.data?.message || 'Email check failed');
      return response?.data?.message;
    }
  } catch (error) {
    fail && fail(error?.response?.data?.message || 'Network error occurred');
    return error;
  }
};

export const getOrganizationInfo = async (success, fail) => {
  try {
    console.log('Making API call to:', get_organization_info);
    const response = await axiosInstance.get(get_organization_info);
    console.log('API response:', response);

    if (response?.data?.status === 200 || response?.status === 200) {
      success && success(response?.data);
      return response?.data;
    } else {
      fail && fail(response?.data?.message || 'Failed to fetch organization info');
      return response?.data;
    }
  } catch (error) {
    console.error('API error:', error);
    fail && fail(error?.response?.data?.message || 'Network error occurred');
    return error;
  }
};

export const registerFundraiser = async (formData, success, fail) => {
  try {
    console.log('Registering fundraiser with data:', formData);
    const response = await axiosInstance.post(fundraiser_register, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    console.log('Fundraiser registration response:', response);

    if (response?.data?.status === 200 || response?.status === 200) {
      success && success(response?.data);
      return response?.data;
    } else {
      fail && fail(response?.data?.message || 'Failed to register fundraiser');
      return response?.data;
    }
  } catch (error) {
    console.error('Fundraiser registration error:', error);
    fail && fail(error?.response?.data?.message || 'Network error occurred');
    return error;
  }
};

export const getProductsSlider = async (success, fail) => {
  try {
    console.log('Fetching products slider data...');
    const response = await axiosInstance.get(get_products_slider);
    console.log('Products slider response:', response);

    if (response?.data?.status === 200 || response?.status === 200) {
      success && success(response?.data);
      return response?.data;
    } else {
      fail && fail(response?.data?.message || 'Failed to fetch products slider');
      return response?.data;
    }
  } catch (error) {
    console.error('Products slider error:', error);
    fail && fail(error?.response?.data?.message || 'Network error occurred');
    return error;
  }
};

export const getUserOrders = async (success, fail) => {
  try {
    const authToken = localStorage.getItem('auth_token');
    console.log('Fetching user orders...');
    console.log('Auth token available:', !!authToken);
    console.log('Auth token:', authToken ? `${authToken.substring(0, 20)}...` : 'No token');

    const response = await axiosInstance.get(get_user_orders);
    console.log('User orders response:', response);

    if (response?.data?.status === 200 || response?.status === 200) {
      success && success(response?.data);
      return response?.data;
    } else {
      fail && fail(response?.data?.message || 'Failed to fetch user orders');
      return response?.data;
    }
  } catch (error) {
    console.error('User orders error:', error);
    console.error('Error response:', error?.response);
    fail && fail(error?.response?.data?.message || 'Network error occurred');
    return error;
  }
};

export default axiosInstance
