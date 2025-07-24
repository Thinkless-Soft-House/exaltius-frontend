import { useState, useEffect, useRef, useMemo } from "react";
import { blogPosts } from "@/data/blogPosts";
import Layout from "@/components/layout/Layout";
import Sidebar from "@/components/layout/Sidebar";
import PostCard from "@/components/blog/PostCard";
import { Button } from "@/components/ui/button";
import { TrendingUp, DollarSign, PiggyBank, GraduationCap, ChevronRight } from "lucide-react";
import { set } from "date-fns";
import { useI18n } from "@/i18n/useI18n";
import { useIsMobile } from "@/hooks/use-mobile";

type Post = typeof blogPosts[number];

// 1. Definir as tags (pseudocategorias Netflix)
const TAGS = [
  "Para ler tomando um café",
  "Leia com um sorriso no rosto",
  "Pessoas boas fazendo o bem",
  "Inspire-se hoje",
  "Dicas rápidas",
  "Histórias de sucesso",
  "Curiosidades financeiras",
  "Motivação diária",
  "Aprenda brincando",
  "Reflexão do dia",
];

// Usar blogPosts do mock real como fonte de dados
const ALL_POSTS = blogPosts;

const PAGE_SIZE = 6; // Múltiplo de 3 para garantir linhas completas
const TAGS_PER_PAGE = 3; // Quantas tags/seções mostrar por vez

const Index = () => {
  const { t } = useI18n();
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
  const [categoryPosts, setCategoryPosts] = useState<{ [key: string]: Post[] }>({});
  // postGroups: [{ category, posts: Post[] }]
  const [postGroups, setPostGroups] = useState<{ category: string, posts: Post[] }[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [tagPage, setTagPage] = useState(2); // Quantidade de sidebars
  const [visibleTags, setVisibleTags] = useState(TAGS.slice(0, TAGS_PER_PAGE * 2));
  const loader = useRef<HTMLDivElement | null>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const sidebars = Array.from({ length: tagPage }, (_, i) => i);
  const isMobile = useIsMobile();

  // Mock data - In a real app, this would come from an API
  useEffect(() => {
    // Set featured posts (latest 3)
    setFeaturedPosts(ALL_POSTS.slice(0, 3));

    // Group posts by category
    const grouped = ALL_POSTS.reduce((acc, post) => {
      if (!acc[post.category]) {
        acc[post.category] = [];
      }
      acc[post.category].push(post);
      return acc;
    }, {} as { [key: string]: Post[] });

    setCategoryPosts(grouped);
  }, []);

  const categories = useMemo(() => [
    {
      name: "Investimentos",
      icon: TrendingUp,
      description: "Estratégias e dicas para fazer seu dinheiro render",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      name: "Renda Extra",
      icon: DollarSign,
      description: "Formas de aumentar sua renda mensal",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      name: "Finanças Pessoais",
      icon: PiggyBank,
      description: "Organize suas finanças e alcance seus objetivos",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      name: "Educação Financeira",
      icon: GraduationCap,
      description: "Conhecimento fundamental sobre dinheiro",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
  ], []);

  // Remove o scroll para o hero-section
  // Garante que ao montar a página (ou atualizar), a rolagem sempre volte para o topo absoluto
  useEffect(() => {
    window.scrollTo(0, 0);
    setHasMounted(true);
    setTagPage(2);
    setVisibleTags(TAGS.slice(0, TAGS_PER_PAGE * 2));
    setPage(1);
    // Primeira página: pega PAGE_SIZE posts e agrupa
    const first = ALL_POSTS.slice(0, PAGE_SIZE);
    const grouped: { [key: string]: Post[] } = {};
    for (const post of first) {
      if (!grouped[post.category]) grouped[post.category] = [];
      grouped[post.category].push(post);
    }
    setPostGroups(Object.entries(grouped).map(([category, posts]) => ({ category, posts })));
    setLoading(false);
    console.log('[HOME: MONTANDO PÁGINA - RESETANDO ESTADO]');
  }, []);



  // Embaralha e agrupa por categoria
  function shuffleAndGroupByCategory(posts: Post[]): { category: string, posts: Post[] }[] {
    const shuffled = [...posts].sort(() => Math.random() - 0.5);
    const grouped: { [key: string]: Post[] } = {};
    for (const post of shuffled) {
      if (!grouped[post.category]) grouped[post.category] = [];
      grouped[post.category].push(post);
    }
    return Object.entries(grouped).map(([category, posts]) => ({ category, posts }));
  }

  // Função para simular busca paginada (mock)
  const fetchPosts = async (pageNum: number) => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 100));
    const start = (pageNum - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    let data: Post[] = [];
    let isLoop = false;
    if (start >= ALL_POSTS.length) {
      // Loop: embaralha e agrupa
      data = [...ALL_POSTS].sort(() => Math.random() - 0.5).slice(0, PAGE_SIZE);
      isLoop = true;
    } else if (end > ALL_POSTS.length) {
      // Pega o resto e completa do início embaralhado
      const rest = ALL_POSTS.slice(start);
      const fill = [...ALL_POSTS].sort(() => Math.random() - 0.5).slice(0, end - ALL_POSTS.length);
      data = [...rest, ...fill];
      isLoop = true;
    } else {
      data = ALL_POSTS.slice(start, end);
    }
    let newGroups: { category: string, posts: Post[] }[] = [];
    if (isLoop) {
      newGroups = shuffleAndGroupByCategory(data);
    } else {
      // Agrupa normalmente
      const grouped: { [key: string]: Post[] } = {};
      for (const post of data) {
        if (!grouped[post.category]) grouped[post.category] = [];
        grouped[post.category].push(post);
      }
      newGroups = Object.entries(grouped).map(([category, posts]) => ({ category, posts }));
    }
    setPostGroups((prev) => [...prev, ...newGroups]);
    setLoading(false);
  };

  // Chama fetchPosts ao mudar a página (exceto na primeira)
  useEffect(() => {
    if (page === 1) return;
    fetchPosts(page);
    setTagPage((prev) => prev + 1); // Aumenta sidebars junto com o scroll infinito
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // Infinite scroll com IntersectionObserver (preemptivo)
  useEffect(() => {
    if (loading) return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { root: null, rootMargin: '800px', threshold: 0 }
    );
    const currentLoader = loader.current;
    if (currentLoader) observer.observe(currentLoader);
    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
      observer.disconnect();
    };
  }, [loading]);

  // Não precisa mais atualizar tags visíveis

  // Atualiza posts exibidos a cada página, adicionando mais ao final (loop infinito)
  // Não precisa mais atualizar posts manualmente, pois fetchPosts faz isso

  // Não agrupa mais por tag, feed linear

  // Classe utilitária neutra para seções (sem animação)
  const fadeInClass = "";

  // AdSense handler para anúncios entre tags
  useEffect(() => {
    const ads = document.querySelectorAll('.adsbygoogle');
    if (window.adsbygoogle && ads.length) {
      ads.forEach(() => {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) { /* empty */ }
      });
    }
  }, [visibleTags]);

  // Mapeamento visual para nomes e cores de categoria
  const categoryMap: Record<string, { label: string; color: string; bgColor: string; icon: JSX.Element }> = {
    "investimentos": {
      label: "Investimentos",
      color: "text-green-600",
      bgColor: "bg-green-50",
      icon: <TrendingUp className="inline-block w-5 h-5 mr-2" />,
    },
    "renda-extra": {
      label: "Renda Extra",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      icon: <DollarSign className="inline-block w-5 h-5 mr-2" />,
    },
    "financas-pessoais": {
      label: "Finanças Pessoais",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      icon: <PiggyBank className="inline-block w-5 h-5 mr-2" />,
    },
    "educacao-financeira": {
      label: "Educação Financeira",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      icon: <GraduationCap className="inline-block w-5 h-5 mr-2" />,
    },
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Hero Section */}
        <section id="hero-section" className="text-center py-12 mb-12">
          <h1 className="text-4xl lg:text-6xl font-bold text-exaltius-blue mb-6 animate-fade-in">
            {t.transform_your || "Transforme Suas"}
            <span className="block text-exaltius-gold">{t.finances || "Finanças"}</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8 leading-relaxed animate-slide-up">
            {t.hero_subtitle || "Descubra estratégias comprovadas para investir, economizar e construir riqueza de forma inteligente. Sua jornada rumo à independência financeira começa aqui."}
          </p>
        </section>

        {/* Main Content Grid */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 space-y-12">
            {/* Feed linear estilo Facebook, 2-3 cards por linha */}
            {/* Renderização agrupada por categoria */}
            {postGroups.map((group, groupIdx) => {
              const cat = categoryMap[group.category] || {
                label: group.category.charAt(0).toUpperCase() + group.category.slice(1).replace(/-/g, ' '),
                color: "text-slate-700",
                bgColor: "bg-slate-100",
                icon: <TrendingUp className="inline-block w-5 h-5 mr-2" />,
              };
              return (
                <section key={groupIdx + '-' + group.category} className="mb-8">
                  <h2 className={`text-xl font-bold my-6 flex items-center gap-2 ${cat.color}`}>
                    <span className={`rounded px-2 py-1 ${cat.bgColor}`}>{cat.icon}{cat.label}</span>
                  </h2>
                  <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                    style={{ overflow: 'visible', minWidth: 0 }}
                  >
                    {group.posts.map((post) => (
                      <div key={post.id} className="transition-opacity duration-500 opacity-100">
                        <PostCard {...post} size="medium" />
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
            {/* Loader invisível apenas para trigger do observer */}
            <div ref={loader} style={{ minHeight: 1 }} />
          </div>
          {/* Sidebar duplicada a cada scroll (mantém igual) */}
          {!isMobile && (
            <div className="flex flex-col gap-8 min-w-[320px]">
              {sidebars.map((i) => (
                <div key={i}>
                  <Sidebar index={i} blockPages={sidebars.length} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
