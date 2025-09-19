"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { 
  Building2, 
  Users, 
  DollarSign, 
  FileText,
  Plus
} from "lucide-react"

import { DashboardLayout } from "@/components/dashboard-layout"
import { DashboardCharts } from "@workspace/ui/components/charts"
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"

export default function DashboardPage() {
  const router = useRouter()

  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-4">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-2xl p-4 cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 active:scale-[0.98]">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg" style={{ backgroundColor: '#FFA500' }}>
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Restaurants</p>
                  <p className="text-2xl font-bold text-foreground">126</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-card border border-border rounded-2xl p-4 cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 active:scale-[0.98]">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg" style={{ backgroundColor: '#4A90E2' }}>
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                  <p className="text-2xl font-bold text-foreground">200</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-card border border-border rounded-2xl p-4 cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 active:scale-[0.98]">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg" style={{ backgroundColor: '#50C878' }}>
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Monthly Recurring Revenue</p>
                  <p className="text-2xl font-bold text-foreground">$314.00</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-card border border-border rounded-2xl p-4 cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 active:scale-[0.98]">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg" style={{ backgroundColor: '#FFD700' }}>
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Transactions Processed</p>
                  <p className="text-2xl font-bold text-foreground">20</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="mt-4">
          <DashboardCharts />
        </div>

        {/* Restaurants List Preview */}
        <Card className="bg-card border-border rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-foreground">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-muted rounded-lg">
                  <Building2 className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Restaurants</h2>
                  <p className="text-sm text-muted-foreground">List of restaurants</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center rounded-full flex-1 mx-8">
                <div className="flex space-x-1 border border-white/50  rounded-full p-1">
                  <button className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-full cursor-pointer hover:bg-primary/90 hover:shadow-md transition-all duration-200 active:scale-95">
                    All
                  </button>
                  <button className="px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground rounded-full cursor-pointer hover:shadow-md transition-all duration-200 active:scale-95">
                    Active
                  </button>
                  <button className="px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground rounded-full cursor-pointer hover:shadow-md transition-all duration-200 active:scale-95">
                    Suspended
                  </button>
                </div>
              </div>

              <Button 
                onClick={() => router.push('/restaurants')}
                className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-full hover:bg-primary/90 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 active:scale-95 cursor-pointer flex items-center space-x-2"
              >
                <Building2 className="h-4 w-4" />
                <span>View All Restaurants</span>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Sample restaurant rows */}
              {[1, 2, 3].map((i) => (
                <div 
                  key={i} 
                  className="flex items-center justify-between p-4 border border-border rounded-2xl bg-muted/20 cursor-pointer hover:bg-muted/40 hover:shadow-md hover:scale-[1.01] transition-all duration-200 active:scale-[0.99]"
                  onClick={() => router.push(`/tenant/${i}`)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-destructive rounded-full flex items-center justify-center">
                      <span className="text-destructive-foreground font-bold">M</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">MC Donald's</p>
                      <p className="text-sm text-muted-foreground">Premium • Punjab</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="px-2 py-1 text-xs bg-success text-success-foreground rounded-xl cursor-pointer hover:bg-success/90 transition-all duration-200">
                      Active
                    </span>
                    <button 
                      className="text-muted-foreground hover:text-foreground cursor-pointer hover:bg-muted rounded-full p-2 transition-all duration-200 active:scale-90"
                      onClick={(e) => {
                        e.stopPropagation()
                        console.log('Action menu clicked for restaurant', i)
                      }}
                    >
                      ⋯
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="h-[0.1px]"></div>
      </div>
    </DashboardLayout>
  )
}