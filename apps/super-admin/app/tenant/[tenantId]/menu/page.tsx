"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { DashboardLayout } from "../../../../components/dashboard-layout";
import { Button } from "@workspace/ui/components/button";
import { Card } from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { 
  Clock, 
  MoreHorizontal, 
  Plus, 
  FileText,
  Folder,
  Users,
  Settings,
} from "lucide-react";
import Image from "next/image";

interface Dish {
  id: string;
  name: string;
  preparationTime: string;
  category: string;
  image: string;
  isTrending?: boolean;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  image: string;
}

const mockDishes: Dish[] = [
  {
    id: "1",
    name: "Hyderabadi Biryani",
    preparationTime: "15-20 Mins",
    category: "Specials",
    image: "/dish_placeholder.png",
    isTrending: true
  },
  {
    id: "2", 
    name: "Hyderabadi Biryani",
    preparationTime: "15-20 Mins",
    category: "Specials",
    image: "/dish_placeholder.png",
    isTrending: true
  },
  {
    id: "3",
    name: "Hyderabadi Biryani", 
    preparationTime: "15-20 Mins",
    category: "Specials",
    image: "/dish_placeholder.png",
    isTrending: true
  },
  {
    id: "4",
    name: "Hyderabadi Biryani",
    preparationTime: "15-20 Mins", 
    category: "Specials",
    image: "/dish_placeholder.png",
    isTrending: true
  },
  {
    id: "5",
    name: "Hyderabadi Biryani",
    preparationTime: "15-20 Mins",
    category: "Specials", 
    image: "/dish_placeholder.png",
    isTrending: true
  },
  {
    id: "6",
    name: "Hyderabadi Biryani",
    preparationTime: "15-20 Mins",
    category: "Specials",
    image: "/dish_placeholder.png",
    isTrending: true
  }
];

const categories: Category[] = [
  { id: "burgers", name: "Burgers", icon: "burgers", image: "/categories/Burger.png" },
  { id: "pizza", name: "Pizza", icon: "pizza", image: "/categories/Pizza.png" },
  { id: "pastries", name: "Pastries", icon: "pastries", image: "/categories/Pastries.png" },
  { id: "tacos", name: "Tacos", icon: "tacos", image: "/categories/Tacos.png" },
  { id: "softies", name: "Softies", icon: "softies", image: "/categories/Softies.png" },
  { id: "cookies", name: "Cookies", icon: "cookies", image: "/categories/Cookies.png" },
  { id: "burgers2", name: "Burgers", icon: "burgers", image: "/categories/Burger.png" },
  { id: "pizza2", name: "Pizza", icon: "pizza", image: "/categories/Pizza.png" },
  { id: "pastries2", name: "Pastries", icon: "pastries", image: "/categories/Pastries.png" },
  { id: "tacos2", name: "Tacos", icon: "tacos", image: "/categories/Tacos.png" },
  { id: "softies2", name: "Softies", icon: "softies", image: "/categories/Softies.png" },
  { id: "cookies2", name: "Cookies", icon: "cookies", image: "/categories/Cookies.png" },
  { id: "burgers3", name: "Burgers", icon: "burgers", image: "/categories/Burger.png" },
  { id: "pizza3", name: "Pizza", icon: "pizza", image: "/categories/Pizza.png" },
  { id: "pastries3", name: "Pastries", icon: "pastries", image: "/categories/Pastries.png" },
  { id: "tacos3", name: "Tacos", icon: "tacos", image: "/categories/Tacos.png" },
  { id: "softies3", name: "Softies", icon: "softies", image: "/categories/Softies.png" },
  { id: "cookies3", name: "Cookies", icon: "cookies", image: "/categories/Cookies.png" }
];

export default function MenuPage() {
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

  const [dishes, setDishes] = useState<Dish[]>(mockDishes);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  return (
    <DashboardLayout 
      customSidebarSections={menuSidebarSections}
      activeItem="menu"
      title="Menu Management"
      showBackButton={true}
      onBackClick={() => router.push("/restaurants")}
    >
      <div className="space-y-6 sm:space-y-8">
        {/* What's On Your Menu Section */}
        <div className="space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="space-y-1 sm:space-y-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">What's On Your Menu</h1>
              <p className="text-sm sm:text-base text-muted-foreground">See what's winning hearts and driving sales today</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <Button 
                className="bg-muted text-muted-foreground hover:bg-muted/80 flex items-center gap-2 text-sm sm:text-base"
                onClick={() => router.push(`/tenant/${tenantId}/menu/edit`)}
              >
                <Plus className="h-4 w-4" />
                Edit Details
              </Button>
              <Button 
                className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2 text-sm sm:text-base"
                onClick={() => router.push(`/tenant/${tenantId}/menu/new/edit`)}
              >
                <Plus className="h-4 w-4" />
                Upload
              </Button>
            </div>
          </div>
            
          <div className="flex gap-3 sm:gap-4 pb-4 overflow-x-auto scrollbar-hide flex-nowrap w-full" style={{ minWidth: 'max-content' }}>
            {dishes.map((dish, index) => (
              <Card 
                key={dish.id} 
                className="min-w-[240px] sm:min-w-[260px] md:min-w-[280px] flex-shrink-0 overflow-hidden cursor-pointer hover:bg-accent transition-colors"
                onClick={() => router.push(`/tenant/${tenantId}/menu/${dish.id}`)}
              >
                <div className="relative">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    width={280}
                    height={180}
                    className="w-full h-40 sm:h-44 md:h-48 object-cover"
                  />
                  {index === 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute bottom-2 right-2 bg-background/80 text-foreground hover:bg-accent/80"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="p-3 sm:p-4 space-y-2">
                  <h3 className="font-semibold text-foreground text-sm sm:text-base">{dish.name}</h3>
                  <div className="flex items-center gap-2 text-green-400">
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="text-xs sm:text-sm">{dish.preparationTime}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs sm:text-sm">
                    {dish.category}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>

          {/* Category Icons */}
          <div className="flex gap-3 sm:gap-4 md:gap-6 pb-4 overflow-x-auto scrollbar-hide flex-nowrap w-full" style={{ minWidth: 'max-content' }}>
            {categories.map((category) => {
              return (
                <div
                  key={category.id}
                  className="flex flex-col items-center gap-1 sm:gap-2 w-[60px] sm:w-[70px] md:w-[80px] flex-shrink-0 cursor-pointer"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-muted border-2 border-border overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs sm:text-sm text-muted-foreground text-center leading-tight">{category.name}</span>
                </div>
              );
            })}
          </div>
          
          {/* Menu Items */}
          <div className="flex gap-3 sm:gap-4 pb-4 overflow-x-auto scrollbar-hide flex-nowrap w-full" style={{ minWidth: 'max-content' }}>
            {dishes.map((dish, index) => (
              <Card 
                key={`menu-${dish.id}`} 
                className="min-w-[240px] sm:min-w-[260px] md:min-w-[280px] flex-shrink-0 overflow-hidden cursor-pointer hover:bg-accent transition-colors"
                onClick={() => router.push(`/tenant/${tenantId}/menu/${dish.id}`)}
              >
                <div className="relative">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    width={280}
                    height={180}
                    className="w-full h-40 sm:h-44 md:h-48 object-cover"
                  />
                </div>
                <div className="p-3 sm:p-4 space-y-2">
                  <h3 className="font-semibold text-foreground text-sm sm:text-base">{dish.name}</h3>
                  <div className="flex items-center gap-2 text-green-400">
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="text-xs sm:text-sm">{dish.preparationTime}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs sm:text-sm">
                    {dish.category}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
