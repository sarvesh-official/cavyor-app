"use client";

import { Button } from "@workspace/ui/components/button";
import { Box } from "lucide-react";

interface ModelActionsProps {
  onDelete?: () => void;
  onReUpload?: () => void;
  className?: string;
}

export function ModelActions({ onDelete, onReUpload, className = "" }: ModelActionsProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${className}`}>
      <Button 
        className="w-full bg-red-600 hover:bg-red-700 text-white rounded-md py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] cursor-pointer"
        onClick={onDelete}
      >
        <Box className="h-5 w-5 mr-3" />
        Delete 3D
      </Button>
      <Button 
        className="w-full bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded-md py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] cursor-pointer"
        onClick={onReUpload}
      >
        <Box className="h-5 w-5 mr-3" />
        Re Upload 3D
      </Button>
    </div>
  );
}
