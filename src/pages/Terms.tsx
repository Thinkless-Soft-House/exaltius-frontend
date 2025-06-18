
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Eye, Shield, Users, AlertTriangle, ExternalLink, MessageSquare, RefreshCw } from "lucide-react";

const Terms = () => {
  const currentDate = new Date().toLocaleDateString('pt-BR');

  const sections = [
    {
      icon: FileText,
      title: "1. Aceitação dos Termos",
      content: "Ao acessar o site Exaltius, você declara que leu, entendeu e concorda com todos os termos aqui descritos. Caso não concorde, recomendamos que não utilize o site."
    },
    {
      icon: Eye,
      title: "2. Finalidade do Site",
      content: "O Exaltius é um blog com fins informativos, que publica conteúdos sobre finanças pessoais, investimentos, economia e desenvolvimento financeiro. Não oferecemos consultoria financeira personalizada ou recomendações de investimentos."
    },
    {
      icon: Shield,
      title: "3. Uso do Conteúdo",
      content: "Todos os textos, imagens, vídeos e demais conteúdos disponibilizados no blog são de propriedade do Exaltius ou licenciados para uso.",
      items: [
        "É proibida a reprodução, modificação, distribuição ou republicação de qualquer conteúdo sem autorização prévia por escrito.",
        "O usuário pode compartilhar os links do site livremente, desde que respeite a integridade do conteúdo."
      ]
    },
    {
      icon: Users,
      title: "4. Responsabilidades do Usuário",
      content: "Ao utilizar o Exaltius, você se compromete a:",
      items: [
        "Não utilizar o site para fins ilegais ou não autorizados;",
        "Não tentar acessar áreas restritas, invadir sistemas ou comprometer a segurança do site;",
        "Não publicar comentários ofensivos, discriminatórios ou de caráter ilegal."
      ]
    },
    {
      icon: AlertTriangle,
      title: "5. Limitação de Responsabilidade",
      content: "As informações publicadas no blog são baseadas em fontes consideradas confiáveis e redigidas com o objetivo de informar. No entanto, não garantimos a total precisão, atualidade ou aplicabilidade dos conteúdos.",
      footer: "O uso das informações aqui disponíveis é de inteira responsabilidade do usuário. O Exaltius não se responsabiliza por decisões tomadas com base nos conteúdos publicados."
    },
    {
      icon: MessageSquare,
      title: "6. Comentários e Participações",
      content: "O Exaltius se reserva o direito de moderar, editar ou remover comentários que violem estes termos ou que contenham spam, linguagem ofensiva, conteúdo ilegal ou irrelevante."
    },
    {
      icon: ExternalLink,
      title: "7. Links para Terceiros",
      content: "O blog pode conter links para sites externos. O Exaltius não se responsabiliza pelo conteúdo ou pelas políticas de privacidade de tais sites."
    },
    {
      icon: RefreshCw,
      title: "8. Modificações nos Termos",
      content: "O Exaltius pode alterar estes Termos de Uso a qualquer momento, sem aviso prévio. A versão mais recente estará sempre disponível nesta página. O uso contínuo do site após alterações indica concordância com os novos termos."
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Link 
            to="/" 
            className="inline-flex items-center text-exaltius-blue hover:text-exaltius-gold transition-colors duration-200 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao início
          </Link>
          
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold text-exaltius-blue mb-4">
              Termos de Uso
            </h1>
            <div className="flex items-center justify-center space-x-2 text-slate-600">
              <FileText className="h-5 w-5 text-exaltius-gold" />
              <span className="text-lg">Exaltius - Portal de Educação Financeira</span>
            </div>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Data de vigência: {currentDate}
            </p>
          </div>
        </div>

        {/* Introduction */}
        <Card className="mb-8 border-l-4 border-l-exaltius-gold">
          <CardContent className="pt-6">
            <p className="text-lg text-slate-700 leading-relaxed">
              Bem-vindo ao <strong className="text-exaltius-blue">Exaltius</strong> (https://exaltius.com). 
              Ao acessar ou utilizar este blog, você concorda com os seguintes Termos de Uso. 
              Por favor, leia atentamente antes de navegar ou interagir com nossos conteúdos.
            </p>
          </CardContent>
        </Card>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <Card key={index} className="finance-card hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-exaltius-blue">
                  <div className="p-2 bg-exaltius-gold/10 rounded-lg">
                    <section.icon className="h-6 w-6 text-exaltius-gold" />
                  </div>
                  <span className="text-xl">{section.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 leading-relaxed mb-4">
                  {section.content}
                </p>
                
                {section.items && (
                  <ul className="space-y-2 ml-4">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-slate-700 flex items-start">
                        <span className="text-exaltius-gold mr-2 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.footer && (
                  <div className="mt-4 p-4 bg-exaltius-gold/5 rounded-lg border-l-4 border-l-exaltius-gold">
                    <p className="text-slate-700 font-medium">{section.footer}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Section */}
        <Card className="mt-12 bg-gradient-to-r from-exaltius-blue to-exaltius-blue/90 text-white">
          <CardContent className="pt-8 pb-8 text-center">
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="p-3 bg-white/10 rounded-full">
                  <FileText className="h-8 w-8" />
                </div>
              </div>
              <h3 className="text-2xl font-bold">Dúvidas sobre os Termos?</h3>
              <p className="text-slate-200 max-w-2xl mx-auto">
                Se você tiver dúvidas, sugestões ou solicitações sobre estes Termos de Uso, 
                não hesite em entrar em contato conosco.
              </p>
              <div className="pt-4">
                <Button 
                  variant="secondary" 
                  className="bg-exaltius-gold hover:bg-exaltius-gold-light text-exaltius-blue font-semibold"
                >
                  contato@exaltius.com
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Articles */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-exaltius-blue mb-8 text-center">
            Artigos Relacionados
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="finance-card post-card-hover">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="h-2 w-full bg-exaltius-gold/20 rounded-full">
                    <div className="h-2 w-3/4 bg-exaltius-gold rounded-full"></div>
                  </div>
                  <h3 className="font-semibold text-exaltius-blue">
                    Direitos do Investidor no Brasil
                  </h3>
                  <p className="text-sm text-slate-600">
                    Conheça seus direitos como investidor e como se proteger no mercado financeiro.
                  </p>
                  <Link 
                    to="/categoria/educacao-financeira" 
                    className="text-exaltius-gold hover:text-exaltius-blue text-sm font-medium inline-block"
                  >
                    Ler mais →
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="finance-card post-card-hover">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="h-2 w-full bg-exaltius-gold/20 rounded-full">
                    <div className="h-2 w-2/3 bg-exaltius-gold rounded-full"></div>
                  </div>
                  <h3 className="font-semibold text-exaltius-blue">
                    Como Ler e Entender Contratos Financeiros
                  </h3>
                  <p className="text-sm text-slate-600">
                    Dicas para analisar contratos de investimento e produtos financeiros.
                  </p>
                  <Link 
                    to="/categoria/educacao-financeira" 
                    className="text-exaltius-gold hover:text-exaltius-blue text-sm font-medium inline-block"
                  >
                    Ler mais →
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="finance-card post-card-hover">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="h-2 w-full bg-exaltius-gold/20 rounded-full">
                    <div className="h-2 w-4/5 bg-exaltius-gold rounded-full"></div>
                  </div>
                  <h3 className="font-semibold text-exaltius-blue">
                    Regulamentação do Mercado Financeiro
                  </h3>
                  <p className="text-sm text-slate-600">
                    Entenda como funciona a regulamentação e fiscalização do mercado no Brasil.
                  </p>
                  <Link 
                    to="/categoria/investimentos" 
                    className="text-exaltius-gold hover:text-exaltius-blue text-sm font-medium inline-block"
                  >
                    Ler mais →
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
