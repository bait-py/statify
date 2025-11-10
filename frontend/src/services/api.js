import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const spotifyAPI = {
  // Autenticación
  getAuthUrl: async () => {
    const response = await api.get('/api/auth/login')
    return response.data
  },

  // Usuario
  getUserProfile: async (token) => {
    const response = await api.get('/api/user/profile', {
      params: { token }
    })
    return response.data
  },

  // Estadísticas
  getTopTracks: async (token, timeRange = 'medium_term', limit = 20) => {
    const response = await api.get('/api/stats/top-tracks', {
      params: { token, time_range: timeRange, limit }
    })
    return response.data
  },

  getTopArtists: async (token, timeRange = 'medium_term', limit = 20) => {
    const response = await api.get('/api/stats/top-artists', {
      params: { token, time_range: timeRange, limit }
    })
    return response.data
  },

  getTopGenres: async (token, timeRange = 'medium_term') => {
    const response = await api.get('/api/stats/genres', {
      params: { token, time_range: timeRange }
    })
    return response.data
  },

  getRecentlyPlayed: async (token, limit = 20) => {
    const response = await api.get('/api/stats/recently-played', {
      params: { token, limit }
    })
    return response.data
  },

  getDashboardStats: async (token, timeRange = 'medium_term') => {
    const response = await api.get('/api/stats/dashboard', {
      params: { token, time_range: timeRange }
    })
    return response.data
  }
}

export default api
