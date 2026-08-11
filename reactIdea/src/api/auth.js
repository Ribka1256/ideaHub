// auth.js
import api from './axios';

export const loginUser = (username, password) => {
    // Matches path('token/')
    return api.post('accounts/token/', { username, password });
};

export const registerUser = (userData) => {
    // Matches path('register/')
    return api.post('accounts/register/', userData);
};

export const refreshToken = (refresh) => {
    // Matches path('token/refresh/')
    return api.post('accounts/token/refresh/', { refresh });
};

export const getMe = () => {
    // Matches path('me/')
    return api.get('accounts/me/');
};