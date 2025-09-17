import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.VERCEL
      ? true
      : ['http://localhost:3001', 'http://localhost:3002'],
    credentials: true,
  });

  if (process.env.VERCEL) {
    // For Vercel serverless deployment
    await app.init();
    return app;
  } else {
    // For local development
    await app.listen(process.env.PORT ?? 5000);
  }
}

// For Vercel deployment
if (process.env.VERCEL) {
  module.exports = bootstrap();
} else {
  // For local development
  bootstrap().catch((error) => {
    console.error('Failed to start application:', error);
    process.exit(1);
  });
}