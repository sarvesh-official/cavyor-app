"use client"

import React from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"
import { Building2, MoreHorizontal, Plus } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"
import { useRouter } from "next/navigation"

export default function RestaurantsPage() {
  const router = useRouter()
  const [activeFilter, setActiveFilter] = React.useState("All")
  
  const restaurants = [
    {
      id: 1,
      name: "MC Donald's",
      subscription: "Premium",
      location: "Punjab",
      status: "Active",
    },
    {
      id: 2,
      name: "MC Donald's",
      subscription: "Premium", 
      location: "Punjab",
      status: "Active",
    },
    {
      id: 3,
      name: "MC Donald's",
      subscription: "Premium",
      location: "Punjab", 
      status: "Active",
    },
    {
      id: 4,
      name: "MC Donald's",
      subscription: "Premium",
      location: "Punjab",
      status: "Active",
    },
    {
      id: 5,
      name: "MC Donald's",
      subscription: "Premium",
      location: "Punjab",
      status: "Active",
    },
    {
      id: 6,
      name: "MC Donald's",
      subscription: "Premium",
      location: "Punjab",
      status: "Active",
    },
    {
      id: 7,
      name: "MC Donald's",
      subscription: "Premium",
      location: "Punjab",
      status: "Active",
    },
    {
      id: 8,
      name: "MC Donald's",
      subscription: "Premium",
      location: "Punjab",
      status: "Active",
    },
    {
      id: 9,
      name: "MC Donald's",
      subscription: "Premium",
      location: "Punjab",
      status: "Active",
    },
  ]

  const statusFilters = ["All", "Active", "Suspended", "Expired", "Draft"]

  return (
    <DashboardLayout>
      <div className="space-y-6 p-6">
        {/* Filters and Table Card */}
        <Card className="bg-card border-border rounded-2xl">
          <CardHeader className="pb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-muted rounded-lg">
                  <Building2 className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-foreground">Restaurants</h1>
                  <p className="text-sm text-muted-foreground">List of restaurants</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center flex-1 mx-8">
                <div className="flex space-x-1 border border-white/50 rounded-full p-1">
                  {statusFilters.map((filter) => (
                    <Button
                      key={filter}
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "px-4 py-2 text-sm rounded-full transition-all duration-200 cursor-pointer",
                        activeFilter === filter 
                          ? "bg-primary text-primary-foreground" 
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                      onClick={() => setActiveFilter(filter)}
                    >
                      {filter}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="w-[200px]"></div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground font-medium">Name</TableHead>
                  <TableHead className="text-muted-foreground font-medium">Subscription</TableHead>
                  <TableHead className="text-muted-foreground font-medium">Location</TableHead>
                  <TableHead className="text-muted-foreground font-medium">Status</TableHead>
                  <TableHead className="text-muted-foreground font-medium">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {restaurants.map((restaurant) => (
                  <TableRow 
                    key={restaurant.id} 
                    className="border-border hover:bg-muted/20 cursor-pointer transition-colors duration-200"
                    onClick={() => router.push(`/tenant/${restaurant.id}`)}
                  >
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">M</span>
                        </div>
                        <span className="font-medium text-foreground">{restaurant.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-foreground">{restaurant.subscription}</TableCell>
                    <TableCell className="text-foreground">{restaurant.location}</TableCell>
                    <TableCell>
                      <Badge className="bg-green-600 text-white hover:bg-green-700 rounded-full px-3 py-1">
                        {restaurant.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="text-muted-foreground hover:text-foreground hover:bg-muted rounded-full h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation()
                          // Handle actions menu
                        }}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
