import * as React from "react"
import { 
  LogOut,
  ChevronLeft,
  ChevronRight
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
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ sections, activeItem, onItemClick, collapsed = false, onToggleCollapse, className }, ref) => {
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

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300 rounded-3xl m-4 mr-0 mb-6 h-[calc(100vh-1.4rem)]",
          collapsed ? "w-16" : "w-64",
          className
        )}
      >
        {/* Header */}
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

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 space-y-6">
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
                  
                  return (
                    <Button
                      key={item.id}
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "w-full justify-start h-12 rounded-3xl transition-all duration-200 cursor-pointer",
                        isActive 
                          ? "bg-green-600 text-white hover:bg-green-700 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]" 
                          : "text-sidebar-foreground/80 hover:text-sidebar-foreground hover:shadow-sm hover:scale-[1.01] active:scale-[0.99]",
                        collapsed && "justify-center px-2"
                      )}
                      onClick={() => onItemClick?.(item)}
                      style={{
                        backgroundColor: !isActive ? (isDark ? '#242424' : '#f1f5f9') : undefined
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = isDark ? 'rgba(34, 197, 94, 0.2)' : 'rgba(34, 197, 94, 0.1)'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = isDark ? '#242424' : '#f1f5f9'
                        }
                      }}
                    >
                      <div className={cn(
                        "flex items-center justify-center rounded-full transition-all duration-200",
                        "w-8 h-8",
                        isActive 
                          ? (isDark ? "hover:opacity-90" : "bg-green-500 hover:bg-green-600")
                          : "",
                        !collapsed && "mr-3"
                      )}
                      style={{
                        backgroundColor: isActive 
                          ? (isDark ? '#1D923C' : undefined)
                          : (isDark ? '#393939' : '#e2e8f0')
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = isDark ? 'rgba(34, 197, 94, 0.3)' : 'rgba(34, 197, 94, 0.2)'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = isDark ? '#393939' : '#e2e8f0'
                        }
                      }}>
                        <Icon className={cn(
                          "h-4 w-4",
                          isActive 
                            ? "text-white" 
                            : (isDark ? "text-white" : "text-gray-600")
                        )} />
                      </div>
                      {!collapsed && (
                        <>
                          <span className="flex-1 text-left font-medium">{item.label}</span>
                          {item.badge && (
                            <span className="ml-auto bg-red-600/20 text-red-400 text-xs px-1.5 py-0.5 rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </Button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "w-full justify-start h-12 rounded-3xl text-sidebar-foreground/80 hover:text-sidebar-foreground transition-all duration-200 cursor-pointer hover:shadow-sm hover:scale-[1.01] active:scale-[0.99]",
              collapsed && "justify-center px-2"
            )}
            style={{
              backgroundColor: isDark ? '#242424' : '#f1f5f9'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = isDark ? 'rgba(34, 197, 94, 0.2)' : 'rgba(34, 197, 94, 0.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = isDark ? '#242424' : '#f1f5f9'
            }}
          >
            <div className={cn(
              "flex items-center justify-center rounded-full transition-all duration-200",
              "w-8 h-8 bg-red-600 hover:bg-red-700",
              !collapsed && "mr-3"
            )}
            style={{
              backgroundColor: '#dc2626'
            }}>
              <LogOut className="h-4 w-4 text-white rotate-180" />
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