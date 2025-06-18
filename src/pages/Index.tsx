import { useState, useEffect, useRef, useCallback } from "react";
import Layout from "@/components/layout/Layout";
import Sidebar from "@/components/layout/Sidebar";
import PostCard from "@/components/blog/PostCard";
import { Button } from "@/components/ui/button";
import { TrendingUp, DollarSign, PiggyBank, GraduationCap, ChevronRight } from "lucide-react";
import { set } from "date-fns";
import { useI18n } from "@/i18n/I18nProvider";
import { useIsMobile } from "@/hooks/use-mobile";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: number;
  views: number;
  featuredImage: string;
}

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

// 2. Mockar posts com múltiplas tags
const ALL_POSTS = [
  {
    id: "1",
    title: "Como Investir em Ações para Iniciantes: Guia Completo 2024",
    slug: "como-investir-acoes-iniciantes-guia-completo-2024",
    excerpt: "Descubra tudo que você precisa saber para começar a investir em ações de forma segura e inteligente. Um guia completo com estratégias práticas para iniciantes.",
    category: "Investimentos",
    author: "Carlos Silva",
    publishedAt: "2024-01-15",
    readTime: 12,
    views: 2500,
    featuredImage: "/lovable-uploads/11faacf3-bc6a-47fc-93c6-a3e671f7756d.png",
    tags: [TAGS[0], TAGS[2], TAGS[6]],
  },
  {
    id: "2",
    title: "10 Formas Comprovadas de Gerar Renda Extra Online",
    slug: "como-investir-acoes-iniciantes-guia-completo-2024",
    excerpt: "Explore métodos testados e aprovados para aumentar sua renda trabalhando pela internet. Descubra oportunidades que podem transformar suas finanças.",
    category: "Renda Extra",
    author: "Ana Santos",
    publishedAt: "2024-01-12",
    readTime: 8,
    views: 1890,
    featuredImage: "/lovable-uploads/8caf0661-0400-4ba1-a372-1a874f658a62.png",
    tags: [TAGS[1], TAGS[3], TAGS[4]],
  },
  {
    id: "3",
    title: "Planejamento Financeiro Pessoal: Método dos 50/30/20",
    slug: "como-investir-acoes-iniciantes-guia-completo-2024",
    excerpt: "Aprenda a organizar suas finanças usando o método mais eficaz do mundo. Uma estratégia simples que funciona para qualquer nível de renda.",
    category: "Finanças Pessoais",
    author: "Roberto Lima",
    publishedAt: "2024-01-10",
    readTime: 6,
    views: 3200,
    featuredImage: "/lovable-uploads/2dd426b2-9eb4-4d68-a013-6cbcd6b717db.png",
    tags: [TAGS[2], TAGS[5], TAGS[7]],
  },
  {
    id: "4",
    title: "Tesouro Direto vs CDB: Qual Escolher em 2024?",
    slug: "como-investir-acoes-iniciantes-guia-completo-2024",
    excerpt: "Comparação detalhada entre duas das principais opções de investimento conservador no Brasil. Saiba qual é a melhor para o seu perfil.",
    category: "Investimentos",
    author: "Marina Costa",
    publishedAt: "2024-01-08",
    readTime: 10,
    views: 1650,
    featuredImage: "/lovable-uploads/e012c59b-1219-40aa-b338-5af9798b801c.png",
    tags: [TAGS[0], TAGS[8]],
  },
  {
    id: "5",
    title: "Como Criar um Fundo de Emergência em 12 Meses",
    slug: "como-investir-acoes-iniciantes-guia-completo-2024",
    excerpt: "Estratégia passo a passo para construir sua reserva de emergência de forma gradual e sustentável, sem comprometer seu orçamento atual.",
    category: "Finanças Pessoais",
    author: "João Oliveira",
    publishedAt: "2024-01-05",
    readTime: 7,
    views: 2100,
    featuredImage: "/lovable-uploads/fb1b246e-8168-4536-b263-19909198f51a.png",
    tags: [TAGS[6], TAGS[9]],
  },
  // Adicione mais posts mockados para simular várias páginas
  {
    id: "6",
    title: "Como economizar no supermercado sem abrir mão da qualidade",
    slug: "como-investir-acoes-iniciantes-guia-completo-2024",
    excerpt: "Dicas práticas para economizar nas compras do mês e ainda manter uma alimentação saudável.",
    category: "Finanças Pessoais",
    author: "Maria Souza",
    publishedAt: "2024-01-03",
    readTime: 5,
    views: 1100,
    featuredImage: "/lovable-uploads/0ef498cc-30ac-42a5-bb0d-f62f8d06612b.png",
    tags: [TAGS[4], TAGS[7]],
  },
  {
    id: "7",
    title: "O poder dos juros compostos: entenda de uma vez por todas",
    slug: "como-investir-acoes-iniciantes-guia-completo-2024",
    excerpt: "Descubra como os juros compostos podem transformar seus investimentos ao longo do tempo.",
    category: "Investimentos",
    author: "Lucas Pereira",
    publishedAt: "2024-01-02",
    readTime: 9,
    views: 900,
    featuredImage: "/lovable-uploads/11faacf3-bc6a-47fc-93c6-a3e671f7756d.png",
    tags: [TAGS[3], TAGS[6]],
  },
  {
    id: "8",
    title: "Como negociar dívidas e limpar seu nome",
    slug: "como-investir-acoes-iniciantes-guia-completo-2024",
    excerpt: "Passo a passo para sair do vermelho e recuperar sua saúde financeira.",
    category: "Finanças Pessoais",
    author: "Fernanda Dias",
    publishedAt: "2023-12-30",
    readTime: 7,
    views: 800,
    featuredImage: "/lovable-uploads/2dd426b2-9eb4-4d68-a013-6cbcd6b717db.png",
    tags: [TAGS[2], TAGS[5]],
  },
  {
    id: "9",
    title: "5 hábitos de pessoas que enriquecem com pouco dinheiro",
    slug: "como-investir-acoes-iniciantes-guia-completo-2024",
    excerpt: "Conheça atitudes simples que podem mudar sua vida financeira.",
    category: "Finanças Pessoais",
    author: "Paulo Mendes",
    publishedAt: "2023-12-28",
    readTime: 6,
    views: 950,
    featuredImage: "/lovable-uploads/e012c59b-1219-40aa-b338-5af9798b801c.png",
    tags: [TAGS[1], TAGS[7], TAGS[9]],
  },
  {
    id: "10",
    title: "Como a educação financeira pode mudar sua vida",
    slug: "como-investir-acoes-iniciantes-guia-completo-2024",
    excerpt: "Entenda a importância de aprender sobre dinheiro desde cedo.",
    category: "Educação Financeira",
    author: "Juliana Ramos",
    publishedAt: "2023-12-25",
    readTime: 8,
    views: 1200,
    featuredImage: "/lovable-uploads/8caf0661-0400-4ba1-a372-1a874f658a62.png",
    tags: [TAGS[3], TAGS[8]],
  },
  // ...adicione mais se quiser simular mais páginas
];

const PAGE_SIZE = 5;
const TAGS_PER_PAGE = 3; // Quantas tags/seções mostrar por vez

const Index = () => {
  const { t } = useI18n();
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
  const [categoryPosts, setCategoryPosts] = useState<{[key: string]: Post[]}>({});
  const [page, setPage] = useState(1);
  const [displayedPosts, setDisplayedPosts] = useState(ALL_POSTS.slice(0, PAGE_SIZE));
  const [tagPage, setTagPage] = useState(1); // Página de tags
  const [visibleTags, setVisibleTags] = useState(TAGS.slice(0, TAGS_PER_PAGE));
  const loader = useRef(null);
  const [hasMounted, setHasMounted] = useState(false);
  const [infiniteScrollEnabled, setInfiniteScrollEnabled] = useState(false);
  const sidebars = Array.from({ length: tagPage }, (_, i) => i);
  const isMobile = useIsMobile();

  // Mock data - In a real app, this would come from an API
  useEffect(() => {
    const mockPosts: Post[] = [
      {
        id: "1",
        title: "Como Investir em Ações para Iniciantes: Guia Completo 2024",
        slug: "como-investir-acoes-iniciantes-guia-completo-2024",
        excerpt: "Descubra tudo que você precisa saber para começar a investir em ações de forma segura e inteligente. Um guia completo com estratégias práticas para iniciantes.",
        category: "Investimentos",
        author: "Carlos Silva",
        publishedAt: "2024-01-15",
        readTime: 12,
        views: 2500,
        featuredImage: "/lovable-uploads/11faacf3-bc6a-47fc-93c6-a3e671f7756d.png"
      },
      {
        id: "2",
        title: "10 Formas Comprovadas de Gerar Renda Extra Online",
        slug: "como-investir-acoes-iniciantes-guia-completo-2024",
        excerpt: "Explore métodos testados e aprovados para aumentar sua renda trabalhando pela internet. Descubra oportunidades que podem transformar suas finanças.",
        category: "Renda Extra",
        author: "Ana Santos",
        publishedAt: "2024-01-12",
        readTime: 8,
        views: 1890,
        featuredImage: "/lovable-uploads/8caf0661-0400-4ba1-a372-1a874f658a62.png"
      },
      {
        id: "3",
        title: "Planejamento Financeiro Pessoal: Método dos 50/30/20",
        slug: "como-investir-acoes-iniciantes-guia-completo-2024",
        excerpt: "Aprenda a organizar suas finanças usando o método mais eficaz do mundo. Uma estratégia simples que funciona para qualquer nível de renda.",
        category: "Finanças Pessoais",
        author: "Roberto Lima",
        publishedAt: "2024-01-10",
        readTime: 6,
        views: 3200,
        featuredImage: "/lovable-uploads/2dd426b2-9eb4-4d68-a013-6cbcd6b717db.png"
      },
      {
        id: "4",
        title: "Tesouro Direto vs CDB: Qual Escolher em 2024?",
        slug: "como-investir-acoes-iniciantes-guia-completo-2024",
        excerpt: "Comparação detalhada entre duas das principais opções de investimento conservador no Brasil. Saiba qual é a melhor para o seu perfil.",
        category: "Investimentos",
        author: "Marina Costa",
        publishedAt: "2024-01-08",
        readTime: 10,
        views: 1650,
        featuredImage: "/lovable-uploads/e012c59b-1219-40aa-b338-5af9798b801c.png"
      },
      {
        id: "5",
        title: "Como Criar um Fundo de Emergência em 12 Meses",
        slug: "como-investir-acoes-iniciantes-guia-completo-2024",
        excerpt: "Estratégia passo a passo para construir sua reserva de emergência de forma gradual e sustentável, sem comprometer seu orçamento atual.",
        category: "Finanças Pessoais",
        author: "João Oliveira",
        publishedAt: "2024-01-05",
        readTime: 7,
        views: 2100,
        featuredImage: "/lovable-uploads/fb1b246e-8168-4536-b263-19909198f51a.png"
      }
    ];

    // Set featured posts (latest 3)
    setFeaturedPosts(mockPosts.slice(0, 3));

    // Group posts by category
    const grouped = mockPosts.reduce((acc, post) => {
      if (!acc[post.category]) {
        acc[post.category] = [];
      }
      acc[post.category].push(post);
      return acc;
    }, {} as {[key: string]: Post[]});

    setCategoryPosts(grouped);
  }, []);

  const categories = [
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
  ];

  // Remove o scroll para o hero-section
  // Garante que ao montar a página (ou atualizar), a rolagem sempre volte para o topo absoluto
  useEffect(() => {
    window.scrollTo(0, 0);
    setHasMounted(true);
    setInfiniteScrollEnabled(false);
    setTagPage(1);
    setVisibleTags(TAGS.slice(0, TAGS_PER_PAGE));
    setPage(1);
    setDisplayedPosts(ALL_POSTS.slice(0, PAGE_SIZE));
    console.log('[HOME: MONTANDO PÁGINA - RESETANDO ESTADO]');
  }, []);

  // Ativa o infinite scroll só após o primeiro scroll manual
  useEffect(() => {
    const onScroll = () => {
      setInfiniteScrollEnabled(true);
      window.removeEventListener('scroll', onScroll);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Infinite scroll handler
  const handleObserver = useCallback((entries: any) => {
      console.log('[DEBUG] infiniteScrollEnabled:', infiniteScrollEnabled, 'hasMounted:', hasMounted);
    if (!hasMounted || !infiniteScrollEnabled) return;
    const target = entries[0];
    console.log('[HOME: INFINITE SCROLL]', target);
    if (target.isIntersecting) {
      console.log('[HOME: CARREGANDO MAIS POSTS INFINITAMENTE]');
      setTagPage((prev) => prev + 1);
      setPage((prev) => prev + 1); // Adiciona esta linha para carregar mais sidebars
    }
  }, [hasMounted, infiniteScrollEnabled]);

  useEffect(() => {
    if (!infiniteScrollEnabled) return;
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };
    const observer = new window.IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
    return () => observer.disconnect();
  }, [handleObserver, infiniteScrollEnabled]);

  useEffect(() => {
    setVisibleTags(TAGS.slice(0, tagPage * TAGS_PER_PAGE));
  }, [tagPage]);

  // Atualiza posts exibidos a cada página
  useEffect(() => {
    setDisplayedPosts(ALL_POSTS.slice(0, page * PAGE_SIZE));
  }, [page]);

  // Agrupa posts por tag
  const postsByTag: { [tag: string]: typeof ALL_POSTS } = {};
  displayedPosts.forEach((post) => {
    post.tags.forEach((tag: string) => {
      if (!postsByTag[tag]) postsByTag[tag] = [];
      postsByTag[tag].push(post);
    });
  });

  // Adiciona classe utilitária para fade-in
  const fadeInClass = "transition-opacity duration-500 ease-in opacity-0 animate-fade-in";

  // AdSense handler para anúncios entre tags
  useEffect(() => {
    const ads = document.querySelectorAll('.adsbygoogle');
    if (window.adsbygoogle && ads.length) {
      ads.forEach(() => {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {}
      });
    }
  }, [visibleTags]);

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
          {/* <Button 
            size="lg" 
            className="bg-exaltius-gold text-exaltius-blue hover:bg-exaltius-gold-light font-semibold px-8 py-4 text-lg"
          >
            Começar Agora
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button> */}
        </section>

        {/* Main Content Grid */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 space-y-12">
            {/* Seções horizontais Netflix por tag, agora paginadas */}
            {visibleTags.map((tag, idx) => {
              const tagSection = postsByTag[tag] && postsByTag[tag].length > 0 ? (
                <section
                  key={tag}
                  className={`mb-10 ${fadeInClass}`}
                  style={{ animationDelay: `${idx * 60}ms`, animationFillMode: 'forwards' }}
                >
                  <h2 className="text-xl font-bold text-exaltius-blue mb-3">{tag}</h2>
                  <div className="flex overflow-x-auto gap-4 pb-2 overflow-hidden">
                    {postsByTag[tag].slice(0, 6).map((post) => (
                      <div key={post.id} className="min-w-[300px] max-w-xs">
                        <PostCard {...post} size="medium" />
                      </div>
                    ))}
                  </div>
                </section>
              ) : null;
              // Após cada 2 tags, insere um anúncio AdSense
              if ((idx + 1) % 2 === 0) {
                return [
                  tagSection,
                  <div key={`ad-tag-${idx}`} className="mt-2 p-2 bg-white/50 rounded border border-slate-200 flex justify-center">
                    <ins
                      className="adsbygoogle"
                      style={{ display: "block" }}
                      data-ad-client="ca-pub-6546754569463012"
                      data-ad-slot="8857888947"
                      data-ad-format="auto"
                      data-full-width-responsive="true"
                    />
                  </div>
                ];
              }
              return tagSection;
            })}
            {/* Loader para infinite scroll de tags */}
            <div ref={loader} />
          </div>
          {/* Sidebar duplicada a cada scroll (mantém igual) */}
          {!isMobile && (
            <div className="flex flex-col gap-8 min-w-[320px]">
              {sidebars.map((i) => (
                <div key={i}>
                  <Sidebar blockPages={sidebars.length} />
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
