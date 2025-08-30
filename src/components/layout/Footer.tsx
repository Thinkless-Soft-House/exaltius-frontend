import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { useI18n } from "@/i18n/useI18n";

const Footer = () => {
  const { t, lang } = useI18n();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: t.home || "Início", href: "/" },
    // { label: t.contact || "Contato", href: "/contato" },
    { label: t.privacy_policy || "Política de Privacidade", href: "/privacidade" },
    { label: t.terms_of_use || "Termos de Uso", href: "/termos" },
  ];

  // const categories = [
  //   { label: t.investments || "Investimentos", href: "/categoria/investimentos" },
  //   { label: t.extra_income || "Renda Extra", href: "/categoria/renda-extra" },
  //   { label: t.personal_finance || "Finanças Pessoais", href: "/categoria/financas-pessoais" },
  //   { label: t.financial_education || "Educação Financeira", href: "/categoria/educacao-financeira" },
  // ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: t.facebook || "Facebook" },
    { icon: Instagram, href: "#", label: t.instagram || "Instagram" },
    { icon: Twitter, href: "#", label: t.twitter || "Twitter" },
    { icon: Youtube, href: "#", label: t.youtube || "YouTube" },
  ];

  return (
    <footer className="bg-slate-900 text-white mt-16">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Marca e descrição */}
          <div className="space-y-4 flex flex-col justify-between">
            <div>
              <img
                src="/lovable-uploads/0ef498cc-30ac-42a5-bb0d-f62f8d06612b.png"
                alt="Exaltius"
                className="h-20 w-auto mb-2 filter brightness-0 invert"
              />
              <p className="text-slate-300 text-sm leading-relaxed">
                {t.brand_description || "Sua fonte confiável para educação financeira, investimentos inteligentes e estratégias para construir riqueza de forma sustentável."}
              </p>
            </div>
            <div className="flex space-x-4 mt-4">
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

          {/* Links institucionais */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Institucional</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-slate-300 hover:text-exaltius-gold transition-colors duration-200 text-sm">Início</Link></li>
              <li><Link to="/privacy" className="text-slate-300 hover:text-exaltius-gold transition-colors duration-200 text-sm">Política de Privacidade</Link></li>
              <li><Link to="/terms" className="text-slate-300 hover:text-exaltius-gold transition-colors duration-200 text-sm">Termos de Uso</Link></li>
              <li><Link to="/contact" className="text-slate-300 hover:text-exaltius-gold transition-colors duration-200 text-sm">Contato</Link></li>
            </ul>
          </div>

          {/* Newsletter moderna */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Newsletter</h3>
            <p className="text-slate-300 text-sm">Receba insights exclusivos sobre o mundo financeiro</p>
            <form className="flex w-full max-w-md">
              <input
                type="email"
                placeholder="Digite seu email"
                className="flex-1 px-4 py-2 rounded-l-md text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-exaltius-gold"
                required
              />
              <button type="submit" className="bg-exaltius-gold text-exaltius-blue font-semibold px-6 py-2 rounded-r-md hover:bg-exaltius-gold-light transition-colors duration-200">
                Inscrever
              </button>
            </form>
          </div>
        </div>
      </div>
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
