// Hook para requisições GET de posts
import { useCallback } from 'react';
import { Post } from '../interfaces/post.interface';

const API_URL = import.meta.env.VITE_API_URL;

export function useGetPosts() {
  // GET /blog/posts
  const getAll = useCallback(async () => {
    const res = await fetch(`${API_URL}/blog/posts`);
    return res.json();
  }, []);

  // GET /blog/posts/slug/:slug?lang=xx
  const getBySlug = useCallback(async (slug: string, lang?: string) => {
    const url = new URL(`${API_URL}/blog/posts/slug/${slug}`);
    if (lang) url.searchParams.append('lang', lang);
    const res = await fetch(url.toString());
    return res.json();
  }, []);

  // GET /blog/posts/published/list
  const getPublished = useCallback(async (params?: Record<string, any>) => {
    const url = new URL(`${API_URL}/blog/posts/published/list`);
    if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, v));
    const res = await fetch(url.toString());
    return res.json();
  }, []);

  // GET /blog/posts/recent
  const getRecent = useCallback(async (lang?: string, limit?: number) => {
    const url = new URL(`${API_URL}/blog/posts/recent`);
    if (lang) url.searchParams.append('lang', lang);
    if (limit) url.searchParams.append('limit', String(limit));
    const res = await fetch(url.toString());
    return res.json();
  }, []);

  // GET /blog/posts/tag/:tagId/recent
  const getRecentByTag = useCallback(async (tagId: number, lang?: string, limit?: number) => {
    const url = new URL(`${API_URL}/blog/posts/tag/${tagId}/recent`);
    if (lang) url.searchParams.append('lang', lang);
    if (limit) url.searchParams.append('limit', String(limit));
    const res = await fetch(url.toString());
    return res.json();
  }, []);

  // GET /blog/posts/:id
  const getById = useCallback(async (id: number) => {
    const res = await fetch(`${API_URL}/blog/posts/${id}`);
    return res.json();
  }, []);

  // GET /blog/posts/:id/next
  const getNext = useCallback(async (id: number, lang?: string) => {
    const url = new URL(`${API_URL}/blog/posts/${id}/next`);
    if (lang) url.searchParams.append('lang', lang);
    const res = await fetch(url.toString());
    return res.json();
  }, []);

  // GET /blog/posts/:id/tags
  const getTags = useCallback(async (id: number) => {
    const res = await fetch(`${API_URL}/blog/posts/${id}/tags`);
    return res.json();
  }, []);

  return {
    getAll,
    getBySlug,
    getPublished,
    getRecent,
    getRecentByTag,
    getById,
    getNext,
    getTags,
  };
}
