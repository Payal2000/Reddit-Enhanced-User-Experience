import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ChevronLeft, Check } from "lucide-react";

const interests = [
  { id: "tech", label: "Tech", icon: "💻" },
  { id: "fitness", label: "Fitness", icon: "💪" },
  { id: "beauty", label: "Beauty", icon: "💄" },
  { id: "finance", label: "Finance", icon: "💰" },
  { id: "ai", label: "AI", icon: "🤖" },
  { id: "gaming", label: "Gaming", icon: "🎮" },
  { id: "music", label: "Music", icon: "🎵" },
  { id: "food", label: "Food", icon: "🍕" },
  { id: "travel", label: "Travel", icon: "✈️" },
  { id: "art", label: "Art", icon: "🎨" },
  { id: "books", label: "Books", icon: "📚" },
  { id: "science", label: "Science", icon: "🔬" },
  { id: "politics", label: "Politics", icon: "🗳️" },
  { id: "sports", label: "Sports", icon: "⚽" },
  { id: "movies", label: "Movies", icon: "🎬" },
  { id: "photography", label: "Photography", icon: "📸" },
];

export default function InterestSelection() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (interestId: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interestId)
        ? prev.filter((id) => id !== interestId)
        : [...prev, interestId],
    );
  };

  return (
    <div className="min-h-screen bg-wireframe-bg">
      {/* Header */}
      <header className="border-b border-wireframe-border bg-wireframe-surface-primary">
        <div className="flex items-center justify-between p-4 max-w-4xl mx-auto">
          <Link
            to="/"
            className="p-2 hover:bg-wireframe-surface-hover rounded-md"
          >
            <ChevronLeft className="w-5 h-5 text-wireframe-text-secondary" />
          </Link>
          <div className="text-center">
            <h1 className="text-lg font-semibold text-wireframe-text-primary">
              Choose your interests
            </h1>
            <p className="text-sm text-wireframe-text-muted">
              Select at least 3 topics you're interested in
            </p>
          </div>
          <div className="w-9" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-6">
        <Card className="p-6 border border-wireframe-border bg-wireframe-surface-primary">
          {/* Interest Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
            {interests.map((interest) => {
              const isSelected = selectedInterests.includes(interest.id);
              return (
                <button
                  key={interest.id}
                  onClick={() => toggleInterest(interest.id)}
                  className={`
                    relative p-4 rounded-lg border-2 transition-all duration-200 text-center hover:border-wireframe-text-secondary
                    ${
                      isSelected
                        ? "border-wireframe-text-primary bg-wireframe-text-primary text-white"
                        : "border-wireframe-border bg-wireframe-surface-secondary text-wireframe-text-primary hover:bg-wireframe-surface-hover"
                    }
                  `}
                >
                  {isSelected && (
                    <div className="absolute top-1 right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-wireframe-text-primary" />
                    </div>
                  )}
                  <div className="text-2xl mb-2">{interest.icon}</div>
                  <div className="text-sm font-medium">{interest.label}</div>
                </button>
              );
            })}
          </div>

          {/* Selected Count */}
          <div className="text-center mb-6">
            <Badge
              variant={selectedInterests.length >= 3 ? "default" : "secondary"}
              className="px-3 py-1"
            >
              {selectedInterests.length} selected{" "}
              {selectedInterests.length >= 3
                ? "✓"
                : `(${3 - selectedInterests.length} more needed)`}
            </Badge>
          </div>

          {/* Continue Button */}
          <Button
            className={`w-full h-12 transition-all duration-200 ${
              selectedInterests.length >= 3
                ? "bg-wireframe-text-primary hover:bg-wireframe-text-secondary text-white"
                : "bg-wireframe-surface-secondary text-wireframe-text-muted cursor-not-allowed"
            }`}
            disabled={selectedInterests.length < 3}
            asChild={selectedInterests.length >= 3}
          >
            {selectedInterests.length >= 3 ? (
              <Link to="/home">Continue</Link>
            ) : (
              <span>Continue</span>
            )}
          </Button>

          {/* Skip Link */}
          <div className="text-center mt-4">
            <Link
              to="/home"
              className="text-wireframe-text-muted hover:text-wireframe-text-secondary text-sm hover:underline"
            >
              Skip for now
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
