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
      color: "text-blue-500"
    },
    {
      icon: Building2,
      label: "Outlets",
      value: "14",
      color: "text-yellow-500"
    },
    {
      icon: Star,
      label: "Subscription",
      value: "$200/yr",
      color: "text-yellow-500"
    },
    {
      icon: Users,
      label: "Total Employees",
      value: "20",
      color: "text-blue-500"
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
            className="h-48 rounded-lg overflow-hidden relative"
            style={{ 
              background: `linear-gradient(to right, ${branding.primaryColor}, ${branding.primaryColor}dd)`
            }}
          >
            {/* KFC Banner Image Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="text-4xl font-bold mb-2">KFC</div>
                <div className="text-lg opacity-90">Kentucky Fried Chicken</div>
              </div>
            </div>
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
          
          {/* Profile Picture */}
          <div className="absolute -bottom-8 left-6">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center border-4 border-gray-800"
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
            <Button variant="ghost" className="text-white hover:bg-white/20">
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
              <Card key={index} className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 bg-gray-700 rounded-lg`}>
                      <Icon className={`h-5 w-5 ${metric.color}`} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">{metric.label}</p>
                      <p className="text-lg font-bold text-white">{metric.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors cursor-pointer" onClick={() => router.push(`/tenant/${tenantId}/menu`)}>
            <CardContent className="p-6 text-center">
              <div className="flex flex-col items-center space-y-3">
                <div className="p-3 bg-gray-700 rounded-lg">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Manage Menu</h3>
                  <p className="text-gray-400 text-sm">View and edit restaurant menu</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="flex flex-col items-center space-y-3">
                <div className="p-3 bg-gray-700 rounded-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Team Members</h3>
                  <p className="text-gray-400 text-sm">Manage staff and permissions</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="flex flex-col items-center space-y-3">
                <div className="p-3 bg-gray-700 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Analytics</h3>
                  <p className="text-gray-400 text-sm">View performance metrics</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Restaurant Details Grid */}
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400">Owner Name</label>
                  <p className="text-white font-medium">{restaurantData.ownerName}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Admin Mail</label>
                  <p className="text-white font-medium">{restaurantData.adminMail}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Joining Date</label>
                  <p className="text-white font-medium">{restaurantData.joiningDate}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Expiry Date</label>
                  <p className="text-white font-medium">{restaurantData.expiryDate}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Restaurant Type</label>
                  <p className="text-white font-medium">{restaurantData.restaurantType}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Cuisine</label>
                  <p className="text-white font-medium">{restaurantData.cuisine}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Corp. PAN</label>
                  <p className="text-white font-medium">{restaurantData.corpPAN}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400">Owner PAN</label>
                  <p className="text-white font-medium">{restaurantData.ownerPAN}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">GST/VAT Number</label>
                  <p className="text-white font-medium">{restaurantData.gstVatNumber}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Default Currency</label>
                  <p className="text-white font-medium">{restaurantData.defaultCurrency}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Opening Hours</label>
                  <p className="text-white font-medium">{restaurantData.openingHours}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">No. Of Tables</label>
                  <p className="text-white font-medium">{restaurantData.noOfTables}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Primary Color</label>
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-6 h-6 rounded border border-gray-600"
                      style={{ backgroundColor: branding.primaryColor }}
                    ></div>
                    <span className="text-white font-medium">{branding.primaryColor}</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Secondary Color</label>
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-6 h-6 rounded border border-gray-600"
                      style={{ backgroundColor: branding.secondaryColor }}
                    ></div>
                    <span className="text-white font-medium">{branding.secondaryColor}</span>
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