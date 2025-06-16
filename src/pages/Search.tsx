
import { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useSearch } from '@/hooks/useSearch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search as SearchIcon, Clock, User } from 'lucide-react';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const { searchResults, isSearching, performSearch } = useSearch();

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header da busca */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">
              Resultados da Busca
            </h1>
            {query && (
              <p className="text-slate-600 flex items-center gap-2">
                <SearchIcon className="h-4 w-4" />
                Buscando por: <span className="font-semibold">"{query}"</span>
              </p>
            )}
          </div>

          {/* Loading */}
          {isSearching && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-exaltius-blue"></div>
            </div>
          )}

          {/* Resultados */}
          {!isSearching && query && (
            <>
              <div className="mb-6">
                <p className="text-slate-600">
                  {searchResults.length === 0 
                    ? 'Nenhum resultado encontrado' 
                    : `${searchResults.length} resultado${searchResults.length !== 1 ? 's' : ''} encontrado${searchResults.length !== 1 ? 's' : ''}`
                  }
                </p>
              </div>

              {searchResults.length === 0 ? (
                <Card className="p-8 text-center">
                  <CardContent className="pt-6">
                    <SearchIcon className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-700 mb-2">
                      Nenhum resultado encontrado
                    </h3>
                    <p className="text-slate-500 mb-4">
                      Tente buscar por outros termos ou palavras-chave diferentes.
                    </p>
                    <p className="text-sm text-slate-400">
                      Sugestões: investimentos, renda extra, finanças pessoais, educação financeira
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-6">
                  {searchResults.map((post) => (
                    <Card key={post.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <CardTitle className="text-xl mb-2 hover:text-exaltius-blue transition-colors">
                              <Link to={`/post/${post.slug}`}>
                                {post.title}
                              </Link>
                            </CardTitle>
                            <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                              <span className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                {post.author}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {new Date(post.publishedAt).toLocaleDateString('pt-BR')}
                              </span>
                            </div>
                            <p className="text-slate-600 mb-3">
                              {post.excerpt}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              <Badge variant="secondary" className="bg-exaltius-blue/10 text-exaltius-blue">
                                {post.category.replace('-', ' ')}
                              </Badge>
                              {post.tags.slice(0, 3).map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          {post.imageUrl && (
                            <img 
                              src={post.imageUrl} 
                              alt={post.title}
                              className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                            />
                          )}
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Estado inicial (sem busca) */}
          {!query && !isSearching && (
            <Card className="p-8 text-center">
              <CardContent className="pt-6">
                <SearchIcon className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-700 mb-2">
                  Faça uma busca
                </h3>
                <p className="text-slate-500">
                  Use a barra de pesquisa no topo da página para encontrar artigos sobre finanças.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Search;
