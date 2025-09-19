"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@workspace/ui/components/button";
import { MenuSection, CategoryCarousel, SectionHeader } from "@/components/menu";
import { 
  Plus,
  Edit
} from "lucide-react";

interface Dish {
  id: string;
  name: string;
  preparationTime: string;
  category: string;
  image: string;
  isTrending?: boolean;
}

interface Category {
  id: string;
  name: string;
  emoji: string;
}

const trendingDishes: Dish[] = [
  {
    id: "1",
    name: "Hyderabadi Biryani",
    preparationTime: "15-20 Mins",
    category: "Specials",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop&crop=center",
    isTrending: true
  },
  {
    id: "2", 
    name: "Chicken Tikka Masala",
    preparationTime: "25-30 Mins",
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop&crop=center",
    isTrending: true
  },
  {
    id: "3",
    name: "Butter Chicken", 
    preparationTime: "20-25 Mins",
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&h=300&fit=crop&crop=center",
    isTrending: true
  },
  {
    id: "4",
    name: "Paneer Tikka",
    preparationTime: "12-15 Mins", 
    category: "Appetizers",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop&crop=center",
    isTrending: true
  },
  {
    id: "5",
    name: "Mutton Curry",
    preparationTime: "35-40 Mins",
    category: "Main Course", 
    image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop&crop=center",
    isTrending: true
  },
  {
    id: "6",
    name: "Fish Curry",
    preparationTime: "18-22 Mins",
    category: "Seafood", 
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop&crop=center",
    isTrending: true
  },
  {
    id: "7",
    name: "Tandoori Chicken",
    preparationTime: "30-35 Mins",
    category: "Grilled", 
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop&crop=center",
    isTrending: true
  },
  {
    id: "8",
    name: "Dal Tadka",
    preparationTime: "10-15 Mins",
    category: "Vegetarian", 
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop&crop=center",
    isTrending: true
  }
];

const menuDishes: Dish[] = [
  {
    id: "9",
    name: "Chicken Korma",
    preparationTime: "22-28 Mins",
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop&crop=center"
  },
  {
    id: "10", 
    name: "Vegetable Pulao",
    preparationTime: "18-25 Mins",
    category: "Rice",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop&crop=center"
  },
  {
    id: "11",
    name: "Seekh Kebab", 
    preparationTime: "15-20 Mins",
    category: "Grilled",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop&crop=center"
  },
  {
    id: "12",
    name: "Palak Paneer",
    preparationTime: "12-18 Mins", 
    category: "Vegetarian",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop&crop=center"
  },
  {
    id: "13",
    name: "Chicken Dum Biryani",
    preparationTime: "40-45 Mins",
    category: "Specials", 
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop&crop=center"
  },
  {
    id: "14",
    name: "Prawn Curry",
    preparationTime: "20-25 Mins",
    category: "Seafood", 
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop&crop=center"
  },
  {
    id: "15",
    name: "Naan Bread",
    preparationTime: "8-12 Mins",
    category: "Bread", 
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop&crop=center"
  },
  {
    id: "16",
    name: "Rasgulla",
    preparationTime: "5-8 Mins",
    category: "Desserts", 
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop&crop=center"
  },
  {
    id: "17",
    name: "Chicken 65",
    preparationTime: "15-18 Mins",
    category: "Appetizers", 
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop&crop=center"
  },
  {
    id: "18",
    name: "Masala Dosa",
    preparationTime: "10-15 Mins",
    category: "South Indian", 
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=300&fit=crop&crop=center"
  }
];

const categories: Category[] = [
  { id: "1", name: "Main Course", emoji: "🍛" },
  { id: "2", name: "Appetizers", emoji: "🥗" },
  { id: "3", name: "Biryani", emoji: "🍚" },
  { id: "4", name: "Grilled", emoji: "🔥" },
  { id: "5", name: "Vegetarian", emoji: "🥬" },
  { id: "6", name: "Seafood", emoji: "🦐" },
  { id: "7", name: "Desserts", emoji: "🍰" },
  { id: "8", name: "Bread", emoji: "🥖" },
  { id: "9", name: "Rice", emoji: "🍚" },
  { id: "10", name: "Curry", emoji: "🍲" },
  { id: "11", name: "Tandoori", emoji: "🔥" },
  { id: "12", name: "South Indian", emoji: "🥞" },
  { id: "13", name: "Beverages", emoji: "🥤" },
  { id: "14", name: "Snacks", emoji: "🍿" },
  { id: "15", name: "Specials", emoji: "⭐" },
  { id: "16", name: "Main Course", emoji: "🍛" },
  { id: "17", name: "Appetizers", emoji: "🥗" },
  { id: "18", name: "Biryani", emoji: "🍚" },
  { id: "19", name: "Grilled", emoji: "🔥" },
  { id: "20", name: "Vegetarian", emoji: "🥬" },
  { id: "21", name: "Seafood", emoji: "🦐" },
  { id: "22", name: "Desserts", emoji: "🍰" },
  { id: "23", name: "Bread", emoji: "🥖" },
  { id: "24", name: "Rice", emoji: "🍚" },
  { id: "25", name: "Curry", emoji: "🍲" },
  { id: "26", name: "Tandoori", emoji: "🔥" },
  { id: "27", name: "South Indian", emoji: "🥞" },
  { id: "28", name: "Beverages", emoji: "🥤" },
  { id: "29", name: "Snacks", emoji: "🍿" },
  { id: "30", name: "Specials", emoji: "⭐" }
];

export default function MenuPage() {
  const params = useParams();
  const router = useRouter();
  const tenantId = params.tenantId as string;
  
  // State for selected category filter
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleDishClick = (dishId: string) => {
    router.push(`/tenant/${tenantId}/menu/${dishId}`);
  };

  const handleCategorySelect = (categoryName: string) => {
    // Toggle category selection
    setSelectedCategory(selectedCategory === categoryName ? null : categoryName);
  };

  // Filter dishes based on selected category
  const filteredMenuDishes = useMemo(() => {
    if (!selectedCategory) {
      return menuDishes; // Show all dishes if no category selected
    }
    return menuDishes.filter(dish => dish.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="space-y-8 py-6">
      {/* Trending Section */}
      <div className="space-y-6">
        <SectionHeader
          title="Trending on Your Menu"
          description="See what's winning hearts and driving sales today"
          actionButtons={
            <>
              <Button 
                variant="outline"
                size="sm"
                className="rounded-2xl bg-muted hover:bg-muted/80 cursor-pointer hover:scale-105 transition-all duration-200"
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit Details
              </Button>
              <Button 
                size="sm"
                className="rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer hover:scale-105 transition-all duration-200"
                onClick={() => router.push(`/tenant/${tenantId}/menu/edit`)}
              >
                <Plus className="h-4 w-4 mr-1" />
                Upload Dish
              </Button>
            </>
          }
        />
        <MenuSection
          dishes={trendingDishes}
          onDishClick={handleDishClick}
        />
      </div>

      {/* What's On Your Menu Section */}
      <div className="space-y-6">
        {/* Header */}
        <div className="pl-4 pr-4">
          <div className="w-full">
            <h2 className="text-2xl font-bold text-foreground">What's On Your Menu</h2>
            <p className="text-muted-foreground">See what's winning hearts and driving sales today</p>
          </div>
        </div>

        {/* Categories Section */}
        <div className="space-y-4">
          <CategoryCarousel 
            categories={categories} 
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
          />
        </div>

        {/* Menu Dishes Carousel */}
        <MenuSection
          dishes={filteredMenuDishes}
          onDishClick={handleDishClick}
        />
        
        {/* Show message when no dishes match the selected category */}
        {selectedCategory && filteredMenuDishes.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No dishes found in "{selectedCategory}" category.</p>
            <Button 
              variant="outline" 
              onClick={() => setSelectedCategory(null)}
              className="mt-2"
            >
              Show All Dishes
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
