import { AxiosResponse } from 'axios';
import apiClient from './client';
import { Category } from '../types'; // We'll define types later

const CATEGORY_ENDPOINT = '/categories';

export const categoryService = {
  // Get all categories
  getCategories: async (): Promise<AxiosResponse<Category[]>> => {
    return apiClient.get<Category[]>(CATEGORY_ENDPOINT);
  },
};