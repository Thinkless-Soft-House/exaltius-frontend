import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

// Mapeamento de código de país para idioma
const countryToLang: Record<string, string> = {
  BR: "pt-BR",
  US: "en",
  GB: "en",
  FR: "fr",
  DE: "de",
  ES: "es",
  IT: "it",
};

function getLangFromLocalStorage(): string {
  try {
    const selected = localStorage.getItem("selectedCountry");
    if (selected) {
      const { value } = JSON.parse(selected);
      return countryToLang[value] || "en";
    }
  } catch {}
  return "en";
}

interface I18nContextProps {
  t: Record<string, string>;
  lang: string;
  setLang: (lang: string) => void;
}

const I18nContext = createContext<I18nContextProps | undefined>(undefined);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<string>(getLangFromLocalStorage());
  const [t, setT] = useState<Record<string, string>>({});

  useEffect(() => {
    import(`./${lang}.json`)
      .then((mod) => setT(mod.default || mod))
      .catch(() => {
        import("./en.json").then((mod) => setT(mod.default || mod));
      });
  }, [lang]);

  // Atualiza idioma se localStorage mudar OU se selectedCountry mudar
  useEffect(() => {
    function checkLangChange() {
      const newLang = getLangFromLocalStorage();
      setLang((prev) => {
        if (prev !== newLang) return newLang;
        return prev;
      });
    }
    // storage event para outras abas
    window.addEventListener("storage", checkLangChange);
    // também observa mudanças locais (ex: setItem)
    const origSetItem = localStorage.setItem;
    localStorage.setItem = function (...args) {
      origSetItem.apply(this, args);
      window.dispatchEvent(new Event("storage"));
    };
    return () => {
      window.removeEventListener("storage", checkLangChange);
      localStorage.setItem = origSetItem;
    };
  }, []);

  return (
    <I18nContext.Provider value={{ t, lang, setLang }}>
      {children}
    </I18nContext.Provider>
  );
};

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
