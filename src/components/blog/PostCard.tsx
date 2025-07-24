
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Eye, User, Upload } from "lucide-react";
import React, { useState } from "react";

interface PostCardProps {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: number;
  views: number;
  featuredImage?: string;
  size?: "small" | "medium" | "large";
}

const PostCard = ({
  title,
  slug,
  excerpt,
  category,
  author,
  publishedAt,
  readTime,
  views,
  featuredImage,
  size = "medium"
}: PostCardProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (slug: string) => {
    const url = `${window.location.origin}/post/${slug}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      // fallback: pode mostrar erro se quiser
    }
  };
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const sizeClasses = {
    small: "col-span-1",
    medium: "col-span-1 md:col-span-2",
    large: "col-span-1 md:col-span-3 lg:col-span-4"
  };

  return (
    <article
      className={`finance-card post-card-hover ${sizeClasses[size]} group relative`}
      style={{ height: "550px", maxHeight: "550px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
    >
      <Link to={`/post/${slug}`} className="block h-full">
        {/* Featured Image */}
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={featuredImage}
            alt={title}
            className="w-full h-48 md:h-56 object-cover group-hover:scale-102 transition-transform duration-300"
            style={{ willChange: 'transform' }}
          />
          <div className="absolute top-4 left-4">
            <Badge className="bg-exaltius-blue text-white hover:bg-exaltius-blue-light">
              {category}
            </Badge>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 flex flex-col justify-between h-[calc(550px-14rem)]">
          <h2
            className={`font-bold text-slate-900 group-hover:text-exaltius-blue transition-colors duration-200 line-clamp-2 ${size === "large" ? "text-2xl lg:text-3xl" : size === "medium" ? "text-xl" : "text-lg"
              }`}
            title={title}
          >
            {title.length > 70 ? `${title.slice(0, 67)}...` : title}
          </h2>

          <p className="text-slate-600 line-clamp-3 leading-relaxed" title={excerpt}>
            {excerpt.length > 120 ? `${excerpt.slice(0, 117)}...` : excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
            <div className="flex items-center space-x-4 text-sm text-slate-500">
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>{author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(publishedAt)}</span>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-sm text-slate-500">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{readTime} min</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="h-4 w-4" />
                <span>{views.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
      {/* Botão de compartilhar */}
      <button
        onClick={() => copyToClipboard(slug)}
        className="absolute bottom-2 right-2 p-1 rounded-full hover:bg-slate-100 transition-colors z-10"
        title="Compartilhar"
        aria-label="Compartilhar"
        type="button"
      >
        <Upload className="w-4 h-4 text-slate-500" />
      </button>
      {/* Feedback visual */}
      {copied && (
        <span className="absolute bottom-12 right-2 bg-white border border-slate-200 rounded px-2 py-1 text-xs text-exaltius-blue shadow z-20 animate-fade-in">
          Link copiado!
        </span>
      )}
    </article>
  );
};

export default PostCard;
