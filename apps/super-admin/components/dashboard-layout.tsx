"use client"

import * as React from "react"
import { useRouter, usePathname } from "next/navigation"
import { Sidebar, SidebarItem, SidebarSection } from "@workspace/ui/components/sidebar"
import { Header } from "@workspace/ui/components/header"
import { 
  Home, 
  Building2, 
  Users, 
  FileText, 
  Settings, 
  BarChart3, 
  HelpCircle,
  Plus
} from "lucide-react"

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
}

export function DashboardLayout({ 
  children, 
  title,
  showBackButton = false,
  onBackClick,
  primaryAction,
  customSidebarSections,
  activeItem: customActiveItem
}: DashboardLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [collapsed, setCollapsed] = React.useState(false)

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

  const sidebarSections: SidebarSection[] = [
    {
      title: "Main",
      items: [
        {
          id: "dashboard",
          label: "Dashboard",
          icon: Home,
          href: "/",
        },
        {
          id: "restaurants",
          label: "Restaurants",
          icon: Building2,
          href: "/restaurants",
        },
        {
          id: "users",
          label: "Users",
          icon: Users,
          href: "/users",
        },
        {
          id: "billings",
          label: "Billings & Plans",
          icon: FileText,
          href: "/billings",
        },
      ],
    },
    {
      title: "Configurations",
      items: [
        {
          id: "settings",
          label: "Settings",
          icon: Settings,
          href: "/settings",
        },
        {
          id: "monitoring",
          label: "Monitoring",
          icon: BarChart3,
          href: "/monitoring",
        },
        {
          id: "support",
          label: "Support",
          icon: HelpCircle,
          href: "/support",
        },
      ],
    },
  ]

  const handleItemClick = (item: SidebarItem) => {
    if (item.href) {
      router.push(item.href)
    }
    if (item.onClick) {
      item.onClick()
    }
  }

  const defaultPrimaryAction = {
    label: "Onboard Restaurant",
    onClick: () => console.log("Onboard Restaurant clicked"),
    icon: Plus,
  }

  return (
    <div className="flex h-screen bg-gray-800">
      <Sidebar
        sections={customSidebarSections || sidebarSections}
        activeItem={getActiveItem()}
        onItemClick={handleItemClick}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title={title}
          showBackButton={showBackButton}
          onBackClick={onBackClick}
          primaryAction={primaryAction || defaultPrimaryAction}
        />
        
        <main className="flex-1 overflow-y-auto p-6 bg-gray-800">
          {children}
        </main>
      </div>
    </div>
  )
}
