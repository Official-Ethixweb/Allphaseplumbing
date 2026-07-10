import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Wrench } from "lucide-react";
import { StarBorder } from "@/components/ui/StarBorder";
import { fetchPosts } from "@/lib/wordpress.functions";
import type { WPPost } from "@/types/wordpress";

/* Unsplash images matched to each placeholder blog title */
const PLACEHOLDER_DATA = [
  {
    title: "5 signs your water heater needs replacing",
    img: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=700&q=75",
    imgAlt: "Water heater in a utility room",
  },
  {
    title: "What to do when a drain backs up at 2am",
    img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=700&q=75",
    imgAlt: "Drain pipes and plumbing repair work",
  },
  {
    title: "Tankless vs traditional water heaters in Seattle",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=75",
    imgAlt: "Modern plumbing pipes and fittings",
  },
];

/**
 * Image-overlay blog card — same design across mobile and desktop.
 * 12:7 ratio (600 × 350 max), image fills the frame, title + category +
 * Read More chip overlaid on a navy bottom gradient. Hover lifts the card
 * and gently zooms the photo on desktop pointer devices.
 */
function OverlayBlogCard({
  img,
  imgAlt,
  category,
  title,
  href,
  hrefParams,
}: {
  img: string | undefined;
  imgAlt: string;
  category: string | undefined;
  title: string;
  href: string;
  hrefParams?: { slug: string };
}) {
  return (
    <Link
      to={href}
      params={hrefParams as never}
      className="group block relative w-full mx-auto overflow-hidden
                 border-[3px] border-[#1E3A6E] shadow-md
                 hover:shadow-[0_12px_40px_rgba(30,58,110,0.32)]
                 hover:-translate-y-1
                 active:scale-[0.985] transition-all duration-300"
      style={{ aspectRatio: "600 / 350", maxWidth: "600px" }}
      aria-label={title}
    >
      {img ? (
        <img
          src={img}
          alt={imgAlt}
          className="absolute inset-0 w-full h-full object-cover
                     group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-[#A8C4FB] text-white/40">
          <Wrench className="size-16" />
        </div>
      )}
      {/* Dark navy gradient backdrop so overlaid text always reads */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(15,34,70,0) 28%, rgba(15,34,70,0.55) 62%, rgba(15,34,70,0.94) 100%)",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 lg:p-6">
        {category && (
          <span className="inline-block text-[11px] sm:text-[12px] font-bold tracking-wider text-[#F5C842] mb-1.5">
            {category}
          </span>
        )}
        <h3
          className="text-[18px] sm:text-[20px] lg:text-[22px] font-extrabold text-white leading-snug line-clamp-2"
          style={{ textShadow: "0 2px 8px rgba(0,0,0,0.55)" }}
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <span
          className="inline-flex items-center gap-1.5 mt-2 text-[13px] sm:text-[14px] font-bold text-white/95
                     group-hover:gap-2.5 transition-all"
        >
          Read More <ArrowRight className="size-3.5 sm:size-4" />
        </span>
      </div>
    </Link>
  );
}

function PostCard({ post }: { post: WPPost }) {
  const img = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const cat = post._embedded?.["wp:term"]?.[0]?.[0]?.name;
  return (
    <OverlayBlogCard
      img={img}
      imgAlt={post.title.rendered}
      category={cat}
      title={post.title.rendered}
      href="/blog/$slug"
      hrefParams={{ slug: post.slug }}
    />
  );
}

function PlaceholderCard({ i }: { i: number }) {
  const data = PLACEHOLDER_DATA[i];
  return (
    <OverlayBlogCard
      img={data.img}
      imgAlt={data.imgAlt}
      category="Plumbing Tips"
      title={data.title}
      href="/blog"
    />
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
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">
            Plumbing Know How
          </h2>
          <p className="mt-3 text-lg text-muted-foreground font-medium">
            Tips and guides from our team
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="border-[3px] border-[#1E3A6E]/30 bg-white/60 backdrop-blur-sm animate-pulse"
                  style={{ aspectRatio: "600 / 350" }}
                />
              ))
            : posts.length > 0
              ? posts.map((p) => <PostCard key={p.id} post={p} />)
              : [0, 1, 2].map((i) => <PlaceholderCard key={i} i={i} />)}
        </div>

        <div className="text-center mt-12">
          <StarBorder
            as={Link}
            to="/blog"
            className="inline-block transition-all"
            innerClassName="flex items-center gap-2 text-sm font-bold text-white tracking-wider uppercase"
            innerStyle={{
              background: "linear-gradient(135deg,#1E3A6E 0%,#4A7BC4 100%)",
              border: "none",
              padding: "12px 28px",
            }}
          >
            View Blogs <ArrowRight className="size-4" />
          </StarBorder>
        </div>
      </div>
    </section>
  );
}
