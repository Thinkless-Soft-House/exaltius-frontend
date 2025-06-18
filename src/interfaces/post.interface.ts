// Interface para MultilangContent
export interface MultilangContent {
  pt: string;
  en?: string;
  es?: string;
  [key: string]: string | undefined;
}

export enum PostStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

export interface Post {
  id: number;
  title: MultilangContent;
  slug: string;
  content: MultilangContent;
  contentMarkdown?: MultilangContent;
  summary?: MultilangContent;
  status: PostStatus;
  authorId: number;
  createdAt: string;
  updatedAt: string;
}
