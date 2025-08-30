import React, { useState, useRef, useEffect } from 'react';
import { useSearch } from '@/hooks/useSearch';
import { Search as SearchIcon, X } from 'lucide-react';

interface MegaSearchProps {
    open: boolean;
    onClose: () => void;
}

export const MegaSearch: React.FC<MegaSearchProps> = ({ open, onClose }) => {
    const [query, setQuery] = useState('');
    const { searchResults, isSearching, performSearch } = useSearch();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (open && inputRef.current) {
            inputRef.current.focus();
        }
    }, [open]);

    useEffect(() => {
        if (query.length > 1) {
            performSearch(query);
        }
    }, [query]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg mt-24 w-full max-w-xl p-6 relative">
                <button
                    className="absolute top-4 right-4 text-slate-500 hover:text-slate-800"
                    onClick={onClose}
                    aria-label="Fechar busca"
                >
                    <X size={24} />
                </button>
                <div className="flex items-center gap-2 mb-4">
                    <SearchIcon className="h-5 w-5 text-slate-500" />
                    <input
                        ref={inputRef}
                        type="text"
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
                        placeholder="Buscar por título ou texto..."
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                </div>
                {isSearching && (
                    <div className="py-8 text-center text-slate-400">Buscando...</div>
                )}
                {!isSearching && query && (
                    <div>
                        {searchResults.length === 0 ? (
                            <div className="py-8 text-center text-slate-400">Nenhum resultado encontrado</div>
                        ) : (
                            <ul className="space-y-3">
                                {searchResults.map(post => (
                                    <li key={post.id} className="border-b pb-2">
                                        <div className="font-bold text-slate-800">{post.title}</div>
                                        <div className="text-slate-600 text-sm line-clamp-2">{post.content}</div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
                {!query && (
                    <div className="py-8 text-center text-slate-400">Digite para buscar posts...</div>
                )}
            </div>
        </div>
    );
};
