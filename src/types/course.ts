export type Course = {
  id: number;
  title: string;
  type: string;
  category: string;
  duration: string;
  price: number;
  rating: number;
  instructor?: string;
  description?: string;
  students?: number;
  imageUrl?: string;
  createdAt?: string;
};



export interface Instructor {
  name: string;
  avatar: string;
  description: string;
  background: string;
  expertise: string;
}

export interface Review {
  author: string;
  time: string;
  content: string;
}

export interface CourseDetail {
  id: string;
  title: string;
  instructorName: string;
  instructorAvatar: string;
  instructorDescription: string;
  instructorBackground: string;
  instructorExpertise: string;
  thumbnail?: string;
  image?: string;
  video?: string;
  purpose: string;
  content: string[];
  duration: string;
  format: string;
  level: string;
  is_watch: boolean;
  outcomes: string[];
  lessons: number;
  exercises: number;
  DownloadableResources: number;
  hasFinalProject: boolean;
  reviews: Review[];
  rating: number;
  students: number
}

export interface ListCourse {
    _id: string;
    courseName: string;
    description: string;
    imageUrl: string;
    studentCount: number;
    isActive: boolean;
    price: number;
}