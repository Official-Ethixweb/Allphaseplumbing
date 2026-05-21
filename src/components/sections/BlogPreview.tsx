import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Wrench } from "lucide-react";
import { fetchPosts } from "@/lib/wordpress.functions";
import type { WPPost } from "@/types/wordpress";

/* Unsplash images matched to each placeholder blog title */
const PLACEHOLDER_DATA = [
  {
    title: "5 signs your water heater needs replacing",
    img:   "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=700&q=75",
    imgAlt: "Water heater in a utility room",
  },
  {
    title: "What to do when a drain backs up at 2am",
    img:   "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=700&q=75",
    imgAlt: "Drain pipes and plumbing repair work",
  },
  {
    title: "Tankless vs traditional water heaters in Seattle",
    img:   "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=75",
    imgAlt: "Modern plumbing pipes and fittings",
  },
];

function PostCard({ post }: { post: WPPost }) {
  const img = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const cat = post._embedded?.["wp:term"]?.[0]?.[0]?.name;
  return (
    <article className="group rounded-xl overflow-hidden border-2 border-[#1B3A6B] bg-white/80 backdrop-blur-sm shadow-md hover:shadow-[0_8px_30px_rgba(27,58,107,0.25)] hover:-translate-y-1 transition-all duration-300 cursor-pointer">
      <div className="aspect-[16/10] bg-primary relative overflow-hidden">
        {img ? (
          <img
            src={img}
            alt={post.title.rendered}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-primary-foreground/30">
            <Wrench className="size-16" />
          </div>
        )}
      </div>
      <div className="p-6">
        {cat && (
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-accent mb-3">
            {cat}
          </span>
        )}
        <h3
          className="text-lg font-bold text-primary mb-3 line-clamp-2"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        <Link
          to="/blog/$slug"
          params={{ slug: post.slug }}
          className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:gap-2 transition-all"
        >
          Read More <ArrowRight className="size-4" />
        </Link>
      </div>
    </article>
  );
}

function PlaceholderCard({ i }: { i: number }) {
  const data = PLACEHOLDER_DATA[i];
  return (
    <article className="group rounded-xl overflow-hidden border-2 border-[#1B3A6B] bg-white/80 backdrop-blur-sm shadow-md hover:shadow-[0_8px_30px_rgba(27,58,107,0.25)] hover:-translate-y-1 transition-all duration-300 cursor-pointer">
      <div className="aspect-[16/10] bg-primary relative overflow-hidden">
        <img
          src={data.img}
          alt={data.imgAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="p-6">
        <span className="inline-block text-xs font-semibold uppercase tracking-wider text-accent mb-3">
          Plumbing Tips
        </span>
        <h3 className="text-lg font-bold text-primary mb-3 line-clamp-2">{data.title}</h3>
        <Link
          to="/blog"
          className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:gap-2 transition-all"
        >
          Read More <ArrowRight className="size-4" />
        </Link>
      </div>
    </article>
  );
}

export function BlogPreview() {
  const fetchPostsFn = useServerFn(fetchPosts);
  const { data, isLoading } = useQuery({
    queryKey: ["wp-posts", 3],
    queryFn: () => fetchPostsFn({ data: { perPage: 3 } }),
  });

  const posts = data?.posts ?? [];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent mb-3">
              Plumbing Know How
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">
              Tips &amp; guides{" "}
              <span className="font-display-italic text-accent">from our team.</span>
            </h2>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-accent"
          >
            View All Articles <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl border-2 border-[#1B3A6B]/30 bg-white/60 backdrop-blur-sm animate-pulse h-80"
              />
            ))
          ) : posts.length > 0 ? (
            posts.map((p) => <PostCard key={p.id} post={p} />)
          ) : (
            [0, 1, 2].map((i) => <PlaceholderCard key={i} i={i} />)
          )}
        </div>
      </div>
    </section>
  );
}
