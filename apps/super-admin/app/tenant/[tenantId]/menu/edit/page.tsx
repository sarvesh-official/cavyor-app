"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@workspace/ui/components/button";
import { 
  Upload, 
  X, 
  Plus, 
  Clock,
  Trash2,
  ChevronDown,
  Save,
  Box
} from "lucide-react";


export default function MenuEditPage() {
  const params = useParams();
  const router = useRouter();
  const tenantId = params.tenantId as string;

  const [dishName, setDishName] = useState("FOOD NAME");
  const [description, setDescription] = useState("DESCRIPTION");
  const [category, setCategory] = useState("");
  const [preparationTime, setPreparationTime] = useState("");
  const [additionalProperty, setAdditionalProperty] = useState("");
  const [allergens, setAllergens] = useState<string[]>([]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploaded3D, setUploaded3D] = useState<string | null>(null);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [selectedMinutes, setSelectedMinutes] = useState(24);
  const [selectedMaxMinutes, setSelectedMaxMinutes] = useState(28);

  const addAllergen = () => {
    setAllergens(prev => [...prev, `Allergen ${prev.length + 1}`]);
  };

  const removeAllergen = (index: number) => {
    setAllergens(prev => prev.filter((_, i) => i !== index));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handle3DUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploaded3D(file.name);
    }
  };

  const handleSave = () => {
    console.log("Saving dish...");
    router.push(`/tenant/${tenantId}/menu/edit/preview`);
  };

  const handleTimeSelection = () => {
    const timeRange = `${selectedMinutes.toString().padStart(2, '0')} To ${selectedMaxMinutes.toString().padStart(2, '0')} Mins`;
    setPreparationTime(timeRange);
    setShowTimeModal(false);
  };

  const resetTimeChanges = () => {
    setSelectedMinutes(24);
    setSelectedMaxMinutes(28);
  };

  // Handle time selection with validation
  const handleMinutesSelection = (minute: number) => {
    setSelectedMinutes(minute);
    if (minute >= selectedMaxMinutes) {
      setSelectedMaxMinutes(minute + 1);
    }
  };

  const handleMaxMinutesSelection = (minute: number) => {
    setSelectedMaxMinutes(minute);
    if (minute <= selectedMinutes) {
      setSelectedMinutes(minute);
    }
  };


  return (
    <div className="space-y-6">
      {/* Main Image Upload Area with Button Inside */}
      <div 
        className="w-full h-64 rounded-3xl cursor-pointer transition-all duration-300 hover:opacity-90 relative overflow-hidden"
        style={{
          background: uploadedImage ? 'none' : 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)'
        }}
        onClick={() => document.getElementById('dish-image-upload')?.click()}
      >
        <input
          type="file"
          id="dish-image-upload"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
        
        {uploadedImage ? (
          <img 
            src={uploadedImage} 
            alt="Uploaded dish" 
            className="w-full h-full object-cover"
          />
        ) : null}
        
        {/* Upload Button - Always visible in bottom right */}
        <div className="absolute bottom-4 right-4">
          <Button 
            className="bg-white text-black hover:bg-white/90 rounded-2xl px-4 py-2 font-medium shadow-md hover:shadow-lg transition-all duration-200 text-sm cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              document.getElementById('dish-image-upload')?.click();
            }}
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Dish Image
          </Button>
        </div>
      </div>

      {/* Property Pills Row with Save Button */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-3">
          <div className="border-2 border-dashed border-muted-foreground/40 rounded-2xl px-3 py-1.5 hover:border-muted-foreground/60 transition-colors">
            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-transparent text-foreground placeholder-muted-foreground outline-none text-xs text-center min-w-[70px]"
            />
          </div>
          <div 
            className="border-2 border-dashed border-muted-foreground/40 rounded-2xl px-3 py-1.5 hover:border-muted-foreground/60 transition-colors cursor-pointer"
            onClick={() => setShowTimeModal(true)}
          >
            <div className="bg-transparent text-foreground/50 placeholder-muted-foreground outline-none text-xs text-center min-w-[110px] mt-1">
              {preparationTime || "Preparation Time"}
            </div>
          </div>
          <div className="border-2 border-dashed border-muted-foreground/40 rounded-2xl px-3 py-1.5 hover:border-muted-foreground/60 transition-colors">
            <input
              type="text"
              placeholder="Add Text Property"
              value={additionalProperty}
              onChange={(e) => setAdditionalProperty(e.target.value)}
              className="bg-transparent text-foreground placeholder-muted-foreground outline-none text-xs text-center min-w-[120px]"
            />
          </div>
        </div>
        
        {/* Save Changes Button - Aligned with Property Pills */}
        <Button 
          onClick={handleSave}
          className="bg-green-600 hover:bg-green-500 text-white rounded-2xl px-8 py-3 font-medium shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 cursor-pointer"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      {/* Food Name */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-foreground">
          <input
            type="text"
            value={dishName}
            onChange={(e) => setDishName(e.target.value)}
            className="bg-transparent outline-none text-foreground placeholder-muted-foreground w-full"
            placeholder="FOOD NAME"
          />
        </h1>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-transparent outline-none text-muted-foreground text-lg w-full placeholder-muted-foreground/70"
          placeholder="DESCRIPTION"
        />
      </div>

      {/* Upload 3D Button */}
      <div className="w-full">
        <input
          type="file"
          id="3d-model-upload"
          accept=".glb,.gltf,.obj,.fbx"
          onChange={handle3DUpload}
          className="hidden"
        />
        <Button 
          className="w-full bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded-2xl py-4 text-lg font-medium border-none transition-all duration-200 cursor-pointer"
          onClick={() => document.getElementById('3d-model-upload')?.click()}
        >
          <Box className="h-5 w-5 mr-3" />
          {uploaded3D ? `3D Model: ${uploaded3D}` : 'Upload 3D'}
        </Button>
      </div>

      {/* Allergen Section */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-foreground">Allergen</h3>
        
        {/* Allergen List */}
        <div className="space-y-3">
          {allergens.map((allergen, index) => (
            <div key={index} className="flex items-center justify-between bg-card border border-border rounded-2xl px-4 py-3">
              <input
                type="text"
                value={allergen}
                onChange={(e) => {
                  const newAllergens = [...allergens];
                  newAllergens[index] = e.target.value;
                  setAllergens(newAllergens);
                }}
                className="bg-transparent text-foreground outline-none flex-1"
              />
              <Button
                onClick={() => removeAllergen(index)}
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive/80 hover:bg-destructive/10 rounded-full p-2 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* Add Allergen Button */}
        <Button 
          onClick={addAllergen}
          variant="outline"
          className="border-2 border-dashed border-muted-foreground/40 bg-transparent text-muted-foreground hover:border-muted-foreground/60 hover:text-foreground rounded-3xl px-4 py-3 w-auto transition-all duration-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </div>

      {/* Time Picker Modal */}
      {showTimeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-neutral-900 rounded-3xl p-8 w-[600px] max-w-[90vw]">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-white text-2xl font-semibold">Preparation Time</h2>
            </div>

            {/* Time Selectors */}
            <div className="flex items-center justify-center gap-16 mb-8">
              {/* Minutes From */}
              <div className="flex flex-col items-center">
                <div 
                  className="flex flex-col items-center cursor-pointer"
                  onWheel={(e) => {
                    e.preventDefault();
                    const delta = e.deltaY > 0 ? -1 : 1;
                    const newValue = Math.max(0, Math.min(59, selectedMinutes + delta));
                    handleMinutesSelection(newValue);
                  }}
                >
                  <div className="text-white text-8xl font-bold mb-2">
                    {selectedMinutes.toString().padStart(2, '0')}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-white text-lg font-medium">
                  <span>Mins</span>
                  <ChevronDown className="w-5 h-5" />
                </div>
              </div>

              {/* To Label */}
              <div className="text-white text-4xl font-medium">To</div>

              {/* Minutes To */}
              <div className="flex flex-col items-center">
                <div 
                  className="flex flex-col items-center cursor-pointer"
                  onWheel={(e) => {
                    e.preventDefault();
                    const delta = e.deltaY > 0 ? -1 : 1;
                    const newValue = Math.max(selectedMinutes + 1, Math.min(59, selectedMaxMinutes + delta));
                    handleMaxMinutesSelection(newValue);
                  }}
                >
                  <div className="text-white text-8xl font-bold mb-2">
                    {selectedMaxMinutes.toString().padStart(2, '0')}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-white text-lg font-medium">
                  <span>Mins</span>
                  <ChevronDown className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={() => {
                  resetTimeChanges();
                  setShowTimeModal(false);
                }}
                className="flex-1 bg-red-600 hover:bg-red-500 text-white rounded-2xl py-3 font-medium"
              >
                <X className="w-4 h-4 mr-2" />
                Reset Changes
              </Button>
              <Button
                onClick={handleTimeSelection}
                className="flex-1 bg-green-600 hover:bg-green-500 text-white rounded-2xl py-3 font-medium"
              >
                <Plus className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}