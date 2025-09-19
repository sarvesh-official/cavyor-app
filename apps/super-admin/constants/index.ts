import { 
  Home, 
  Building2, 
  Users, 
  FileText, 
  Settings, 
  BarChart3, 
  HelpCircle,
  Folder,
  Palette
} from "lucide-react"

// Main dashboard sidebar sections
export const MAIN_SIDEBAR_SECTIONS = [
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

// Tenant-specific sidebar sections generator
export const getTenantSidebarSections = (tenantId: string) => [
  {
    title: "Tenant Settings",
    items: [
      {
        id: "overview",
        label: "Overview",
        icon: FileText,
        href: `/tenant/${tenantId}`,
      },
      {
        id: "menu",
        label: "Menu",
        icon: FileText,
        href: `/tenant/${tenantId}/menu`,
      },
      {
        id: "repository",
        label: "Repository",
        icon: Folder,
        href: `/tenant/${tenantId}/repository`,
      },
      {
        id: "members",
        label: "Members",
        icon: Users,
        href: `/tenant/${tenantId}/members`,
      },
      {
        id: "branding",
        label: "Branding",
        icon: Palette,
        href: `/tenant/${tenantId}/branding`,
      },
      {
        id: "settings",
        label: "Settings",
        icon: Settings,
        href: `/tenant/${tenantId}/settings`,
      },
    ],
  },
]

// Primary actions
export const PRIMARY_ACTIONS = {
  ONBOARD_RESTAURANT: {
    label: "Onboard Restaurant",
    onClick: () => console.log("Onboard Restaurant clicked"),
  },
}
