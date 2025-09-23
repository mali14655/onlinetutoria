import { TestimonialsSection } from "../components/ui/testimonials-with-marquee";
import { useState, useEffect } from "react";

const testimonials = [
  {
    author: {
      name: "Emma Thompson",
      handle: "@emmaai",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    },
    text: "Using this AI platform has transformed how we handle data analysis. The speed and accuracy are unprecedented.",
    href: "https://twitter.com/emmaai",
  },
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  console.log(testimonials, "Test");

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/feedback`
        );
        if (!res.ok) throw new Error("Failed to fetch feedbacks");

        const data = await res.json();

        // Transform the feedbacks to the expected format
        const transformed = data.map((feedback) => ({
          author: {
            name: feedback.fullName,
            avatar: feedback.picture,
            handle: `@${feedback.category.toLowerCase()}`, // optional
          },
          text: feedback.message,
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
