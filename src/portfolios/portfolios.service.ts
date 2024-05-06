import { Injectable } from '@nestjs/common';
import { Portfolio } from './portfolios.entity';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PortfoliosService {
  constructor(private prismaService: PrismaService) {}

  async getPortfolios(): Promise<Portfolio[]> {
    return await this.prismaService.portfolio.findMany({
      include: {
        company: true,
      },
    });
  }

  async getPortfolio(id: string): Promise<Portfolio> {
    return await this.prismaService.portfolio.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        company: true,
      },
    });
  }

  async createPortfolio(
    portfolio: Prisma.PortfolioCreateInput,
  ): Promise<Portfolio> {
    return await this.prismaService.portfolio.create({
      data: portfolio,
      include: {
        company: true,
      },
    });
  }

  async updatePortfolio(
    id: string,
    portfolio: Prisma.PortfolioUpdateInput,
  ): Promise<Portfolio> {
    return await this.prismaService.portfolio.update({
      where: {
        id,
      },
      data: portfolio,
      include: {
        company: true,
      },
    });
  }

  async deletePortfolio(id: string): Promise<Portfolio> {
    return await this.prismaService.portfolio.delete({
      where: {
        id,
      },
      include: {
        company: true,
      },
    });
  }
}
