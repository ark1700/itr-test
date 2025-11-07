export interface Post {
  id: number;
  title: string;
  body: string;
  created_at: number;
  updated_at: number;
}

export interface CreatePostData {
  title: string;
  content: string;
}

export type SortOption = 'random' | 'oldest_first' | 'newest_first';
