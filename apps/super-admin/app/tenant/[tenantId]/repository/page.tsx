"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { 
  FileText,
  Folder,
  Users,
  Settings,
  Plus,
  ExternalLink,
  MapPin,
  Building2
} from "lucide-react";
import Image from "next/image";
import { DashboardLayout } from "@/components/dashboard-layout";

interface Document {
  id: string;
  type: string;
  title: string;
  panNumber: string;
  companyName: string;
  qrCode: string;
}

export default function RepositoryPage() {
  const params = useParams();
  const router = useRouter();
  const tenantId = params.tenantId as string;

  // Mock data - in real app, this would come from API
  const [restaurantData] = useState({
    name: "Kentucky Fried Chicken",
    location: "Jalandhar, Punjab",
    bannerImage: "/dish_placeholder.png", // Using placeholder for now
    profileImage: "/dish_placeholder.png", // Using placeholder for now
    viewLink: "https://kfc-jalandhar.com"
  });

  const [documents] = useState<Document[]>([
    {
      id: "1",
      type: "Corporate PAN Card",
      title: "Corporate PAN Card",
      panNumber: "ABLFR8211Q",
      companyName: "RAYMAS TECHNOLOGIES LLP",
      qrCode: "/dish_placeholder.png" // Using placeholder for QR code
    },
    {
      id: "2", 
      type: "Corporate PAN Card",
      title: "Corporate PAN Card",
      panNumber: "GKRPR5502R",
      companyName: "RAYMAS TECHNOLOGIES LLP",
      qrCode: "/dish_placeholder.png"
    },
    {
      id: "3",
      type: "Corporate PAN Card", 
      title: "Corporate PAN Card",
      panNumber: "ABLFR8211Q",
      companyName: "RAYMAS TECHNOLOGIES LLP",
      qrCode: "/dish_placeholder.png"
    },
    {
      id: "4",
      type: "Corporate PAN Card",
      title: "Corporate PAN Card", 
      panNumber: "GKRPR5502R",
      companyName: "RAYMAS TECHNOLOGIES LLP",
      qrCode: "/dish_placeholder.png"
    }
  ]);

  const repositorySidebarSections = [
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

  const handleViewLink = () => {
    window.open(restaurantData.viewLink, '_blank');
  };

  return (
    <DashboardLayout 
      customSidebarSections={repositorySidebarSections}
      activeItem="repository"
      title="Repository"
      showBackButton={true}
      onBackClick={() => router.push("/restaurants")}
    >
      <div className="space-y-8">
        {/* Restaurant Header Section */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="relative">
              {/* Banner Image */}
              <div className="h-48 bg-gradient-to-r from-red-600 to-red-800 relative">
                <Image
                  src={restaurantData.bannerImage}
                  alt="Restaurant Banner"
                  width={800}
                  height={192}
                  className="w-full h-full object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/80 to-red-800/80"></div>
                
                {/* Restaurant Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-end gap-6">
                    {/* Profile Image */}
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full bg-muted border-4 border-background overflow-hidden">
                        <Image
                          src={restaurantData.profileImage}
                          alt="Restaurant Profile"
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    
                    {/* Restaurant Details */}
                    <div className="flex-1 text-white">
                      <h1 className="text-3xl font-bold mb-2">{restaurantData.name}</h1>
                      <div className="flex items-center gap-2 text-gray-200">
                        <MapPin className="h-4 w-4" />
                        <span>{restaurantData.location}</span>
                      </div>
                    </div>
                    
                    {/* View Link Button */}
                    <Button 
                      onClick={handleViewLink}
                      className="bg-background text-foreground hover:bg-accent flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View Link
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Document Repository Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Document Repository</h2>
            <Button className="bg-muted text-muted-foreground hover:bg-muted/80 flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Document
            </Button>
          </div>

          {/* Documents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {documents.map((doc) => (
              <Card key={doc.id} className="overflow-hidden">
                <CardContent className="p-0">
                  {/* PAN Card Design */}
                  <div className="bg-card p-6 space-y-4">
                    {/* Header */}
                    <div className="text-center space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <Building2 className="h-4 w-4 text-white" />
                        </div>
                        <div className="text-sm font-semibold text-card-foreground">
                          INCOME TAX DEPARTMENT
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">GOVT. OF INDIA</div>
                    </div>

                    {/* Hindi Text */}
                    <div className="text-center">
                      <div className="text-sm font-semibold text-card-foreground">
                        स्थायी लेखा संख्या कार्ड
                      </div>
                    </div>

                    {/* PAN Number */}
                    <div className="text-center">
                      <div className="text-lg font-bold text-card-foreground tracking-wider">
                        {doc.panNumber}
                      </div>
                    </div>

                    {/* QR Code and Name */}
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="text-xs text-muted-foreground mb-1">नाम / Name</div>
                        <div className="text-sm font-semibold text-card-foreground">
                          {doc.companyName}
                        </div>
                      </div>
                      <div className="w-16 h-16 bg-muted rounded border-2 border-border flex items-center justify-center">
                        <div className="w-12 h-12 bg-muted-foreground/20 rounded"></div>
                      </div>
                    </div>
                  </div>

                  {/* Document Info */}
                  <div className="p-4 bg-muted">
                    <div className="text-sm text-muted-foreground">{doc.title}</div>
                    <div className="text-xs text-muted-foreground/70 mt-1">PAN: {doc.panNumber}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
