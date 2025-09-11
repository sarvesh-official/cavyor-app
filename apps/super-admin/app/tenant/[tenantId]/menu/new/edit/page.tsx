"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { DashboardLayout } from "../../../../../../components/dashboard-layout";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Card, CardContent } from "@workspace/ui/components/card";
import { 
  FileText,
  Folder,
  Users,
  Settings,
  Plus,
  Upload,
  Save,
  X
} from "lucide-react";
import Image from "next/image";

interface DishProperty {
  id: string;
  name: string;
  value: string;
}

interface Allergen {
  id: string;
  name: string;
}

export default function NewDishPage() {
  const params = useParams();
  const router = useRouter();
  const tenantId = params.tenantId as string;

  const [dishImage, setDishImage] = useState<string | null>(null);
  const [foodName, setFoodName] = useState("");
  const [description, setDescription] = useState("");
  const [properties, setProperties] = useState<DishProperty[]>([
    { id: "1", name: "Category", value: "" },
    { id: "2", name: "Preparation Date", value: "" },
    { id: "3", name: "Add Text Property", value: "" }
  ]);
  const [allergens, setAllergens] = useState<Allergen[]>([]);

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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setDishImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePropertyChange = (id: string, value: string) => {
    setProperties(prev => 
      prev.map(prop => 
        prop.id === id ? { ...prop, value } : prop
      )
    );
  };

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

  const handleSave = () => {
    // Handle save logic here
    console.log("Creating new dish:", { foodName, description, properties, allergens });
    router.push(`/tenant/${tenantId}/menu`);
  };

  return (
    <DashboardLayout 
      customSidebarSections={menuSidebarSections}
      activeItem="menu"
      title="Add New Menu Item"
      showBackButton={true}
      onBackClick={() => router.push(`/tenant/${tenantId}/menu`)}
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Dish Image Section */}
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="relative">
              <div className="w-full h-64 bg-gray-700 rounded-lg border-2 border-dashed border-gray-600 flex items-center justify-center">
                {dishImage ? (
                  <Image
                    src={dishImage}
                    alt="Dish"
                    width={400}
                    height={256}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="text-center text-gray-400">
                    <Upload className="h-12 w-12 mx-auto mb-4" />
                    <p>No image uploaded</p>
                  </div>
                )}
              </div>
              <Button
                className="absolute bottom-4 right-4 bg-gray-800 text-white hover:bg-gray-700 flex items-center gap-2"
                onClick={() => document.getElementById('image-upload')?.click()}
              >
                <Plus className="h-4 w-4" />
                Upload Dish Image
              </Button>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </CardContent>
        </Card>

        {/* Dish Properties Section */}
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-4">
                 {properties.map((property) => (
                   <div key={property.id} className="relative">
                     {property.id === "2" ? (
                       <Input
                         type="date"
                         placeholder={property.name}
                         value={property.value}
                         onChange={(e) => handlePropertyChange(property.id, e.target.value)}
                         className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 rounded-full px-4 py-2 min-w-[150px]"
                       />
                     ) : (
                       <Input
                         placeholder={property.name}
                         value={property.value}
                         onChange={(e) => handlePropertyChange(property.id, e.target.value)}
                         className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 rounded-full px-4 py-2 min-w-[150px]"
                       />
                     )}
                   </div>
                 ))}
              </div>
              <Button 
                onClick={handleSave}
                className="bg-green-600 text-white hover:bg-green-700 flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Food Name and Description */}
        <div className="space-y-6">
          <Input
            placeholder="FOOD NAME"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 text-lg py-4 px-4"
          />
          
          <Input
            placeholder="DESCRIPTION"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 text-lg py-4 px-4"
          />
        </div>

        {/* Allergen Section */}
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Allergen</h3>
              
              <div className="flex flex-wrap gap-3">
                {allergens.map((allergen) => (
                  <div key={allergen.id} className="flex items-center gap-2 bg-gray-700 rounded-full px-4 py-2">
                    <Input
                      value={allergen.name}
                      onChange={(e) => handleAllergenChange(allergen.id, e.target.value)}
                      placeholder="Allergen name"
                      className="bg-transparent border-none text-white placeholder-gray-400 p-0 min-w-[120px]"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAllergen(allergen.id)}
                      className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                
                <Button
                  onClick={addAllergen}
                  variant="outline"
                  className="border-dashed border-gray-600 text-gray-400 hover:bg-gray-700 hover:text-white rounded-full px-4 py-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
