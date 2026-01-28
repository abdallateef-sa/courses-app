import { AxiosResponse } from 'axios';
import apiClient from './client';
import { User } from '../types';

const AUTH_ENDPOINT = '/auth';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export const authService = {
  // Login
  login: async (credentials: LoginCredentials): Promise<AxiosResponse<AuthResponse>> => {
    return apiClient.post<AuthResponse>(`${AUTH_ENDPOINT}/login`, credentials);
  },

  // Register
  register: async (data: RegisterData): Promise<AxiosResponse<AuthResponse>> => {
    return apiClient.post<AuthResponse>(`${AUTH_ENDPOINT}/register`, data);
  },

  // Logout
  logout: async (): Promise<AxiosResponse<void>> => {
    return apiClient.post<void>(`${AUTH_ENDPOINT}/logout`);
  },

  // Refresh token
  refreshToken: async (refreshToken: string): Promise<AxiosResponse<{ accessToken: string }>> => {
    return apiClient.post<{ accessToken: string }>(`${AUTH_ENDPOINT}/refresh`, { refreshToken });
  },

  // Get current user profile
  getProfile: async (): Promise<AxiosResponse<User>> => {
    return apiClient.get<User>(`${AUTH_ENDPOINT}/profile`);
  },

  // Update user profile
  updateProfile: async (data: Partial<User>): Promise<AxiosResponse<User>> => {
    return apiClient.put<User>(`${AUTH_ENDPOINT}/profile`, data);
  },
};