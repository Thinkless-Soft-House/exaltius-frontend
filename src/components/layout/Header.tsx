import { useEffect, useState, useMemo } from "react";
import { useGetTags } from "@/hooks/useGetTags";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MegaSearch } from "@/components/ui/MegaSearch";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Search, Menu, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import ReactCountryFlag from "react-country-flag";
import { useI18n } from "@/i18n/useI18n";

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [country, setCountry] = useState(() => {
    // Tenta carregar do localStorage
    const saved = localStorage.getItem("selectedCountry");
    return saved ? JSON.parse(saved) : null;
  });
  const [tagNavItems, setTagNavItems] = useState([]);
  const navigate = useNavigate();
  const { getActive } = useGetTags();
  const { t, setLang } = useI18n();

  // Detecta idioma do localStorage ou fallback para 'pt'
  const idioma = useMemo(() => {
    const country = localStorage.getItem("selectedCountry");
    if (country) {
      try {
        const parsed = JSON.parse(country);
        return parsed?.value?.toLowerCase() || "pt";
      } catch {
        return "pt";
      }
    }
    return "pt";
  }, []);

  useEffect(() => {
    getActive().then((res) => {
      // Suporta resposta paginada (res.data.items) ou array direto
      let tags = [];
      if (Array.isArray(res?.data?.items)) {
        tags = res.data.items;
      } else if (Array.isArray(res?.items)) {
        tags = res.items;
      } else if (Array.isArray(res)) {
        tags = res;
      }
      setTagNavItems(tags.filter((tag) => tag.isMainTag));
    });
  }, [getActive]);


  // Sempre atualiza ao renderizar
  const navigationItems = [
    { label: t.home || "Início", href: "/" },
  ];


  // Opções fixas de idioma
  const languageOptions = [
    { value: "en", label: "English", countryCode: "US" },
    { value: "pt-BR", label: "Português (Brasil)", countryCode: "BR" },
    { value: "es", label: "Español", countryCode: "ES" },
    { value: "fr", label: "Français", countryCode: "FR" },
    { value: "de", label: "Deutsch", countryCode: "DE" },
    { value: "it", label: "Italiano", countryCode: "IT" },
  ];


  // Estado do idioma selecionado e do dropdown
  const [selectedLang, setSelectedLang] = useState(() => {
    const stored = localStorage.getItem("lang");
    if (stored && languageOptions.some(opt => opt.value === stored)) {
      return languageOptions.find(opt => opt.value === stored)!;
    }
    localStorage.setItem("lang", "en");
    return languageOptions.find(opt => opt.value === "en")!;
  });
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  const handleLangChange = (lang: typeof languageOptions[number]) => {
    setSelectedLang(lang);
    setLang(lang.value); // Troca o idioma no contexto instantaneamente
    localStorage.setItem("lang", lang.value);
    window.dispatchEvent(new Event("storage"));
  };

  // Removido handleSearch e searchQuery, pois MegaSearch cuida da busca


  // Removido código antigo de countryList/countryOptions

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="/lovable-uploads/0ef498cc-30ac-42a5-bb0d-f62f8d06612b.png"
              alt="Exaltius"
              className="h-32 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-sm font-medium text-slate-700 hover:text-exaltius-blue transition-colors duration-200 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-exaltius-gold transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Search and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div style={{ minWidth: 170, maxWidth: 200 }}>
              <div className="relative">
                <button
                  type="button"
                  className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-all w-full"
                  style={{ minWidth: 150 }}
                  onClick={() => setShowLangDropdown((v) => !v)}
                >
                  <ReactCountryFlag
                    countryCode={selectedLang.countryCode}
                    svg
                    style={{ width: 24, height: 18, borderRadius: 3 }}
                  />
                  <span className="text-sm font-medium text-slate-700">
                    {selectedLang.label}
                  </span>
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
                {showLangDropdown && (
                  <div className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                    {languageOptions.map((opt) => (
                      <button
                        key={opt.value}
                        className={`flex items-center gap-2 w-full px-3 py-2 hover:bg-slate-100 transition-colors ${selectedLang.value === opt.value ? 'bg-slate-100' : ''}`}
                        onClick={() => { handleLangChange(opt); setShowLangDropdown(false); }}
                      >
                        <ReactCountryFlag countryCode={opt.countryCode} svg style={{ width: 22, height: 16, borderRadius: 3 }} />
                        <span className="text-sm">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {/* Search Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-slate-600 hover:text-exaltius-blue"
            >
              {isSearchOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-6 mt-6">
                  <img
                    src="/lovable-uploads/0ef498cc-30ac-42a5-bb0d-f62f8d06612b.png"
                    alt="Exaltius"
                    className="h-32 w-auto"
                  />
                  <nav className="flex flex-col space-y-4">
                    {navigationItems.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        className="text-lg font-medium text-slate-700 hover:text-exaltius-blue transition-colors duration-200 py-2 border-b border-slate-100"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        {/* MegaSearch flutuante */}
        <MegaSearch open={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      </div>
    </header>
  );
};

export default Header;
