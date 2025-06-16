
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Sidebar from "@/components/layout/Sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Eye, User, Share2, Facebook, Twitter, Linkedin, Link2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: number;
  views: number;
  featuredImage: string;
}

const Post = () => {
  const { slug } = useParams<{ slug: string }>();
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [nextPosts, setNextPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingNext, setLoadingNext] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Mock data - In a real app, this would come from an API
  const mockPosts: Post[] = [
    {
      id: "1",
      title: "Como Investir em Ações para Iniciantes: Guia Completo 2024",
      slug: "como-investir-acoes-iniciantes-guia-completo-2024",
      content: `
        <h2>Por que Investir em Ações?</h2>
        <p>Investir em ações é uma das formas mais eficazes de construir riqueza a longo prazo. Historicamente, o mercado de ações tem oferecido retornos superiores a outras classes de ativos, como títulos do governo e poupança.</p>
        
        <h3>Vantagens do Investimento em Ações</h3>
        <ul>
          <li>Potencial de retornos elevados a longo prazo</li>
          <li>Proteção contra a inflação</li>
          <li>Liquidez - pode vender suas ações a qualquer momento</li>
          <li>Participação no crescimento das empresas</li>
        </ul>

        <h2>Como Começar a Investir</h2>
        <p>Para começar a investir em ações, você precisa seguir alguns passos fundamentais:</p>
        
        <h3>1. Abra uma Conta em uma Corretora</h3>
        <p>O primeiro passo é escolher uma corretora de valores confiável. Pesquise sobre taxas, plataformas de investimento e suporte ao cliente.</p>
        
        <h3>2. Defina seus Objetivos</h3>
        <p>Antes de investir, é crucial definir seus objetivos financeiros e prazo de investimento. Isso ajudará a determinar sua estratégia.</p>
        
        <blockquote>
          "O tempo no mercado é mais importante que timing do mercado." - Warren Buffett
        </blockquote>
        
        <h3>3. Estude as Empresas</h3>
        <p>Analise os fundamentos das empresas antes de investir. Considere fatores como receita, lucro, dívidas e posição competitiva.</p>
        
        <h2>Estratégias para Iniciantes</h2>
        <p>Como iniciante, é recomendado começar com estratégias mais conservadoras:</p>
        
        <ul>
          <li>Diversificação: não coloque todos os ovos na mesma cesta</li>
          <li>Dollar-cost averaging: invista valores fixos regularmente</li>
          <li>Foque em empresas sólidas e conhecidas</li>
          <li>Mantenha uma reserva de emergência</li>
        </ul>
        
        <h2>Erros Comuns a Evitar</h2>
        <p>Muitos iniciantes cometem erros que podem prejudicar seus resultados:</p>
        
        <ul>
          <li>Investir dinheiro que pode precisar em curto prazo</li>
          <li>Tentar timing do mercado</li>
          <li>Não diversificar adequadamente</li>
          <li>Deixar emoções guiarem decisões</li>
        </ul>
        
        <h2>Conclusão</h2>
        <p>Investir em ações pode ser uma excelente forma de construir riqueza, mas requer educação, paciência e disciplina. Comece devagar, continue aprendendo e mantenha uma perspectiva de longo prazo.</p>
      `,
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
      title: "10 Formas Comprovadas de Gerar Renda Extra Online",
      slug: "10-formas-gerar-renda-extra-online",
      content: `
        <h2>A Revolução da Economia Digital</h2>
        <p>Vivemos em uma era onde as oportunidades de gerar renda extra online são infinitas. Com a democratização da internet e o crescimento do trabalho remoto, milhões de pessoas descobriram formas de complementar sua renda sem sair de casa.</p>
        
        <h2>1. Freelancing</h2>
        <p>Uma das formas mais populares de gerar renda extra é oferecendo seus serviços como freelancer. Plataformas como Upwork, Fiverr e 99Freelas conectam profissionais a clientes em todo o mundo.</p>
        
        <h3>Serviços Mais Procurados:</h3>
        <ul>
          <li>Redação e copywriting</li>
          <li>Design gráfico</li>
          <li>Programação</li>
          <li>Marketing digital</li>
          <li>Tradução</li>
        </ul>
        
        <h2>2. Criação de Conteúdo</h2>
        <p>Se você tem conhecimento em alguma área específica, pode monetizar esse conhecimento criando conteúdo digital.</p>
        
        <h2>3. E-commerce</h2>
        <p>Vender produtos online nunca foi tão acessível. Plataformas como Mercado Livre, Shopee e Amazon facilitam o processo de venda.</p>
        
        <blockquote>
          "O melhor momento para plantar uma árvore foi há 20 anos. O segundo melhor momento é agora." - Provérbio Chinês
        </blockquote>
        
        <p>Esta filosofia se aplica perfeitamente ao mundo digital. Não importa quando você começou, o importante é começar agora.</p>
      `,
      excerpt: "Explore métodos testados e aprovados para aumentar sua renda trabalhando pela internet.",
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
      slug: "planejamento-financeiro-metodo-50-30-20",
      content: `
        <h2>O Que é o Método 50/30/20?</h2>
        <p>O método 50/30/20 é uma estratégia simples e eficaz de planejamento financeiro que divide sua renda líquida em três categorias principais:</p>
        
        <ul>
          <li><strong>50% para necessidades</strong> - gastos essenciais</li>
          <li><strong>30% para desejos</strong> - gastos de lazer e estilo de vida</li>
          <li><strong>20% para poupança e investimentos</strong> - seu futuro financeiro</li>
        </ul>
        
        <h2>Como Implementar o Método</h2>
        <p>Para implementar com sucesso o método 50/30/20, siga estes passos:</p>
        
        <h3>1. Calcule sua Renda Líquida</h3>
        <p>Sua renda líquida é o que sobra após descontar impostos, INSS e outros descontos obrigatórios.</p>
        
        <h3>2. Categorize seus Gastos</h3>
        <p>Liste todos os seus gastos mensais e classifique-os em necessidades, desejos ou poupança.</p>
        
        <h2>Necessidades (50%)</h2>
        <p>Incluem:</p>
        <ul>
          <li>Moradia (aluguel, financiamento, condomínio)</li>
          <li>Alimentação básica</li>
          <li>Transporte</li>
          <li>Seguros obrigatórios</li>
          <li>Contas básicas (água, luz, telefone)</li>
        </ul>
        
        <h2>Desejos (30%)</h2>
        <p>Incluem:</p>
        <ul>
          <li>Entretenimento</li>
          <li>Restaurantes</li>
          <li>Compras não essenciais</li>
          <li>Hobbies</li>
          <li>Streaming e assinaturas</li>
        </ul>
        
        <h2>Poupança e Investimentos (20%)</h2>
        <p>Esta categoria é crucial para seu futuro financeiro e deve incluir:</p>
        <ul>
          <li>Reserva de emergência</li>
          <li>Investimentos para aposentadoria</li>
          <li>Objetivos de longo prazo</li>
          <li>Pagamento extra de dívidas</li>
        </ul>
      `,
      excerpt: "Aprenda a organizar suas finanças usando o método mais eficaz do mundo.",
      category: "Finanças Pessoais",
      author: "Roberto Lima",
      publishedAt: "2024-01-10",
      readTime: 6,
      views: 3200,
      featuredImage: "/lovable-uploads/2dd426b2-9eb4-4d68-a013-6cbcd6b717db.png"
    }
  ];

  const findPostBySlug = (targetSlug: string): Post | undefined => {
    return mockPosts.find(post => post.slug === targetSlug);
  };

  const getNextPosts = (currentPostDate: string, page: number, limit: number = 1): Post[] => {
    const currentDate = new Date(currentPostDate);
    const olderPosts = mockPosts
      .filter(post => new Date(post.publishedAt) < currentDate)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    
    const startIndex = (page - 1) * limit;
    return olderPosts.slice(startIndex, startIndex + limit);
  };

  useEffect(() => {
    if (slug) {
      setLoading(true);
      const post = findPostBySlug(slug);
      
      if (post) {
        setCurrentPost(post);
        // Reset for new post
        setNextPosts([]);
        setCurrentPage(1);
        
        // Load first next post
        const nextPostsData = getNextPosts(post.publishedAt, 1);
        setNextPosts(nextPostsData);
      }
      
      setLoading(false);
    }
  }, [slug]);

  // Infinite scroll logic
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >= 
        document.documentElement.offsetHeight - 1000 &&
        !loadingNext &&
        currentPost
      ) {
        loadNextPost();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPost, loadingNext, currentPage]);

  const loadNextPost = async () => {
    if (!currentPost || loadingNext) return;
    
    setLoadingNext(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const nextPage = currentPage + 1;
    const lastPostDate = nextPosts.length > 0 
      ? nextPosts[nextPosts.length - 1].publishedAt 
      : currentPost.publishedAt;
    
    const newPosts = getNextPosts(lastPostDate, nextPage);
    
    if (newPosts.length > 0) {
      setNextPosts(prev => [...prev, ...newPosts]);
      setCurrentPage(nextPage);
    }
    
    setLoadingNext(false);
  };

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
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
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
                  src={currentPost.featuredImage}
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
                      <span>{currentPost.readTime} min de leitura</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Eye className="h-4 w-4" />
                      <span>{currentPost.views.toLocaleString()} visualizações</span>
                    </div>
                  </div>

                  {/* Share Buttons */}
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-slate-600 mr-2">Compartilhar:</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => sharePost('facebook')}
                      className="text-blue-600 border-blue-200 hover:bg-blue-50"
                    >
                      <Facebook className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => sharePost('twitter')}
                      className="text-sky-600 border-sky-200 hover:bg-sky-50"
                    >
                      <Twitter className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => sharePost('linkedin')}
                      className="text-blue-700 border-blue-200 hover:bg-blue-50"
                    >
                      <Linkedin className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => sharePost('copy')}
                      className="text-slate-600 border-slate-200 hover:bg-slate-50"
                    >
                      <Link2 className="h-4 w-4" />
                    </Button>
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

            {/* Next Posts (Infinite Scroll) */}
            {nextPosts.map((post) => (
              <article key={post.id} className="mb-16 pt-16 border-t-2 border-slate-200">
                <div className="relative mb-8 rounded-lg overflow-hidden">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-64 md:h-96 object-cover"
                  />
                  <div className="absolute top-6 left-6">
                    <Badge className="bg-exaltius-blue text-white text-sm px-3 py-1">
                      {post.category}
                    </Badge>
                  </div>
                </div>

                <header className="mb-8">
                  <h1 className="text-3xl lg:text-5xl font-bold text-exaltius-blue mb-6 leading-tight">
                    {post.title}
                  </h1>
                  
                  <div className="flex flex-wrap items-center gap-4 pb-6 border-b border-slate-200 text-sm text-slate-600">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span className="font-medium">{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime} min de leitura</span>
                    </div>
                  </div>
                </header>

                <div 
                  className="post-content prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </article>
            ))}

            {/* Loading Indicator */}
            {loadingNext && (
              <div className="text-center py-8">
                <div className="animate-pulse">
                  <div className="h-8 bg-slate-200 rounded w-3/4 mx-auto mb-4"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/2 mx-auto"></div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <Sidebar currentPostId={currentPost.id} category={currentPost.category} />
        </div>
      </div>
    </Layout>
  );
};

export default Post;
