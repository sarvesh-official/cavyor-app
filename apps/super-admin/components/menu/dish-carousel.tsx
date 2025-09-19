"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@workspace/ui/components/carousel";
import { DishCard } from "./dish-card";

interface Dish {
  id: string;
  name: string;
  preparationTime: string;
  category: string;
  image: string;
  isTrending?: boolean;
}

interface DishCarouselProps {
  dishes: Dish[];
  onDishClick: (dishId: string) => void;
}

export function DishCarousel({ dishes, onDishClick }: DishCarouselProps) {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: false,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-4">
        {dishes.map((dish, index) => (
          <CarouselItem key={dish.id} className="pl-4 md:pl-6 pr-4 md:pr-6 basis-[240px] flex-shrink-0">
            <DishCard dish={dish} onClick={onDishClick} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
