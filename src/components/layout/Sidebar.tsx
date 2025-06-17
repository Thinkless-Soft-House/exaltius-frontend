import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, TrendingUp, Eye } from "lucide-react";

interface SidebarProps {
  currentPostId?: string;
  category?: string;
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

  // Mock data - In a real app, this would come from an API
  useEffect(() => {
    const mockRelatedPosts: Post[] = [
      {
        id: "1",
        title: "Como Começar a Investir com Pouco Dinheiro",
        slug: "como-comecar-investir-pouco-dinheiro",
        excerpt: "Descubra estratégias para começar sua jornada de investimentos mesmo com valores pequenos.",
        category: "Investimentos",
        publishedAt: "2024-01-15",
        readTime: 5,
        views: 1250
      },
      {
        id: "2",
        title: "Renda Passiva: 7 Formas de Gerar Dinheiro",
        slug: "renda-passiva-7-formas-gerar-dinheiro",
        excerpt: "Aprenda diferentes maneiras de criar fontes de renda que trabalham por você.",
        category: "Renda Extra",
        publishedAt: "2024-01-12",
        readTime: 8,
        views: 980
      },
      {
        id: "3",
        title: "Planejamento Financeiro para 2024",
        slug: "planejamento-financeiro-2024",
        excerpt: "Monte seu planejamento financeiro e alcance seus objetivos este ano.",
        category: "Finanças Pessoais",
        publishedAt: "2024-01-10",
        readTime: 6,
        views: 1500
      }
    ];

    const mockPopularPosts: Post[] = [
      {
        id: "4",
        title: "Tesouro Direto: Guia Completo 2024",
        slug: "tesouro-direto-guia-completo-2024",
        excerpt: "Tudo que você precisa saber sobre o Tesouro Direto para investir com segurança.",
        category: "Investimentos",
        publishedAt: "2024-01-08",
        readTime: 12,
        views: 2200
      },
      {
        id: "5",
        title: "Como Sair do Vermelho em 90 Dias",
        slug: "como-sair-vermelho-90-dias",
        excerpt: "Estratégias práticas para quitar dívidas e organizar suas finanças rapidamente.",
        category: "Finanças Pessoais",
        publishedAt: "2024-01-05",
        readTime: 7,
        views: 1800
      }
    ];

    // Filter related posts based on category if provided
    if (category) {
      setRelatedPosts(mockRelatedPosts.filter(post => 
        post.category.toLowerCase().includes(category.toLowerCase()) && post.id !== currentPostId
      ));
    } else {
      setRelatedPosts(mockRelatedPosts.filter(post => post.id !== currentPostId));
    }

    setPopularPosts(mockPopularPosts.filter(post => post.id !== currentPostId));
  }, [currentPostId, category]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <aside className="w-full lg:w-80 space-y-6">
      {/* Ad Space 1 */}
      <Card className="bg-gradient-to-r from-slate-100 to-slate-50 border-dashed border-2 border-slate-300">
        <CardContent className="p-6 text-center">
          <div className="text-sm text-slate-500 mb-2">Espaço Publicitário</div>
          <div className="text-xs text-slate-400">300x250</div>
          <div className="mt-4 p-4 bg-white/50 rounded border border-slate-200">
            <div className="text-xs text-slate-600">Anúncio AdSense</div>
          </div>
        </CardContent>
      </Card>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <Card className="sidebar-sticky">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-exaltius-blue flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-exaltius-gold" />
              Posts Relacionados
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {relatedPosts.map((post) => (
              <Link 
                key={post.id} 
                to={`/post/${post.slug}`}
                className="block group"
              >
                <div className="space-y-2 p-3 rounded-lg hover:bg-slate-50 transition-all duration-200 border border-transparent hover:border-slate-200">
                  <h4 className="font-semibold text-sm text-slate-900 group-hover:text-exaltius-blue transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs bg-exaltius-gold/10 text-exaltius-blue border-exaltius-gold/20">
                      {post.category}
                    </Badge>
                  </div>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Ad Space 2 */}
      <Card className="bg-gradient-to-r from-amber-50 to-yellow-50 border-dashed border-2 border-amber-200">
        <CardContent className="p-6 text-center">
          <div className="text-sm text-amber-600 mb-2">Espaço Publicitário</div>
          <div className="text-xs text-amber-500">300x600</div>
          <div className="mt-4 p-4 bg-white/50 rounded border border-amber-200">
            <div className="text-xs text-amber-700">Anúncio Display</div>
          </div>
        </CardContent>
      </Card>

      {/* Popular Posts */}
      {popularPosts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-bold text-exaltius-blue flex items-center gap-2">
              <Eye className="h-5 w-5 text-exaltius-gold" />
              Mais Lidos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {popularPosts.map((post, index) => (
              <Link 
                key={post.id} 
                to={`/post/${post.slug}`}
                className="block group"
              >
                <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-all duration-200 border border-transparent hover:border-slate-200">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-exaltius-gold text-exaltius-blue font-bold text-sm flex items-center justify-center">
                    {index + 1}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-semibold text-sm text-slate-900 group-hover:text-exaltius-blue transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span>{post.views.toLocaleString()} visualizações</span>
                      <span>{post.readTime} min leitura</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Newsletter Signup */}
      <Card className="bg-gradient-to-r from-exaltius-blue to-exaltius-blue-light text-white">
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
    </aside>
  );
};

export default Sidebar;
