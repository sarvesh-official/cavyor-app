import * as React from "react"
import { cn } from "../lib/utils"
import { Card, CardContent } from "./card"

export interface StatsCardProps {
  title: string
  value: string | number
  icon?: React.ComponentType<{ className?: string }>
  trend?: {
    value: string
    isPositive: boolean
  }
  className?: string
}

const StatsCard = React.forwardRef<HTMLDivElement, StatsCardProps>(
  ({ title, value, icon: Icon, trend, className }, ref) => {
    return (
      <Card ref={ref} className={cn("bg-gray-800 border-gray-700", className)}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {Icon && (
                <div className="p-2 bg-orange-500/20 rounded-lg">
                  <Icon className="h-6 w-6 text-orange-500" />
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-gray-400">{title}</p>
                <p className="text-2xl font-bold text-white">{value}</p>
              </div>
            </div>
            {trend && (
              <div className="text-right">
                <p className={cn(
                  "text-sm font-medium",
                  trend.isPositive ? "text-green-600" : "text-red-600"
                )}>
                  {trend.isPositive ? "+" : ""}{trend.value}
                </p>
                <p className="text-xs text-gray-400">from last month</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }
)
StatsCard.displayName = "StatsCard"

export { StatsCard }
