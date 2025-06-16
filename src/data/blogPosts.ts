
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
    content: "Como Investir em ações para iniciantes pode parecer complicado no início, mas com as informações certas você pode começar hoje mesmo. Primeiro, é importante entender seus objetivos financeiros e definir quanto você pode investir mensalmente. Para quem está começando, recomendamos começar com investimentos mais conservadores como Tesouro Direto e CDI, e depois partir para ações. O mercado de ações oferece boas oportunidades de rentabilidade a longo prazo, mas é importante estudar antes de investir. Algumas dicas importantes: diversifique seus investimentos, não coloque todos os ovos na mesma cesta, tenha paciência e disciplina, e sempre invista pensando no longo prazo. Lembre-se que investir é uma maratona, não uma corrida de 100 metros.",
    category: "investimentos",
    author: "João Silva",
    publishedAt: "2024-01-15",
    tags: ["investimentos", "iniciante", "educação financeira", "ações"],
    imageUrl: "/lovable-uploads/8caf0661-0400-4ba1-a372-1a874f658a62.png"
  },
  {
    id: "2", 
    title: "5 Formas de Criar Renda Extra em Casa",
    slug: "5-formas-renda-extra-casa",
    excerpt: "Descubra maneiras práticas de aumentar sua renda trabalhando de casa.",
    content: "Com a economia digital, existem várias oportunidades para gerar renda extra trabalhando de casa. Algumas opções incluem freelancing em plataformas como Upwork e 99Freelas, venda online através de marketplaces como Mercado Livre e Amazon, criação de cursos digitais na Udemy ou Hotmart, prestação de serviços como consultoria online, e até mesmo investimentos em renda variável. O importante é escolher algo que combine com suas habilidades e disponibilidade de tempo. Para ter sucesso com renda extra, é fundamental ter disciplina, organização e persistência. Muitas pessoas conseguem transformar sua renda extra em sua principal fonte de renda com o tempo.",
    category: "renda-extra",
    author: "Maria Santos",
    publishedAt: "2024-01-10",
    tags: ["renda extra", "trabalho remoto", "empreendedorismo", "freelance"],
    imageUrl: "/lovable-uploads/2dd426b2-9eb4-4d68-a013-6cbcd6b717db.png"
  },
  {
    id: "3",
    title: "Planilha de Controle Financeiro Pessoal",
    slug: "planilha-controle-financeiro-pessoal", 
    excerpt: "Como organizar suas finanças pessoais com uma planilha simples e eficaz.",
    content: "O controle financeiro é fundamental para alcançar seus objetivos financeiros. Uma planilha bem estruturada pode te ajudar a acompanhar receitas, despesas, investimentos e muito mais. Recomendamos criar categorias para suas despesas como moradia, alimentação, transporte, lazer e investimentos. É importante anotar todas as movimentações financeiras, por menor que sejam. Com o tempo, você conseguirá identificar padrões de gastos e oportunidades de economia. Existem várias ferramentas gratuitas como Google Sheets e Excel que podem te ajudar. O importante é manter a consistência e atualizar sua planilha regularmente.",
    category: "financas-pessoais",
    author: "Carlos Lima",
    publishedAt: "2024-01-05",
    tags: ["finanças pessoais", "organização", "planilha", "controle"],
    imageUrl: "/lovable-uploads/fb1b246e-8168-4536-b263-19909198f51a.png"
  },
  {
    id: "4",
    title: "Reserva de Emergência: Quanto Guardar?",
    slug: "reserva-emergencia-quanto-guardar",
    excerpt: "Aprenda a calcular o valor ideal para sua reserva de emergência.",
    content: "A reserva de emergência é um dos pilares da educação financeira e planejamento financeiro pessoal. Especialistas recomendam guardar entre 6 a 12 meses de gastos essenciais em investimentos líquidos e de baixo risco. Para calcular sua reserva, some todos seus gastos fixos mensais como aluguel, financiamentos, alimentação, plano de saúde e multiplique pelo número de meses desejado. É importante manter esta reserva em investimentos que permitam resgate imediato, como poupança, CDB com liquidez diária ou Tesouro Selic. Lembre-se: a reserva de emergência não é para investir em oportunidades, ela é sua segurança financeira para situações imprevistas como desemprego, problemas de saúde ou outras emergências.",
    category: "educacao-financeira",
    author: "Ana Costa",
    publishedAt: "2024-01-01",
    tags: ["reserva de emergência", "planejamento", "segurança financeira", "liquidez"],
    imageUrl: "/lovable-uploads/11faacf3-bc6a-47fc-93c6-a3e671f7756d.png"
  },
  {
    id: "5",
    title: "Tesouro Direto para Iniciantes",
    slug: "tesouro-direto-iniciantes",
    excerpt: "Tudo que você precisa saber sobre o Tesouro Direto para começar a investir.",
    content: "O Tesouro Direto é uma das melhores opções para quem está começando a investir no mercado financeiro. É seguro, acessível e oferece boa rentabilidade comparado à poupança. Existem diferentes tipos de títulos: Tesouro Selic (pós-fixado), Tesouro IPCA (indexado à inflação) e Tesouro Prefixado (taxa fixa). Para investir, você precisa abrir conta em uma corretora, fazer seu cadastro no Tesouro Direto e escolher os títulos que mais se adequam ao seu perfil. O investimento mínimo é baixo, cerca de R$ 30, e você pode investir mensalmente. É importante entender que alguns títulos têm marcação a mercado, ou seja, podem oscilar de preço antes do vencimento, mas se você levar até o final, receberá exatamente o que foi prometido.",
    category: "investimentos",
    author: "Pedro Oliveira",
    publishedAt: "2023-12-28",
    tags: ["tesouro direto", "renda fixa", "investimentos seguros", "títulos públicos"],
    imageUrl: "/lovable-uploads/e012c59b-1219-40aa-b338-5af9798b801c.png"
  }
];
