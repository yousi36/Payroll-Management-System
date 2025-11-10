import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Payroll Management System')
    .setDescription('API documentation for Payroll Management System')
    .setVersion('1.0')
    .addTag('Users', 'Endpoints related to user accounts and authentication')
    .addTag('Employees', 'Endpoints related to employee management')
    .addTag('Payrolls', 'Endpoints related to salary, bonuses, and deductions')
    .addTag('Attendance', 'Endpoints for attendance tracking')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log(`🚀 Server is running on http://localhost:${process.env.PORT ?? 3000}/api`);
}
bootstrap();
