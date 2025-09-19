"use client";

import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { Plus, MoreHorizontal } from "lucide-react";

interface CategoryPill {
  label: string;
  emoji: string;
  color: 'red' | 'green' | 'dashed';
  showInfo?: boolean;
}

interface CategoryPillsProps {
  pills: CategoryPill[];
  onSaveChanges?: () => void;
  onMenuClick?: () => void;
  className?: string;
}

export function CategoryPills({ 
  pills, 
  onSaveChanges, 
  onMenuClick,
  className = "" 
}: CategoryPillsProps) {
  const getColorClasses = (color: CategoryPill['color']) => {
    switch (color) {
      case 'red':
        return "bg-red-600 hover:bg-red-700 text-white";
      case 'green':
        return "bg-green-600 hover:bg-green-700 text-white";
      case 'dashed':
        return "border-2 border-dashed border-muted-foreground/40 bg-transparent text-muted-foreground hover:border-muted-foreground/60 hover:text-foreground";
      default:
        return "";
    }
  };

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="flex items-center space-x-3">
        {pills.map((pill, index) => (
          <Badge 
            key={index}
            className={`${getColorClasses(pill.color)} rounded-2xl px-4 py-2 font-medium cursor-pointer transition-all duration-200 flex items-center space-x-2`}
          >
            <span>{pill.emoji}</span>
            <span>{pill.label}</span>
            {pill.showInfo && (
              <button className="ml-2 text-white/80 hover:text-white">
                ℹ️
              </button>
            )}
          </Badge>
        ))}
      </div>
      
      {/* Save Changes Button and Menu */}
      <div className="flex items-center space-x-3">
        {onSaveChanges && (
          <Button 
            className="bg-green-600 hover:bg-green-700 text-white rounded-2xl px-6 py-2 font-medium shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
            onClick={onSaveChanges}
          >
            <Plus className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        )}
        {onMenuClick && (
          <Button 
            variant="secondary"
            size="sm"
            className="bg-background hover:bg-background/90 text-foreground rounded-full w-10 h-10 p-0 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
            onClick={onMenuClick}
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
