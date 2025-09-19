import * as React from "react"

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
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { cn } from "@workspace/ui/lib/utils"

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
    const [isDark, setIsDark] = React.useState(false)

    React.useEffect(() => {
      const checkTheme = () => {
        setIsDark(document.documentElement.classList.contains('dark'))
      }
      
      checkTheme()
      const observer = new MutationObserver(checkTheme)
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
      
      return () => observer.disconnect()
    }, [])

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setSearchValue(value)
      onSearchChange?.(value)
    }

    return (
      <header
        ref={ref}
        className={cn(
          "flex items-center p-4 bg-background",
          className
        )}
      >
        <div className="flex items-center space-x-4">
          {showBackButton && (
            <Button
              variant="outline"
              size="sm"
              onClick={onBackClick}
              className="flex items-center space-x-2 rounded-xl"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Restaurants</span>
            </Button>
          )}
        </div>

        <div className="flex items-center space-x-4 flex-1 max-w-sm ml-6 mr-auto">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={handleSearchChange}
              className="pl-10 pr-16 rounded-md bg-muted/30 w-full"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">⌘</span>K
              </kbd>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3 ml-auto">
          <div 
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer",
              isDark 
                ? "hover:opacity-80" 
                : "bg-gray-200 hover:bg-gray-300"
            )}
            style={{
              backgroundColor: isDark ? '#393939' : undefined
            }}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-4 w-4 text-gray-700 dark:text-white rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 text-gray-700 dark:text-white rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </div>
          
          <div 
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer",
              isDark 
                ? "hover:opacity-80" 
                : "bg-gray-200 hover:bg-gray-300"
            )}
            style={{
              backgroundColor: isDark ? '#393939' : undefined
            }}
          >
            <Bell className="h-4 w-4 text-gray-700 dark:text-white" />
          </div>

          {primaryAction && (
            <Button
              onClick={primaryAction.onClick}
              className="flex items-center space-x-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 h-10"
            >
              {primaryAction.icon && <primaryAction.icon className="h-4 w-4" />}
              <span className="font-medium">{primaryAction.label}</span>
            </Button>
          )}
        </div>
      </header>
    )
  }
)
Header.displayName = "Header"

export { Header }