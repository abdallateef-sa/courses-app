// Type definitions for API data

export interface Lesson {
  id: number;
  title: string;
  duration: string;
  summary: string;
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  rating: number;
  reviews: number;
  price: string;
  oldPrice: string;
  image: string;
  category: string;
  description: string;
  lessons: Lesson[];
}

export interface Category {
  id?: string;
  name: string;
}

export interface Instructor {
  id: string;
  name: string;
  image: string;
  specialty: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profileImage?: string;
  educationLevel: "primary" | "middle" | "high";
  grade: number;
}

export interface CourseFilters {
  category?: string;
  instructor?: string;
  search?: string;
  limit?: number;
  offset?: number;
}
