"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { 
  FileText,
  Folder,
  Users,
  Settings,
  Heart,
  Clock,
  Box,
  Edit
} from "lucide-react";
import Image from "next/image";

export default function DishPreviewPage() {
  const params = useParams();
  const router = useRouter();
  const tenantId = params.tenantId as string;

  const menuSidebarSections = [
    {
      title: "Tenant Settings",
      items: [
        {
          id: "overview",
          label: "Overview",
          icon: FileText,
          href: `/tenant/${tenantId}`
        },
        {
          id: "menu",
          label: "Menu", 
          icon: FileText,
          href: `/tenant/${tenantId}/menu`
        },
        {
          id: "repository",
          label: "Repository",
          icon: Folder,
          href: `/tenant/${tenantId}/repository`
        },
        {
          id: "members",
          label: "Members",
          icon: Users,
          href: `/tenant/${tenantId}/members`
        },
        {
          id: "settings",
          label: "Settings",
          icon: Settings,
          href: `/tenant/${tenantId}/settings`
        }
      ]
    }
  ];

  const allergens = ["Nuts", "Egg", "Spicy"];
  const pairingSuggestions = [
    { name: "Orange Juice", icon: "🥤" },
    { name: "Mango Lassi", icon: "🥭" },
    { name: "Mango Lassi", icon: "🥭" },
    { name: "Mango Lassi", icon: "🥭" },
    { name: "Mango Lassi", icon: "🥭" }
  ];

  return (
    <DashboardLayout 
      customSidebarSections={menuSidebarSections}
      activeItem="menu"
      title="Dish Preview"
      showBackButton={true}
      onBackClick={() => router.push(`/tenant/${tenantId}/menu/new/edit`)}
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Main Dish Image */}
        <Card>
          <CardContent className="p-0">
            <div className="relative">
              <Image
                src="/dish_placeholder.png"
                alt="Hyderabadi Dum Biriyani"
                width={800}
                height={400}
                className="w-full h-96 object-cover rounded-t-lg"
              />
            </div>
          </CardContent>
        </Card>

        {/* Dish Information Card */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Top Row - Badges and Edit Button */}
              <div className="flex items-center justify-between">
                <div className="flex gap-3">
                  <div className="flex items-center gap-2 bg-red-500/20 text-red-400 rounded-full px-3 py-1">
                    <Heart className="h-4 w-4" />
                    <span className="text-sm">Special Dish</span>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-green-500/20 text-green-400 rounded-full px-3 py-1">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">10-15 Mins</span>
                  </div>
                </div>
                
                <Button 
                  className="bg-muted text-muted-foreground hover:bg-muted/80 flex items-center gap-2"
                  onClick={() => router.push(`/tenant/${tenantId}/menu/new/edit`)}
                >
                  <Edit className="h-4 w-4" />
                  Edit Details
                </Button>
              </div>

              {/* Dish Name */}
              <h1 className="text-3xl font-bold text-foreground">
                Hyderabadi Dum Biriyani
              </h1>

              {/* Description */}
              <p className="text-base text-muted-foreground leading-relaxed">
                A royal blend of fragrant basmati rice, tender meat, and aromatic spices, slow-cooked to perfection. Rich, flavorful, and layered with saffron – the timeless taste of Hyderabad in every bite.
              </p>

              {/* Try in 3D Button */}
              <div className="flex justify-center">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2 px-8 py-3">
                  <Box className="h-5 w-5" />
                  Try in 3D
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Allergen Section */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Allergen</h3>
              
              <div className="flex flex-wrap gap-3">
                {allergens.map((allergen, index) => (
                  <Badge 
                    key={index}
                    variant="secondary" 
                    className="bg-muted text-muted-foreground px-4 py-2"
                  >
                    {allergen}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pairing Suggestions Section */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Pairing Suggestions</h3>
              <p className="text-muted-foreground">Perfect match with these favorites.</p>
              
              <div className="flex gap-4 pb-4 overflow-x-auto scrollbar-hide">
                {pairingSuggestions.map((item, index) => (
                  <Card key={index} className="flex-shrink-0 w-20">
                    <CardContent className="p-3 text-center">
                      <div className="w-12 h-12 bg-muted rounded-lg mb-2 flex items-center justify-center mx-auto">
                        <span className="text-2xl">{item.icon}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{item.name}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
