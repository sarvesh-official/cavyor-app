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
    <div className="grid gap-6 md:grid-cols-2 mt-8">
      {/* Subscriptions Chart */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Subscriptions</h3>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600">+2,250</div>
            <div className="text-sm text-gray-400">+180.1% from last month</div>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={subscriptionData}>
              <defs>
                <linearGradient id="subscriptionGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ca3af', fontSize: 12 }}
              />
              <YAxis hide />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#10b981" 
                strokeWidth={2}
                fill="url(#subscriptionGradient)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Total Dishes Chart */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Total Dishes</h3>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">500</div>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dishesData}>
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ca3af', fontSize: 12 }}
              />
              <YAxis hide />
              <Bar 
                dataKey="value" 
                fill="#f59e0b"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
