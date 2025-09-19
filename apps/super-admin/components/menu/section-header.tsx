"use client";

import * as React from "react";

interface SectionHeaderProps {
  title: string;
  description: string;
  actionButtons?: React.ReactNode;
}

export function SectionHeader({ 
  title, 
  description, 
  actionButtons 
}: SectionHeaderProps) {
  return (
    <div className="pl-4 pr-4">
      <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        {actionButtons && (
          <div className="flex space-x-2 flex-shrink-0 self-end sm:self-auto">
            {actionButtons}
          </div>
        )}
      </div>
    </div>
  );
}
