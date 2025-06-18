import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Sidebar from "@/components/layout/Sidebar";
import PostCard from "@/components/blog/PostCard";
import { Button } from "@/components/ui/button";
import { TrendingUp, DollarSign, PiggyBank, GraduationCap, Loader2 } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

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
  const { t } = useI18n();
  const { category } = useParams<{ category: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const categoryInfo = {
    "investimentos": {
      title: t.category_investments,
      description: t.category_investments_desc,
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    "renda-extra": {
      title: t.category_extra_income,
      description: t.category_extra_income_desc,
      icon: DollarSign,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    "financas-pessoais": {
      title: t.category_personal_finance,
      description: t.category_personal_finance_desc,
      icon: PiggyBank,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    "educacao-financeira": {
      title: t.category_financial_education,
      description: t.category_financial_education_desc,
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
      title: t.how_to_invest_stocks,
      slug: "como-investir-acoes-iniciantes-guia-completo-2024",
      excerpt: t.how_to_invest_stocks_desc,
      category: t.category_investments,
      author: "Carlos Silva",
      publishedAt: "2024-01-15",
      readTime: 12,
      views: 2500,
      featuredImage: "/lovable-uploads/11faacf3-bc6a-47fc-93c6-a3e671f7756d.png"
    },
    {
      id: "2",
      title: t.treasury_vs_cdb,
      slug: "tesouro-direto-vs-cdb-qual-escolher-2024",
      excerpt: t.treasury_vs_cdb_desc,
      category: t.category_investments,
      author: "Marina Costa",
      publishedAt: "2024-01-08",
      readTime: 10,
      views: 1650,
      featuredImage: "/lovable-uploads/e012c59b-1219-40aa-b338-5af9798b801c.png"
    },
    {
      id: "3",
      title: t.investment_funds,
      slug: "fundos-investimento-como-escolher-melhor",
      excerpt: t.investment_funds_desc,
      category: t.category_investments,
      author: "Pedro Martins",
      publishedAt: "2024-01-03",
      readTime: 8,
      views: 1200,
      featuredImage: "/lovable-uploads/fb1b246e-8168-4536-b263-19909198f51a.png"
    },
    {
      id: "4",
      title: t["10_ways_extra_income"],
      slug: "10-formas-gerar-renda-extra-online",
      excerpt: t["10_ways_extra_income_desc"],
      category: t.category_extra_income,
      author: "Ana Santos",
      publishedAt: "2024-01-12",
      readTime: 8,
      views: 1890,
      featuredImage: "/lovable-uploads/8caf0661-0400-4ba1-a372-1a874f658a62.png"
    },
    {
      id: "5",
      title: t.personal_finance_50_30_20,
      slug: "planejamento-financeiro-metodo-50-30-20",
      excerpt: t.personal_finance_50_30_20_desc,
      category: t.category_personal_finance,
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
          <h1 className="text-4xl font-bold text-slate-900 mb-4">{t.category_not_found}</h1>
          <p className="text-slate-600">{t.category_not_found_desc}</p>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-12">
                  {posts.map((post) => (
                    <a
                      key={post.id}
                      href="https://exaltius.com/post/como-investir-acoes-iniciantes-guia-completo-2024"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'none' }}
                    >
                      <PostCard {...post} size="medium" />
                    </a>
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
