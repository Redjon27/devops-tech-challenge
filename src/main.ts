import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Prefer APP_PORT (siç e ke në values), fallback te PORT, pastaj default 3000
  const port = Number(process.env.APP_PORT || process.env.PORT || 3000);

  await app.listen(port, '0.0.0.0');

  console.log(`✅ App listening on 0.0.0.0:${port}`);
}
bootstrap();
