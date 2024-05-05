import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/interceptors/response/response.interceptor';
import { PrismaFilter } from './common/exceptions/prisma/prisma.filter';
import { GlobalFilter } from './common/exceptions/global/global.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalFilters(new GlobalFilter(), new PrismaFilter())
  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(3000);
}
bootstrap();
