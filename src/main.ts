import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from 'src/utils/swagger';
import cookieParser from 'cookie-parser';
import { Logger } from "@nestjs/common";

const logger: Logger = new Logger('Main')

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  setupSwagger(app);

  const port = process.env.PORT
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
