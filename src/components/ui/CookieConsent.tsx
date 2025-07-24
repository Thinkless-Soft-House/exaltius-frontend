import React, { useState, useEffect } from "react";

const COOKIE_NAME = "cookie_consent";

function setCookie(name: string, value: string, days = 365) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

function getCookie(name: string) {
    return document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=');
        return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, '');
}

const CookieConsent: React.FC = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!getCookie(COOKIE_NAME)) {
            setVisible(true);
        }
    }, []);


    const handleChoice = (choice: "accepted" | "rejected") => {
        setCookie(COOKIE_NAME, choice);
        localStorage.setItem(COOKIE_NAME, choice);
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className="fixed bottom-0 left-0 w-full z-50 bg-white border-t border-slate-200 shadow-lg p-4 flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-in">
            <span className="text-sm text-slate-700">Este site utiliza cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa <a href='/privacy' className='underline text-exaltius-blue'>Política de Privacidade</a>.</span>
            <div className="flex gap-2">
                <button
                    className="bg-exaltius-blue text-white px-4 py-2 rounded font-semibold hover:bg-exaltius-gold transition-colors"
                    onClick={() => handleChoice("accepted")}
                >
                    Aceitar
                </button>
                <button
                    className="bg-slate-200 text-slate-700 px-4 py-2 rounded font-semibold hover:bg-slate-300 transition-colors"
                    onClick={() => handleChoice("rejected")}
                >
                    Rejeitar
                </button>
            </div>
        </div>
    );
};

export default CookieConsent;
