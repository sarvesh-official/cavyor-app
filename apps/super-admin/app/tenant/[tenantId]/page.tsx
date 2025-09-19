"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { 
  FileText,
  Folder,
  Users,
  Settings,
  MapPin,
  ChevronDown,
  Edit,
  Building2,
  Star,
  User,
  Palette,
  BarChart3
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useEffect, use } from "react"

interface TenantSettingsPageProps {
  params: Promise<{
    tenantId: string
  }>
}

interface TenantBranding {
  logoUrl?: string | null;
  primaryColor: string;
  secondaryColor: string;
}

export default function TenantSettingsPage({ params }: TenantSettingsPageProps) {
  const router = useRouter()
  const { tenantId } = use(params)

  // State for branding
  const [branding, setBranding] = useState<TenantBranding>({
    logoUrl: '',
    primaryColor: '#F44336',
    secondaryColor: '#FFFFFF',
  })

  // Mock restaurant data
  const restaurantData = {
    name: "Kentucky Fried Chicken",
    location: "Jalandhar, Punjab",
    ownerName: "Rajab Shoukath",
    adminMail: "rajabshoukathis@gmail.com",
    joiningDate: "02 JAN 2025",
    expiryDate: "02 JAN 2026",
    restaurantType: "Dine In",
    cuisine: "Continental",
    corpPAN: "GKRPR5502R",
    ownerPAN: "GKRPR5502R",
    gstVatNumber: "12345678910",
    defaultCurrency: "$ USD",
    openingHours: "11AM - 11PM",
    noOfTables: "10",
    primaryColor: branding.primaryColor,
    secondaryColor: branding.secondaryColor
  }

  const metrics = [
    {
      icon: FileText,
      label: "Dishes on Menu",
      value: "14",
      color: "#4CAF50"
    },
    {
      icon: Building2,
      label: "Outlets",
      value: "14",
      color: "#FF9800"
    },
    {
      icon: Star,
      label: "Subscription",
      value: "$200/yr",
      color: "#FFD700"
    },
    {
      icon: Users,
      label: "Total Employees",
      value: "20",
      color: "#2196F3"
    }
  ]

  const tenantSidebarSections = [
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

  // Fetch branding data
  useEffect(() => {
    fetchBranding()
  }, [tenantId])

  const fetchBranding = async () => {
    try {
      const response = await fetch(`/api/tenants/${tenantId}/branding`)
      if (response.ok) {
        const data = await response.json()
        setBranding(data)
      }
    } catch (error) {
      console.error('Error fetching branding:', error)
    }
  }

  return (
    <DashboardLayout 
      title=""
      showBackButton={true}
      onBackClick={() => router.push('/restaurants')}
      customSidebarSections={tenantSidebarSections}
      activeItem="overview"
    >
      <div className="space-y-6">
        {/* Restaurant Banner */}
        <div className="relative">
          <div 
            className="h-48 rounded-2xl overflow-hidden relative bg-cover bg-center"
            style={{ 
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 400"><rect fill="%23dc2626" width="1200" height="400"/></svg>')`,
              backgroundColor: branding.primaryColor
            }}
          >
            {/* KFC Banner Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="text-6xl font-bold mb-2">KFC</div>
                <div className="text-xl opacity-90">Kentucky Fried Chicken</div>
              </div>
            </div>
          </div>
          
          {/* Profile Picture */}
          <div className="absolute -bottom-8 left-6">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center border-4 border-background"
              style={{ backgroundColor: branding.primaryColor }}
            >
              <User className="h-8 w-8 text-white" />
            </div>
          </div>

          {/* Restaurant Name and Location */}
          <div className="absolute bottom-4 left-24 text-white">
            <h1 className="text-2xl font-bold">Kentucky Fried Chicken</h1>
            <p className="text-gray-200">Jalandhar, Punjab</p>
          </div>

          {/* View Link Button */}
          <div className="absolute bottom-4 right-4">
            <Button variant="ghost" className="text-white hover:bg-white/20 rounded-full">
              <MapPin className="h-4 w-4 mr-2" />
              View Link
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <Card key={index} className="bg-card border-border rounded-2xl">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-muted rounded-lg">
                      <Icon className="h-5 w-5" style={{ color: metric.color }} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{metric.label}</p>
                      <p className="text-lg font-bold text-foreground">{metric.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <Card className="bg-card border-border rounded-2xl hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => router.push(`/tenant/${tenantId}/menu`)}>
            <CardContent className="p-6 text-center">
              <div className="flex flex-col items-center space-y-3">
                <div className="p-3 bg-muted rounded-lg">
                  <FileText className="h-6 w-6 text-foreground" />
                </div>
                <div>
                  <h3 className="text-foreground font-semibold">Manage Menu</h3>
                  <p className="text-muted-foreground text-sm">View and edit restaurant menu</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border rounded-2xl hover:bg-muted/50 transition-colors cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="flex flex-col items-center space-y-3">
                <div className="p-3 bg-muted rounded-lg">
                  <Users className="h-6 w-6 text-foreground" />
                </div>
                <div>
                  <h3 className="text-foreground font-semibold">Team Members</h3>
                  <p className="text-muted-foreground text-sm">Manage staff and permissions</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border rounded-2xl hover:bg-muted/50 transition-colors cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="flex flex-col items-center space-y-3">
                <div className="p-3 bg-muted rounded-lg">
                  <BarChart3 className="h-6 w-6 text-foreground" />
                </div>
                <div>
                  <h3 className="text-foreground font-semibold">Analytics</h3>
                  <p className="text-muted-foreground text-sm">View performance metrics</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Restaurant Details Grid */}
        <Card className="bg-card border-border rounded-2xl">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground">Owner Name</label>
                  <p className="text-foreground font-medium">{restaurantData.ownerName}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Admin Mail</label>
                  <p className="text-foreground font-medium">{restaurantData.adminMail}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Joining Date</label>
                  <p className="text-foreground font-medium">{restaurantData.joiningDate}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Expiry Date</label>
                  <p className="text-foreground font-medium">{restaurantData.expiryDate}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Restaurant Type</label>
                  <p className="text-foreground font-medium">{restaurantData.restaurantType}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Cuisine</label>
                  <p className="text-foreground font-medium">{restaurantData.cuisine}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Corp. PAN</label>
                  <p className="text-foreground font-medium">{restaurantData.corpPAN}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground">Owner PAN</label>
                  <p className="text-foreground font-medium">{restaurantData.ownerPAN}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">GST/VAT Number</label>
                  <p className="text-foreground font-medium">{restaurantData.gstVatNumber}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Default Currency</label>
                  <p className="text-foreground font-medium">{restaurantData.defaultCurrency}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Opening Hours</label>
                  <p className="text-foreground font-medium">{restaurantData.openingHours}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">No. Of Tables</label>
                  <p className="text-foreground font-medium">{restaurantData.noOfTables}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Primary Color</label>
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-8 h-8 rounded-full border-2 border-border"
                      style={{ backgroundColor: branding.primaryColor }}
                    ></div>
                    <span className="text-foreground font-medium">{branding.primaryColor}</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Secondary Color</label>
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-8 h-8 rounded-full border-2 border-border"
                      style={{ backgroundColor: branding.secondaryColor }}
                    ></div>
                    <span className="text-foreground font-medium">{branding.secondaryColor}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}