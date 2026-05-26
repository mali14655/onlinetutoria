import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { StarRating } from "./testimonial-card";

interface TestimonialDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  author: {
    name: string;
    category?: string;
  };
  text: string;
  rating?: number;
}

export function TestimonialDetailModal({
  isOpen,
  onClose,
  author,
  text,
  rating = 5,
}: TestimonialDetailModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-[rgba(0,0,0,0.6)]"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="testimonial-modal-title"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 text-xl text-gray-500 transition hover:text-black"
            aria-label="Close"
          >
            <FaTimes />
          </button>

          <div className="mb-4">
            <StarRating rating={rating} />
          </div>

          <p className="text-base leading-relaxed text-gray-700 sm:text-lg">
            &ldquo;{text}&rdquo;
          </p>

          <div className="mt-6 border-t border-gray-100 pt-5">
            <h3
              id="testimonial-modal-title"
              className="text-lg font-semibold text-gray-900"
            >
              {author.name}
            </h3>
            {author.category && (
              <span className="mt-2 inline-block rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">
                {author.category}
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
