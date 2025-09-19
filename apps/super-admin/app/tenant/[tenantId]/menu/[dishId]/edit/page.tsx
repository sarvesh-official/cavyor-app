"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Card, CardContent } from "@workspace/ui/components/card";
import { 
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

export default function EditDishPage() {
  const params = useParams();
  const router = useRouter();
  const tenantId = params.tenantId as string;
  const dishId = params.dishId as string;

  const [dishImage, setDishImage] = useState<string | null>(null);
  const [foodName, setFoodName] = useState("");
  const [description, setDescription] = useState("");
  const [properties, setProperties] = useState<DishProperty[]>([
    { id: "1", name: "Category", value: "" },
    { id: "2", name: "Preparation Date", value: "" },
    { id: "3", name: "Add Text Property", value: "" }
  ]);
  const [allergens, setAllergens] = useState<Allergen[]>([]);

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
    const newAllergen: Allergen = {
      id: Date.now().toString(),
      name: "New Allergen"
    };
    setAllergens(prev => [...prev, newAllergen]);
  };

  const removeAllergen = (id: string) => {
    setAllergens(prev => prev.filter(allergen => allergen.id !== id));
  };

  const handleSave = () => {
    console.log("Saving dish...", {
      dishId,
      foodName,
      description,
      properties,
      allergens,
      dishImage
    });
    router.push(`/tenant/${tenantId}/menu/${dishId}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Edit Dish</h1>
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              className="rounded-full"
              onClick={() => router.push(`/tenant/${tenantId}/menu/${dishId}`)}
            >
              Cancel
            </Button>
            <Button 
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleSave}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Image Upload */}
          <div className="space-y-6">
            <Card className="bg-card border-border rounded-2xl">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Dish Image</h3>
                <div className="relative">
                  {dishImage ? (
                    <div className="relative">
                      <Image
                        src={dishImage}
                        alt="Dish preview"
                        width={400}
                        height={300}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <Button
                        onClick={() => setDishImage(null)}
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 rounded-full"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <label className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer block">
                      <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG or GIF (max. 5MB)
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Form Fields */}
          <div className="space-y-6">
            {/* Basic Info */}
            <Card className="bg-card border-border rounded-2xl">
              <CardContent className="p-6 space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Dish Name
                  </label>
                  <Input 
                    placeholder="Enter dish name" 
                    className="rounded-lg"
                    value={foodName}
                    onChange={(e) => setFoodName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Description
                  </label>
                  <textarea 
                    placeholder="Enter dish description"
                    className="w-full p-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground resize-none"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Properties */}
            <Card className="bg-card border-border rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Properties</h3>
                  <Button 
                    onClick={addProperty}
                    variant="outline" 
                    size="sm"
                    className="rounded-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Property
                  </Button>
                </div>

                <div className="space-y-3">
                  {properties.map((property) => (
                    <div key={property.id} className="flex items-center space-x-2">
                      <Input
                        placeholder="Property name"
                        value={property.name}
                        onChange={(e) => handlePropertyChange(property.id, e.target.value)}
                        className="flex-1 rounded-lg"
                      />
                      <Input
                        placeholder="Value"
                        value={property.value}
                        onChange={(e) => handlePropertyChange(property.id, e.target.value)}
                        className="flex-1 rounded-lg"
                      />
                      <Button
                        onClick={() => removeProperty(property.id)}
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive rounded-full"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Allergens */}
            <Card className="bg-card border-border rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Allergens</h3>
                  <Button 
                    onClick={addAllergen}
                    variant="outline" 
                    size="sm"
                    className="rounded-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Allergen
                  </Button>
                </div>

                <div className="space-y-3">
                  {allergens.map((allergen) => (
                    <div key={allergen.id} className="flex items-center space-x-2">
                      <Input
                        placeholder="Allergen name"
                        value={allergen.name}
                        onChange={(e) => {
                          setAllergens(prev => 
                            prev.map(a => 
                              a.id === allergen.id ? { ...a, name: e.target.value } : a
                            )
                          );
                        }}
                        className="flex-1 rounded-lg"
                      />
                      <Button
                        onClick={() => removeAllergen(allergen.id)}
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive rounded-full"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  
                  {allergens.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No allergens added yet
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
    </div>
  );
}