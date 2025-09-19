"use client";

interface DishHeroProps {
  imageUrl: string;
  dishName: string;
  className?: string;
}

export function DishHero({ imageUrl, dishName, className = "" }: DishHeroProps) {
  return (
    <div 
      className={`w-full h-80 rounded-3xl relative overflow-hidden ${className}`}
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    />
  );
}
