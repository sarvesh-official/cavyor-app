import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface TenantBranding {
  logoUrl?: string | null;
  primaryColor: string;
  secondaryColor: string;
}

export interface UpdateTenantBrandingDto {
  logoUrl?: string | null;
  primaryColor?: string;
  secondaryColor?: string;
}

@Injectable()
export class TenantService {
  constructor(private prisma: PrismaService) {}

  async getTenantBranding(tenantId: string): Promise<TenantBranding> {
    const tenant = await this.prisma.tenant.findUnique({
      where: { id: tenantId },
      select: {
        logoUrl: true,
        primaryColor: true,
        secondaryColor: true,
      },
    });

    if (!tenant) {
      throw new NotFoundException(`Tenant with ID ${tenantId} not found`);
    }

    return tenant;
  }

  async updateTenantBranding(
    tenantId: string,
    brandingData: UpdateTenantBrandingDto,
  ): Promise<TenantBranding> {
    const tenant = await this.prisma.tenant.findUnique({
      where: { id: tenantId },
    });

    if (!tenant) {
      throw new NotFoundException(`Tenant with ID ${tenantId} not found`);
    }

    const updatedTenant = await this.prisma.tenant.update({
      where: { id: tenantId },
      data: brandingData,
      select: {
        logoUrl: true,
        primaryColor: true,
        secondaryColor: true,
      },
    });

    return updatedTenant;
  }

  async createTenant(
    name: string,
    brandingData: Partial<TenantBranding>,
  ): Promise<any> {
    return this.prisma.tenant.create({
      data: {
        name,
        primaryColor: brandingData.primaryColor || '#F44336',
        secondaryColor: brandingData.secondaryColor || '#FFFFFF',
        logoUrl: brandingData.logoUrl,
      },
    });
  }
}
