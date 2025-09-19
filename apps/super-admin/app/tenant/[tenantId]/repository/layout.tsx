"use client";

import { useParams, useRouter } from 'next/navigation';
import { DashboardLayout } from "@/components/dashboard-layout";
import { getTenantSidebarSections } from "@/constants";

export default function RepositoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const router = useRouter();
  const tenantId = params.tenantId as string;

  const tenantSidebarSections = getTenantSidebarSections(tenantId);

  return (
    <DashboardLayout 
      title=""
      showBackButton={true}
      onBackClick={() => router.push('/restaurants')}
      customSidebarSections={tenantSidebarSections}
      activeItem="repository"
    >
      {children}
    </DashboardLayout>
  );
}
