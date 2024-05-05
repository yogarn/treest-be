import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { PrismaModule } from 'src/database/prisma/prisma.module';

@Module({
  providers: [CompaniesService],
  controllers: [CompaniesController],
  imports: [PrismaModule]
})
export class CompaniesModule {}
