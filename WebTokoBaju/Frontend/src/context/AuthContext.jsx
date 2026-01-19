import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for saved token/user on load
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            const userData = response.data;
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            return { success: true, role: userData.role };
        } catch (error) {
            console.error("Login failed:", error.response?.data?.message || error.message);
            return {
                success: false,
                message: error.response?.data?.message || "Login gagal. Periksa kembali email dan password Anda."
            };
        }
    };

    const register = async (fullName, email, password) => {
        try {
            await api.post('/auth/register', { fullName, email, password });
            return { success: true };
        } catch (error) {
            console.error("Registration failed:", error.response?.data?.message || error.message);
            return {
                success: false,
                message: error.response?.data?.message || "Registrasi gagal."
            };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
