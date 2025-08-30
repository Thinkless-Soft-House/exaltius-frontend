import React, { useEffect, useState, ReactNode } from "react";
import { I18nContext, I18nContextProps } from "./I18nContext";

function getLangFromLocalStorage(): string {
  try {
    const lang = localStorage.getItem("lang");
    if (lang && ["en", "pt-BR", "es", "fr", "de", "it"].includes(lang)) {
      return lang;
    }
  } catch { /* empty */ }
  return "en";
}


export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<string>(getLangFromLocalStorage());
  const [t, setT] = useState<Record<string, string>>({});

  useEffect(() => {
    import(`./${lang}.json`)
      .then((mod) => setT(mod.default || mod))
      .catch(() => {
        import("./en.json").then((mod) => setT(mod.default || mod));
      });
    localStorage.setItem("lang", lang);
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


