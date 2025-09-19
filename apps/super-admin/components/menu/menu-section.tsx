"use client";

import { DishCarousel } from "./dish-carousel";

interface Dish {
  id: string;
  name: string;
  preparationTime: string;
  category: string;
  image: string;
  isTrending?: boolean;
}

interface MenuSectionProps {
  dishes: Dish[];
  onDishClick: (dishId: string) => void;
}

export function MenuSection({ 
  dishes, 
  onDishClick
}: MenuSectionProps) {
  return (
    <DishCarousel dishes={dishes} onDishClick={onDishClick} />
  );
}
