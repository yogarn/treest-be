import { Module } from '@nestjs/common';
import { PortfoliosController } from './portfolios.controller';
import { PortfoliosService } from './portfolios.service';
import { PrismaModule } from 'src/database/prisma/prisma.module';

@Module({
  controllers: [PortfoliosController],
  providers: [PortfoliosService],
  imports: [PrismaModule]
})
export class PortfoliosModule {}
