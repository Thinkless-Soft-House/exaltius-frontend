// Hook para requisições GET de tags
import { useCallback } from 'react';
import { Tag } from '../interfaces/tag.interface';

const API_URL = import.meta.env.VITE_API_URL;

export function useGetTags() {
  // GET /blog/tags
  const getAll = useCallback(async (params?: Record<string, any>) => {
    const url = new URL(`${API_URL}/blog/tags`);
    if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, v));
    const res = await fetch(url.toString());
    return res.json();
  }, []);

  // GET /blog/tags/active
  const getActive = useCallback(async (params?: Record<string, any>) => {
    const url = new URL(`${API_URL}/blog/tags/active`);
    if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, v));
    const res = await fetch(url.toString());
    return res.json();
  }, []);

  // GET /blog/tags/slug/:slug
  const getBySlug = useCallback(async (slug: string, lang?: string) => {
    const url = new URL(`${API_URL}/blog/tags/slug/${slug}`);
    if (lang) url.searchParams.append('lang', lang);
    const res = await fetch(url.toString());
    return res.json();
  }, []);

  // GET /blog/tags/main/list
  const getMain = useCallback(async (lang?: string) => {
    const url = new URL(`${API_URL}/blog/tags/main/list`);
    if (lang) url.searchParams.append('lang', lang);
    const res = await fetch(url.toString());
    return res.json();
  }, []);

  // GET /blog/tags/popular/list
  const getPopular = useCallback(async (limit?: number, lang?: string) => {
    const url = new URL(`${API_URL}/blog/tags/popular/list`);
    if (limit) url.searchParams.append('limit', String(limit));
    if (lang) url.searchParams.append('lang', lang);
    const res = await fetch(url.toString());
    return res.json();
  }, []);

  // GET /blog/tags/search/query
  const search = useCallback(async (q: string, lang?: string) => {
    const url = new URL(`${API_URL}/blog/tags/search/query`);
    url.searchParams.append('q', q);
    if (lang) url.searchParams.append('lang', lang);
    const res = await fetch(url.toString());
    return res.json();
  }, []);

  // GET /blog/tags/:id
  const getById = useCallback(async (id: number, lang?: string) => {
    const url = new URL(`${API_URL}/blog/tags/${id}`);
    if (lang) url.searchParams.append('lang', lang);
    const res = await fetch(url.toString());
    return res.json();
  }, []);

  // GET /blog/tags/:id/posts
  const getTagPosts = useCallback(async (id: number, params?: Record<string, any>) => {
    const url = new URL(`${API_URL}/blog/tags/${id}/posts`);
    if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, v));
    const res = await fetch(url.toString());
    return res.json();
  }, []);

  return {
    getAll,
    getActive,
    getBySlug,
    getMain,
    getPopular,
    search,
    getById,
    getTagPosts,
  };
}
