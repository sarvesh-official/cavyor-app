"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import { 
  Settings,
  Box
} from "lucide-react";

export default function DishPreviewPage() {
  const params = useParams();
  const router = useRouter();
  const tenantId = params.tenantId as string;

  // Mock data - in real app, this would come from the form data
  const dishData = {
    name: "Hyderabadi Dum Biriyani",
    description: "A royal blend of fragrant basmati rice, tender meat, and aromatic spices, slow-cooked to perfection. Rich, flavorful, and layered with saffron – the timeless taste of Hyderabad in every bite.",
    image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=800&h=600&fit=crop&crop=center",
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

  return (
    <div className="space-y-6">
      {/* Hero Image Section */}
      <div 
        className="w-full h-80 rounded-3xl relative overflow-hidden"
        style={{
          backgroundImage: `url(${dishData.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Edit Details Button - Top Right */}
        <div className="absolute top-4 right-4">
          <Button 
            variant="secondary"
            size="sm"
            className="bg-background/80 hover:bg-background/90 text-foreground rounded-2xl px-4 py-2 font-medium shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
            onClick={() => router.push(`/tenant/${tenantId}/menu/edit`)}
          >
            <Settings className="h-4 w-4 mr-2" />
            Edit Details
          </Button>
        </div>
      </div>

      {/* Category Pills and Title */}
      <div className="space-y-4">
        {/* Category Pills */}
        <div className="flex items-center space-x-3">
          <Badge 
            className="bg-red-600 hover:bg-red-700 text-white rounded-2xl px-4 py-2 font-medium cursor-pointer transition-all duration-200"
          >
            ❤️ {dishData.category}
          </Badge>
          <Badge 
            className="bg-green-600 hover:bg-green-700 text-white rounded-2xl px-4 py-2 font-medium cursor-pointer transition-all duration-200"
          >
            🕐 {dishData.preparationTime}
          </Badge>
        </div>

        {/* Dish Title */}
        <h1 className="text-4xl font-bold text-foreground">
          {dishData.name}
        </h1>

        {/* Description */}
        <p className="text-muted-foreground text-lg leading-relaxed">
          {dishData.description}
        </p>
      </div>

      {/* Try in 3D Button */}
      <div className="w-full">
        <Button 
          className="w-full bg-red-600 hover:bg-red-700 text-white rounded-2xl py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] cursor-pointer"
          onClick={() => {
            // Handle 3D view logic here
            console.log("Opening 3D view...");
          }}
        >
          <Box className="h-5 w-5 mr-3" />
          Try in 3D
        </Button>
      </div>

      {/* Allergen Section */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-foreground">Allergen</h3>
        
        {/* Allergen Pills */}
        <div className="flex flex-wrap gap-3">
          {dishData.allergens.map((allergen, index) => (
            <Badge 
              key={index}
              className="bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded-2xl px-4 py-2 font-medium cursor-pointer transition-all duration-200"
            >
              {allergen}
            </Badge>
          ))}
        </div>
      </div>

      {/* Pairing Suggestions Section */}
      <div className="space-y-4">
        <div>
          <h3 className="text-2xl font-bold text-foreground">Pairing Suggestions</h3>
          <p className="text-muted-foreground">Perfect match with these favorites.</p>
        </div>
        
        {/* Pairing Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {pairingSuggestions.map((pairing, index) => (
            <div 
              key={index}
              className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer"
            >
              <div className="aspect-square relative">
                <img
                  src={pairing.image}
                  alt={pairing.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-foreground text-center">
                  {pairing.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
