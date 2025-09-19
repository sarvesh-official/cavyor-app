"use client";

interface PairingSuggestion {
  name: string;
  image: string;
}

interface PairingSuggestionsProps {
  suggestions: PairingSuggestion[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export function PairingSuggestions({ 
  suggestions, 
  title = "Pairing Suggestions",
  subtitle = "Perfect match with these favorites.",
  className = "" 
}: PairingSuggestionsProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <h3 className="text-2xl font-bold text-foreground">{title}</h3>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>
      
      {/* Pairing Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {suggestions.map((pairing, index) => (
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
  );
}
