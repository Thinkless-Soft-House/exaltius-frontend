// Hook para requisições GET de posts
import { useCallback } from "react";
import { Post as BackendPost } from "../interfaces/post.interface";
import { normalizeToBlogPost, BlogPost } from "@/lib/normalizePost";

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
    if (lang) url.searchParams.append("lang", lang);
    const res = await fetch(url.toString());
    const json = await res.json();

    // Normaliza a resposta para a forma esperada pela UI
    const raw = json?.data ?? json ?? null;
    const normalized = raw ? normalizeToBlogPost(raw) : null;

    if (normalized) {
      // Map to the Post shape expected by Post.tsx (postTags array)
      const postForUI = {
        id: normalized.id,
        title: normalized.title,
        content: normalized.content,
        category: normalized.category,
        slug: normalized.slug,
        postTags: normalized.tags
          ? normalized.tags.map((t, i) => ({ id: i, tagName: t }))
          : undefined,
      };
      return { data: postForUI };
    }

    // fallback: return original json to let caller handle it
    return json;
  }, []);

  // GET /blog/posts/published/list
  const getPublished = useCallback(
    async (params?: Record<string, string | number | boolean>) => {
      const url = new URL(`${API_URL}/blog/posts/published/list`);
      if (params)
        Object.entries(params).forEach(([k, v]) =>
          url.searchParams.append(k, String(v))
        );
      const res = await fetch(url.toString());
      return res.json();
    },
    []
  );

  // GET /blog/posts/recent
  // Normalization handled by src/lib/normalizePost

  const getRecent = useCallback(
    async (
      lang?: string,
      limit?: number
    ): Promise<{ data: { items: BlogPost[] } }> => {
      const url = new URL(`${API_URL}/blog/posts/recent`);
      if (lang) url.searchParams.append("lang", lang);
      if (limit) url.searchParams.append("limit", String(limit));
      const res = await fetch(url.toString());
      const json = await res.json();

      const rawItems = Array.isArray(json?.data?.items)
        ? json.data.items
        : Array.isArray(json)
        ? json
        : json?.items || [];
      const normalized = (Array.isArray(rawItems) ? rawItems : [])
        .map((r) => normalizeToBlogPost(r))
        .filter((p): p is BlogPost => p !== null);

      if (!normalized.length) {
        // no items from backend — return empty list (we rely on DB now)
        return { data: { items: [] as BlogPost[] } };
      }

      return { data: { items: normalized } };
    },
    []
  );

  // GET /blog/posts/tag/:tagId/recent
  const getRecentByTag = useCallback(
    async (tagId: number, lang?: string, limit?: number) => {
      const url = new URL(`${API_URL}/blog/posts/tag/${tagId}/recent`);
      if (lang) url.searchParams.append("lang", lang);
      if (limit) url.searchParams.append("limit", String(limit));
      const res = await fetch(url.toString());
      return res.json();
    },
    []
  );

  // GET /blog/posts/:id
  const getById = useCallback(async (id: number) => {
    const res = await fetch(`${API_URL}/blog/posts/${id}`);
    return res.json();
  }, []);

  // GET /blog/posts/:id/next
  const getNext = useCallback(async (id: number, lang?: string) => {
    const url = new URL(`${API_URL}/blog/posts/${id}/next`);
    if (lang) url.searchParams.append("lang", lang);
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
