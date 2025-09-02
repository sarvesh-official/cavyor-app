'use client';

import { Button } from '@workspace/ui/components/button';
import { useBranding } from '../components/branding-provider';

export default function Home() {
  const { branding, loading, error } = useBranding();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading branding...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (!branding) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">No branding available</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Logo */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {branding.logoUrl && (
              <div className="flex-shrink-0">
                <img
                  src={branding.logoUrl}
                  alt="Company Logo"
                  className="h-12 w-auto"
                />
              </div>
            )}
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium">
                Dashboard
              </a>
              <a href="#" className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium">
                Products
              </a>
              <a href="#" className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium">
                About
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Welcome to Your Dashboard
          </h1>

          {/* Branding Preview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Primary Color Card */}
            <div 
              className="bg-white overflow-hidden shadow rounded-lg"
              style={{ borderTop: `4px solid ${branding.primaryColor}` }}
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div 
                    className="flex-shrink-0 w-8 h-8 rounded-full"
                    style={{ backgroundColor: branding.primaryColor }}
                  />
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Primary Color
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {branding.primaryColor}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Color Card */}
            <div 
              className="bg-white overflow-hidden shadow rounded-lg"
              style={{ borderTop: `4px solid ${branding.secondaryColor}` }}
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div 
                    className="flex-shrink-0 w-8 h-8 rounded-full border-2"
                    style={{ 
                      backgroundColor: branding.secondaryColor,
                      borderColor: branding.primaryColor
                    }}
                  />
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Secondary Color
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {branding.secondaryColor}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Logo Card */}
            {branding.logoUrl && (
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        src={branding.logoUrl}
                        alt="Logo"
                        className="h-8 w-auto"
                      />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Company Logo
                        </dt>
                        <dd className="text-sm text-gray-900 truncate">
                          Brand Identity
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="space-y-4">
            <button
              className="px-4 py-2 rounded-md text-white font-medium transition-colors"
              style={{ backgroundColor: branding.primaryColor }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.9';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
            >
              Primary Action
            </button>
            
            <button
              className="px-4 py-2 rounded-md font-medium border-2 transition-colors"
              style={{ 
                borderColor: branding.primaryColor,
                color: branding.primaryColor
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = branding.primaryColor;
                e.currentTarget.style.color = branding.secondaryColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = branding.primaryColor;
              }}
            >
              Secondary Action
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
