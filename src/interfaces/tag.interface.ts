// Interface para Tag
import { MultilangContent } from './post.interface';

export interface Tag {
  id: number;
  name: MultilangContent;
  slug: string;
  description?: MultilangContent;
  color?: string;
  isMainTag: boolean;
  createdAt: string;
  updatedAt: string;
  postCount?: number;
}
