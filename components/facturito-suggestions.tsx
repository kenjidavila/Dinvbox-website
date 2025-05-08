"use client"

import { Button } from "@/components/ui/button"

interface SuggestionProps {
  suggestions: string[]
  onSelectSuggestion: (suggestion: string) => void
}

export function FacturitoSuggestions({ suggestions, onSelectSuggestion }: SuggestionProps) {
  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {suggestions.map((suggestion, index) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          className="text-xs bg-gray-50 hover:bg-gray-100 text-gray-700"
          onClick={() => onSelectSuggestion(suggestion)}
        >
          {suggestion}
        </Button>
      ))}
    </div>
  )
}
