'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

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

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Tenant Branding Settings</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Logo Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Logo</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logo URL
              </label>
              <input
                type="url"
                value={branding.logoUrl || ''}
                onChange={(e) => handleColorChange('logoUrl', e.target.value)}
                placeholder="https://example.com/logo.png"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {branding.logoUrl && (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Preview:</span>
                <img
                  src={branding.logoUrl}
                  alt="Logo preview"
                  className="h-16 w-auto object-contain border border-gray-200 rounded"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Colors Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Brand Colors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Color
              </label>
              <div className="flex space-x-3">
                <input
                  type="color"
                  value={branding.primaryColor}
                  onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                  className="h-10 w-20 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={branding.primaryColor}
                  onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                  placeholder="#F44336"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mt-2 p-3 rounded" style={{ backgroundColor: branding.primaryColor }}>
                <span className="text-sm font-medium" style={{ color: branding.secondaryColor }}>
                  Primary Color Preview
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Secondary Color
              </label>
              <div className="flex space-x-3">
                <input
                  type="color"
                  value={branding.secondaryColor}
                  onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                  className="h-10 w-20 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={branding.secondaryColor}
                  onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                  placeholder="#FFFFFF"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mt-2 p-3 rounded" style={{ backgroundColor: branding.secondaryColor }}>
                <span className="text-sm font-medium" style={{ color: branding.primaryColor }}>
                  Secondary Color Preview
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Updating...' : 'Update Branding'}
          </button>
        </div>

        {/* Message */}
        {message && (
          <div className={`p-4 rounded-md ${
            message.includes('successfully') 
              ? 'bg-green-100 text-green-700 border border-green-200' 
              : 'bg-red-100 text-red-700 border border-red-200'
          }`}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
