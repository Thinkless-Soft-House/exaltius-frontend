// Local BlogPost shape used by UI (derived from previous mock shape)
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  publishedAt: string;
  tags: string[];
  imageUrl?: string;
  featuredImage?: string;
  views: number;
  readTime: number;
}

// Helper: prefer multilingual field (pt/en/first) or string
export function pickLang(val: unknown, prefer = "pt"): string {
  if (!val) return "";
  if (typeof val === "string") return val;
  if (typeof val === "object" && val !== null) {
    const v = val as Record<string, unknown>;
    if (typeof v[prefer] === "string") return v[prefer] as string;
    const first = Object.values(v).find((x) => typeof x === "string");
    return (first as string) ?? "";
  }
  return String(val);
}

export function normalizeToBlogPost(raw: unknown): BlogPost | null {
  if (!raw || typeof raw !== "object" || raw === null) return null;
  try {
    const r = raw as Record<string, unknown>;
    const id = r.id != null ? String(r.id) : undefined;
    const title =
      pickLang(r.title) ||
      pickLang(r.summary) ||
      pickLang(r.content) ||
      (typeof r.title === "string" ? r.title : "");
    const slug =
      (typeof r.slug === "string" && r.slug) ||
      (title ? title.toLowerCase().replace(/[^a-z0-9]+/g, "-") : id || "post");
    const excerpt =
      pickLang(r.summary) ||
      (typeof r.excerpt === "string"
        ? r.excerpt
        : typeof r.content === "string"
        ? r.content.slice(0, 140)
        : "");
    const category =
      (typeof r.category === "string" && r.category) ||
      (Array.isArray(r.categories) ? String(r.categories[0]) : "Geral");
    const author =
      (typeof r.author === "string" && r.author) ||
      (typeof r.authorName === "string" && r.authorName) ||
      "Anônimo";
    const publishedAt =
      (typeof r.publishedAt === "string" && r.publishedAt) ||
      (typeof r.createdAt === "string" && r.createdAt) ||
      new Date().toISOString();
    const readTime =
      typeof r.readTime === "number"
        ? r.readTime
        : typeof r.readTime === "string" && !isNaN(Number(r.readTime))
        ? Number(r.readTime)
        : typeof r.content === "string"
        ? Math.max(1, Math.round((r.content as string).split(" ").length / 200))
        : 0;
    const views =
      typeof r.views === "number"
        ? r.views
        : typeof r.views === "string" && !isNaN(Number(r.views))
        ? Number(r.views)
        : 0;
    const tags = Array.isArray(r.tags) ? r.tags.map(String) : [];
    const featuredImage =
      (typeof r.featuredImage === "string" && r.featuredImage) ||
      (typeof r.imageUrl === "string" && r.imageUrl) ||
      "";

    // Require minimal fields
    if (!id || !title || !slug) {
      console.warn(
        "[normalizeToBlogPost] post missing required fields, skipping",
        { id, title, slug, raw }
      );
      return null;
    }

    return {
      id,
      title,
      slug,
      excerpt,
      content: pickLang(r.content) || "",
      category,
      author,
      publishedAt,
      tags,
      imageUrl: typeof r.imageUrl === "string" ? r.imageUrl : undefined,
      featuredImage: featuredImage || undefined,
      readTime,
      views,
    } as BlogPost;
  } catch (e) {
    console.warn("[normalizeToBlogPost] normalize error", e, raw);
    return null;
  }
}
