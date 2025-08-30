import React, { useEffect, useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Calendar, Lightbulb, Star, Quote, Info, BookOpen, Target, Bell, Mail } from "./lucide-icons";
import { useGetPosts } from "@/hooks/useGetPosts";

interface SidebarProps {
  currentPostId?: string;
  category?: string;
  blockPages?: number;
  index?: number;
}

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readTime: number;
  views: number;
}

const Sidebar = ({ currentPostId, category, blockPages, index }: SidebarProps) => {
  const [sidebarPage, setSidebarPage] = useState(1); // controla quantos blocos da sidebar são exibidos
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  // Dicas e citações estáticas (mantidas localmente) - memoizadas para estabilidade
  const { mockQuickTips, mockFinanceQuotes, mockWeeklyGoals } = React.useMemo(() => ({
    mockQuickTips: [
      "Revise seus gastos semanais toda segunda-feira.",
      "Use o débito automático para não atrasar contas.",
      "Invista primeiro, gaste depois.",
      "Tenha uma reserva de emergência de pelo menos 6 meses.",
    ],
    mockFinanceQuotes: [
      "'O dinheiro é um excelente servo, mas um péssimo mestre.' — Francis Bacon",
      "'Não economize o que sobra depois de gastar, gaste o que sobra depois de economizar.' — Warren Buffett",
      "'Investir em conhecimento rende sempre os melhores juros.' — Benjamin Franklin",
    ],
    mockWeeklyGoals: [
      "Defina um objetivo financeiro para esta semana.",
      "Economize R$ 50 até domingo.",
      "Leia um artigo sobre investimentos por dia.",
      "Converse sobre finanças com um amigo.",
    ],
  }), []);

  // Posts reais vindos do backend
  const { getRecent } = useGetPosts();
  const [popularPosts, setPopularPosts] = useState<Post[]>([]);
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [featuredPost, setFeaturedPost] = useState<Post | null>(null);
  const [randomPosts, setRandomPosts] = useState<Post[]>([]);
  const [essentialGuide, setEssentialGuide] = useState<Post | null>(null);

  const shuffle = <T,>(arr: T[]) => arr.slice().sort(() => Math.random() - 0.5);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await getRecent('pt', 20);
        const items = res?.data?.items ?? [];
        if (!mounted || !items.length) return;
        // Map to local Post shape
        const mapped = items.map((i) => ({
          id: i.id,
          title: i.title,
          slug: i.slug,
          excerpt: i.excerpt,
          category: i.category,
          publishedAt: i.publishedAt,
          readTime: i.readTime,
          views: i.views,
        } as Post));

        setFeaturedPost(mapped[0] ?? null);
        setPopularPosts(mapped.slice(1, 3));
        setRecentPosts(mapped.slice(3, 8));
        setRandomPosts(shuffle(mapped).slice(0, 4));
        setEssentialGuide(mapped[8] ?? mapped[1] ?? null);
      } catch (e) {
        // silenciar; sidebar continuará com blocos vazios
      }
    })();
    return () => { mounted = false; };
  }, [getRecent]);

  const allCategories = Array.from(new Set([...popularPosts, ...recentPosts, ...(featuredPost ? [featuredPost] : [])].map(post => post.category)));

  // Detecta se está dentro do post pela presença de currentPostId
  const isInsidePost = !!currentPostId;

  // Sincroniza altura da sidebar com o conteúdo principal apenas dentro do post
  useEffect(() => {
    if (!isInsidePost) return;
    // Aguarda renderização
    const calculateInitialBlocks = () => {
      const main = document.querySelector('.flex-1');
      const sidebar = sidebarRef.current;
      if (main && sidebar) {
        const mainHeight = (main as HTMLElement).offsetHeight;
        const blockEls = Array.from(sidebar.children) as HTMLElement[];
        let total = 0;
        let blocksToShow = 1;
        for (let i = 0; i < blockEls.length; i++) {
          total += blockEls[i].offsetHeight;
          if (total > mainHeight) break;
          blocksToShow = i + 1;
        }
        // Inicializa sidebarPage somente se ainda estiver no valor inicial (1)
        setSidebarPage((prev) => (prev === 1 ? Math.max(prev, blocksToShow) : prev));
      }
    };

    const t = setTimeout(calculateInitialBlocks, 100);
    // Recalcula se a janela for redimensionada
    window.addEventListener('resize', calculateInitialBlocks);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', calculateInitialBlocks);
    };
  }, [isInsidePost, sidebarPage]);

  // mock data is memoized above





  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // AdSense handler para anúncios na sidebar
  // AdSense handler para anúncios na sidebar (opcional, pode remover se não usar anúncios dinâmicos)
  // useEffect(() => {
  //   const ads = document.querySelectorAll(".adsbygoogle");
  //   if (window.adsbygoogle && ads.length) {
  //     ads.forEach(() => {
  //       try {
  //         (window.adsbygoogle = window.adsbygoogle || []).push({});
  //       } catch (e) { /* empty */ }
  //     });
  //   }
  // }, []);

  // 10 blocos temáticos fixos/dinâmicos
  // Blocos temáticos como componentes puros para garantir que nenhum prop extra seja passado
  const QuickTipBlock = ({ quickTip }: { quickTip: string }) => quickTip ? (
    <Card className="mb-2">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-exaltius-blue flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-exaltius-gold" />
          Dica Rápida do Dia
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-slate-700 italic">{quickTip}</div>
      </CardContent>
    </Card>
  ) : null;

  const FeaturedPostBlock = ({ featuredPost }: { featuredPost: Post }) => featuredPost ? (
    <Card className="mb-2">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-exaltius-blue flex items-center gap-2">
          <Star className="h-5 w-5 text-exaltius-gold" />
          Post em Destaque
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Link to={`/post/${featuredPost.slug}`} className="block group">
          <div className="space-y-1 p-2 rounded-lg hover:bg-slate-50 transition-all duration-200 border border-transparent hover:border-slate-200">
            <h4 className="font-semibold text-xs text-slate-900 group-hover:text-exaltius-blue transition-colors line-clamp-2">
              {featuredPost.title}
            </h4>
            <p className="text-xs text-slate-600 line-clamp-2">{featuredPost.excerpt}</p>
          </div>
        </Link>
      </CardContent>
    </Card>
  ) : null;

  const FinanceQuoteBlock = ({ financeQuote }: { financeQuote: string }) => financeQuote ? (
    <Card className="mb-2">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-exaltius-blue flex items-center gap-2">
          <Quote className="h-5 w-5 text-exaltius-gold" />
          Citação Financeira
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-slate-700 italic">{financeQuote}</div>
      </CardContent>
    </Card>
  ) : null;

  const RandomHeadlineBlock = ({ randomPost }: { randomPost: Post }) => randomPost ? (
    <Card className="mb-2">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-exaltius-blue flex items-center gap-2">
          <Info className="h-5 w-5 text-exaltius-gold" />
          Manchete Aleatória
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Link to={`/post/${randomPost.slug}`} className="block group">
          <div className="space-y-1 p-2 rounded-lg hover:bg-slate-50 transition-all duration-200 border border-transparent hover:border-slate-200">
            <h4 className="font-semibold text-xs text-slate-900 group-hover:text-exaltius-blue transition-colors line-clamp-2">
              {randomPost.title}
            </h4>
            <p className="text-xs text-slate-600 line-clamp-2">{randomPost.excerpt}</p>
          </div>
        </Link>
      </CardContent>
    </Card>
  ) : null;

  const EssentialGuideBlock = ({ essentialGuide }: { essentialGuide: Post }) => essentialGuide ? (
    <Card className="mb-2">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-exaltius-blue flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-exaltius-gold" />
          Guia Essencial
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Link to={`/post/${essentialGuide.slug}`} className="block group">
          <div className="space-y-1 p-2 rounded-lg hover:bg-slate-50 transition-all duration-200 border border-transparent hover:border-slate-200">
            <h4 className="font-semibold text-xs text-slate-900 group-hover:text-exaltius-blue transition-colors line-clamp-2">
              {essentialGuide.title}
            </h4>
            <p className="text-xs text-slate-600 line-clamp-2">{essentialGuide.excerpt}</p>
          </div>
        </Link>
      </CardContent>
    </Card>
  ) : null;

  const WeeklyGoalBlock = ({ weeklyGoal }: { weeklyGoal: string }) => weeklyGoal ? (
    <Card className="mb-2">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-exaltius-blue flex items-center gap-2">
          <Target className="h-5 w-5 text-exaltius-gold" />
          Objetivo da Semana
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-slate-700 italic">{weeklyGoal}</div>
      </CardContent>
    </Card>
  ) : null;

  const NotificationsBlock = () => (
    <Card className="mb-2">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-exaltius-blue flex items-center gap-2">
          <Bell className="h-5 w-5 text-exaltius-gold" />
          Ative as Notificações
        </CardTitle>
      </CardHeader>
      <CardContent>
        <button
          className="w-full py-2 px-4 bg-exaltius-blue text-white rounded hover:bg-exaltius-gold hover:text-exaltius-blue transition-colors font-semibold text-sm"
          onClick={() => alert('Funcionalidade em breve!')}
        >
          Ativar Notificações
        </button>
        <div className="text-xs text-slate-500 mt-2">Receba alertas de novos conteúdos e dicas.</div>
      </CardContent>
    </Card>
  );

  const NewsletterBlock = () => (
    <Card className="mb-2">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-exaltius-blue flex items-center gap-2">
          <Mail className="h-5 w-5 text-exaltius-gold" />
          Boletim Semanal
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-slate-700 mb-2">Receba as melhores dicas e novidades toda semana no seu e-mail.</div>
        <button
          className="w-full py-2 px-4 bg-exaltius-gold text-exaltius-blue rounded hover:bg-exaltius-blue hover:text-white transition-colors font-semibold text-sm"
          onClick={() => alert('Em breve: newsletter!')}
        >
          Quero Receber
        </button>
      </CardContent>
    </Card>
  );

  const AdBlock1 = () => (
    <div className="adsbygoogle bg-gray-100 p-4 rounded shadow text-center mb-2">
      <span className="text-xs text-slate-500">Publicidade</span>
    </div>
  );

  const AdBlock2 = () => (
    <div className="adsbygoogle bg-yellow-50 p-4 border-l-4 border-yellow-400 text-center mb-4">
      <span className="text-xs text-yellow-700 font-semibold">Anúncio Especial</span>
    </div>
  );

  // Pré-carrega os dados dos blocos da sidebar
  // Reduzido para evitar custo alto de construção e memória
  const MAX_BLOCKS = 20;
  // Gera blocos de acordo com a categoria atual (memoizado)
  const sidebarBlocksData = useMemo(() => Array.from({ length: MAX_BLOCKS }).map((_, blockIndex) => {
    const quickTip = mockQuickTips[blockIndex % mockQuickTips.length];
    const financeQuote = mockFinanceQuotes[blockIndex % mockFinanceQuotes.length];
    const randomPost = randomPosts.length ? randomPosts[(blockIndex + 1) % randomPosts.length] : undefined;
    const weeklyGoal = mockWeeklyGoals[blockIndex % mockWeeklyGoals.length];
    // Filtra posts pela categoria atual
    const currentCategory = allCategories[currentCategoryIndex];
    const posts = [...popularPosts, ...recentPosts, ...(featuredPost ? [featuredPost] : [])].filter(p => p.category === currentCategory);
    return {
      blockIndex,
      quickTip,
      financeQuote,
      randomPost,
      essentialGuide,
      weeklyGoal,
      featuredPost,
      posts,
    };
  }), [currentCategoryIndex, allCategories, mockQuickTips, mockFinanceQuotes, randomPosts, popularPosts, recentPosts, featuredPost, essentialGuide, mockWeeklyGoals]);

  // Função para renderizar um bloco da sidebar com base nos dados pré-carregados
  const renderSidebarBlocks = (blockIndex: number) => {
    const data = sidebarBlocksData[blockIndex];
    if (!data) return null;
    const { quickTip, financeQuote, randomPost, essentialGuide, weeklyGoal, featuredPost, posts } = data;
    return posts.map((post, idx) => {
      const thematicBlock = (() => {
        switch (idx) {
          case 0: return <QuickTipBlock quickTip={quickTip} />;
          case 1: return <FeaturedPostBlock featuredPost={featuredPost} />;
          case 2: return <FinanceQuoteBlock financeQuote={financeQuote} />;
          case 3: return <RandomHeadlineBlock randomPost={randomPost} />;
          case 4: return <EssentialGuideBlock essentialGuide={essentialGuide} />;
          case 5: return <WeeklyGoalBlock weeklyGoal={weeklyGoal} />;
          case 6: return <NotificationsBlock />;
          case 7: return <NewsletterBlock />;
          default: return null;
        }
      })();
      return (
        <div key={post.id + '-block-' + blockIndex}>
          <div className="mb-2">
            <Card>
              <CardContent className="p-4">
                <Link to={`/post/${post.slug}`} className="block group">
                  <h4 className="font-semibold text-base text-slate-900 group-hover:text-exaltius-blue transition-colors line-clamp-2 mb-1">
                    {post.title}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2 mb-2">{post.excerpt}</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>{post.category}</span>
                    <span>{post.views.toLocaleString()} views</span>
                    <span>{post.readTime} min</span>
                  </div>
                </Link>
              </CardContent>
            </Card>
          </div>
          {thematicBlock}
          <AdBlock1 />
          <AdBlock2 />
        </div>
      );
    });
  };

  // Scroll infinito sincronizado com a janela, incrementa blocos em lote e usa
  // requestAnimationFrame para evitar many reflows (throttle simples)
  const BLOCK_INCREMENT = 5;
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const sidebar = sidebarRef.current;
        let shouldLoad = false;

        if (sidebar && sidebar.children.length > 0) {
          // pega o último bloco visível na sidebar
          const blocks = Array.from(sidebar.children) as HTMLElement[];
          const last = blocks[blocks.length - 1];
          if (last) {
            const rect = last.getBoundingClientRect();
            // se a parte superior do último bloco estiver dentro da janela + margem, carregue mais
            if (rect.top < window.innerHeight + 400) {
              shouldLoad = true;
            }
          }
        } else {
          // fallback para comportamento anterior (quando sidebar não está disponível)
          if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 200) {
            shouldLoad = true;
          }
        }

        if (shouldLoad) {
          setSidebarPage((prev) => Math.min(prev + BLOCK_INCREMENT, sidebarBlocksData.length));
        }

        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [sidebarBlocksData.length]);

  useEffect(() => {
    // Se o último bloco renderizado não contiver posts, passamos para a próxima
    // categoria e reiniciamos a paginação. Isso evita comparar tamanhos de
    // listas fixas e lida dinamicamente com categorias vazias.
    if (!sidebarBlocksData || sidebarBlocksData.length === 0) return;
    const lastIndex = Math.min(Math.max(sidebarPage - 1, 0), sidebarBlocksData.length - 1);
    const lastBlock = sidebarBlocksData[lastIndex];
    const postsCount = lastBlock?.posts?.length ?? 0;
    if (postsCount === 0 && allCategories.length > 1) {
      setCurrentCategoryIndex((prev) => (prev + 1) % allCategories.length);
      setSidebarPage(1);
    }
  }, [sidebarPage, sidebarBlocksData, allCategories.length]);

  // Renderiza múltiplos blocos da sidebar, um para cada página
  // Garante que sempre haverá conteúdo ao scrollar
  return (
    <aside className="w-full lg:w-80 space-y-6" ref={sidebarRef}>
      {Array.from({ length: Math.min(sidebarPage, sidebarBlocksData.length) }).map((_, blockIndex) => (
        <div key={blockIndex}>
          {renderSidebarBlocks(blockIndex)}
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
