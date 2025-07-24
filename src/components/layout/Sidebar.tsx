import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Calendar, Lightbulb, Star, Quote, Info, BookOpen, Target, Bell, Mail } from "./lucide-icons";

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
  const [maxBlocks, setMaxBlocks] = useState<number | null>(null);

  // Detecta se está dentro do post pela presença de currentPostId
  const isInsidePost = !!currentPostId;

  // Sincroniza altura da sidebar com o conteúdo principal apenas dentro do post
  useEffect(() => {
    if (!isInsidePost) return;
    // Aguarda renderização
    setTimeout(() => {
      const main = document.querySelector('.flex-1');
      const sidebar = sidebarRef.current;
      if (main && sidebar) {
        const mainHeight = (main as HTMLElement).offsetHeight;
        const blockEls = sidebar.querySelectorAll('aside > div');
        let total = 0;
        let blocksToShow = 1;
        for (let i = 0; i < blockEls.length; i++) {
          total += (blockEls[i] as HTMLElement).offsetHeight;
          if (total > mainHeight) break;
          blocksToShow = i + 1;
        }
        setMaxBlocks(blocksToShow);
      }
    }, 100);
  }, [isInsidePost, sidebarPage]);

  // Mock data - In a real app, this would come from an API
  const mockPopularPosts: Post[] = [
    {
      id: "4",
      title: "Tesouro Direto: Guia Completo 2024",
      slug: "tesouro-direto-guia-completo-2024",
      excerpt:
        "Tudo que você precisa saber sobre o Tesouro Direto para investir com segurança.",
      category: "Investimentos",
      publishedAt: "2024-01-08",
      readTime: 12,
      views: 2200,
    },
    {
      id: "5",
      title: "Como Sair do Vermelho em 90 Dias",
      slug: "como-sair-do-vermelho-em-90-dias",
      excerpt:
        "Estratégias práticas para quitar dívidas e organizar suas finanças rapidamente.",
      category: "Finanças Pessoais",
      publishedAt: "2024-01-05",
      readTime: 7,
      views: 1800,
    },
  ];
  const mockRecentPosts: Post[] = [
    {
      id: "6",
      title: "Como Declarar Imposto de Renda 2025",
      slug: "como-declarar-imposto-de-renda-2025",
      excerpt: "Passo a passo para não errar na declaração deste ano.",
      category: "Impostos",
      publishedAt: "2024-07-20",
      readTime: 4,
      views: 900,
    },
    {
      id: "7",
      title: "ETF: O que é e como investir?",
      slug: "etf-o-que-e-como-investir",
      excerpt: "Entenda o funcionamento dos ETFs e como incluí-los na sua carteira.",
      category: "Investimentos",
      publishedAt: "2024-07-18",
      readTime: 6,
      views: 1100,
    },
  ];
  const mockFeaturedPost: Post = {
    id: "8",
    title: "Ações para Ficar de Olho em 2025",
    slug: "acoes-para-ficar-de-olho-2025",
    excerpt: "Veja as empresas com maior potencial de valorização no próximo ano.",
    category: "Investimentos",
    publishedAt: "2024-07-10",
    readTime: 8,
    views: 2100,
  };
  const mockQuickTips = [
    "Revise seus gastos semanais toda segunda-feira.",
    "Use o débito automático para não atrasar contas.",
    "Invista primeiro, gaste depois.",
    "Tenha uma reserva de emergência de pelo menos 6 meses.",
  ];
  const mockFinanceQuotes = [
    "'O dinheiro é um excelente servo, mas um péssimo mestre.' — Francis Bacon",
    "'Não economize o que sobra depois de gastar, gaste o que sobra depois de economizar.' — Warren Buffett",
    "'Investir em conhecimento rende sempre os melhores juros.' — Benjamin Franklin",
  ];
  const mockRandomPosts: Post[] = [
    ...mockPopularPosts,
    ...mockRecentPosts,
    mockFeaturedPost,
  ];
  const mockEssentialGuide: Post = {
    id: "9",
    title: "Guia Essencial: Como Investir do Zero",
    slug: "guia-essencial-como-investir-do-zero",
    excerpt: "Tudo que você precisa saber para começar a investir com segurança.",
    category: "Investimentos",
    publishedAt: "2024-06-01",
    readTime: 15,
    views: 3000,
  };
  const mockWeeklyGoals = [
    "Defina um objetivo financeiro para esta semana.",
    "Economize R$ 50 até domingo.",
    "Leia um artigo sobre investimentos por dia.",
    "Converse sobre finanças com um amigo.",
  ];



  // Scroll infinito sincronizado com a janela
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.scrollY + window.innerHeight >= document.body.offsetHeight - 200
      ) {
        setSidebarPage((prev) => prev + 1);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
  // Aumenta o limite para garantir conteúdo ao scrollar indefinidamente
  const MAX_BLOCKS = 500;
  const sidebarBlocksData = Array.from({ length: MAX_BLOCKS }).map((_, blockIndex) => {
    const quickTip = mockQuickTips[blockIndex % mockQuickTips.length];
    const financeQuote = mockFinanceQuotes[blockIndex % mockFinanceQuotes.length];
    const randomPost = mockRandomPosts[(blockIndex + 1) % mockRandomPosts.length];
    const essentialGuide = mockEssentialGuide;
    const weeklyGoal = mockWeeklyGoals[blockIndex % mockWeeklyGoals.length];
    const featuredPost = mockFeaturedPost;
    // Junta posts populares e recentes para simular variedade
    const postsMap = new Map();
    mockPopularPosts.forEach((p) => postsMap.set(p.id, p));
    mockRecentPosts.forEach((p) => postsMap.set(p.id, p));
    const posts = Array.from(postsMap.values());
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
  });

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

  // Renderiza múltiplos blocos da sidebar, um para cada página
  // Garante que sempre haverá conteúdo ao scrollar
  return (
    <aside className="w-full lg:w-80 space-y-6" ref={sidebarRef}>
      {Array.from({ length: Math.min(isInsidePost && maxBlocks ? maxBlocks : sidebarPage, sidebarBlocksData.length) }).map((_, blockIndex) => (
        <div key={blockIndex}>
          {renderSidebarBlocks(blockIndex)}
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
