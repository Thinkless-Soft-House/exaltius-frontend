import { createContext } from "react";

export interface I18nContextProps {
  t: Record<string, string>;
  lang: string;
  setLang: (lang: string) => void;
}

export const I18nContext = createContext<I18nContextProps | undefined>(
  undefined
);
