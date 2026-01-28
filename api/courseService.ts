import { AxiosResponse } from 'axios';
import apiClient from './client';
import { Course } from '../types'; // We'll define types later

const COURSE_ENDPOINT = '/courses';

export interface CourseFilters {
  category?: string;
  instructor?: string;
  search?: string;
  limit?: number;
  offset?: number;
}

export const courseService = {
  // Get all courses with optional filters
  getCourses: async (filters?: CourseFilters): Promise<AxiosResponse<Course[]>> => {
    const params = {
      ...(filters?.category && { category: filters.category }),
      ...(filters?.instructor && { instructor: filters.instructor }),
      ...(filters?.search && { search: filters.search }),
      ...(filters?.limit && { limit: filters.limit }),
      ...(filters?.offset && { offset: filters.offset }),
    };
    
    return apiClient.get<Course[]>(COURSE_ENDPOINT, { params });
  },

  // Get a single course by ID
  getCourseById: async (id: string): Promise<AxiosResponse<Course>> => {
    return apiClient.get<Course>(`${COURSE_ENDPOINT}/${id}`);
  },

  // Search courses
  searchCourses: async (query: string): Promise<AxiosResponse<Course[]>> => {
    return apiClient.get<Course[]>(`${COURSE_ENDPOINT}/search?q=${encodeURIComponent(query)}`);
  },
};