import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { PrismaModule } from 'src/database/prisma/prisma.module';

@Module({
  providers: [NewsService],
  controllers: [NewsController],
  imports: [PrismaModule]
})
export class NewsModule {}
