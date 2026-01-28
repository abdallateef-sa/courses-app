import { AxiosResponse } from 'axios';
import apiClient from './client';
import { Instructor } from '../types'; // We'll define types later

const INSTRUCTOR_ENDPOINT = '/instructors';

export const instructorService = {
  // Get all instructors
  getInstructors: async (): Promise<AxiosResponse<Instructor[]>> => {
    return apiClient.get<Instructor[]>(INSTRUCTOR_ENDPOINT);
  },

  // Get instructor by ID
  getInstructorById: async (id: string): Promise<AxiosResponse<Instructor>> => {
    return apiClient.get<Instructor>(`${INSTRUCTOR_ENDPOINT}/${id}`);
  },
};