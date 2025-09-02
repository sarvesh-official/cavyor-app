'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface TenantBranding {
  logoUrl?: string | null;
  primaryColor: string;
  secondaryColor: string;
}

interface BrandingContextType {
  branding: TenantBranding | null;
  loading: boolean;
  error: string | null;
}

const BrandingContext = createContext<BrandingContextType>({
  branding: null,
  loading: true,
  error: null,
});

export const useBranding = () => useContext(BrandingContext);

export function BrandingProvider({ children }: { children: React.ReactNode }) {
  const [branding, setBranding] = useState<TenantBranding | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, you'd detect the tenant from subdomain or other means
    // For now, we'll use a hardcoded tenant ID for demonstration
    const tenantId = '123'; // This should come from your tenant detection logic
    
    fetchBranding(tenantId);
  }, []);

  const fetchBranding = async (tenantId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch branding from the NestJS backend
      const response = await fetch(`http://localhost:5000/tenants/${tenantId}/branding`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch branding: ${response.status}`);
      }
      
      const brandingData: TenantBranding = await response.json();
      
      setBranding(brandingData);
      applyBrandingToCSS(brandingData);
    } catch (err) {
      setError('Failed to load branding');
      console.error('Error fetching branding:', err);
    } finally {
      setLoading(false);
    }
  };

  const applyBrandingToCSS = (brandingData: TenantBranding) => {
    // Apply CSS variables to the document root
    const root = document.documentElement;
    root.style.setProperty('--primary', brandingData.primaryColor);
    root.style.setProperty('--secondary', brandingData.secondaryColor);
  };

  const value: BrandingContextType = {
    branding,
    loading,
    error,
  };

  return (
    <BrandingContext.Provider value={value}>
      {children}
    </BrandingContext.Provider>
  );
}