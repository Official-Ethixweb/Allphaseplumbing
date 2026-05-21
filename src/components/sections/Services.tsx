import { Link } from "@tanstack/react-router";
import { resolveIcon } from "@/lib/icon-map";
import { useWpServices } from "@/hooks/use-wp-services";
import type { ServiceCard } from "@/types/wordpress";

function ServiceCardItem({ card, index }: { card: ServiceCard; index: number }) {
  const Icon = resolveIcon(card.iconName);

  return (
    <Link
      to={card.href as "/"}
      className="group flex flex-col items-center text-center gap-4 rounded-2xl border-2 border-[#1E3A7B]/15
                 bg-white p-8 shadow-sm hover:shadow-[0_8px_32px_rgba(30,58,110,0.18)]
                 hover:-translate-y-2 hover:border-[#1E3A7B]/40 transition-all duration-300 cursor-pointer"
    >
      {/* Big icon square */}
      <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-[#1E3A6E]
                      shadow-lg group-hover:scale-105 transition-transform duration-300">
        <Icon className="size-12 text-white" />
      </div>

      {/* Service name only */}
      <h3 className="text-xl font-bold text-[#1E3A6E] leading-snug">{card.title}</h3>
    </Link>
  );
}

function SkeletonCard() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border-2 border-[#1E3A7B]/10
                    bg-white p-8 shadow-sm animate-pulse">
      <div className="w-24 h-24 rounded-2xl bg-[#1E3A6E]/15" />
      <div className="h-5 bg-gray-200 rounded w-3/4" />
    </div>
  );
}

export function Services() {
  const { cards, isLoading } = useWpServices();

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#F5C842] mb-3">
              What We Do
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E3A6E] leading-tight">
              Comprehensive plumbing solutions for Seattle homes.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            : cards.map((card, i) => (
                <ServiceCardItem key={card.href} card={card} index={i} />
              ))}
        </div>
      </div>
    </section>
  );
}
