"use client";

import { useParams, useRouter, usePathname } from 'next/navigation';
import { DashboardLayout } from "@/components/dashboard-layout";
import { getTenantSidebarSections } from "@/constants";

export default function TenantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const tenantId = params.tenantId as string;

  const isOverviewPage = pathname === `/tenant/${tenantId}`;

  if (isOverviewPage) {
    const tenantSidebarSections = getTenantSidebarSections(tenantId);
    
    return (
      <DashboardLayout 
        title=""
        showBackButton={true}
        onBackClick={() => router.push('/restaurants')}
        customSidebarSections={tenantSidebarSections}
        activeItem="overview"
      >
        {children}
      </DashboardLayout>
    );
  }

  return <>{children}</>;
}
