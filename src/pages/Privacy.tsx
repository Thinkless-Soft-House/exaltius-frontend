
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, Eye, Cookie, Share2, Lock, ExternalLink, UserCheck, RefreshCw } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

const Privacy = () => {
  const { t } = useI18n();
  const currentDate = new Date().toLocaleDateString('pt-BR');

  const sections = [
    {
      icon: Eye,
      title: "1. Coleta de Informações",
      content: "Podemos coletar informações dos usuários das seguintes formas:",
      items: [
        "Informações fornecidas pelo usuário: nome, e-mail ou outras informações enviadas voluntariamente por meio de formulários de contato, comentários ou assinaturas de newsletter.",
        "Informações coletadas automaticamente: dados como endereço IP, tipo de navegador, páginas acessadas, tempo de permanência no site e cookies."
      ]
    },
    {
      icon: Shield,
      title: "2. Uso das Informações",
      content: "As informações coletadas podem ser utilizadas para:",
      items: [
        "Melhorar a experiência de navegação dos usuários;",
        "Enviar newsletters e comunicações, mediante consentimento prévio;",
        "Analisar o comportamento dos usuários para fins de estatísticas e melhorias do conteúdo;",
        "Cumprir obrigações legais, se aplicável."
      ]
    },
    {
      icon: Cookie,
      title: "3. Cookies",
      content: "Utilizamos cookies para oferecer uma experiência personalizada e entender como os visitantes interagem com o blog. Você pode configurar seu navegador para recusar cookies, mas isso pode limitar algumas funcionalidades do site."
    },
    {
      icon: Share2,
      title: "4. Compartilhamento de Dados",
      content: "O Exaltius não vende, troca ou aluga informações pessoais dos usuários. Podemos compartilhar dados com serviços de terceiros apenas quando necessário para:",
      items: [
        "Análise de tráfego (ex: Google Analytics);",
        "Envio de e-mails (ex: Mailchimp ou similar);",
        "Cumprimento de obrigações legais."
      ]
    },
    {
      icon: Lock,
      title: "5. Segurança das Informações",
      content: "Adotamos medidas de segurança técnica e organizacional para proteger os dados dos usuários contra acesso não autorizado, alteração, divulgação ou destruição."
    },
    {
      icon: ExternalLink,
      title: "6. Links Externos",
      content: "Nosso site pode conter links para outros sites. Não nos responsabilizamos pelas práticas de privacidade ou conteúdo de sites de terceiros."
    },
    {
      icon: UserCheck,
      title: "7. Direitos dos Usuários",
      content: "Você tem o direito de:",
      items: [
        "Acessar seus dados;",
        "Solicitar a correção ou exclusão de informações pessoais;",
        "Revogar o consentimento para o uso de seus dados."
      ],
      footer: "Para exercer esses direitos, entre em contato pelo e-mail: contato@exaltius.com"
    },
    {
      icon: RefreshCw,
      title: "8. Alterações nesta Política",
      content: "Esta Política de Privacidade pode ser atualizada periodicamente. Recomendamos que você revise esta página regularmente para se manter informado sobre quaisquer mudanças."
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
              Política de Privacidade
            </h1>
            <div className="flex items-center justify-center space-x-2 text-slate-600">
              <Shield className="h-5 w-5 text-exaltius-gold" />
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
              Bem-vindo ao <strong className="text-exaltius-blue">Exaltius</strong> (https://exaltius.com), 
              um portal dedicado a compartilhar conteúdos informativos sobre finanças, investimentos e 
              desenvolvimento pessoal. Esta Política de Privacidade descreve como coletamos, usamos, 
              armazenamos e protegemos os dados dos nossos visitantes.
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
                  <Shield className="h-8 w-8" />
                </div>
              </div>
              <h3 className="text-2xl font-bold">Dúvidas sobre Privacidade?</h3>
              <p className="text-slate-200 max-w-2xl mx-auto">
                Se você tiver dúvidas sobre esta Política de Privacidade ou sobre como tratamos seus dados, 
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
        {/* <div className="mt-16">
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
                    Como Proteger seus Dados Financeiros Online
                  </h3>
                  <p className="text-sm text-slate-600">
                    Dicas essenciais para manter suas informações financeiras seguras na internet.
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
                    Segurança em Investimentos Digitais
                  </h3>
                  <p className="text-sm text-slate-600">
                    Como escolher plataformas confiáveis para seus investimentos online.
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

            <Card className="finance-card post-card-hover">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="h-2 w-full bg-exaltius-gold/20 rounded-full">
                    <div className="h-2 w-4/5 bg-exaltius-gold rounded-full"></div>
                  </div>
                  <h3 className="font-semibold text-exaltius-blue">
                    Transparência Financeira Pessoal
                  </h3>
                  <p className="text-sm text-slate-600">
                    A importância de manter controle e transparência sobre suas finanças.
                  </p>
                  <Link 
                    to="/categoria/financas-pessoais" 
                    className="text-exaltius-gold hover:text-exaltius-blue text-sm font-medium inline-block"
                  >
                    Ler mais →
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div> */}
      </div>
    </Layout>
  );
};

export default Privacy;
