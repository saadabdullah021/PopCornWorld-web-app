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
    const response = await axiosInstance.get(get_campaigns)
    return response.data
  }
)

export const fetchProducts = createAsyncThunk(
  'app/fetchProducts',
  async () => {
    const response = await axiosInstance.get(get_products)
    return response.data
  }
)

export const fetchCollections = createAsyncThunk(
  'app/fetchCollections',
  async () => {
    const response = await axiosInstance.get(get_shop_collections)
    return response.data
  }
)

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
  collections: null,
  collectionsLoading: false,
  collectionsError: null
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
        state.products = action.payload.data
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
        state.collections = action.payload.data
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
  clearError
} = appSlice.actions

export default appSlice.reducer
