"use client";

import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { Plus } from "lucide-react";

interface AllergenSectionProps {
  allergens: string[];
  onAddAllergen?: () => void;
  className?: string;
}

export function AllergenSection({ allergens, onAddAllergen, className = "" }: AllergenSectionProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-2xl font-bold text-foreground">Allergen</h3>
      
      {/* Allergen Pills */}
      <div className="flex flex-wrap gap-3">
        {allergens.map((allergen, index) => (
          <Badge 
            key={index}
            className="bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded-2xl px-4 py-2 font-medium cursor-pointer transition-all duration-200"
          >
            {allergen}
          </Badge>
        ))}
        {onAddAllergen && (
          <Button 
            onClick={onAddAllergen}
            variant="outline"
            className="border-2 border-dashed border-muted-foreground/40 bg-transparent text-muted-foreground hover:border-muted-foreground/60 hover:text-foreground rounded-2xl px-4 py-2 font-medium cursor-pointer transition-all duration-200"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        )}
      </div>
    </div>
  );
}
