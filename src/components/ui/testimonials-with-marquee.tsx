import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TestimonialCard } from "./testimonial-card";
import { TestimonialDetailModal } from "./testimonial-detail-modal";

interface TestimonialAuthor {
  name: string;
  category?: string;
}

interface Testimonial {
  author: TestimonialAuthor;
  text: string;
  rating?: number;
}

interface TestimonialsSectionProps {
  title: string;
  description: string;
  testimonials: Testimonial[];
  className?: string;
}

export function TestimonialsSection({
  title,
  description,
  testimonials,
  className,
}: TestimonialsSectionProps) {
  const [selected, setSelected] = useState<Testimonial | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 0) return;

      const atStart = el.scrollLeft <= 0;
      const atEnd = el.scrollLeft >= maxScroll - 1;
      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;

      if ((scrollingDown && !atEnd) || (scrollingUp && !atStart)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [testimonials.length]);

  const scrollByCard = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".testimonials-scroll-item");
    const gap = 16;
    const amount = (card?.offsetWidth ?? 320) + gap;
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className={`testimonials-section ${className || ""}`}>
      <div className="testimonials-container w-[90%]">
        <div className="testimonials-header py-5 text-2xl font-semibold">
          <h2>{title}</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        {testimonials.length === 0 ? (
          <p className="py-10 text-center text-gray-500">
            No testimonials yet. Be the first to share your experience!
          </p>
        ) : (
          <div className="testimonials-slider py-6">
            <button
              type="button"
              className="testimonials-arrow testimonials-arrow-prev"
              onClick={() => scrollByCard("left")}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={22} />
            </button>

            <div ref={scrollRef} className="testimonials-scroll">
              {testimonials.map((t, i) => (
                <div key={i} className="testimonials-scroll-item">
                  <TestimonialCard
                    author={t.author}
                    text={t.text}
                    rating={t.rating ?? 5}
                    compact
                    onClick={() => setSelected(t)}
                  />
                </div>
              ))}
            </div>

            <button
              type="button"
              className="testimonials-arrow testimonials-arrow-next"
              onClick={() => scrollByCard("right")}
              aria-label="Next testimonial"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        )}
      </div>

      {selected && (
        <TestimonialDetailModal
          isOpen={!!selected}
          onClose={() => setSelected(null)}
          author={selected.author}
          text={selected.text}
          rating={selected.rating ?? 5}
        />
      )}
    </section>
  );
}
