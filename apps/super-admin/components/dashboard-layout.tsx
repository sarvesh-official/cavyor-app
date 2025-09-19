"use client"

import * as React from "react"
import { useRouter, usePathname } from "next/navigation"
import { Sidebar, SidebarItem, SidebarSection } from "@workspace/ui/components/sidebar"
import { Header } from "@workspace/ui/components/header"
import { ChevronLeft, Plus } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"
import { MAIN_SIDEBAR_SECTIONS, PRIMARY_ACTIONS } from "@/constants"

interface DashboardLayoutProps {
  children: React.ReactNode
  title?: string
  showBackButton?: boolean
  onBackClick?: () => void
  primaryAction?: {
    label: string
    onClick: () => void
    icon?: React.ComponentType<{ className?: string }>
  }
  customSidebarSections?: SidebarSection[]
  activeItem?: string
  showLogo?: boolean
  sidebarBackButton?: boolean
  sidebarBackText?: string
  onSidebarBackClick?: () => void
}

export function DashboardLayout({ 
  children, 
  title,
  showBackButton = false,
  onBackClick,
  primaryAction,
  customSidebarSections,
  activeItem: customActiveItem,
  showLogo = true,
  sidebarBackButton = false,
  sidebarBackText = "Back",
  onSidebarBackClick
}: DashboardLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [collapsed, setCollapsed] = React.useState(false)

  // Determine if this is a tenant page
  const isTenantPage = pathname.includes('/tenant/')

  // Determine active item based on current pathname or custom active item
  const getActiveItem = () => {
    if (customActiveItem) return customActiveItem
    if (pathname === "/") return "dashboard"
    if (pathname === "/restaurants") return "restaurants"
    if (pathname === "/users") return "users"
    if (pathname === "/billings") return "billings"
    if (pathname === "/settings") return "settings"
    if (pathname === "/monitoring") return "monitoring"
    if (pathname === "/support") return "support"
    return "dashboard"
  }

  const handleItemClick = (item: SidebarItem) => {
    if (item.href) {
      router.push(item.href)
    }
    if (item.onClick) {
      item.onClick()
    }
  }

  const defaultPrimaryAction = {
    label: PRIMARY_ACTIONS.ONBOARD_RESTAURANT.label,
    onClick: PRIMARY_ACTIONS.ONBOARD_RESTAURANT.onClick,
    icon: Plus,
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <div className="flex flex-col">
        {/* Back Button - Above Sidebar */}
        {isTenantPage && (
          <div className="mx-4 mt-4 mb-2">
              <button
                onClick={() => router.push('/restaurants')}
                className="flex items-center space-x-3 bg-sidebar border border-sidebar-border rounded-full hover:bg-sidebar-accent transition-all duration-200 w-full sm:w-64 h-12"
              >
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FFFFFF' }}>
                <div className="w-6 h-6 bg-muted/50 rounded-full flex items-center justify-center">
                 <ChevronLeft strokeWidth={3} className="w-5 h-5 text-black" />
                </div>
              </div>
              <span className="text-sidebar-foreground font-medium text-sm">Back to Restaurants</span>
            </button>
          </div>
        )}
        
        <Sidebar
          sections={customSidebarSections || MAIN_SIDEBAR_SECTIONS}
          activeItem={getActiveItem()}
          onItemClick={handleItemClick}
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed(!collapsed)}
          showLogo={isTenantPage ? false : showLogo}
          showBackButton={false}
          activeColorTheme={isTenantPage ? 'red' : 'green'}
        />
      </div>
      
      <div className="flex-1 flex flex-col min-h-0">
        <Header
          title={title}
          showBackButton={isTenantPage ? false : showBackButton}
          onBackClick={onBackClick}
          primaryAction={primaryAction || defaultPrimaryAction}
        />
        
        <main className={cn(
          "flex-1 bg-background",
          isTenantPage 
            ? "p-4 bg-sidebar rounded-3xl mt-1 mb-6 ml-10 mr-2 overflow-hidden max-w-[1195px]" 
            : "p-4 pb-8 overflow-y-auto"
        )}>
          <div className={cn(
            isTenantPage 
              ? "w-full h-full overflow-y-auto scrollbar-hide"
              : "w-full h-full mb-5"
          )}>
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}