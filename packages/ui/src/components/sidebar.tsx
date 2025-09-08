import * as React from "react"
import { cn } from "../lib/utils"
import { Button } from "./button"
import { 
  Home, 
  Building2, 
  Users, 
  FileText, 
  Settings, 
  BarChart3, 
  HelpCircle, 
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react"

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
    return (
      <div
        ref={ref}
        className={cn(
          "flex h-full flex-col bg-gray-900 border-r border-gray-700 transition-all duration-300",
          collapsed ? "w-16" : "w-64",
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-center p-4 border-b border-gray-700">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="font-semibold text-white text-lg">Cavyor</span>
            </div>
          )}
          {collapsed && (
            <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center mx-auto">
              <span className="text-white font-bold text-sm">C</span>
            </div>
          )}
          {onToggleCollapse && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={onToggleCollapse}
              className="ml-auto text-gray-300 hover:text-white hover:bg-gray-800"
            >
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          )}
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-2">
              {section.title && !collapsed && (
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {section.title}
                </h3>
              )}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon
                  const isActive = activeItem === item.id
                  
                  return (
                    <Button
                      key={item.id}
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "w-full justify-start h-12 rounded-lg",
                        isActive ? "bg-red-600 text-white hover:bg-red-700" : "text-gray-300 hover:text-white hover:bg-gray-800",
                        collapsed && "justify-center px-2"
                      )}
                      onClick={() => onItemClick?.(item)}
                    >
                      <Icon className={cn("h-5 w-5", !collapsed && "mr-3")} />
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
        <div className="p-4 border-t border-gray-700">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "w-full h-12 rounded-lg bg-red-600 text-white hover:bg-red-700",
              collapsed && "justify-center px-2"
            )}
          >
            <LogOut className={cn("h-5 w-5", !collapsed && "mr-3")} />
            {!collapsed && "Log Out"}
          </Button>
        </div>
      </div>
    )
  }
)
Sidebar.displayName = "Sidebar"

export { Sidebar }
