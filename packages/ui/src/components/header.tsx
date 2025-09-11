import * as React from "react"
import { cn } from "../lib/utils"
import { Button } from "./button"
import { Input } from "./input"
import { 
  Search, 
  Sun, 
  Moon, 
  Bell, 
  User,
  Plus,
  ArrowLeft
} from "lucide-react"
import { useTheme } from "next-themes"

export interface HeaderProps {
  title?: string
  showBackButton?: boolean
  onBackClick?: () => void
  searchPlaceholder?: string
  onSearchChange?: (value: string) => void
  primaryAction?: {
    label: string
    onClick: () => void
    icon?: React.ComponentType<{ className?: string }>
  }
  className?: string
}

const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
  ({ 
    title, 
    showBackButton = false, 
    onBackClick, 
    searchPlaceholder = "Search Here...", 
    onSearchChange,
    primaryAction,
    className 
  }, ref) => {
    const { theme, setTheme } = useTheme()
    const [searchValue, setSearchValue] = React.useState("")

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setSearchValue(value)
      onSearchChange?.(value)
    }

    return (
      <header
        ref={ref}
        className={cn(
          "flex items-center justify-between p-4 border-b border-border bg-background",
          className
        )}
      >
        <div className="flex items-center space-x-4">
          {showBackButton && (
            <Button
              variant="outline"
              size="sm"
              onClick={onBackClick}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Restaurants</span>
            </Button>
          )}
          {title && !showBackButton && (
            <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          )}
        </div>

        <div className="flex items-center space-x-4 flex-1 max-w-md mx-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={handleSearchChange}
              className="pl-10 pr-4"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">⌘</span>K
              </kbd>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-muted-foreground hover:text-foreground hover:bg-accent"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-accent">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Notifications</span>
          </Button>
          
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-accent">
            <User className="h-4 w-4" />
            <span className="sr-only">User menu</span>
          </Button>

          {primaryAction && (
            <Button
              onClick={primaryAction.onClick}
              className="flex items-center space-x-2 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {primaryAction.icon && <primaryAction.icon className="h-4 w-4" />}
              <span>{primaryAction.label}</span>
            </Button>
          )}
        </div>
      </header>
    )
  }
)
Header.displayName = "Header"

export { Header }
