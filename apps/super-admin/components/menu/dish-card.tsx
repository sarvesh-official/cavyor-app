"use client";

import { Clock, MoreHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface DishCardProps {
  dish: {
    id: string;
    name: string;
    preparationTime: string;
    category: string;
    image: string;
    isTrending?: boolean;
  };
  onClick: (dishId: string) => void;
}

interface MarqueeTextProps {
  text: string;
  className?: string;
}

function MarqueeText({ text, className = "" }: MarqueeTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [shouldScroll, setShouldScroll] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const textElement = textRef.current;
    
    if (container && textElement) {
      // Check if text overflows the container
      const containerWidth = container.offsetWidth;
      const textWidth = textElement.scrollWidth;
      setShouldScroll(textWidth > containerWidth);
    }
  }, [text]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div
        ref={textRef}
        className={`whitespace-nowrap ${
          shouldScroll 
            ? 'animate-marquee hover:animation-pause' 
            : ''
        }`}
        style={shouldScroll ? {
          animation: 'marquee 8s linear infinite'
        } : {}}
      >
        {text}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 8s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

export function DishCard({ dish, onClick }: DishCardProps) {
  return (
    <div 
      className="rounded-3xl overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-200 w-full"
      style={{ backgroundColor: '#242424' }}
      onClick={() => onClick(dish.id)}
    >
      {/* Image Section - Takes most of the card with padding */}
      <div className="relative h-48 p-4">
        <div className="relative w-full h-full">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-full object-cover rounded-2xl"
            onError={(e) => {
              e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNTAgMTAwQzE2MS4wNDYgMTAwIDE3MCA5MS4wNDU3IDE3MCA4MEM1NyA2OC45NTQzIDE2MS4wNDYgNjAgMTUwIDYwQzEzOC45NTQgNjAgMTMwIDY4Ljk1NDMgMTMwIDgwQzEzMCA5MS4wNDU3IDEzOC45NTQgMTAwIDE1MCAxMDBaIiBmaWxsPSIjRTVFN0VCIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTMwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5Q0EzQUYiPkRpc2ggSW1hZ2U8L3RleHQ+Cjwvc3ZnPg=='
            }}
          />
        </div>
      </div>
      
      {/* Content Section - Compact bottom area with fixed height */}
      <div className="p-4 space-y-3 h-32 flex flex-col justify-between relative">
        {/* Dish Name - Marquee scrolling */}
        <div className="h-8 flex items-start">
          <MarqueeText 
            text={dish.name}
            className="text-xl font-bold text-white leading-relaxed"
          />
        </div>
        
        {/* Time with green clock icon */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4 text-green-500 flex-shrink-0" />
            <span className="text-sm text-white font-medium">{dish.preparationTime}</span>
          </div>
        </div>
        
        {/* Category and Menu Button Row */}
        <div className="flex items-center justify-between">
          <MarqueeText 
            text={dish.category}
            className="text-sm text-gray-400 flex-1"
          />
          
          {/* Three dots menu button - positioned in bottom container */}
          <button
            className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all ml-2 flex-shrink-0"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <MoreHorizontal className="h-4 w-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

