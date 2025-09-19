"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  DishHero,
  CategoryPills,
  DishInfo,
  ModelActions,
  AllergenSection,
  PairingSuggestions
} from "@/components/dish-detail";

export default function DishViewPage() {
  const params = useParams();
  const router = useRouter();
  const tenantId = params.tenantId as string;
  const dishId = params.dishId as string;

  // Mock data based on the design image
  const dishData = {
    name: "Hyderabadi Dum Biriyani",
    description: "A royal blend of fragrant basmati rice, tender meat, and aromatic spices, slow-cooked to perfection. Rich, flavorful, and layered with saffron – the timeless taste of Hyderabad in every bite.",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800&h=600&fit=crop&crop=center",
    category: "Special Dish",
    preparationTime: "10-15 Mins",
    allergens: ["Nuts", "Egg", "Spicy"]
  };

  const pairingSuggestions = [
    {
      name: "Orange Juice",
      image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=200&h=150&fit=crop&crop=center"
    },
    {
      name: "Mango Lassi", 
      image: "https://images.unsplash.com/photo-1546173159-315724a31696?w=200&h=150&fit=crop&crop=center"
    },
    {
      name: "Fresh Lime Soda",
      image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=200&h=150&fit=crop&crop=center"
    },
    {
      name: "Buttermilk",
      image: "https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=200&h=150&fit=crop&crop=center"
    },
    {
      name: "Iced Tea",
      image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=200&h=150&fit=crop&crop=center"
    }
  ];

  const [allergens, setAllergens] = useState(dishData.allergens);

  // Category pills configuration
  const categoryPills = [
    {
      label: dishData.category,
      emoji: "❤️",
      color: "red" as const,
      showInfo: true
    },
    {
      label: dishData.preparationTime,
      emoji: "🕐", 
      color: "green" as const,
      showInfo: true
    },
    {
      label: "Add Text Property",
      emoji: "",
      color: "dashed" as const,
      showInfo: false
    }
  ];

  // Event handlers
  const handleSaveChanges = () => {
    console.log("Saving changes...");
  };

  const handleMenuClick = () => {
    console.log("Menu clicked...");
  };

  const handleDelete3D = () => {
    console.log("Deleting 3D model...");
  };

  const handleReUpload3D = () => {
    console.log("Re-uploading 3D model...");
  };

  const handleAddAllergen = () => {
    const newAllergen = prompt("Enter new allergen:");
    if (newAllergen && newAllergen.trim()) {
      setAllergens([...allergens, newAllergen.trim()]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Image Section */}
      <DishHero 
        imageUrl={dishData.image}
        dishName={dishData.name}
      />

      {/* Category Pills and Save Button Row */}
      <CategoryPills 
        pills={categoryPills}
        onSaveChanges={handleSaveChanges}
        onMenuClick={handleMenuClick}
      />

      {/* Dish Info */}
      <DishInfo 
        title={dishData.name}
        description={dishData.description}
      />

      {/* 3D Model Actions */}
      <ModelActions 
        onDelete={handleDelete3D}
        onReUpload={handleReUpload3D}
      />

      {/* Allergen Section */}
      <AllergenSection 
        allergens={allergens}
        onAddAllergen={handleAddAllergen}
      />

      {/* Pairing Suggestions */}
      <PairingSuggestions 
        suggestions={pairingSuggestions}
      />
    </div>
  );
}