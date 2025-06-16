
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Sidebar from "@/components/layout/Sidebar";
import PostCard from "@/components/blog/PostCard";
import { Button } from "@/components/ui/button";
import { TrendingUp, DollarSign, PiggyBank, GraduationCap, Loader2 } from "lucide-react";

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

const Category = () => {
  const { category } = useParams<{ category: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const categoryInfo = {
    "investimentos": {
      title: "Investimentos",
      description: "Estratégias e dicas para fazer seu dinheiro render",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    "renda-extra": {
      title: "Renda Extra",
      description: "Formas de aumentar sua renda mensal",
      icon: DollarSign,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    "financas-pessoais": {
      title: "Finanças Pessoais",
      description: "Organize suas finanças e alcance seus objetivos",
      icon: PiggyBank,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    "educacao-financeira": {
      title: "Educação Financeira",
      description: "Conhecimento fundamental sobre dinheiro",
      icon: GraduationCap,
      color: "text-amber-600",
      bgColor: "bg-amber-50"
    }
  };

  const currentCategory = category ? categoryInfo[category as keyof typeof categoryInfo] : null;

  // Mock data - In a real app, this would come from an API
  const mockPosts: Post[] = [
    {
      id: "1",
      title: "Como Investir em Ações para Iniciantes: Guia Completo 2024",
      slug: "como-investir-acoes-iniciantes-guia-completo-2024",
      excerpt: "Descubra tudo que você precisa saber para começar a investir em ações de forma segura e inteligente.",
      category: "Investimentos",
      author: "Carlos Silva",
      publishedAt: "2024-01-15",
      readTime: 12,
      views: 2500,
      featuredImage: "/lovable-uploads/11faacf3-bc6a-47fc-93c6-a3e671f7756d.png"
    },
    {
      id: "2",
      title: "Tesouro Direto vs CDB: Qual Escolher em 2024?",
      slug: "tesouro-direto-vs-cdb-qual-escolher-2024",
      excerpt: "Comparação detalhada entre duas das principais opções de investimento conservador no Brasil.",
      category: "Investimentos",
      author: "Marina Costa",
      publishedAt: "2024-01-08",
      readTime: 10,
      views: 1650,
      featuredImage: "/lovable-uploads/e012c59b-1219-40aa-b338-5af9798b801c.png"
    },
    {
      id: "3",
      title: "Fundos de Investimento: Como Escolher o Melhor",
      slug: "fundos-investimento-como-escolher-melhor",
      excerpt: "Entenda os diferentes tipos de fundos e aprenda a avaliar qual se adequa melhor ao seu perfil.",
      category: "Investimentos",
      author: "Pedro Martins",
      publishedAt: "2024-01-03",
      readTime: 8,
      views: 1200,
      featuredImage: "/lovable-uploads/fb1b246e-8168-4536-b263-19909198f51a.png"
    },
    {
      id: "4",
      title: "10 Formas Comprovadas de Gerar Renda Extra Online",
      slug: "10-formas-gerar-renda-extra-online",
      excerpt: "Explore métodos testados e aprovados para aumentar sua renda trabalhando pela internet.",
      category: "Renda Extra",
      author: "Ana Santos",
      publishedAt: "2024-01-12",
      readTime: 8,
      views: 1890,
      featuredImage: "/lovable-uploads/8caf0661-0400-4ba1-a372-1a874f658a62.png"
    },
    {
      id: "5",
      title: "Planejamento Financeiro Pessoal: Método dos 50/30/20",
      slug: "planejamento-financeiro-metodo-50-30-20",
      excerpt: "Aprenda a organizar suas finanças usando o método mais eficaz do mundo.",
      category: "Finanças Pessoais",
      author: "Roberto Lima",
      publishedAt: "2024-01-10",
      readTime: 6,
      views: 3200,
      featuredImage: "/lovable-uploads/2dd426b2-9eb4-4d68-a013-6cbcd6b717db.png"
    }
  ];

  const loadPosts = async (pageNum: number) => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Filter posts by category and paginate
    const categoryName = currentCategory?.title || "";
    const filteredPosts = mockPosts.filter(post => 
      post.category.toLowerCase().includes(categoryName.toLowerCase())
    );
    
    const startIndex = (pageNum - 1) * 6;
    const endIndex = startIndex + 6;
    const newPosts = filteredPosts.slice(startIndex, endIndex);
    
    if (pageNum === 1) {
      setPosts(newPosts);
    } else {
      setPosts(prev => [...prev, ...newPosts]);
    }
    
    setHasMore(endIndex < filteredPosts.length);
    setLoading(false);
  };

  useEffect(() => {
    if (currentCategory) {
      setPage(1);
      loadPosts(1);
    }
  }, [category, currentCategory]);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadPosts(nextPage);
  };

  if (!currentCategory) {
    return (
      <Layout>
        <div className="container mx-auto px-4 lg:px-8 py-16 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Categoria não encontrada</h1>
          <p className="text-slate-600">A categoria que você está procurando não existe.</p>
        </div>
      </Layout>
    );
  }

  const IconComponent = currentCategory.icon;

  return (
    <Layout>
      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Category Header */}
        <section className="text-center py-12 mb-12">
          <div className={`${currentCategory.bgColor} inline-flex p-4 rounded-2xl mb-6`}>
            <IconComponent className={`h-12 w-12 ${currentCategory.color}`} />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-exaltius-blue mb-4">
            {currentCategory.title}
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {currentCategory.description}
          </p>
        </section>

        {/* Main Content Grid */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Posts Grid */}
          <div className="flex-1">
            {posts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {posts.map((post) => (
                    <PostCard key={post.id} {...post} size="medium" />
                  ))}
                </div>

                {/* Load More Button */}
                {hasMore && (
                  <div className="text-center">
                    <Button
                      onClick={loadMore}
                      disabled={loading}
                      size="lg"
                      className="bg-exaltius-blue text-white hover:bg-exaltius-blue-light"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Carregando...
                        </>
                      ) : (
                        "Carregar Mais Artigos"
                      )}
                    </Button>
                  </div>
                )}

                {/* Ad Space */}
                <div className="bg-gradient-to-r from-slate-100 to-slate-50 border-dashed border-2 border-slate-300 rounded-lg p-8 text-center mt-12">
                  <div className="text-sm text-slate-500 mb-2">Espaço Publicitário</div>
                  <div className="text-xs text-slate-400">728x90 - Leaderboard</div>
                  <div className="mt-4 p-4 bg-white/50 rounded border border-slate-200">
                    <div className="text-xs text-slate-600">Anúncio AdSense</div>
                  </div>
                </div>
              </>
            ) : loading ? (
              <div className="text-center py-12">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-exaltius-blue" />
                <p className="text-slate-600">Carregando artigos...</p>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-600">Nenhum artigo encontrado nesta categoria.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <Sidebar category={currentCategory.title} />
        </div>
      </div>
    </Layout>
  );
};

export default Category;
