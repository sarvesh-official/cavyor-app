"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { 
  FileText,
  Folder,
  Users,
  Settings,
  Palette,
  Save,
  ArrowLeft
} from "lucide-react";

interface TenantBranding {
  logoUrl?: string | null;
  primaryColor: string;
  secondaryColor: string;
}

interface UpdateTenantBrandingDto {
  logoUrl?: string | null;
  primaryColor?: string;
  secondaryColor?: string;
}

export default function TenantBrandingPage() {
  const params = useParams();
  const router = useRouter();
  const tenantId = params.tenantId as string;
  
  const [branding, setBranding] = useState<TenantBranding>({
    logoUrl: '',
    primaryColor: '#F44336',
    secondaryColor: '#FFFFFF',
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchBranding();
  }, [tenantId]);

  const fetchBranding = async () => {
    try {
      const response = await fetch(`/api/tenants/${tenantId}/branding`);
      if (response.ok) {
        const data = await response.json();
        setBranding(data);
      }
    } catch (error) {
      console.error('Error fetching branding:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(`/api/tenants/${tenantId}/branding`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(branding),
      });

      if (response.ok) {
        setMessage('Branding updated successfully!');
        await fetchBranding(); // Refresh data
      } else {
        setMessage('Failed to update branding');
      }
    } catch (error) {
      setMessage('Error updating branding');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleColorChange = (field: keyof TenantBranding, value: string) => {
    setBranding(prev => ({ ...prev, [field]: value }));
  };

  const tenantSidebarSections = [
    {
      title: "Tenant Settings",
      items: [
        {
          id: "overview",
          label: "Overview",
          icon: FileText,
          href: `/tenant/${tenantId}`,
        },
        {
          id: "menu",
          label: "Menu",
          icon: FileText,
          href: `/tenant/${tenantId}/menu`,
        },
        {
          id: "repository",
          label: "Repository",
          icon: Folder,
          href: `/tenant/${tenantId}/repository`,
        },
        {
          id: "members",
          label: "Members",
          icon: Users,
          href: `/tenant/${tenantId}/members`,
        },
        {
          id: "branding",
          label: "Branding",
          icon: Palette,
          href: `/tenant/${tenantId}/branding`,
        },
        {
          id: "settings",
          label: "Settings",
          icon: Settings,
          href: `/tenant/${tenantId}/settings`,
        },
      ],
    },
  ]

  return (
    <DashboardLayout 
      title=""
      showBackButton={true}
      onBackClick={() => router.push('/restaurants')}
      customSidebarSections={tenantSidebarSections}
      activeItem="branding"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Tenant Branding Settings</h1>
          <p className="text-gray-400">Customize your restaurant's branding colors and logo</p>
        </div>
      
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Logo Section */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Logo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Logo URL
                  </label>
                  <Input
                    type="url"
                    value={branding.logoUrl || ''}
                    onChange={(e) => handleColorChange('logoUrl', e.target.value)}
                    placeholder="https://example.com/logo.png"
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>
                {branding.logoUrl && (
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-400">Preview:</span>
                    <img
                      src={branding.logoUrl}
                      alt="Logo preview"
                      className="h-16 w-auto object-contain border border-gray-600 rounded"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Colors Section */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Brand Colors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Primary Color
                  </label>
                  <div className="flex space-x-3">
                    <input
                      type="color"
                      value={branding.primaryColor}
                      onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                      className="h-10 w-20 border border-gray-600 rounded cursor-pointer bg-gray-700"
                    />
                    <Input
                      type="text"
                      value={branding.primaryColor}
                      onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                      placeholder="#F44336"
                      className="flex-1 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    />
                  </div>
                  <div className="mt-2 p-3 rounded" style={{ backgroundColor: branding.primaryColor }}>
                    <span className="text-sm font-medium" style={{ color: branding.secondaryColor }}>
                      Primary Color Preview
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Secondary Color
                  </label>
                  <div className="flex space-x-3">
                    <input
                      type="color"
                      value={branding.secondaryColor}
                      onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                      className="h-10 w-20 border border-gray-600 rounded cursor-pointer bg-gray-700"
                    />
                    <Input
                      type="text"
                      value={branding.secondaryColor}
                      onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                      placeholder="#FFFFFF"
                      className="flex-1 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    />
                  </div>
                  <div className="mt-2 p-3 rounded" style={{ backgroundColor: branding.secondaryColor }}>
                    <span className="text-sm font-medium" style={{ color: branding.primaryColor }}>
                      Secondary Color Preview
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={loading}
              className="bg-white text-black hover:bg-gray-100"
            >
              <Save className="h-4 w-4 mr-2" />
              {loading ? 'Updating...' : 'Update Branding'}
            </Button>
          </div>

          {/* Message */}
          {message && (
            <div className={`p-4 rounded-md ${
              message.includes('successfully') 
                ? 'bg-green-600/20 text-green-400 border border-green-600' 
                : 'bg-red-600/20 text-red-400 border border-red-600'
            }`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </DashboardLayout>
  );
}
