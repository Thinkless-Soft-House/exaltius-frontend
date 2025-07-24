import React, { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";

const NotificationPermission: React.FC = () => {
    const [asked, setAsked] = useState(false);
    const STORAGE_KEY = "notification_permission";

    useEffect(() => {
        if (!('Notification' in window)) return;
        const saved = localStorage.getItem(STORAGE_KEY);
        if (Notification.permission === 'default' && !asked && !saved) {
            setTimeout(() => {
                const t = toast({
                    title: "Receba notificações!",
                    description: "Permita notificações para ser avisado de novas notícias.",
                    action: (
                        <div className="flex gap-2">
                            <button
                                className="ml-2 bg-exaltius-blue text-white px-3 py-1 rounded hover:bg-exaltius-gold transition-colors"
                                onClick={() => {
                                    Notification.requestPermission();
                                    localStorage.setItem(STORAGE_KEY, "accepted");
                                    setAsked(true);
                                    t.dismiss();
                                }}
                            >
                                Permitir
                            </button>
                            <button
                                className="ml-2 bg-slate-200 text-slate-700 px-3 py-1 rounded hover:bg-slate-300 transition-colors"
                                onClick={() => {
                                    localStorage.setItem(STORAGE_KEY, "rejected");
                                    setAsked(true);
                                    t.dismiss();
                                }}
                            >
                                Rejeitar
                            </button>
                        </div>
                    ),
                    style: { marginBottom: 64 }, // Espaço para não sobrepor barra de cookies
                });
            }, 2000);
        }
    }, [asked]);

    return null;
};

export default NotificationPermission;
