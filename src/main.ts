import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for specific origin (e.g., frontend running on localhost:3000)
  app.enableCors({
    origin: process.env.FRONTEND_URL ?? 'http://localhost:3000', // Allow requests from the frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
    allowedHeaders: 'Content-Type, Authorization', // Allowed headers
  });

  // Enable global validation with ValidationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Only allow properties defined in the DTO
      forbidNonWhitelisted: true, // Reject requests with extra properties
      transform: true, // Automatically transform payloads to DTO instances
    }),
  );

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
