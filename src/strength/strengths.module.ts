import { Module } from '@nestjs/common';
import { StrengthsService } from './strengths.service';
import { StrengthsController } from './strengths.controller';
import { PrismaModule } from 'src/database/prisma/prisma.module';

@Module({
  providers: [StrengthsService],
  controllers: [StrengthsController],
  imports: [PrismaModule]
})
export class StrengthModule {}
