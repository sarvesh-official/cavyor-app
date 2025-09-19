"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@workspace/ui/components/carousel";

interface Category {
  id: string;
  name: string;
  emoji: string;
}

interface CategoryCarouselProps {
  categories: Category[];
  selectedCategory?: string | null;
  onCategorySelect?: (categoryName: string) => void;
}

export function CategoryCarousel({ categories, selectedCategory, onCategorySelect }: CategoryCarouselProps) {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: false,
      }}
      className="w-full"
    >
      <CarouselContent className="py-2">
          {categories.map((category, index) => {
            const isSelected = selectedCategory === category.name;
            return (
              <CarouselItem key={category.id} className="pl-6 md:pl-16 pr-6 md:pr-8 basis-[80px] flex-shrink-0">
                <div 
                  className="flex flex-col items-center space-y-2 cursor-pointer hover:scale-105 transition-all duration-200 py-2"
                  onClick={() => onCategorySelect?.(category.name)}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl transition-all duration-200 ${
                    isSelected 
                      ? 'bg-primary text-primary-foreground shadow-lg scale-110' 
                      : 'bg-muted hover:bg-muted/80'
                  }`}>
                    {category.emoji}
                  </div>
                  <span className={`text-sm text-center font-medium transition-colors duration-200 ${
                    isSelected 
                      ? 'text-primary font-semibold' 
                      : 'text-muted-foreground'
                  }`}>
                    {category.name}
                  </span>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
    </Carousel>
  );
}
