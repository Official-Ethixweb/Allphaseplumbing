import { Link } from "@tanstack/react-router";
import { Check, ArrowRight } from "lucide-react";
import { TeamSlideshow } from "@/components/ui/TeamSlideshow";
import { useSiteOptions } from "@/hooks/use-site-options";

export function TeamSection() {
  const opts = useSiteOptions();

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <TeamSlideshow />

          <div>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent mb-3">
              {opts.team_eyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-tight">
              {opts.team_heading}{" "}
              <span className="font-display-italic text-accent">{opts.team_italic}</span>
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              {opts.team_body}
            </p>

            <ul className="mt-6 space-y-3">
              {opts.team_points.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center size-6 rounded-full bg-accent/15 text-accent shrink-0 mt-0.5">
                    <Check className="size-4" />
                  </span>
                  <span className="text-foreground">{p}</span>
                </li>
              ))}
            </ul>

            <Link to="/about" className="mt-8 inline-flex items-center gap-1 text-sm font-semibold text-accent">
              Learn More About Our Team <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
