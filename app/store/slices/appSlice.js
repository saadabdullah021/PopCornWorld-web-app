import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../axios'
import { get_global_settings } from '../../services/api/endpoints'

export const fetchGlobalSettings = createAsyncThunk(
  'app/fetchGlobalSettings',
  async () => {
    const response = await axiosInstance.get(get_global_settings)
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
  globalSettingsError: null
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
