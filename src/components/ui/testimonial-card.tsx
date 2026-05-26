import { useRef } from "react";
import { Star } from "lucide-react";
import { cn } from "../../lib/utils";

export interface TestimonialAuthor {
  name: string;
  category?: string;
}

export interface TestimonialCardProps {
  author: TestimonialAuthor;
  text: string;
  rating?: number;
  className?: string;
  compact?: boolean;
  onClick?: () => void;
}

export function StarRating({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            "h-4 w-4",
            star <= rating
              ? "fill-amber-400 text-amber-400"
              : "fill-gray-200 text-gray-200"
          )}
        />
      ))}
    </div>
  );
}

export function TestimonialCard({
  author,
  text,
  rating = 5,
  className,
  compact = false,
  onClick,
}: TestimonialCardProps) {
  const pointerStart = useRef({ x: 0, y: 0 });
  const CardTag = onClick ? "button" : "div";

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerStart.current = { x: e.clientX, y: e.clientY };
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!onClick) return;
    const dx = Math.abs(e.clientX - pointerStart.current.x);
    const dy = Math.abs(e.clientY - pointerStart.current.y);
    if (dx > 8 || dy > 8) return;
    onClick();
  };

  return (
    <CardTag
      type={onClick ? "button" : undefined}
      onPointerDown={onClick ? handlePointerDown : undefined}
      onClick={onClick ? handleClick : undefined}
      className={cn(
        "flex w-full flex-col rounded-xl border border-gray-100 bg-white p-6 text-left shadow-sm",
        "transition-shadow duration-300 hover:shadow-md",
        compact && "h-[260px] cursor-pointer hover:border-blue-200",
        className
      )}
    >
      <StarRating rating={rating} />
      <p
        className={cn(
          "mt-4 flex-1 text-sm leading-relaxed text-gray-600 sm:text-base",
          compact && "line-clamp-4"
        )}
      >
        &ldquo;{text}&rdquo;
      </p>
      <div className="mt-5 shrink-0 border-t border-gray-100 pt-4">
        <h3 className="font-semibold text-gray-900">{author.name}</h3>
        {author.category && (
          <p className="mt-0.5 text-sm text-blue-600">{author.category}</p>
        )}
        {compact && (
          <p className="mt-2 text-xs font-medium text-blue-500">
            Click to read full review
          </p>
        )}
      </div>
    </CardTag>
  );
}
