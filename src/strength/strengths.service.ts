import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Strength } from './strengths.entity';
import { Prisma } from '@prisma/client';
import { strengthSelect } from './utils/strengthSelect';

@Injectable()
export class StrengthsService {
  constructor(private prismaService: PrismaService) {}

  async getStrengths(): Promise<Strength[]> {
    return await this.prismaService.strength.findMany({
      select: strengthSelect,
    });
  }

  async getStrength(id: string): Promise<Strength> {
    return await this.prismaService.strength.findUniqueOrThrow({
      where: {
        id,
      },
      select: strengthSelect,
    });
  }

  async createStrength(
    strength: Prisma.StrengthCreateInput,
  ): Promise<Strength> {
    return await this.prismaService.strength.create({
      data: strength,
      select: strengthSelect,
    });
  }

  async updateStrength(
    id: string,
    strength: Prisma.StrengthUpdateInput,
  ): Promise<Strength> {
    return await this.prismaService.strength.update({
      where: {
        id,
      },
      data: strength,
      select: strengthSelect,
    });
  }

  async deleteStrength(id: string): Promise<Strength> {
    return await this.prismaService.strength.delete({
      where: {
        id,
      },
      select: strengthSelect,
    });
  }
}
