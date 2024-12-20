export type UserRole = 'admin' | 'employee' | 'sales_manager';
export type Theme = 'light' | 'dark';
export type Language = 'ar' | 'en';

export interface UserProfile {
  id: string;
  username: string;
  password: string;
  email: string;
  fullName: string;
  role: UserRole;
  phone?: string;
  department?: string;
  joinDate: string;
  lastActive: string;
  theme: Theme;
  language: Language;
  notifications: {
    email: boolean;
    browser: boolean;
    mobile: boolean;
  };
  avatar?: string;
}