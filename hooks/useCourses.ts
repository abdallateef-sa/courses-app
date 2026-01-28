import { useState, useEffect } from 'react';
import { courseService } from '../api';
import { Course, CourseFilters } from '../types';

export const useCourses = (filters?: CourseFilters) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await courseService.getCourses(filters);
        setCourses(response.data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch courses');
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [JSON.stringify(filters)]); // Convert object to string for dependency comparison

  return { courses, loading, error };
};