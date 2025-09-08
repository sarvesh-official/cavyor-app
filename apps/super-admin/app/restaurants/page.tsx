"use client"

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
import { Building2, MoreHorizontal } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"
import { useRouter } from "next/navigation"

export default function RestaurantsPage() {
  const router = useRouter()
  
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
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Building2 className="h-6 w-6 text-white" />
          <div>
            <h1 className="text-3xl font-bold text-white">Restaurants</h1>
            <p className="text-gray-400">List of restaurants</p>
          </div>
        </div>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex space-x-1">
                {statusFilters.map((filter) => (
                  <Button
                    key={filter}
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "text-sm",
                      filter === "All" 
                        ? "bg-white text-black" 
                        : "text-gray-400 hover:bg-gray-700 hover:text-white"
                    )}
                  >
                    {filter}
                  </Button>
                ))}
              </div>
              <Button className="flex items-center space-x-2 bg-white text-black hover:bg-gray-100">
                <Building2 className="h-4 w-4" />
                <span>View All Restaurants</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700">
                  <TableHead className="text-gray-400">Name</TableHead>
                  <TableHead className="text-gray-400">Subscription</TableHead>
                  <TableHead className="text-gray-400">Location</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {restaurants.map((restaurant) => (
                  <TableRow key={restaurant.id} className="border-gray-700 hover:bg-gray-700/20">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">M</span>
                        </div>
                        <span className="font-medium text-white">{restaurant.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-white">{restaurant.subscription}</TableCell>
                    <TableCell className="text-white">{restaurant.location}</TableCell>
                    <TableCell>
                      <Badge className="bg-green-600 text-white">{restaurant.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="icon-sm" 
                        className="text-gray-400 hover:text-white"
                        onClick={() => router.push(`/tenant/${restaurant.id}`)}
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
