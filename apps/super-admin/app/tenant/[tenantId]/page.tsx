"use client"

import { Card, CardContent } from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { 
  MapPin,
  ChevronDown,
  Edit,
  Building2,
  Star,
  User,
  FileText,
  Users
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useEffect, use } from "react"

interface TenantSettingsPageProps {
  params: Promise<{
    tenantId: string
  }>
}

export default function TenantSettingsPage({ params }: TenantSettingsPageProps) {
  const router = useRouter()
  const { tenantId } = use(params)

  // Mock restaurant data matching the design
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
    primaryColor: "#39478",
    secondaryColor: "#FFFFFF"
  }

  const metrics = [
    {
      icon: FileText,
      label: "Dishes on Menu",
      value: "14",
      bgColor: "#2D2D2D",
      iconColor: "#4ADE80"
    },
    {
      icon: Building2,
      label: "Outlets",
      value: "14",
      bgColor: "#2D2D2D",
      iconColor: "#F97316"
    },
    {
      icon: Star,
      label: "Subscription",
      value: "$200/yr",
      bgColor: "#2D2D2D",
      iconColor: "#EAB308"
    },
    {
      icon: Users,
      label: "Total Employees",
      value: "20",
      bgColor: "#2D2D2D",
      iconColor: "#3B82F6"
    }
  ]

  return (
    <div className="space-y-6">
      {/* Restaurant Banner with KFC Store Image */}
      <div className="relative">
        {/* Background Image Container */}
        <div 
          className="h-64 rounded-3xl overflow-hidden relative"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=1200&h=400&fit=crop&crop=center')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40" style={{ zIndex: 1 }}></div>
        </div>

        {/* KFC Logo Circle - Centered vertically, overlapping banner */}
        <div className="absolute left-8 -bottom-16 transform -translate-y-1/2" style={{ zIndex: 4 }}>
          <div className="w-42 h-42 rounded-full flex items-center justify-center border-4 border-white shadow-lg overflow-hidden">
            <img 
              src="/kfc_logo.png" 
              alt="KFC Logo" 
              className="w-42 h-42 object-cover"
            />
          </div>
        </div>

        {/* Restaurant Info - Below banner with View Link */}
        <div className="mt-6 flex items-center justify-between pr-8">
          <div className="ml-52">
            <h1 className="text-3xl font-bold mb-1 text-white">{restaurantData.name}</h1>
            <p className="text-white/80 text-lg">{restaurantData.location}</p>
          </div>
          
          {/* View Link Button with Location Icon */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <Button className="bg-white text-black hover:bg-gray-100 rounded-full px-6 py-2">
              View Link
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Dishes on Menu */}
        <div className="w-full h-24 px-3 py-3 bg-neutral-800 rounded-2xl flex items-center">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 p-3 bg-neutral-600 rounded-xl flex justify-center items-center">
              <FileText className="w-8 h-8 text-cyan-400" />
            </div>
            <div className="flex flex-col justify-center gap-1">
              <div className="text-neutral-400 text-sm font-medium">Dishes on Menu</div>
              <div className="text-white text-xl font-semibold">14</div>
            </div>
          </div>
        </div>

        {/* Outlets */}
        <div className="w-full h-24 px-3 py-3 bg-neutral-800 rounded-2xl flex items-center">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 p-3 bg-neutral-600 rounded-xl flex justify-center items-center">
              <Building2 className="w-8 h-8 text-amber-500" />
            </div>
            <div className="flex flex-col justify-center gap-1">
              <div className="text-neutral-400 text-sm font-medium">Outlets</div>
              <div className="text-white text-xl font-semibold">14</div>
            </div>
          </div>
        </div>

        {/* Subscription */}
        <div className="w-full h-24 px-3 py-3 bg-neutral-800 rounded-2xl flex items-center">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 p-3 bg-neutral-600 rounded-xl flex justify-center items-center">
              <Star className="w-8 h-8 text-yellow-400" />
            </div>
            <div className="flex flex-col justify-center gap-1">
              <div className="text-neutral-400 text-sm font-medium">Subscription</div>
              <div className="text-white text-xl font-semibold">$200/yr</div>
            </div>
          </div>
        </div>

        {/* Total Employees */}
        <div className="w-full h-24 px-3 py-3 bg-neutral-800 rounded-2xl flex items-center">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 p-3 bg-neutral-600 rounded-xl flex justify-center items-center">
              <Users className="w-8 h-8 text-blue-400" />
            </div>
            <div className="flex flex-col justify-center gap-1">
              <div className="text-neutral-400 text-sm font-medium">Total Employees</div>
              <div className="text-white text-xl font-semibold">20</div>
            </div>
          </div>
        </div>
      </div>

      {/* Owner Name and Admin Mail - Two Full Width Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Owner Name */}
        <div className="h-20 px-4 py-3 bg-neutral-800 rounded-2xl flex items-center">
          <div className="flex flex-col justify-center gap-1">
            <div className="text-neutral-400 text-sm font-medium">Owner Name</div>
            <div className="text-white text-lg font-semibold">{restaurantData.ownerName}</div>
          </div>
        </div>

        {/* Admin Mail */}
        <div className="h-20 px-4 py-3 bg-neutral-800 rounded-2xl flex items-center">
          <div className="flex flex-col justify-center gap-1">
            <div className="text-neutral-400 text-sm font-medium">Admin Mail</div>
            <div className="text-white text-lg font-semibold">{restaurantData.adminMail}</div>
          </div>
        </div>
      </div>

      {/* Restaurant Details - 4 Columns x 3 Rows */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Row 1 */}
        {/* Joining Date */}
        <div className="h-20 px-4 py-3 bg-neutral-800 rounded-2xl flex items-center">
          <div className="flex flex-col justify-center gap-1">
            <div className="text-neutral-400 text-sm font-medium">Joining Date</div>
            <div className="text-white text-lg font-semibold">{restaurantData.joiningDate}</div>
          </div>
        </div>

        {/* Expiry Date */}
        <div className="h-20 px-4 py-3 bg-neutral-800 rounded-2xl flex items-center">
          <div className="flex flex-col justify-center gap-1">
            <div className="text-neutral-400 text-sm font-medium">Expiry Date</div>
            <div className="text-white text-lg font-semibold">{restaurantData.expiryDate}</div>
          </div>
        </div>

        {/* Restaurant Type */}
        <div className="h-20 px-4 py-3 bg-neutral-800 rounded-2xl flex items-center">
          <div className="flex flex-col justify-center gap-1">
            <div className="text-neutral-400 text-sm font-medium">Restaurant Type</div>
            <div className="text-white text-lg font-semibold">{restaurantData.restaurantType}</div>
          </div>
        </div>

        {/* Cuisine */}
        <div className="h-20 px-4 py-3 bg-neutral-800 rounded-2xl flex items-center">
          <div className="flex flex-col justify-center gap-1">
            <div className="text-neutral-400 text-sm font-medium">Cuisine</div>
            <div className="text-white text-lg font-semibold">{restaurantData.cuisine}</div>
          </div>
        </div>

        {/* Row 2 */}
        {/* Corp PAN */}
        <div className="h-20 px-4 py-3 bg-neutral-800 rounded-2xl flex items-center">
          <div className="flex flex-col justify-center gap-1">
            <div className="text-neutral-400 text-sm font-medium">Corp. PAN</div>
            <div className="text-white text-lg font-semibold">{restaurantData.corpPAN}</div>
          </div>
        </div>

        {/* Owner PAN */}
        <div className="h-20 px-4 py-3 bg-neutral-800 rounded-2xl flex items-center">
          <div className="flex flex-col justify-center gap-1">
            <div className="text-neutral-400 text-sm font-medium">Owner PAN</div>
            <div className="text-white text-lg font-semibold">{restaurantData.ownerPAN}</div>
          </div>
        </div>

        {/* GST/VAT Number */}
        <div className="h-20 px-4 py-3 bg-neutral-800 rounded-2xl flex items-center">
          <div className="flex flex-col justify-center gap-1">
            <div className="text-neutral-400 text-sm font-medium">GST/VAT Number</div>
            <div className="text-white text-lg font-semibold">{restaurantData.gstVatNumber}</div>
          </div>
        </div>

        {/* Default Currency */}
        <div className="h-20 px-4 py-3 bg-neutral-800 rounded-2xl flex items-center">
          <div className="flex flex-col justify-center gap-1">
            <div className="text-neutral-400 text-sm font-medium">Default Currency</div>
            <div className="text-white text-lg font-semibold">{restaurantData.defaultCurrency}</div>
          </div>
        </div>

        {/* Row 3 */}
        {/* Opening Hours */}
        <div className="h-20 px-4 py-3 bg-neutral-800 rounded-2xl flex items-center">
          <div className="flex flex-col justify-center gap-1">
            <div className="text-neutral-400 text-sm font-medium">Opening Hours</div>
            <div className="text-white text-lg font-semibold">{restaurantData.openingHours}</div>
          </div>
        </div>

        {/* No. Of Tables */}
        <div className="h-20 px-4 py-3 bg-neutral-800 rounded-2xl flex items-center">
          <div className="flex flex-col justify-center gap-1">
            <div className="text-neutral-400 text-sm font-medium">No. Of Tables</div>
            <div className="text-white text-lg font-semibold">{restaurantData.noOfTables}</div>
          </div>
        </div>

        {/* Primary Color */}
        <div 
          className="h-20 px-4 py-3 bg-neutral-800 rounded-2xl flex items-center justify-between cursor-pointer hover:bg-neutral-700 transition-colors duration-200"
          onClick={() => router.push(`/tenant/${tenantId}/branding`)}
        >
          <div className="flex flex-col justify-center gap-1">
            <div className="text-neutral-400 text-sm font-medium">Primary Color</div>
            <div className="text-white text-lg font-semibold">#39478</div>
          </div>
          <div className="w-20 h-10 bg-rose-600 rounded-full" />
        </div>

        {/* Secondary Color */}
        <div 
          className="h-20 px-4 py-3 bg-neutral-800 rounded-2xl flex items-center justify-between cursor-pointer hover:bg-neutral-700 transition-colors duration-200"
          onClick={() => router.push(`/tenant/${tenantId}/branding`)}
        >
          <div className="flex flex-col justify-center gap-1">
            <div className="text-neutral-400 text-sm font-medium">Secondary Color</div>
            <div className="text-white text-lg font-semibold">#FFFFFF</div>
          </div>
          <div className="w-20 h-10 bg-white rounded-full border border-neutral-600" />
        </div>
      </div>
    </div>
  )
}