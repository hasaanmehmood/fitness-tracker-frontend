import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor - Add JWT token to all requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - Handle token expiration
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// ========== Authentication APIs ==========
export const authAPI = {
    register: (data) => api.post('/auth/register', data),
    login: (data) => api.post('/auth/login', data),
};

// ========== Workout APIs ==========
export const workoutAPI = {
    getAll: () => api.get('/workouts'),
    getById: (id) => api.get(`/workouts/${id}`),
    create: (data) => api.post('/workouts', data),
    update: (id, data) => api.put(`/workouts/${id}`, data),
    delete: (id) => api.delete(`/workouts/${id}`),
    search: (query) => api.get(`/workouts/search?q=${query}`),
    filterByIntensity: (level) => api.get(`/workouts/filter/intensity?level=${level}`),
    filterByDateRange: (start, end) =>
        api.get(`/workouts/date-range?start=${start}&end=${end}`),
};

// ========== Exercise APIs ==========
export const exerciseAPI = {
    getAll: () => api.get('/exercises/public'),
    getById: (id) => api.get(`/exercises/public/${id}`),
    search: (query) => api.get(`/exercises/public/search?q=${query}`),
    getByCategory: (category) => api.get(`/exercises/public/category/${category}`),
    getByMuscle: (muscle) => api.get(`/exercises/public/muscle/${muscle}`),
};


// ========== User APIs ==========
export const userAPI = {
    getProfile: () => api.get('/users/me'),
    updateProfile: (data) => api.put('/users/me', data),
    uploadProfileImage: (file) => {
        const formData = new FormData();
        formData.append('file', file);
        return api.post('/users/me/upload-profile-image', formData, {  // Fixed Source
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
};

export default api;