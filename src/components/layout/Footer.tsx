
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Início", href: "/" },
    { label: "Sobre", href: "/sobre" },
    { label: "Contato", href: "/contato" },
    { label: "Política de Privacidade", href: "/privacidade" },
    { label: "Termos de Uso", href: "/termos" },
  ];

  const categories = [
    { label: "Investimentos", href: "/categoria/investimentos" },
    { label: "Renda Extra", href: "/categoria/renda-extra" },
    { label: "Finanças Pessoais", href: "/categoria/financas-pessoais" },
    { label: "Educação Financeira", href: "/categoria/educacao-financeira" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-slate-900 text-white mt-16">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <img 
              src="/lovable-uploads/0ef498cc-30ac-42a5-bb0d-f62f8d06612b.png" 
              alt="Exaltius"
              className="h-8 w-auto filter brightness-0 invert"
            />
            <p className="text-slate-300 text-sm leading-relaxed">
              Sua fonte confiável para educação financeira, investimentos inteligentes e estratégias para construir riqueza de forma sustentável.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-slate-400 hover:text-exaltius-gold transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Links Rápidos</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-slate-300 hover:text-exaltius-gold transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Categorias</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.href}>
                  <Link
                    to={category.href}
                    className="text-slate-300 hover:text-exaltius-gold transition-colors duration-200 text-sm"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-slate-300">
                <Mail className="h-4 w-4 text-exaltius-gold" />
                <span>contato@exaltius.com.br</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-slate-300">
                <Phone className="h-4 w-4 text-exaltius-gold" />
                <span>+55 (11) 9999-9999</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-slate-300">
                <MapPin className="h-4 w-4 text-exaltius-gold" />
                <span>São Paulo, Brasil</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-white mb-2">
                Mantenha-se Atualizado
              </h3>
              <p className="text-slate-300 text-sm">
                Receba insights exclusivos sobre o mundo financeiro
              </p>
            </div>
            <div className="flex w-full md:w-auto max-w-md">
              <input
                type="email"
                placeholder="Digite seu email"
                className="flex-1 px-4 py-2 rounded-l-md text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-exaltius-gold"
              />
              <button className="bg-exaltius-gold text-exaltius-blue font-semibold px-6 py-2 rounded-r-md hover:bg-exaltius-gold-light transition-colors duration-200">
                Inscrever
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 text-sm text-slate-400">
            <div>
              © {currentYear} Exaltius. Todos os direitos reservados.
            </div>
            <div className="flex items-center space-x-6">
              <span>Desenvolvido com ❤️ para sua educação financeira</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
