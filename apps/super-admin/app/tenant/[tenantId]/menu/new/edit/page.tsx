"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Card, CardContent } from "@workspace/ui/components/card";
import { 
  FileText,
  Folder,
  Users,
  Settings,
  Plus,
  X,
  Edit,
  Heart,
  Clock,
  Box,
  ChevronDown,
  Upload,
  Save
} from "lucide-react";
import Image from "next/image";

interface Allergen {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
  icon: string;
}

export default function NewDishPage() {
  const params = useParams();
  const router = useRouter();
  const tenantId = params.tenantId as string;

  const [dishImage, setDishImage] = useState<string | null>(null);
  const [foodName, setFoodName] = useState("FOOD NAME");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [preparationTime, setPreparationTime] = useState<string>("");
  const [allergens, setAllergens] = useState<Allergen[]>([]);
  const [showPrepTimeModal, setShowPrepTimeModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [prepTimeFrom, setPrepTimeFrom] = useState("05");
  const [prepTimeTo, setPrepTimeTo] = useState("11");

  const categories: Category[] = [
    { id: "burgers", name: "Burgers", icon: "🍔" },
    { id: "pizza", name: "Pizza", icon: "🍕" },
    { id: "tacos", name: "Tacos", icon: "🌮" },
    { id: "pastries", name: "Pastries", icon: "🥐" },
    { id: "cookies", name: "Cookies", icon: "🍪" },
    { id: "softies", name: "Softies", icon: "🥤" }
  ];

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

  const handleSavePrepTime = () => {
    setPreparationTime(`${prepTimeFrom}-${prepTimeTo} Mins`);
    setShowPrepTimeModal(false);
  };

  const handleSaveCategory = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    setSelectedCategory(category?.name || "");
    setShowCategoryModal(false);
  };

  const handleSave = () => {
    console.log("Creating new dish:", { 
      foodName, 
      description, 
      selectedCategory, 
      preparationTime, 
      allergens 
    });
    router.push(`/tenant/${tenantId}/menu/new/preview`);
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
        {/* Main Dish Image */}
        <Card>
          <CardContent className="p-0">
            <div className="relative">
              <div className="w-full h-96 bg-muted rounded-t-lg border-2 border-dashed border-border flex items-center justify-center">
                {dishImage ? (
                  <Image
                    src={dishImage}
                    alt="Dish"
                    width={800}
                    height={400}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                ) : (
                  <div className="text-center text-muted-foreground">
                    <Upload className="h-12 w-12 mx-auto mb-4" />
                    <p>Upload dish image</p>
                  </div>
                )}
              </div>
              <div className="absolute top-4 right-4">
                <Button 
                  className="bg-background/80 text-foreground hover:bg-accent/80"
                  onClick={() => document.getElementById('image-upload')?.click()}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dish Tags and Properties */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Tags Row */}
              <div className="flex flex-wrap gap-3 items-center">
                <div className="flex items-center gap-2 bg-red-500/20 text-red-400 rounded-full px-3 py-1">
                  <Heart className="h-4 w-4" />
                  <span className="text-sm">Special Dish</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 text-red-400 hover:text-red-300"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
                
                {preparationTime && (
                  <div className="flex items-center gap-2 bg-green-500/20 text-green-400 rounded-full px-3 py-1">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{preparationTime}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setPreparationTime("")}
                      className="h-4 w-4 p-0 text-green-400 hover:text-green-300"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
                
                <Button
                  onClick={() => setShowPrepTimeModal(true)}
                  variant="outline"
                  className="border-dashed border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-full px-4 py-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Text Property
                </Button>
              </div>

              {/* Food Name */}
              <div className="space-y-2">
                <Input
                  value={foodName}
                  onChange={(e) => setFoodName(e.target.value)}
                  className="text-3xl font-bold bg-transparent border-none p-0 text-foreground placeholder:text-muted-foreground focus:ring-0"
                  placeholder="FOOD NAME"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="text-base bg-transparent border-none p-0 text-muted-foreground placeholder:text-muted-foreground focus:ring-0"
                  placeholder="A royal blend of fragrant basmati rice, tender meat, and aromatic spices, slow-cooked to perfection. Rich, flavorful, and layered with saffron – the timeless taste of Hyderabad in every bite."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center">
                <div className="flex gap-3">
                  <Button 
                    variant="outline"
                    className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <Box className="h-4 w-4 mr-2" />
                    Delete 3D
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    <Box className="h-4 w-4 mr-2" />
                    Re Upload 3D
                  </Button>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    onClick={handleSave}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button variant="ghost" size="sm">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
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
                      className="bg-transparent border-none p-0 h-auto text-foreground placeholder:text-muted-foreground"
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

        {/* Pairing Suggestions Section */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Pairing Suggestions</h3>
              <p className="text-muted-foreground">Perfect match with these favorites.</p>
              
              <div className="flex gap-4 pb-4 overflow-x-auto scrollbar-hide">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="flex-shrink-0 text-center">
                    <div className="w-16 h-16 bg-muted rounded-lg mb-2 flex items-center justify-center">
                      <span className="text-2xl">🥤</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Orange Juice</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preparation Time Modal */}
      {showPrepTimeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-96">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <Clock className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Preparation Time</h3>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="bg-muted rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-foreground mb-2">{prepTimeFrom}</div>
                      <div className="flex items-center justify-center gap-2 text-muted-foreground">
                        <span>Mins</span>
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-foreground font-medium">To</div>
                  
                  <div className="flex-1">
                    <div className="bg-muted rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-foreground mb-2">{prepTimeTo}</div>
                      <div className="flex items-center justify-center gap-2 text-muted-foreground">
                        <span>Mins</span>
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button
                    onClick={() => setShowPrepTimeModal(false)}
                    variant="outline"
                    className="flex-1 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Reset Changes
                  </Button>
                  <Button
                    onClick={handleSavePrepTime}
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Category Selection Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-96">
            <CardContent className="p-6">
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground">Select Category</h3>
                
                <div className="grid grid-cols-2 gap-3">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      onClick={() => handleSaveCategory(category.id)}
                      variant="outline"
                      className="flex flex-col items-center gap-2 p-4 h-auto"
                    >
                      <span className="text-2xl">{category.icon}</span>
                      <span className="text-sm">{category.name}</span>
                    </Button>
                  ))}
                </div>
                
                <Button
                  onClick={() => setShowCategoryModal(false)}
                  variant="outline"
                  className="w-full"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}