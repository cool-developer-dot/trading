// Blog Types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  category: BlogCategory;
  tags: string[];
  coverImage: string;
  publishedAt: string;
  readingTime: number;
  featured?: boolean;
  views?: number;
  likes?: number;
}

export type BlogCategory = 
  | 'Market Analysis'
  | 'Trading Tips'
  | 'Crypto News'
  | 'DeFi'
  | 'NFTs'
  | 'Blockchain'
  | 'Security'
  | 'Education';

export interface BlogFilters {
  category?: BlogCategory;
  search?: string;
  tags?: string[];
}

