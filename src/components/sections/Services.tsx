import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { resolveIcon } from "@/lib/icon-map";
import { useWpServices } from "@/hooks/use-wp-services";
import type { ServiceCard } from "@/types/wordpress";

function ServiceCardItem({ card, index }: { card: ServiceCard; index: number }) {
  const Icon = resolveIcon(card.iconName);
  const num = card.number || String(index + 1).padStart(2, "0");

  return (
    <div className="group relative rounded-xl border-2 border-[#1B3A6B] bg-white/80 backdrop-blur-sm p-6 shadow-md hover:shadow-[0_8px_30px_rgba(27,58,107,0.25)] hover:-translate-y-1 transition-all duration-300 cursor-pointer">
      <div className="absolute top-4 right-4 text-xs font-mono font-semibold text-muted-foreground">
        {num}
      </div>
      <div className="inline-flex items-center justify-center size-12 rounded-lg bg-primary text-primary-foreground mb-5">
        <Icon className="size-6" />
      </div>
      <h3 className="text-lg font-bold text-primary mb-2">{card.title}</h3>
      <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{card.description}</p>
      <Link
        to={card.href as "/"}
        className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:gap-2 transition-all"
      >
        Learn More <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-xl border-2 border-[#1B3A6B]/20 bg-white/60 backdrop-blur-sm p-6 shadow-md animate-pulse">
      <div className="size-12 rounded-lg bg-primary/20 mb-5" />
      <div className="h-5 bg-primary/10 rounded mb-2 w-3/4" />
      <div className="space-y-1.5 mb-5">
        <div className="h-3.5 bg-muted rounded" />
        <div className="h-3.5 bg-muted rounded w-5/6" />
      </div>
      <div className="h-4 bg-accent/20 rounded w-24" />
    </div>
  );
}

export function Services() {
  const { cards, isLoading } = useWpServices();

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent mb-3">
              What We Do
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-tight">
              Comprehensive plumbing solutions for Seattle homes.
            </h2>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-accent"
          >
            View All Services <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
