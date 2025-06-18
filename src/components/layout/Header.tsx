import { useEffect, useState, useMemo } from "react";
import { useGetTags } from "@/hooks/useGetTags";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Search, Menu, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import Select, { components } from "react-select";
import countryList from "react-select-country-list";
import { useI18n } from "@/i18n/I18nProvider";

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [country, setCountry] = useState(() => {
    // Tenta carregar do localStorage
    const saved = localStorage.getItem("selectedCountry");
    return saved ? JSON.parse(saved) : null;
  });
  const [tagNavItems, setTagNavItems] = useState([]);
  const navigate = useNavigate();
  const { getActive } = useGetTags();
  const { t } = useI18n();

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

  const navigationItems = useMemo(
    () => [
      { label: t.home || "Início", href: "/" },
      ...tagNavItems.map((tag) => ({
        label: tag.name?.[idioma] || tag.name?.pt || tag.slug,
        // href: `/categoria/${tag.slug}`,
        href: '/',
      })),
    ],
    [t, tagNavItems, idioma]
  );

  // Função para obter a bandeira pelo código do país
  const getFlag = (code: string) =>
    typeof code === "string"
      ? String.fromCodePoint(
          ...[...code.toUpperCase()].map((c) => 127397 + c.charCodeAt(0))
        )
      : "";

  // Customização do label das opções
  const formatOptionLabel = (option: any, { context }: any) => {
    return (
      <div
        className="flex items-center gap-2"
        style={{ minHeight: context === "menu" ? 28 : undefined }}
      >
        <span style={{ fontSize: context === "menu" ? 18 : 16 }}>
          {getFlag(option.value)}
        </span>
        {context === "menu" && (
          <span
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: "#334155",
              fontFamily: "inherit",
              letterSpacing: 0.1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: 100,
              display: "inline-block",
            }}
            className="transition-colors duration-200"
          >
            {option.label}
          </span>
        )}
      </div>
    );
  };

  // Customização para mostrar bandeira e nome do país selecionado no controle
  const SingleValue = (props: any) => (
    <components.SingleValue {...props}>
      <span style={{ fontSize: 20, marginRight: 8 }}>
        {getFlag(props.data.value)}
      </span>
      <span style={{ fontSize: 13, color: "#334155", fontWeight: 500 }}>
        {props.data.label}
      </span>
    </components.SingleValue>
  );

  // Customização do placeholder para mostrar o planeta
  const CustomPlaceholder = (props: any) => (
    <components.Placeholder {...props}>
      <span style={{ fontSize: 20, marginRight: 8 }}>
        {t.planet_emoji || "🌎"}
      </span>
      <span style={{ fontSize: 13, color: "#94a3b8" }}>
        {t.search_country_placeholder || "Pesquisar país..."}
      </span>
    </components.Placeholder>
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/busca?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleCountryChange = (selected: any) => {
    setCountry(selected);
    localStorage.setItem("selectedCountry", JSON.stringify(selected));
  };

  const countryOptions = useMemo(() => countryList().getData(), []);

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
            {/* Country Selector */}
            <div style={{ width: "auto", minWidth: 170, maxWidth: 170 }}>
              <Select
                options={countryOptions}
                value={country}
                onChange={handleCountryChange}
                placeholder=""
                isClearable
                isSearchable={false}
                classNamePrefix="country-select"
                formatOptionLabel={formatOptionLabel}
                components={{ SingleValue, Placeholder: CustomPlaceholder }}
                styles={{
                  control: (base, state) => ({
                    ...base,
                    minHeight: 40,
                    height: 40,
                    borderRadius: 8,
                    borderColor: state.isFocused
                      ? "#2563eb"
                      : "rgba(30,41,59,0.12)",
                    boxShadow: "none",
                    background: "rgba(255,255,255,0.85)",
                    transition: "border-color 0.2s",
                    cursor: "pointer",
                    width: "auto",
                    "&:hover": {
                      borderColor: "#2563eb",
                    },
                  }),
                  menu: (base) => ({
                    ...base,
                    borderRadius: 8,
                    boxShadow: "0 2px 8px rgba(30,41,59,0.08)",
                    background: "rgba(255,255,255,0.98)",
                    padding: 4,
                    zIndex: 50,
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isSelected
                      ? "rgba(255,215,0,0.12)"
                      : state.isFocused
                      ? "rgba(37,99,235,0.08)"
                      : "transparent",
                    color: state.isSelected ? "#1d4ed8" : "#334155",
                    borderRadius: 6,
                    padding: "10px 16px",
                    cursor: "pointer",
                    fontSize: 12,
                    minHeight: 32,
                    display: "flex",
                    alignItems: "center",
                    fontWeight: 500,
                    fontFamily: "inherit",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: "90%",
                  }),
                  singleValue: (base) => ({
                    ...base,
                    margin: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingLeft: 2,
                  }),
                  valueContainer: (base) => ({
                    ...base,
                    padding: 0,
                    justifyContent: "flex-start",
                  }),
                  indicatorsContainer: (base) => ({
                    ...base,
                    height: 40,
                  }),
                  dropdownIndicator: (base) => ({
                    ...base,
                    padding: 4,
                    color: "#64748b",
                    transition: "color 0.2s",
                    "&:hover": { color: "#2563eb" },
                  }),
                  clearIndicator: (base) => ({
                    ...base,
                    padding: 4,
                    color: "#64748b",
                    "&:hover": { color: "#ef4444" },
                  }),
                  input: (base) => ({
                    ...base,
                    margin: 0,
                    padding: 0,
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color: "#94a3b8",
                    fontSize: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }),
                }}
              />
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
        {/* Search Bar */}
        {isSearchOpen && (
          <div className="pb-4 animate-fade-in">
            <form onSubmit={handleSearch} className="max-w-md mx-auto">
              <div className="relative">
                <Input
                  type="search"
                  placeholder={
                    t.use_search_bar || "Buscar artigos sobre finanças..."
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border-exaltius-blue/20 focus:border-exaltius-blue focus:ring-exaltius-blue"
                  autoFocus
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              </div>
            </form>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
