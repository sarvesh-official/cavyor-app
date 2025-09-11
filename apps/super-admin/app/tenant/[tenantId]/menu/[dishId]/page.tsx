"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { 
  FileText,
  Folder,
  Users,
  Settings,
  Plus,
  Upload,
  Save,
  X,
  Heart,
  Clock,
  Edit,
  MoreHorizontal,
  Box,
  Trash2
} from "lucide-react";
import Image from "next/image";
import { DashboardLayout } from "@/components/dashboard-layout";

interface Allergen {
  id: string;
  name: string;
}

interface Pairing {
  id: string;
  name: string;
  image: string;
}

export default function DishViewPage() {
  const params = useParams();
  const router = useRouter();
  const tenantId = params.tenantId as string;
  const dishId = params.dishId as string;

  // Mock data - in real app, this would come from API
  const [dishData] = useState({
    name: "Hyderabadi Dum Biriyani",
    description: "A royal blend of fragrant basmati rice, tender meat, and aromatic spices, slow-cooked to perfection. Rich, flavorful, and layered with saffron - the timeless taste of Hyderabad in every bite.",
    image: "/dish_placeholder.png",
    isSpecial: true,
    preparationDate: "2024-01-15",
    category: "Special Dish"
  });

  const [allergens, setAllergens] = useState<Allergen[]>([
    { id: "1", name: "Nuts" },
    { id: "2", name: "Egg" },
    { id: "3", name: "Spicy" }
  ]);

  const [pairings] = useState<Pairing[]>([
    { id: "1", name: "Orange Juice", image: "/dish_placeholder.png" },
    { id: "2", name: "Mango Juice", image: "/dish_placeholder.png" },
    { id: "3", name: "Mango Juice", image: "/dish_placeholder.png" },
    { id: "4", name: "Mango Juice", image: "/dish_placeholder.png" },
    { id: "5", name: "Mango Juice", image: "/dish_placeholder.png" }
  ]);

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

  const addAllergen = () => {
    const newAllergen: Allergen = {
      id: Date.now().toString(),
      name: ""
    };
    setAllergens(prev => [...prev, newAllergen]);
  };

  const removeAllergen = (id: string) => {
    setAllergens(prev => prev.filter(allergen => allergen.id !== id));
  };

  const handleAllergenChange = (id: string, name: string) => {
    setAllergens(prev => 
      prev.map(allergen => 
        allergen.id === id ? { ...allergen, name } : allergen
      )
    );
  };

  const handleEditDetails = () => {
    router.push(`/tenant/${tenantId}/menu/${dishId}/edit`);
  };

  const handleSave = () => {
    console.log("Saving dish details:", { dishData, allergens });
    // Handle save logic here
  };

  return (
    <DashboardLayout 
      customSidebarSections={menuSidebarSections}
      activeItem="menu"
      title="Dish Details"
      showBackButton={true}
      onBackClick={() => router.push(`/tenant/${tenantId}/menu`)}
    >
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Main Dish Image */}
        <Card>
          <CardContent className="p-0">
            <div className="relative">
              <Image
                src={dishData.image}
                alt={dishData.name}
                width={800}
                height={400}
                className="w-full h-96 object-cover rounded-t-lg"
              />
            </div>
          </CardContent>
        </Card>

        {/* Dish Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Dish Tags */}
            <div className="flex flex-wrap gap-3">
              {dishData.isSpecial && (
                <Badge className="bg-red-600 text-white flex items-center gap-2 px-3 py-1">
                  <Heart className="h-4 w-4" />
                  Special Dish
                </Badge>
              )}
              <Badge className="bg-green-600 text-white flex items-center gap-2 px-3 py-1">
                <Clock className="h-4 w-4" />
                {dishData.preparationDate}
              </Badge>
              <Button
                variant="outline"
                className="border-dashed border-gray-600 text-gray-400 hover:bg-gray-700 hover:text-white rounded-full px-4 py-2"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Text Property
              </Button>
            </div>

            {/* Dish Name */}
            <h1 className="text-4xl font-bold text-foreground">{dishData.name}</h1>

            {/* Description and Actions */}
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {dishData.description}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Button 
                  onClick={handleEditDetails}
                  className="bg-green-600 text-white hover:bg-green-700 flex items-center gap-2"
                >
                  <Edit className="h-4 w-4" />
                  Edit Details
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* 3D Model Actions */}
            <div className="flex gap-4">
              <Button className="bg-red-600 text-white hover:bg-red-700 flex items-center gap-2">
                <Box className="h-4 w-4" />
                Delete 3D
              </Button>
              <Button className="bg-muted text-muted-foreground hover:bg-muted/80 flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Re Upload 3D
              </Button>
            </div>
          </div>

          {/* Right Column - Actions */}
          <div className="space-y-6">
            <Button 
              onClick={handleSave}
              className="w-full bg-green-600 text-white hover:bg-green-700 flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* Allergen Section */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Allergen</h3>
              
              <div className="flex flex-wrap gap-3">
                {allergens.map((allergen) => (
                  <div key={allergen.id} className="flex items-center gap-2 bg-muted rounded-full px-4 py-2">
                    <span className="text-muted-foreground">{allergen.name}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAllergen(allergen.id)}
                      className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                
                <Button
                  onClick={addAllergen}
                  variant="outline"
                  className="border-dashed border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-full px-4 py-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pairing Suggestions */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Pairing Suggestions</h3>
              <p className="text-muted-foreground">Perfect match with these favorites.</p>
              
              <div className="flex gap-4 overflow-x-auto scrollbar-hide flex-nowrap">
                {pairings.map((pairing) => (
                  <div key={pairing.id} className="flex-shrink-0">
                    <div className="w-32 h-32 bg-muted rounded-lg overflow-hidden">
                      <Image
                        src={pairing.image}
                        alt={pairing.name}
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 text-center">{pairing.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
