// API Configuration
const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'https://api.example.com';

export const API_CONFIG = {
  BASE_URL,
  TIMEOUT: 10000, // 10 seconds
  HEADERS: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};