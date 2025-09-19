"use client";

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Save, Upload, X, ImageIcon } from "lucide-react";

interface TenantBranding {
  logoUrl?: string | null;
  primaryColor: string;
  secondaryColor: string;
}

export default function TenantBrandingPage() {
  const params = useParams();
  const tenantId = params.tenantId as string;
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [branding, setBranding] = useState<TenantBranding>({
    logoUrl: '',
    primaryColor: '#F44336',
    secondaryColor: '#FFFFFF',
  });
  
  const [loading, setLoading] = useState(false);
  const [logoLoading, setLogoLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [uploadMethod, setUploadMethod] = useState<'url' | 'file'>('url');

  useEffect(() => {
    fetchBranding();
  }, [tenantId]);

  useEffect(() => {
    // Set preview URL based on upload method
    if (uploadMethod === 'file' && uploadedFile) {
      const url = URL.createObjectURL(uploadedFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else if (uploadMethod === 'url' && branding.logoUrl) {
      setPreviewUrl(branding.logoUrl);
    } else {
      setPreviewUrl('');
    }
  }, [uploadMethod, uploadedFile, branding.logoUrl]);

  const fetchBranding = async () => {
    try {
      const response = await fetch(`/api/tenants/${tenantId}/branding`);
      if (response.ok) {
        const data = await response.json();
        setBranding(data);
        if (data.logoUrl) {
          setUploadMethod('url');
        }
      }
    } catch (error) {
      console.error('Error fetching branding:', error);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setMessage('Please select an image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setMessage('File size must be less than 5MB');
        return;
      }

      setUploadedFile(file);
      setMessage('');
      // Clear URL when file is uploaded
      setBranding(prev => ({ ...prev, logoUrl: '' }));
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setPreviewUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const uploadFileToServer = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('logo', file);
    formData.append('tenantId', tenantId);

    const response = await fetch(`/api/tenants/${tenantId}/upload-logo`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload file');
    }

    const data = await response.json();
    return data.logoUrl;
  };

  // Save only logo changes
  const handleLogoSave = async () => {
    setLogoLoading(true);
    setMessage('');

    try {
      let logoUrl = branding.logoUrl;

      // If a file was uploaded, upload it first
      if (uploadedFile && uploadMethod === 'file') {
        logoUrl = await uploadFileToServer(uploadedFile);
      }

      // Only update the logo, keep existing colors
      const response = await fetch(`/api/tenants/${tenantId}/branding`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          logoUrl,
          // Keep existing colors unchanged
          primaryColor: branding.primaryColor,
          secondaryColor: branding.secondaryColor,
        }),
      });

      if (response.ok) {
        setMessage('Logo updated successfully!');
        await fetchBranding();
        // Clear uploaded file after successful save
        setUploadedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        setMessage('Failed to update logo');
      }
    } catch (error) {
      setMessage('Error updating logo');
      console.error('Error:', error);
    } finally {
      setLogoLoading(false);
    }
  };

  // Save all branding changes
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      let logoUrl = branding.logoUrl;

      // If a file was uploaded, upload it first
      if (uploadedFile && uploadMethod === 'file') {
        logoUrl = await uploadFileToServer(uploadedFile);
      }

      const response = await fetch(`/api/tenants/${tenantId}/branding`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...branding,
          logoUrl,
        }),
      });

      if (response.ok) {
        setMessage('Branding updated successfully!');
        await fetchBranding();
        // Clear uploaded file after successful save
        setUploadedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
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

  const handleUploadMethodChange = (method: 'url' | 'file') => {
    setUploadMethod(method);
    setMessage('');
    
    if (method === 'file') {
      setBranding(prev => ({ ...prev, logoUrl: '' }));
    } else {
      handleRemoveFile();
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Tenant Branding Settings</h1>
        <p className="text-muted-foreground">Customize your restaurant's branding colors and logo</p>
      </div>
    
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Logo Section */}
        <Card className="bg-card border-border rounded-2xl">
          <CardHeader>
            <CardTitle className="text-foreground">Logo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left side - Controls */}
              <div className="space-y-4">
                {/* Upload Method Toggle */}
                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant={uploadMethod === 'url' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleUploadMethodChange('url')}
                    className="rounded-full"
                  >
                    URL
                  </Button>
                  <Button
                    type="button"
                    variant={uploadMethod === 'file' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleUploadMethodChange('file')}
                    className="rounded-full"
                  >
                    Upload File
                  </Button>
                </div>

                {/* URL Input */}
                {uploadMethod === 'url' && (
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Logo URL
                    </label>
                    <Input
                      type="url"
                      value={branding.logoUrl || ''}
                      onChange={(e) => handleColorChange('logoUrl', e.target.value)}
                      placeholder="https://example.com/logo.png"
                      className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                )}

                {/* File Upload */}
                {uploadMethod === 'file' && (
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Upload Logo
                    </label>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-4">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                          className="flex items-center space-x-2 rounded-full"
                        >
                          <Upload className="h-4 w-4" />
                          <span>Choose File</span>
                        </Button>
                        {uploadedFile && (
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-muted-foreground">
                              {uploadedFile.name}
                            </span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={handleRemoveFile}
                              className="h-6 w-6 p-0 rounded-full"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Supported formats: PNG, JPG, GIF. Max size: 5MB
                      </p>
                    </div>
                  </div>
                )}

                {/* Save Logo Button */}
                <div className="pt-2">
                  <Button
                    type="button"
                    onClick={handleLogoSave}
                    disabled={logoLoading || (!branding.logoUrl && !uploadedFile)}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-2xl w-full"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {logoLoading ? 'Saving Logo...' : 'Save Logo'}
                  </Button>
                </div>
              </div>

              {/* Right side - Preview Box */}
              <div className="flex flex-col items-center justify-center py-8">
                <div className="w-32 h-32 rounded-full border-2 border-dashed border-border bg-muted/20 flex items-center justify-center overflow-hidden">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Logo preview"
                      className="w-full h-full object-contain p-3"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="text-center px-2">
                      <ImageIcon className="h-8 w-8 text-muted-foreground/50 mx-auto mb-1" />
                      <p className="text-xs text-muted-foreground leading-tight">No logo available</p>
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-3 text-center font-medium">
                  Logo Preview
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Colors Section */}
        <Card className="bg-card border-border rounded-2xl">
          <CardHeader>
            <CardTitle className="text-foreground">Brand Colors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Primary Color
                </label>
                <div className="flex space-x-3">
                  <input
                    type="color"
                    value={branding.primaryColor}
                    onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                    className="h-10 w-20 border border-border rounded cursor-pointer bg-background"
                  />
                  <Input
                    type="text"
                    value={branding.primaryColor}
                    onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                    placeholder="#F44336"
                    className="flex-1"
                  />
                </div>
                <div className="mt-2 p-3 rounded border border-border" style={{ backgroundColor: branding.primaryColor }}>
                  <span className="text-sm font-medium" style={{ color: branding.secondaryColor }}>
                    Primary Color Preview
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Secondary Color
                </label>
                <div className="flex space-x-3">
                  <input
                    type="color"
                    value={branding.secondaryColor}
                    onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                    className="h-10 w-20 border border-border rounded cursor-pointer bg-background"
                  />
                  <Input
                    type="text"
                    value={branding.secondaryColor}
                    onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                    placeholder="#FFFFFF"
                    className="flex-1"
                  />
                </div>
                <div className="mt-2 p-3 rounded border border-border" style={{ backgroundColor: branding.secondaryColor }}>
                  <span className="text-sm font-medium" style={{ color: branding.primaryColor }}>
                    Secondary Color Preview
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Submit Button - For All Branding */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={loading}
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-2xl"
          >
            <Save className="h-4 w-4 mr-2" />
            {loading ? 'Updating...' : 'Update Branding'}
          </Button>
        </div>

        {/* Message */}
        {message && (
          <div className={`p-4 rounded-2xl ${
            message.includes('successfully') 
              ? 'bg-green-600/20 text-green-400 border border-green-600' 
              : 'bg-red-600/20 text-red-400 border border-red-600'
          }`}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
}