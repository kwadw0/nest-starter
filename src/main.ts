import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApiKeyGuard } from './authentication/guards/api-key.guard';

async function bootstrap() {
  const PORT = process.env.PORT;

  const config = new DocumentBuilder()
  .setTitle('Elenz')
  .setDescription('API Documentation for Elenz')
  .addApiKey()
  .addBearerAuth()
  .build()
  const app = await NestFactory.create(AppModule);
  //app.useGlobalGuards(ApiKeyGuard)

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(PORT ?? 3000);
  console.log("Application is running successfully at ", `http://localhost:${PORT}/api`);
}
bootstrap();
