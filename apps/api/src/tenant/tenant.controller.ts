import { Controller, Get, Put, Param, Body } from '@nestjs/common';
import { TenantService } from './tenant.service';
import type { TenantBranding, UpdateTenantBrandingDto } from './tenant.service';

@Controller('tenants')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}
  @Get(':tenantId/branding')
  async getTenantBranding(
    @Param('tenantId') tenantId: string,
  ): Promise<TenantBranding> {
    return this.tenantService.getTenantBranding(tenantId);
  }

  @Put(':tenantId/branding')
  async updateTenantBranding(
    @Param('tenantId') tenantId: string,
    @Body() brandingData: UpdateTenantBrandingDto,
  ): Promise<TenantBranding> {
    return this.tenantService.updateTenantBranding(tenantId, brandingData);
  }
}
