import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/api';
import { jwtDecode } from "jwt-decode";
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (window.location.pathname !== '/login') {
            checkAuth();
        } else {
            setLoading(false);
        }
    }, []);

    const checkAuth = () => {
        const token = localStorage.getItem('jwtToken');
        const savedUser = localStorage.getItem('user');

        if (token && savedUser) {
            try {
                const decoded = jwtDecode(token);
                // Check if token is expired
                if (decoded.exp * 1000 > Date.now()) {
                    setUser(JSON.parse(savedUser));
                } else {
                    // Token expired
                    localStorage.removeItem('jwtToken');
                    localStorage.removeItem('user');
                    toast.error('Session expired. Please login again.');
                }
            } catch (error) {
                localStorage.removeItem('jwtToken');
                localStorage.removeItem('user');
            }
        }
        setLoading(false);
    };

    const login = async (credentials) => {
        try {
            const response = await authAPI.login(credentials);
            const { token, username, email, id, roles } = response.data;

            localStorage.setItem('jwtToken', token);
            const userData = { username, email, id, roles };
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);

            toast.success(`Welcome back, ${username}!`);
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || 'Invalid username or password';
            toast.error(message, {
                duration: 4000,
                position: 'top-center',
            });
            throw error;
        }
    };

    const updateUser = (updatedFields) => {
        setUser((prevUser) => {
            if (!prevUser) return prevUser;

            const updatedUser = { ...prevUser, ...updatedFields };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            return updatedUser;
        });
    };




    const register = async (userData) => {
        try {
            const response = await authAPI.register(userData);
            toast.success('Registration successful! Please login.');
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || 'Registration failed';
            toast.error(message);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('user');
        setUser(null);
        toast.success('Logged out successfully');
    };

    const value = {
        user,
        login,
        register,
        logout,
        updateUser,
        isAuthenticated: !!user,
        loading,
    };


    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};