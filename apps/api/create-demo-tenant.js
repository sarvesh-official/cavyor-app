const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createDemoTenant() {
  try {
    const tenant = await prisma.tenant.create({
      data: {
        name: 'Demo Company',
        logoUrl: 'https://via.placeholder.com/200x80/FF5722/FFFFFF?text=DEMO',
        primaryColor: '#FF5722',
        secondaryColor: '#FFFFFF',
      },
    });

    console.log('Demo tenant created successfully:', tenant);
    console.log('Tenant ID:', tenant.id);
    console.log('Use this ID to test the branding system');
  } catch (error) {
    console.error('Error creating demo tenant:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createDemoTenant();
