
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Eye, User } from "lucide-react";

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
  featuredImage: string;
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
    <article className={`finance-card post-card-hover ${sizeClasses[size]} group`}>
      <Link to={`/post/${slug}`} className="block">
        {/* Featured Image */}
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={featuredImage}
            alt={title}
            className="w-full h-48 md:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <Badge className="bg-exaltius-blue text-white hover:bg-exaltius-blue-light">
              {category}
            </Badge>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <h2 className={`font-bold text-slate-900 group-hover:text-exaltius-blue transition-colors duration-200 line-clamp-2 ${
            size === "large" ? "text-2xl lg:text-3xl" : size === "medium" ? "text-xl" : "text-lg"
          }`}>
            {title}
          </h2>

          <p className="text-slate-600 line-clamp-3 leading-relaxed">
            {excerpt}
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
    </article>
  );
};

export default PostCard;
