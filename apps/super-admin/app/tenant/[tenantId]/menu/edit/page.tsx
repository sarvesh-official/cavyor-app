"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { 
  FileText,
  Folder,
  Users,
  Settings,
  Plus,
  Save,
  X,
  Edit,
} from "lucide-react";
import Image from "next/image";

interface DishProperty {
  id: string;
  name: string;
  value: string;
}

export default function MenuEditPage() {
  const params = useParams();
  const router = useRouter();
  const tenantId = params.tenantId as string;

  const [properties, setProperties] = useState<DishProperty[]>([
    { id: "1", name: "Category", value: "Specials" },
    { id: "2", name: "Preparation Date", value: "2024-01-15" },
    { id: "3", name: "Add Text Property", value: "" }
  ]);

  const [allergens, setAllergens] = useState([
    { id: "1", name: "Nuts" },
    { id: "2", name: "Egg" },
    { id: "3", name: "Spicy" }
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

  const handlePropertyChange = (id: string, value: string) => {
    setProperties(prev => 
      prev.map(prop => 
        prop.id === id ? { ...prop, value } : prop
      )
    );
  };

  const addProperty = () => {
    const newProperty: DishProperty = {
      id: Date.now().toString(),
      name: "New Property",
      value: ""
    };
    setProperties(prev => [...prev, newProperty]);
  };

  const removeProperty = (id: string) => {
    setProperties(prev => prev.filter(prop => prop.id !== id));
  };

  const addAllergen = () => {
    const newAllergen = {
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

  const handleSave = () => {
    console.log("Saving menu properties:", { properties, allergens });
    // Handle save logic here
    router.push(`/tenant/${tenantId}/menu`);
  };

  return (
    <DashboardLayout 
      customSidebarSections={menuSidebarSections}
      activeItem="menu"
      title="Edit Menu Details"
      showBackButton={true}
      onBackClick={() => router.push(`/tenant/${tenantId}/menu`)}
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Main Dish Image */}
        <Card>
          <CardContent className="p-0">
            <div className="relative">
              <Image
                src="/dish_placeholder.png"
                alt="Dish Image"
                width={800}
                height={400}
                className="w-full h-96 object-cover rounded-t-lg"
              />
              <div className="absolute top-4 right-4">
                <Button className="bg-background/80 text-foreground hover:bg-accent/80">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dish Properties */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">Dish Properties</h3>
              
              <div className="space-y-4">
                {properties.map((property) => (
                  <div key={property.id} className="flex items-center gap-4">
                    <div className="w-32">
                      <span className="text-sm font-medium text-foreground">{property.name}</span>
                    </div>
                    <div className="flex-1">
                      {property.id === "2" ? (
                        <Input
                          type="date"
                          placeholder={property.name}
                          value={property.value}
                          onChange={(e) => handlePropertyChange(property.id, e.target.value)}
                          className="rounded-full px-4 py-2 min-w-[150px]"
                        />
                      ) : (
                        <Input
                          type="text"
                          placeholder={property.name}
                          value={property.value}
                          onChange={(e) => handlePropertyChange(property.id, e.target.value)}
                          className="rounded-full px-4 py-2 min-w-[150px]"
                        />
                      )}
                    </div>
                    {property.id !== "1" && property.id !== "2" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeProperty(property.id)}
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                
                <Button
                  onClick={addProperty}
                  variant="outline"
                  className="border-dashed border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-full px-4 py-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Property
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
                {allergens.map((allergen) => (
                  <div key={allergen.id} className="flex items-center gap-2 bg-muted rounded-full px-4 py-2">
                    <Input
                      type="text"
                      value={allergen.name}
                      onChange={(e) => handleAllergenChange(allergen.id, e.target.value)}
                      className="bg-transparent border-none p-0 h-auto text-muted-foreground placeholder:text-muted-foreground"
                      placeholder="Allergen name"
                    />
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

        {/* Save Button */}
        <div className="flex justify-end">
          <Button 
            onClick={handleSave}
            className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
