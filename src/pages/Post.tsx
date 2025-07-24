import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Sidebar from "@/components/layout/Sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Eye, User, Share2, Facebook, Twitter, Linkedin, Link2, Send, Copy, X, MessageCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import React, { useRef } from "react";
import { blogPosts } from "@/data/blogPosts";

type Post = typeof blogPosts[number];

const Post = () => {
  const { slug } = useParams<{ slug: string }>();
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [nextPosts, setNextPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingNext, setLoadingNext] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Usar blogPosts.ts como fonte de dados

  const findPostBySlug = (targetSlug: string): Post | undefined => {
    return blogPosts.find(post => post.slug === targetSlug);
  };

  const getNextPosts = useCallback((currentPostDate: string, page: number, limit: number = 1): Post[] => {
    const currentDate = new Date(currentPostDate);
    const olderPosts = blogPosts
      .filter(post => new Date(post.publishedAt) < currentDate)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    const startIndex = (page - 1) * limit;
    return olderPosts.slice(startIndex, startIndex + limit);
  }, []);

  useEffect(() => {
    if (slug) {
      setLoading(true);
      const post = findPostBySlug(slug);
      if (post) {
        setCurrentPost(post);
        setNextPosts([]);
        setCurrentPage(1);
      }
      setLoading(false);
    }
  }, [slug, getNextPosts]);


  // Infinite scroll removido

  // Infinite scroll removido

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const sharePost = (platform: string) => {
    const url = window.location.href;
    const title = currentPost?.title || '';

    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        toast({
          title: "Link copiado!",
          description: "O link do artigo foi copiado para a área de transferência.",
        });
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  // Hooks para o botão de compartilhar estilo G1
  const [shareOpen, setShareOpen] = useState(false);
  const shareRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  // Fecha popover ao clicar fora
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (shareRef.current && !shareRef.current.contains(e.target as Node)) {
        setShareOpen(false);
      }
    }
    if (shareOpen) {
      document.addEventListener('mousedown', handleClick);
    } else {
      document.removeEventListener('mousedown', handleClick);
    }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [shareOpen]);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast({ title: "Link copiado!", description: "O link do artigo foi copiado para a área de transferência." });
    setTimeout(() => setCopied(false), 1500);
    setShareOpen(false);
  };

  const shareOptions = [
    {
      label: 'Facebook',
      icon: <Facebook className="w-5 h-5 text-blue-600" />, onClick: () => {
        const url = window.location.href;
        const title = currentPost?.title || '';
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`;
        window.open(shareUrl, '_blank', 'width=600,height=400');
        setShareOpen(false);
      }
    },
    {
      label: 'Twitter',
      icon: <Twitter className="w-5 h-5 text-sky-500" />, onClick: () => {
        const url = window.location.href;
        const title = currentPost?.title || '';
        const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        window.open(shareUrl, '_blank', 'width=600,height=400');
        setShareOpen(false);
      }
    },
    {
      label: 'WhatsApp',
      icon: <MessageCircle className="w-5 h-5 text-green-500" />, onClick: () => {
        const url = window.location.href;
        const title = currentPost?.title || '';
        const shareUrl = `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`;
        window.open(shareUrl, '_blank', 'width=600,height=400');
        setShareOpen(false);
      }
    },
    {
      label: copied ? 'Copiado!' : 'Copiar link',
      icon: copied ? <Copy className="w-5 h-5 text-emerald-600" /> : <Link2 className="w-5 h-5 text-slate-600" />, onClick: handleCopy
    },
  ];

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 lg:px-8 py-16 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-200 rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!currentPost) {
    return (
      <Layout>
        <div className="container mx-auto px-4 lg:px-8 py-16 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Artigo não encontrado</h1>
          <p className="text-slate-600">O artigo que você está procurando não existe.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Current Post */}
            <article className="mb-16">
              {/* Featured Image */}
              <div className="relative mb-8 rounded-lg overflow-hidden">
                <img
                  src={currentPost.imageUrl || currentPost.featuredImage || '/placeholder.svg'}
                  alt={currentPost.title}
                  className="w-full h-64 md:h-96 object-cover"
                />
                <div className="absolute top-6 left-6">
                  <Badge className="bg-exaltius-blue text-white text-sm px-3 py-1">
                    {currentPost.category}
                  </Badge>
                </div>
              </div>

              {/* Post Header */}
              <header className="mb-8">
                <h1 className="text-3xl lg:text-5xl font-bold text-exaltius-blue mb-6 leading-tight">
                  {currentPost.title}
                </h1>

                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200">
                  <div className="flex items-center space-x-6 text-sm text-slate-600">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span className="font-medium">{currentPost.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(currentPost.publishedAt)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>{typeof currentPost.readTime === 'number' ? `${currentPost.readTime} min de leitura` : ''}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Eye className="h-4 w-4" />
                      <span>{typeof currentPost.views === 'number' ? `${currentPost.views.toLocaleString()} visualizações` : ''}</span>
                    </div>
                  </div>
                  {/* Botão de compartilhar estilo G1 */}
                  <div className="relative" ref={shareRef}>
                    <button
                      aria-label="Compartilhar"
                      className="rounded-full bg-white border border-slate-200 shadow hover:bg-slate-100 p-3 transition-colors focus:outline-none focus:ring-2 focus:ring-exaltius-gold"
                      onClick={() => setShareOpen((v) => !v)}
                      title="Compartilhar"
                    >
                      <Share2 className="w-5 h-5 text-exaltius-blue" />
                    </button>
                    {shareOpen && (
                      <div className="absolute right-0 mt-2 z-20 w-48 bg-white border border-slate-200 rounded-lg shadow-lg animate-fade-in">
                        <button
                          className="absolute top-2 right-2 p-1 rounded hover:bg-slate-100"
                          onClick={() => setShareOpen(false)}
                          aria-label="Fechar"
                        >
                          <X className="w-4 h-4 text-slate-400" />
                        </button>
                        <div className="flex flex-col gap-2 p-4">
                          {shareOptions.map(opt => (
                            <button
                              key={opt.label}
                              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-slate-100 text-left text-sm font-medium transition-colors"
                              onClick={opt.onClick}
                              tabIndex={0}
                            >
                              {opt.icon}
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </header>

              {/* Post Content */}
              <div
                className="post-content prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: currentPost.content }}
              />

              {/* Ad Space After Content */}
              <div className="bg-gradient-to-r from-slate-100 to-slate-50 border-dashed border-2 border-slate-300 rounded-lg p-8 text-center my-12">
                <div className="text-sm text-slate-500 mb-2">Espaço Publicitário</div>
                <div className="text-xs text-slate-400">728x90 - Leaderboard</div>
                <div className="mt-4 p-4 bg-white/50 rounded border border-slate-200">
                  <div className="text-xs text-slate-600">Anúncio AdSense</div>
                </div>
              </div>
            </article>

            {/* Infinite scroll removido: só exibe o post atual */}
          </div>

          {/* Sidebar */}
          <Sidebar currentPostId={currentPost.id} category={currentPost.category} />
        </div>
      </div>
    </Layout>
  );
};

export default Post;
