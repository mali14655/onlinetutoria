import { TestimonialsSection } from "../components/ui/testimonials-with-marquee";
import { useState, useEffect } from "react";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/feedback`
        );
        if (!res.ok) throw new Error("Failed to fetch feedbacks");

        const data = await res.json();

        const transformed = data.map((feedback) => ({
          author: {
            name: feedback.fullName,
            category: feedback.category,
          },
          text: feedback.message,
          rating: 5,
        }));

        setTestimonials(transformed);
      } catch (err) {
        console.error("Error fetching feedbacks:", err.message);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <TestimonialsSection
      title="Trusted by students worldwide"
      description="Join thousands of students who are already building the future with our platform"
      testimonials={testimonials}
    />
  );
}
