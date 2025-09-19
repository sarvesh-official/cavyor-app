"use client";

interface DishInfoProps {
  title: string;
  description: string;
  className?: string;
}

export function DishInfo({ title, description, className = "" }: DishInfoProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Dish Title */}
      <h1 className="text-4xl font-bold text-foreground">
        {title}
      </h1>

      {/* Description */}
      <p className="text-muted-foreground text-lg leading-relaxed">
        {description}
      </p>
    </div>
  );
}
