import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Sidebar from "@/components/layout/Sidebar";
import { useGetPosts } from "@/hooks/useGetPosts";
import { BlogPost } from "@/lib/normalizePost";

// Tipos mínimos locais para evitar 'any' e satisfazer o linter.
type Tag = { id: number | string; name?: string };
type PostTag = { id: number | string; tag?: Tag; tagName?: string };
type Post = { id: number | string; title: string; content: string; category?: string; postTags?: PostTag[]; slug?: string };

const PostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getBySlug, getRecent } = useGetPosts();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  // posts carregados na página (post principal + posts adicionais carregados pelo scroll)
  const [loadedPosts, setLoadedPosts] = useState<Post[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const res = await getBySlug(slug, "pt");
        const data = res?.data ?? null;
        if (mounted && data) {
          setPost(data);
          // inicializa lista de posts carregados com o post principal
          setLoadedPosts([data]);
        }
      } catch (e) {
        // on error, leave post as null
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [slug, getBySlug]);
  // Busca mais posts quando o sentinel entra em view (infinite scroll)
  const fetchMorePosts = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    try {
      // Busca candidatos recentes (lista maior para dar margem)
      const res = await getRecent("pt", 20);
      const items = res?.data?.items ?? [];
      // filtra os que já foram carregados
      const known = new Set(loadedPosts.map((p) => String(p.slug)));
      const candidates = items.filter((i: BlogPost) => !known.has(i.slug));
      if (!candidates || candidates.length === 0) {
        setHasMore(false);
        return;
      }
      const BATCH = 2; // quantos carregar por gatilho
      const pick = candidates.slice(0, BATCH);
      const fulls: Post[] = [];
      for (const c of pick) {
        try {
          const r = await getBySlug(c.slug, "pt");
          const d = r?.data;
          if (d) fulls.push(d);
        } catch (e) {
          // se falhar um, continua com o próximo
        }
      }
      if (fulls.length === 0) {
        setHasMore(false);
        return;
      }
      setLoadedPosts((prev) => [...prev, ...fulls]);
    } finally {
      setLoadingMore(false);
    }
  }, [getRecent, getBySlug, loadedPosts, loadingMore, hasMore]);

  // IntersectionObserver para acionar carregamento quando o sentinel aparecer
  useEffect(() => {
    if (!sentinelRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchMorePosts();
        }
      },
      { rootMargin: "600px" }
    );
    obs.observe(sentinelRef.current);
    return () => obs.disconnect();
  }, [fetchMorePosts]);

  if (loading)
    return (
      <Layout>
        <div className="container mx-auto px-4 lg:px-8 py-16 text-center">Carregando...</div>
      </Layout>
    );

  if (!post)
    return (
      <Layout>
        <div className="container mx-auto px-4 lg:px-8 py-16 text-center">Artigo não encontrado</div>
      </Layout>
    );
  // Defensive content handling: guarantee string before injecting HTML
  const safeContent = typeof post.content === 'string' ? post.content : String(post.content ?? '');
  if (typeof post.content !== 'string') {
    // Ajuda a detectar respostas do backend com formato inesperado
    console.warn('[PostPage] post.content is not a string, using fallback safeContent', { content: post.content });
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <article className="mb-16">
              <h1 className="text-3xl lg:text-5xl font-bold text-exaltius-blue mb-6 leading-tight">{post.title}</h1>
              <div className="post-content prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: safeContent }} />

              {/* Renderiza posts adicionais carregados pelo infinite scroll */}
              {loadedPosts.length > 1 && (
                <section className="mt-12">
                  {loadedPosts.slice(1).map((lp) => {
                    const lpContent = typeof lp.content === 'string' ? lp.content : String(lp.content ?? '');

                    // Extrai metadados de forma defensiva (nomes de campos podem variar)
                    const lpSafe = lp as unknown as Record<string, unknown>;
                    const category = (lpSafe['category'] as string) || (lpSafe['categoryName'] as string) || (lp.postTags && lp.postTags[0]?.tag?.name) || null;
                    const rawDate = (lpSafe['created_at'] as string) || (lpSafe['createdAt'] as string) || (lpSafe['published_at'] as string) || (lpSafe['publishedAt'] as string) || null;
                    const authorName = ((lpSafe['author'] as Record<string, unknown>)?.['name'] as string) || (lpSafe['authorName'] as string) || (lpSafe['author_name'] as string) || (lpSafe['author'] as string) || null;
                    const formattedDate = rawDate ? new Date(rawDate).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }) : null;

                    return (
                      <article key={lp.slug ?? lp.id} className="mt-12">
                        {/* Divisor com badge centralizado indicando novo artigo */}
                        <div className="relative my-8">
                          <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-sm font-semibold border rounded-md">Próximo artigo</div>
                          <div className="border-t" />
                        </div>

                        {/* Bloco de artigo: sem fundo branco/modal, apenas espaçamento e contorno leve */}
                        <div className="mt-6 p-6 rounded-lg">
                          {/* Metadados em chips: categoria, data, autor */}
                          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600 mb-4">
                            {category && <span className="px-2 py-1 bg-slate-100 rounded text-xs font-medium">{category}</span>}
                            {formattedDate && (
                              <span className="text-xs text-slate-500">{formattedDate}</span>
                            )}
                            {authorName && <span className="text-xs text-slate-500">• {authorName}</span>}
                          </div>

                          <h2 className="text-2xl font-semibold mb-4">{lp.title}</h2>
                          <div className="post-content prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: lpContent }} />
                          {lp.postTags && lp.postTags.length > 0 && (
                            <div className="mt-6">
                              <h4 className="text-sm font-semibold mb-2">Tags</h4>
                              <div className="flex flex-wrap gap-2">
                                {lp.postTags.map((pt: PostTag) => (
                                  <span key={pt.id} className="text-xs px-2 py-1 bg-slate-100 rounded">{pt.tag?.name ?? pt.tagName ?? 'tag'}</span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </article>
                    );
                  })}
                </section>
              )}

              {/* sentinel para observar quando carregar mais posts */}
              <div ref={sentinelRef} className="h-2" />
              {loadingMore && (
                <div className="mt-6 text-center text-sm text-slate-600">Carregando mais artigos...</div>
              )}

              {post.postTags && post.postTags.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-semibold mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {post.postTags.map((pt: PostTag) => (
                      <span key={pt.id} className="text-xs px-2 py-1 bg-slate-100 rounded">{pt.tag?.name ?? pt.tagName ?? "tag"}</span>
                    ))}
                  </div>
                </div>
              )}
            </article>
          </div>
          <Sidebar currentPostId={String(post.id)} category={post.category} />
        </div>
      </div>
    </Layout>
  );
};

export default PostPage;
