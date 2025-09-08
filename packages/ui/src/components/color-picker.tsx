import * as React from "react"
import { cn } from "../lib/utils"
import { Button } from "./button"
import { Input } from "./input"
import { Check } from "lucide-react"

export interface ColorPickerProps {
  value: string
  onChange: (color: string) => void
  label?: string
  className?: string
}

const ColorPicker = React.forwardRef<HTMLDivElement, ColorPickerProps>(
  ({ value, onChange, label, className }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [inputValue, setInputValue] = React.useState(value)

    const predefinedColors = [
      "#F44336", // Red
      "#E91E63", // Pink
      "#9C27B0", // Purple
      "#673AB7", // Deep Purple
      "#3F51B5", // Indigo
      "#2196F3", // Blue
      "#03A9F4", // Light Blue
      "#00BCD4", // Cyan
      "#009688", // Teal
      "#4CAF50", // Green
      "#8BC34A", // Light Green
      "#CDDC39", // Lime
      "#FFEB3B", // Yellow
      "#FFC107", // Amber
      "#FF9800", // Orange
      "#FF5722", // Deep Orange
      "#795548", // Brown
      "#607D8B", // Blue Grey
      "#9E9E9E", // Grey
      "#000000", // Black
      "#FFFFFF", // White
    ]

    const handleColorSelect = (color: string) => {
      onChange(color)
      setInputValue(color)
      setIsOpen(false)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const color = e.target.value
      setInputValue(color)
      if (color.match(/^#[0-9A-F]{6}$/i)) {
        onChange(color)
      }
    }

    React.useEffect(() => {
      setInputValue(value)
    }, [value])

    return (
      <div ref={ref} className={cn("space-y-2", className)}>
        {label && (
          <label className="text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="w-12 h-8 p-0 border-2"
              style={{ backgroundColor: value }}
            >
              <span className="sr-only">Select color</span>
            </Button>
            
            {isOpen && (
              <div className="absolute top-full left-0 mt-2 p-3 bg-background border rounded-lg shadow-lg z-50">
                <div className="grid grid-cols-6 gap-2 w-48">
                  {predefinedColors.map((color) => (
                    <button
                      key={color}
                      className={cn(
                        "w-8 h-8 rounded border-2 hover:scale-110 transition-transform",
                        value === color ? "border-foreground" : "border-border"
                      )}
                      style={{ backgroundColor: color }}
                      onClick={() => handleColorSelect(color)}
                    >
                      {value === color && (
                        <Check className="h-4 w-4 text-white mx-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <Input
            value={inputValue}
            onChange={handleInputChange}
            placeholder="#000000"
            className="w-24"
          />
        </div>
      </div>
    )
  }
)
ColorPicker.displayName = "ColorPicker"

export { ColorPicker }
