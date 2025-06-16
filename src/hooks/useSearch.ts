
import { useState, useMemo } from 'react';
import { blogPosts, BlogPost } from '@/data/blogPosts';

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }

    const query = searchQuery.toLowerCase().trim();
    
    return blogPosts.filter((post) => {
      const searchableText = [
        post.title,
        post.excerpt,
        post.content,
        post.category,
        post.author,
        ...post.tags
      ].join(' ').toLowerCase();

      return searchableText.includes(query);
    });
  }, [searchQuery]);

  const performSearch = async (query: string) => {
    setIsSearching(true);
    setSearchQuery(query);
    
    // Simula um pequeno delay para mostrar o loading
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setIsSearching(false);
  };

  return {
    searchQuery,
    searchResults,
    isSearching,
    performSearch,
    setSearchQuery
  };
};
