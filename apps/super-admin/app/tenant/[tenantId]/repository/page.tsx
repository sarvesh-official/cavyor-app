"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import {
  Plus,
  ExternalLink,
  MapPin,
  Building2,
  ChevronDown
} from "lucide-react";
import Image from "next/image";

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
      qrCode: "/qr-placeholder.png"
    },
    {
      id: "2",
      type: "Corporate PAN Card",
      title: "Corporate PAN Card",
      panNumber: "ABLFR8211Q",
      companyName: "RAYMAS TECHNOLOGIES LLP",
      qrCode: "/qr-placeholder.png"
    },
    {
      id: "3",
      type: "Corporate PAN Card",
      title: "Corporate PAN Card",
      panNumber: "ABLFR8211Q",
      companyName: "RAYMAS TECHNOLOGIES LLP",
      qrCode: "/qr-placeholder.png"
    },
    {
      id: "4",
      type: "Corporate PAN Card",
      title: "Corporate PAN Card",
      panNumber: "ABLFR8211Q",
      companyName: "RAYMAS TECHNOLOGIES LLP",
      qrCode: "/qr-placeholder.png"
    },
    {
      id: "5",
      type: "Corporate PAN Card",
      title: "Corporate PAN Card",
      panNumber: "ABLFR8211Q",
      companyName: "RAYMAS TECHNOLOGIES LLP",
      qrCode: "/qr-placeholder.png"
    },
    {
      id: "6",
      type: "Corporate PAN Card",
      title: "Corporate PAN Card",
      panNumber: "ABLFR8211Q",
      companyName: "RAYMAS TECHNOLOGIES LLP",
      qrCode: "/qr-placeholder.png"
    }
  ]);

  return (
    <div className="space-y-6">
      {/* Restaurant Banner with KFC Store Image */}
      <div className="relative">
        {/* Background Image Container */}
        <div
          className="h-64 rounded-3xl overflow-hidden relative"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=1200&h=400&fit=crop&crop=center')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40" style={{ zIndex: 1 }}></div>
        </div>

        {/* KFC Logo Circle - Centered vertically, overlapping banner */}
        <div className="absolute left-8 -bottom-16 transform -translate-y-1/2" style={{ zIndex: 4 }}>
          <div className="w-42 h-42 rounded-full flex items-center justify-center border-4 border-white shadow-lg overflow-hidden">
            <img
              src="/kfc_logo.png"
              alt="KFC Logo"
              className="w-42 h-42 object-cover"
            />
          </div>
        </div>

        {/* Restaurant Info - Below banner with View Link */}
        <div className="mt-6 flex items-center justify-between pr-8">
          <div className="ml-52">
            <h1 className="text-3xl font-bold mb-1 text-white">{restaurantData.name}</h1>
            <p className="text-white/80 text-lg">{restaurantData.location}</p>
          </div>


          {/* Upload Document Button */}
          <div className="flex justify-end mt-8">
            <Button className="flex items-center space-x-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90">
              <Plus className="h-4 w-4" />
              <span>Upload Document</span>
            </Button>
          </div>
          {/* View Link Button with Location Icon */}
          {/* <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <Button 
              className="bg-white text-black hover:bg-gray-100 rounded-full px-6 py-2"
              onClick={() => window.open(restaurantData.viewLink, '_blank')}
            >
              View Link
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </div> */}
        </div>
      </div>


      {/* Documents Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Documents Repository</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <Card key={doc.id} className="bg-card border-border rounded-2xl hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer">
              <CardContent className="p-6">
                <div className="flex flex-col space-y-4">
                  {/* Document Header */}
                  <div className="flex items-center justify-between">
                    <Badge className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs">
                      {doc.type}
                    </Badge>
                    <button className="text-muted-foreground hover:text-foreground">
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </div>

                  {/* QR Code */}
                  <div className="flex justify-center">
                    <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center">
                      <div className="w-24 h-24 bg-black/10 rounded grid grid-cols-8 gap-[1px] p-1">
                        {Array.from({ length: 64 }).map((_, i) => (
                          <div
                            key={i}
                            className={`aspect-square rounded-[0.5px] ${Math.random() > 0.5 ? 'bg-black' : 'bg-transparent'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Document Details */}
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground text-center">{doc.title}</h3>
                    <div className="text-center space-y-1">
                      <p className="text-sm text-muted-foreground">PAN Number</p>
                      <p className="font-mono text-sm font-medium text-foreground">{doc.panNumber}</p>
                    </div>
                    <div className="text-center space-y-1">
                      <p className="text-sm text-muted-foreground">Company Name</p>
                      <p className="text-sm font-medium text-foreground">{doc.companyName}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 rounded-full"
                    >
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}