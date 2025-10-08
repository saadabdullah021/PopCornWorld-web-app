import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../axios'
import { get_global_settings, get_campaigns, get_products, get_shop_collections } from '../../services/api/endpoints'

export const fetchGlobalSettings = createAsyncThunk(
  'app/fetchGlobalSettings',
  async () => {
    const response = await axiosInstance.get(get_global_settings)
    return response.data
  }
)

export const fetchCampaigns = createAsyncThunk(
  'app/fetchCampaigns',
  async () => {
    console.log('Fetching campaigns from:', get_campaigns);
    const response = await axiosInstance.get(get_campaigns)
    console.log('Campaigns API response:', response.data);
    return response.data
  }
)

export const fetchProducts = createAsyncThunk(
  'app/fetchProducts',
  async ({ page = 1, per_page = 6, append = false } = {}) => {
    console.log('API Call - fetchProducts:', { page, per_page, append });
    const response = await axiosInstance.get(get_products, {
      params: { page, per_page }
    })
    console.log('API Response:', response.data);
    return { ...response.data, append }
  }
)

export const fetchCollections = createAsyncThunk(
  'app/fetchCollections',
  async ({ page = 1, per_page = 6, append = false } = {}) => {
    console.log('API Call - fetchCollections:', { page, per_page, append });
    const response = await axiosInstance.get(get_shop_collections, {
      params: { page, per_page }
    })
    console.log('API Response:', response.data);
    return { ...response.data, append }
  }
)

// Cart persistence functions
const loadCartFromStorage = () => {
  if (typeof window !== 'undefined') {
    try {
      const savedCart = localStorage.getItem('popcorn_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return [];
    }
  }
  return [];
};

const saveCartToStorage = (cart) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('popcorn_cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }
};

// Auth persistence functions
const loadAuthFromStorage = () => {
  if (typeof window !== 'undefined') {
    try {
      const token = localStorage.getItem('auth_token');
      const userData = localStorage.getItem('user_data');
      return {
        token: token || null,
        userData: userData ? JSON.parse(userData) : null
      };
    } catch (error) {
      console.error('Error loading auth from localStorage:', error);
      return { token: null, userData: null };
    }
  }
  return { token: null, userData: null };
};

const saveAuthToStorage = (token, userData) => {
  if (typeof window !== 'undefined') {
    try {
      if (token) {
        localStorage.setItem('auth_token', token);
        console.log('Auth token saved to localStorage:', token.substring(0, 20) + '...');
      } else {
        localStorage.removeItem('auth_token');
        console.log('Auth token removed from localStorage');
      }
      if (userData) {
        localStorage.setItem('user_data', JSON.stringify(userData));
        console.log('User data saved to localStorage:', userData);
      } else {
        localStorage.removeItem('user_data');
        console.log('User data removed from localStorage');
      }
    } catch (error) {
      console.error('Error saving auth to localStorage:', error);
    }
  }
};

const { token: savedToken, userData: savedUserData } = loadAuthFromStorage();

const initialState = {
  isLoading: false,
  theme: 'light',
  sidebarOpen: false,
  notifications: [],
  user: null,
  error: null,
  globalSettings: null,
  globalSettingsLoading: false,
  globalSettingsError: null,
  campaigns: null,
  campaignsLoading: false,
  campaignsError: null,
  products: null,
  productsLoading: false,
  productsError: null,
  productsPagination: {
    currentPage: 1,
    perPage: 6,
    totalPages: 0,
    totalRecords: 0
  },
  collections: null,
  collectionsLoading: false,
  collectionsError: null,
  collectionsPagination: {
    currentPage: 1,
    perPage: 6,
    totalPages: 0,
    totalRecords: 0
  },
  cart: loadCartFromStorage(), // Load cart from localStorage on initialization
  // Auth state
  isAuthenticated: !!savedToken,
  authLoading: false,
  authError: null,
  phoneNumber: null,
  otpSent: false,
  accessToken: savedToken,
  customerInfo: savedUserData
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setTheme: (state, action) => {
      state.theme = action.payload
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload
    },
    addNotification: (state, action) => {
      state.notifications.push({
        id: Date.now(),
        message: action.payload.message,
        type: action.payload.type || 'info',
        timestamp: new Date().toISOString()
      })
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      )
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.cart.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
      
      // Save to localStorage
      saveCartToStorage(state.cart);
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.cart = state.cart.filter(item => item.id !== productId);
      
      // Save to localStorage
      saveCartToStorage(state.cart);
    },
    updateCartQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cart.find(item => item.id === id);
      if (item) {
        if (quantity <= 0) {
          state.cart = state.cart.filter(item => item.id !== id);
        } else {
          item.quantity = quantity;
        }
      }
      
      // Save to localStorage
      saveCartToStorage(state.cart);
    },
    clearCart: (state) => {
      state.cart = [];
      
      // Save to localStorage
      saveCartToStorage(state.cart);
    },
    initializeCart: (state) => {
      state.cart = loadCartFromStorage();
    },
    // Auth actions
    setAuthLoading: (state, action) => {
      state.authLoading = action.payload;
    },
    setAuthError: (state, action) => {
      state.authError = action.payload;
    },
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setOTPSent: (state, action) => {
      state.otpSent = action.payload;
    },
    loginSuccess: (state, action) => {
      const { access_token, customer_info } = action.payload;
      state.isAuthenticated = true;
      state.accessToken = access_token;
      state.customerInfo = customer_info;
      state.user = customer_info; // Keep for backward compatibility
      state.authLoading = false;
      state.authError = null;
      
      // Save to localStorage
      saveAuthToStorage(access_token, customer_info);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.customerInfo = null;
      state.user = null;
      state.phoneNumber = null;
      state.otpSent = false;
      state.authError = null;
      
      // Clear from localStorage
      saveAuthToStorage(null, null);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGlobalSettings.pending, (state) => {
        state.globalSettingsLoading = true
        state.globalSettingsError = null
      })
      .addCase(fetchGlobalSettings.fulfilled, (state, action) => {
        state.globalSettingsLoading = false
        state.globalSettings = action.payload.data
      })
      .addCase(fetchGlobalSettings.rejected, (state, action) => {
        state.globalSettingsLoading = false
        state.globalSettingsError = action.error.message
      })
      .addCase(fetchCampaigns.pending, (state) => {
        state.campaignsLoading = true
        state.campaignsError = null
      })
      .addCase(fetchCampaigns.fulfilled, (state, action) => {
        state.campaignsLoading = false
        state.campaigns = action.payload.data
      })
      .addCase(fetchCampaigns.rejected, (state, action) => {
        state.campaignsLoading = false
        state.campaignsError = action.error.message
      })
      .addCase(fetchProducts.pending, (state) => {
        state.productsLoading = true
        state.productsError = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.productsLoading = false
        
        console.log('Reducer - fetchProducts.fulfilled:', {
          append: action.payload.append,
          currentProducts: state.products?.length || 0,
          newData: action.payload.data?.length || 0,
          page: action.payload.page,
          totalPages: action.payload.total_pages
        });
        
        // If append is true, add new data to existing products
        if (action.payload.append && state.products) {
          state.products = [...state.products, ...action.payload.data]
          console.log('Appended data. Total products now:', state.products.length);
        } else {
          state.products = action.payload.data
          console.log('Replaced data. Total products now:', state.products.length);
        }
        
        // Update pagination info from API response
        state.productsPagination = {
          currentPage: action.payload.page || 1,
          perPage: action.payload.per_page || 6,
          totalPages: action.payload.total_pages || 0,
          totalRecords: action.payload.total_records || 0
        }
        
        console.log('Updated products pagination:', state.productsPagination);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.productsLoading = false
        state.productsError = action.error.message
      })
      .addCase(fetchCollections.pending, (state) => {
        state.collectionsLoading = true
        state.collectionsError = null
      })
      .addCase(fetchCollections.fulfilled, (state, action) => {
        state.collectionsLoading = false
        
        console.log('Reducer - fetchCollections.fulfilled:', {
          append: action.payload.append,
          currentCollections: state.collections?.length || 0,
          newData: action.payload.data?.length || 0,
          page: action.payload.page,
          totalPages: action.payload.total_pages
        });
        
        // If append is true, add new data to existing collections
        if (action.payload.append && state.collections) {
          state.collections = [...state.collections, ...action.payload.data]
          console.log('Appended data. Total collections now:', state.collections.length);
        } else {
          state.collections = action.payload.data
          console.log('Replaced data. Total collections now:', state.collections.length);
        }
        
        // Update pagination info from API response
        state.collectionsPagination = {
          currentPage: action.payload.page || 1,
          perPage: action.payload.per_page || 6,
          totalPages: action.payload.total_pages || 0,
          totalRecords: action.payload.total_records || 0
        }
        
        console.log('Updated pagination:', state.collectionsPagination);
      })
      .addCase(fetchCollections.rejected, (state, action) => {
        state.collectionsLoading = false
        state.collectionsError = action.error.message
      })
  }
})

export const {
  setLoading,
  setTheme,
  toggleSidebar,
  setSidebarOpen,
  addNotification,
  removeNotification,
  setUser,
  setError,
  clearError,
  addToCart,
  removeFromCart,
  updateCartQuantity,
  clearCart,
  initializeCart,
  setAuthLoading,
  setAuthError,
  setPhoneNumber,
  setOTPSent,
  loginSuccess,
  logout
} = appSlice.actions

export default appSlice.reducer
