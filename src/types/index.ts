
export type UserStatus = 'active' | 'inactive';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
  line_user_id?: string;
  status: UserStatus;
  created_at: string;
}

export type SubscriptionStatus = 'active' | 'past_due' | 'canceled' | 'incomplete';

export interface Subscription {
  id: string;
  user_id: string;
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
  status: SubscriptionStatus;
  start_date: string;
  expiry_date: string;
  created_at: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  duration: string;
  lessons_count: number;
  category: string;
  is_premium: boolean;
  instructor_name: string;
  rating: number;
  created_at: string;
}

export interface Tool {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  icon_name: string; // Lucide icon name
  tag: string;
  is_premium: boolean;
  image_url: string;
  tool_url?: string;
  created_at: string;
}

export interface ActivityLog {
  id: string;
  user_id: string;
  action: string;
  metadata: Record<string, any>;
  created_at: string;
}

export interface ForumCategory {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon_name: string;
  color: string;
}

export interface ForumPost {
  id: string;
  category_id: string;
  user_id: string;
  title: string;
  content: string;
  tag: string;
  views_count: number;
  sparks_count: number;
  created_at: string;
  author?: User;
  category?: ForumCategory;
}

export interface ForumComment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
  author?: User;
}

export interface Certificate {
  id: string;
  user_id: string;
  course_id: string;
  certificate_number: string;
  issued_at: string;
  metadata: Record<string, any>;
  created_at: string;
  course?: Course;
  user?: User;
}
