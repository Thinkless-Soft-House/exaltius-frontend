import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, TrendingUp, Eye } from "lucide-react";

interface SidebarProps {
  currentPostId?: string;
  category?: string;
  blockPages?: number; // NOVO: controla quantos blocos renderizar
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

const Sidebar = ({ currentPostId, category }: SidebarProps) => {
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [popularPosts, setPopularPosts] = useState<Post[]>([]);
  const [blockCount, setBlockCount] = useState(2); // Começa com 2 ciclos (ajustável)
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Mock data - In a real app, this would come from an API
  useEffect(() => {
    const mockRelatedPosts: Post[] = [
      {
        id: "1",
        title: "Como Começar a Investir com Pouco Dinheiro",
        slug: "como-investir-acoes-iniciantes-guia-completo-2024",
        excerpt:
          "Descubra estratégias para começar sua jornada de investimentos mesmo com valores pequenos.",
        category: "Investimentos",
        publishedAt: "2024-01-15",
        readTime: 5,
        views: 1250,
      },
      {
        id: "2",
        title: "Renda Passiva: 7 Formas de Gerar Dinheiro",
        slug: "como-investir-acoes-iniciantes-guia-completo-2024",
        excerpt:
          "Aprenda diferentes maneiras de criar fontes de renda que trabalham por você.",
        category: "Renda Extra",
        publishedAt: "2024-01-12",
        readTime: 8,
        views: 980,
      },
      {
        id: "3",
        title: "Planejamento Financeiro para 2024",
        slug: "como-investir-acoes-iniciantes-guia-completo-2024",
        excerpt:
          "Monte seu planejamento financeiro e alcance seus objetivos este ano.",
        category: "Finanças Pessoais",
        publishedAt: "2024-01-10",
        readTime: 6,
        views: 1500,
      },
    ];

    const mockPopularPosts: Post[] = [
      {
        id: "4",
        title: "Tesouro Direto: Guia Completo 2024",
        slug: "como-investir-acoes-iniciantes-guia-completo-2024",
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
        slug: "como-investir-acoes-iniciantes-guia-completo-2024",
        excerpt:
          "Estratégias práticas para quitar dívidas e organizar suas finanças rapidamente.",
        category: "Finanças Pessoais",
        publishedAt: "2024-01-05",
        readTime: 7,
        views: 1800,
      },
    ];

    // Filter related posts based on category if provided
    if (category) {
      setRelatedPosts(
        mockRelatedPosts.filter(
          (post) =>
            post.category.toLowerCase().includes(category.toLowerCase()) &&
            post.id !== currentPostId
        )
      );
    } else {
      setRelatedPosts(
        mockRelatedPosts.filter((post) => post.id !== currentPostId)
      );
    }

    setPopularPosts(
      mockPopularPosts.filter((post) => post.id !== currentPostId)
    );
  }, [currentPostId, category]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // AdSense handler para anúncios na sidebar
  useEffect(() => {
    const ads = document.querySelectorAll(".adsbygoogle");
    if (window.adsbygoogle && ads.length) {
      ads.forEach(() => {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {}
      });
    }
  }, [blockCount]);

  // Ajusta dinamicamente a quantidade de blocos de acordo com a altura da tela
  useEffect(() => {
    function checkSidebarHeight() {
      if (sidebarRef.current) {
        const sidebarHeight = sidebarRef.current.offsetHeight;
        const windowHeight = window.innerHeight;
        // Se a sidebar for menor que a tela, adiciona mais blocos
        if (sidebarHeight < windowHeight * 1.1) {
          setBlockCount((prev) => prev + 1);
        }
      }
    }
    checkSidebarHeight();
    window.addEventListener("resize", checkSidebarHeight);
    return () => window.removeEventListener("resize", checkSidebarHeight);
  }, [blockCount]);

  // Gera blocos de anúncio e intercala posts especiais em ciclos
  const renderSidebarBlocks = () => {
    const blocks = [];
    let cycle = 0;
    let adIndex = 0;
    let specialCount = 0;
    const adBlocks = [
      <Card key="ad-1" className="bg-white from-slate-100 to-slate-50">
        <CardContent className="p-6 text-center">
          <div className="mt-4 p-4 bg-white rounded border border-slate-200 flex justify-center">
            <ins
              className="adsbygoogle"
              style={{ display: "block" }}
              data-ad-client="ca-pub-6546754569463012"
              data-ad-slot="8857888947"
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
          </div>
        </CardContent>
      </Card>,
    ];
    for (let i = 0; i < blockCount; i++) {
      // 3 anúncios
      for (let j = 0; j < 3; j++) {
        blocks.push(
          React.cloneElement(adBlocks[j % adBlocks.length], {
            key: `ad-${i}-${j}`,
          })
        );
        adIndex++;
      }
      // Alterna entre Mais Lido e (Post Relacionado + Newsletter)
      if (cycle % 2 === 0 && popularPosts.length > 0) {
        blocks.push(
          <Card key={`maislido-${i}-${cycle}`}>
            <CardHeader>
              <CardTitle className="text-lg font-bold text-exaltius-blue flex items-center gap-2">
                <Eye className="h-5 w-5 text-exaltius-gold" />
                Mais Lido
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link
                to={`/post/${popularPosts[0].slug}`}
                className="block group"
              >
                <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-all duration-200 border border-transparent hover:border-slate-200">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-exaltius-gold text-exaltius-blue font-bold text-sm flex items-center justify-center">
                    1
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-semibold text-sm text-slate-900 group-hover:text-exaltius-blue transition-colors line-clamp-2">
                      {popularPosts[0].title}
                    </h4>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span>
                        {popularPosts[0].views.toLocaleString()} visualizações
                      </span>
                      <span>{popularPosts[0].readTime} min leitura</span>
                    </div>
                  </div>
                </div>
              </Link>
            </CardContent>
          </Card>
        );
      } else if (relatedPosts.length > 0) {
        blocks.push(
          <Card key={`relacionado-${i}-${cycle}`} className="sidebar-sticky">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-exaltius-blue flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-exaltius-gold" />
                Post Relacionado
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link
                to={`/post/${relatedPosts[0].slug}`}
                className="block group"
              >
                <div className="space-y-2 p-3 rounded-lg hover:bg-slate-50 transition-all duration-200 border border-transparent hover:border-slate-200">
                  <h4 className="font-semibold text-sm text-slate-900 group-hover:text-exaltius-blue transition-colors line-clamp-2">
                    {relatedPosts[0].title}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {relatedPosts[0].excerpt}
                  </p>
                </div>
              </Link>
            </CardContent>
          </Card>
        );
        blocks.push(
          <Card
            key={`newsletter-${i}-${cycle}`}
            className="bg-gradient-to-r from-exaltius-blue to-exaltius-blue-light text-white"
          >
            <CardContent className="p-6 text-center">
              <h3 className="font-bold text-lg mb-2">Newsletter Exaltius</h3>
              <p className="text-sm mb-4 opacity-90">
                Receba as melhores dicas de finanças direto no seu email
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Seu melhor email"
                  className="w-full px-4 py-2 rounded-md text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-exaltius-gold cursor-not-allowed opacity-60"
                  disabled
                  tabIndex={-1}
                />
                <button
                  className="w-full bg-exaltius-gold text-exaltius-blue font-semibold py-2 px-4 rounded-md opacity-60 cursor-not-allowed"
                  disabled
                >
                  Em breve
                </button>
              </div>
            </CardContent>
          </Card>
        );
      }
      cycle++;
    }
    return blocks;
  };

  return (
    <aside className="w-full lg:w-80 space-y-6" ref={sidebarRef}>
      {renderSidebarBlocks()}
    </aside>
  );
};

export default Sidebar;
