"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { StatsCard } from "@workspace/ui/components/stats-card"
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { DashboardCharts } from "@workspace/ui/components/charts"
import { Button } from "@workspace/ui/components/button"
import { 
  Building2, 
  Users, 
  DollarSign, 
  FileText,
  TrendingUp,
  BarChart3
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()

  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <Building2 className="h-6 w-6 text-yellow-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">Total Restaurants</p>
                  <p className="text-2xl font-bold text-white">126</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Users className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">Active Users</p>
                  <p className="text-2xl font-bold text-white">200</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <DollarSign className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">Monthly Recurring Revenue</p>
                  <p className="text-2xl font-bold text-white">$314.00</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <FileText className="h-6 w-6 text-yellow-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">Transactions Processed</p>
                  <p className="text-2xl font-bold text-white">20</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <DashboardCharts />

        {/* Restaurants List Preview */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-white">
              <div>
                <h2 className="text-xl font-semibold text-white">Restaurants</h2>
                <p className="text-sm text-gray-400">List of restaurants</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <button className="px-3 py-1 text-sm bg-white text-black rounded-md">
                    All
                  </button>
                  <button className="px-3 py-1 text-sm text-gray-400 hover:bg-gray-700 rounded-md">
                    Active
                  </button>
                  <button className="px-3 py-1 text-sm text-gray-400 hover:bg-gray-700 rounded-md">
                    Suspended
                  </button>
                </div>
                <Button 
                  onClick={() => router.push('/restaurants')}
                  className="px-4 py-2 text-sm bg-white text-black rounded-md hover:bg-gray-100 flex items-center space-x-2"
                >
                  <Building2 className="h-4 w-4" />
                  <span>View All Restaurants</span>
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Sample restaurant rows */}
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 border border-gray-700 rounded-lg bg-gray-700/20">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">M</span>
                    </div>
                    <div>
                      <p className="font-medium text-white">MC Donald's</p>
                      <p className="text-sm text-gray-400">Premium • Punjab</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="px-2 py-1 text-xs bg-green-600 text-white rounded-full">
                      Active
                    </span>
                    <button className="text-gray-400 hover:text-white">
                      ⋯
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}