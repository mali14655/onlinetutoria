import { useMemo } from "react";

interface TestimonialAuthor {
  name: string;
  avatar: string;
  handle?: string;
}

interface TestimonialsSectionProps {
  title: string;
  description: string;
  testimonials: Array<{
    author: TestimonialAuthor;
    text: string;
    href?: string;
  }>;
  className?: string;
}

export function TestimonialsSection({
  title,
  description,
  testimonials,
  className,
}: TestimonialsSectionProps) {
  const duplicated = [...testimonials, ...testimonials]; // duplicate for seamless scroll

  return (
    <section className={`testimonials-section ${className || ""}`}>
      <div className="testimonials-container w-[90%]">
        <div className="testimonials-header py-5 text-2xl font-semibold ">
          <h2>{title}</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto ">
            {description}
          </p>
        </div>

        <div className="marquee-wrapper">
          <div className="marquee-track py-10">
            {duplicated.map((t, i) => (
              <div
                className="testimonial-card flex flex-col justify-between"
                key={i}
              >
                <p style={{ fontSize: "0.95rem", lineHeight: 1.5 }}>{t.text}</p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    marginTop: "1.25rem",
                  }}
                >
                  <img
                    src={t.author.avatar}
                    alt={t.author.name}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <strong>{t.author.name}</strong>
                    <span style={{ fontSize: "0.8rem", color: "#777" }}>
                      {t.author.handle}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
