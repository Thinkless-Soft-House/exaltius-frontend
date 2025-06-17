
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import Sidebar from "@/components/layout/Sidebar";
import PostCard from "@/components/blog/PostCard";
import { Button } from "@/components/ui/button";
import { TrendingUp, DollarSign, PiggyBank, GraduationCap, ChevronRight } from "lucide-react";

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

const Index = () => {
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
  const [categoryPosts, setCategoryPosts] = useState<{[key: string]: Post[]}>({});

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
        slug: "10-formas-gerar-renda-extra-online",
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
        slug: "planejamento-financeiro-metodo-50-30-20",
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
        slug: "tesouro-direto-vs-cdb-qual-escolher-2024",
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
        slug: "como-criar-fundo-emergencia-12-meses",
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

  return (
    <Layout>
      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="text-center py-12 mb-12">
          <h1 className="text-4xl lg:text-6xl font-bold text-exaltius-blue mb-6 animate-fade-in">
            Transforme Suas
            <span className="block text-exaltius-gold">Finanças</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8 leading-relaxed animate-slide-up">
            Descubra estratégias comprovadas para investir, economizar e construir riqueza de forma inteligente. 
            Sua jornada rumo à independência financeira começa aqui.
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
            {/* Featured Posts */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-exaltius-blue">
                  Destaques da Semana
                </h2>
                <Button variant="outline" className="border-exaltius-blue text-exaltius-blue hover:bg-exaltius-blue hover:text-white">
                  Ver Todos
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredPosts.map((post, index) => (
                  <PostCard
                    key={post.id}
                    {...post}
                    size={index === 0 ? "large" : "medium"}
                  />
                ))}
              </div>
            </section>

            {/* Ad Space */}
            <section className="my-8">
              <div className="bg-gradient-to-r from-slate-100 to-slate-50 border-dashed border-2 border-slate-300 rounded-lg p-8 text-center">
                <div className="text-sm text-slate-500 mb-2">Espaço Publicitário</div>
                <div className="text-xs text-slate-400">728x90 - Leaderboard</div>
                <div className="mt-4 p-4 bg-white/50 rounded border border-slate-200">
                  <div className="text-xs text-slate-600">Anúncio AdSense</div>
                </div>
              </div>
            </section>

            {/* Categories Sections */}
            {categories.map((category) => (
              <section key={category.name} className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`${category.bgColor} p-3 rounded-lg`}>
                      <category.icon className={`h-6 w-6 ${category.color}`} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-exaltius-blue">
                        {category.name}
                      </h2>
                      <p className="text-slate-600">{category.description}</p>
                    </div>
                  </div>
                  <Button variant="outline" className="border-exaltius-blue text-exaltius-blue hover:bg-exaltius-blue hover:text-white">
                    Ver Mais
                  </Button>
                </div>

                {categoryPosts[category.name] && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {categoryPosts[category.name].slice(0, 2).map((post) => (
                      <PostCard key={post.id} {...post} size="medium" />
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Sidebar */}
          <Sidebar />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
