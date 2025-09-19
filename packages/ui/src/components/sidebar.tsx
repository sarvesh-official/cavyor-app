import * as React from "react"
import { 
  LogOut,
  ChevronLeft,
  ChevronRight,
  ArrowLeft
} from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

export interface SidebarItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  href?: string
  onClick?: () => void
  badge?: string | number
}

export interface SidebarSection {
  title?: string
  items: SidebarItem[]
}

export interface SidebarProps {
  sections: SidebarSection[]
  activeItem?: string
  onItemClick?: (item: SidebarItem) => void
  collapsed?: boolean
  onToggleCollapse?: () => void
  className?: string
  showLogo?: boolean
  showBackButton?: boolean
  backButtonText?: string
  onBackClick?: () => void
  activeColorTheme?: 'green' | 'red'
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ 
    sections, 
    activeItem, 
    onItemClick, 
    collapsed = false, 
    onToggleCollapse, 
    className,
    showLogo = true,
    showBackButton = false,
    backButtonText = "Back",
    onBackClick,
    activeColorTheme = 'green'
  }, ref) => {
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

    // Dynamic color scheme based on activeColorTheme
    const getActiveColors = () => {
      if (activeColorTheme === 'red') {
        return {
          bg: 'bg-red-600',
          hover: 'hover:bg-red-700',
          hoverBg: 'hover:bg-red-500/10',
          darkBg: '#FF1833',
          lightBg: '#FF1833',
          lightHover: 'rgba(255, 24, 51, 0.1)',
          darkHover: 'rgba(255, 24, 51, 0.2)'
        }
      } else {
        return {
          bg: 'bg-green-600',
          hover: 'hover:bg-green-700',
          hoverBg: 'hover:bg-green-500/10',
          darkBg: '#1D923C',
          lightBg: '#1D923C',
          lightHover: 'rgba(34, 197, 94, 0.1)',
          darkHover: 'rgba(34, 197, 94, 0.2)'
        }
      }
    }

    const activeColors = getActiveColors()

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300 rounded-3xl m-4 mr-0 mb-6 h-[calc(100vh-1.4rem)]",
          collapsed ? "w-16" : "w-64",
          className
        )}
      >
        {/* Back Button - Only shown when showBackButton is true */}
        {showBackButton && !collapsed && (
          <div className="p-4 pb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBackClick}
              className="w-full justify-start h-10 rounded-full text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {backButtonText}
            </Button>
          </div>
        )}

        {/* Header with Logo - Only shown when showLogo is true */}
        {showLogo && (
          <div className="flex items-center justify-center p-6">
            {!collapsed && (
              <div className="flex items-center justify-center">
                <img 
                  src="/logo.png" 
                  alt="Logo" 
                  className="h-10 w-10 object-contain"
                  loading="lazy"
                />
                <img 
                  src="/cavyor logo.png" 
                  alt="Cavyor" 
                  className="h-12 w-auto object-contain mt-2"
                  loading="lazy"
                />
              </div>
            )}
            {collapsed && (
              <img 
                src="/logo.png" 
                alt="Logo" 
                className="h-8 w-8 object-contain mx-auto"
                loading="lazy"
              />
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 space-y-6 pt-8">
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-3">
              {section.title && !collapsed && (
                <h3 className="text-sm font-medium text-sidebar-foreground/60 px-2">
                  {section.title}
                </h3>
              )}
              <div className="space-y-2">
                {section.items.map((item) => {
                  const Icon = item.icon
                  const isActive = activeItem === item.id
                  const [isHovered, setIsHovered] = React.useState(false)
                  
                  return (
                    <Button
                      key={item.id}
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "w-full justify-start h-12 rounded-3xl transition-all duration-200 cursor-pointer text-white hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
                        !isActive && (isDark
                              ? "text-sidebar-foreground/80 hover:text-sidebar-foreground hover:shadow-sm hover:scale-[1.01] active:scale-[0.99]"
                              : "text-sidebar-foreground/80 hover:text-sidebar-foreground hover:shadow-sm hover:scale-[1.01] active:scale-[0.99]"
                            ),
                        collapsed && "justify-center px-2"
                      )}
                      onClick={() => onItemClick?.(item)}
                      style={{
                        backgroundColor: isActive 
                          ? (isDark ? activeColors.darkBg : activeColors.lightBg)
                          : (isDark ? '#242424' : '#f1f5f9'),
                        ...(isHovered && !isActive && {
                          backgroundColor: isDark ? activeColors.darkHover : activeColors.lightHover
                        })
                      }}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <div
                        className={cn(
                          "flex items-center justify-center rounded-full transition-all duration-200 w-8 h-8",
                          !collapsed && "mr-3"
                        )}
                        style={{
                          backgroundColor: isActive
                            ? (isDark ? activeColors.darkBg : activeColors.lightBg)
                            : (isDark ? '#393939' : '#e2e8f0')
                        }}
                      >
                        <Icon className={cn(
                          "h-4 w-4",
                          isActive
                            ? "text-white"
                            : (isDark ? "text-white" : "text-gray-600")
                        )} />
                      </div>
                      {!collapsed && <span className="font-medium">{item.label}</span>}
                      {item.badge && !collapsed && (
                        <span className="ml-auto bg-sidebar-accent text-sidebar-accent-foreground rounded-full px-2 py-1 text-xs">
                          {item.badge}
                        </span>
                      )}
                    </Button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Logout Button */}
        <div className="p-4 pt-2">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "w-full justify-start h-12 rounded-3xl transition-all duration-200 cursor-pointer",
              isDark
                ? "text-sidebar-foreground/80 hover:text-sidebar-foreground hover:shadow-sm hover:scale-[1.01] active:scale-[0.99]"
                : "text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-green-500/10 hover:shadow-sm hover:scale-[1.01] active:scale-[0.99]",
              collapsed && "justify-center px-2"
            )}
            style={{
              backgroundColor: isDark ? '#242424' : '#f1f5f9'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = isDark ? '#ff1833' : '#ef4444'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = isDark ? '#242424' : '#f1f5f9'
            }}
          >
            <div
              className={cn(
                "flex items-center justify-center rounded-full transition-all duration-200 w-8 h-8",
                !collapsed && "mr-3"
              )}
              style={{
                backgroundColor: isDark ? '#dc2626' : '#ef4444'
              }}
            >
              <LogOut className="h-4 w-4 text-white" />
            </div>
            {!collapsed && <span className="font-medium">Log Out</span>}
          </Button>
        </div>
      </div>
    )
  }
)

Sidebar.displayName = "Sidebar"

export { Sidebar }