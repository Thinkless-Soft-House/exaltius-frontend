
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  publishedAt: string;
  tags: string[];
  imageUrl?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Como Começar a Investir do Zero",
    slug: "como-comecar-investir-zero",
    excerpt: "Guia completo para iniciantes que querem começar a investir sem conhecimento prévio.",
    content: "Investir pode parecer complicado no início, mas com as informações certas você pode começar hoje mesmo. Primeiro, é importante entender seus objetivos financeiros...",
    category: "investimentos",
    author: "João Silva",
    publishedAt: "2024-01-15",
    tags: ["investimentos", "iniciante", "educação financeira"],
    imageUrl: "/lovable-uploads/8caf0661-0400-4ba1-a372-1a874f658a62.png"
  },
  {
    id: "2", 
    title: "5 Formas de Criar Renda Extra em Casa",
    slug: "5-formas-renda-extra-casa",
    excerpt: "Descubra maneiras práticas de aumentar sua renda trabalhando de casa.",
    content: "Com a economia digital, existem várias oportunidades para gerar renda extra. Algumas opções incluem freelancing, venda online, cursos digitais...",
    category: "renda-extra",
    author: "Maria Santos",
    publishedAt: "2024-01-10",
    tags: ["renda extra", "trabalho remoto", "empreendedorismo"],
    imageUrl: "/lovable-uploads/2dd426b2-9eb4-4d68-a013-6cbcd6b717db.png"
  },
  {
    id: "3",
    title: "Planilha de Controle Financeiro Pessoal",
    slug: "planilha-controle-financeiro-pessoal", 
    excerpt: "Como organizar suas finanças pessoais com uma planilha simples e eficaz.",
    content: "O controle financeiro é fundamental para alcançar seus objetivos. Uma planilha bem estruturada pode te ajudar a acompanhar receitas, despesas...",
    category: "financas-pessoais",
    author: "Carlos Lima",
    publishedAt: "2024-01-05",
    tags: ["finanças pessoais", "organização", "planilha"],
    imageUrl: "/lovable-uploads/fb1b246e-8168-4536-b263-19909198f51a.png"
  },
  {
    id: "4",
    title: "Reserva de Emergência: Quanto Guardar?",
    slug: "reserva-emergencia-quanto-guardar",
    excerpt: "Aprenda a calcular o valor ideal para sua reserva de emergência.",
    content: "A reserva de emergência é um dos pilares da educação financeira. Especialistas recomendam guardar entre 6 a 12 meses de gastos...",
    category: "educacao-financeira",
    author: "Ana Costa",
    publishedAt: "2024-01-01",
    tags: ["reserva de emergência", "planejamento", "segurança financeira"],
    imageUrl: "/lovable-uploads/11faacf3-bc6a-47fc-93c6-a3e671f7756d.png"
  },
  {
    id: "5",
    title: "Tesouro Direto para Iniciantes",
    slug: "tesouro-direto-iniciantes",
    excerpt: "Tudo que você precisa saber sobre o Tesouro Direto para começar a investir.",
    content: "O Tesouro Direto é uma das melhores opções para quem está começando a investir. É seguro, acessível e oferece boa rentabilidade...",
    category: "investimentos",
    author: "Pedro Oliveira",
    publishedAt: "2023-12-28",
    tags: ["tesouro direto", "renda fixa", "investimentos seguros"],
    imageUrl: "/lovable-uploads/e012c59b-1219-40aa-b338-5af9798b801c.png"
  }
];
