"use client"

import * as React from "react"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  Area, 
  AreaChart 
} from "recharts"

const subscriptionData = [
  { month: "Jan", value: 220 },
  { month: "Feb", value: 320 },
  { month: "Mar", value: 280 },
  { month: "Apr", value: 420 },
  { month: "May", value: 380 },
  { month: "Jun", value: 480 },
  { month: "Jul", value: 520 },
  { month: "Aug", value: 450 },
  { month: "Sep", value: 380 },
  { month: "Oct", value: 420 },
  { month: "Nov", value: 380 },
  { month: "Dec", value: 520 },
]

const dishesData = [
  { name: "DC", value: 90 },
  { name: "SNCH", value: 95 },
  { name: "ILA", value: 85 },
  { name: "MAJLIS", value: 70 },
  { name: "SHAWOK", value: 60 },
  { name: "May", value: 75 },
]

export function DashboardCharts() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Subscriptions Chart */}
      <div className="bg-card border border-border rounded-2xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Subscriptions</h3>
          <div className="text-right">
            <div className="text-2xl font-bold text-success">+2,250</div>
            <div className="text-sm text-muted-foreground">+180.1% from last month</div>
          </div>
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={subscriptionData}>
              <defs>
                <linearGradient id="subscriptionGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6b7280', fontSize: 12 }}
              />
              <YAxis hide />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#22c55e" 
                strokeWidth={2}
                fill="url(#subscriptionGradient)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Total Dishes Chart */}
      <div className="bg-card border border-border rounded-2xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Total Dishes</h3>
          <div className="text-right">
            <div className="text-2xl font-bold text-foreground">500</div>
          </div>
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dishesData}>
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6b7280', fontSize: 12 }}
              />
              <YAxis hide />
              <Bar 
                dataKey="value" 
                fill="#eab308"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
