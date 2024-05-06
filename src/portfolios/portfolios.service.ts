import { Injectable } from '@nestjs/common';
import { Portfolio } from './portfolios.entity';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { portfolioSelect } from './utils/portfolioSelect';

@Injectable()
export class PortfoliosService {
  constructor(private prismaService: PrismaService) {}

  async getPortfolios(): Promise<Portfolio[]> {
    return await this.prismaService.portfolio.findMany({
      select: portfolioSelect,
    });
  }

  async getPortfolio(id: string): Promise<Portfolio> {
    return await this.prismaService.portfolio.findUniqueOrThrow({
      where: {
        id,
      },
      select: portfolioSelect,
    });
  }

  async createPortfolio(
    portfolio: Prisma.PortfolioCreateInput,
  ): Promise<Portfolio> {
    return await this.prismaService.portfolio.create({
      data: portfolio,
      select: portfolioSelect,
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
      select: portfolioSelect,
    });
  }

  async deletePortfolio(id: string): Promise<Portfolio> {
    return await this.prismaService.portfolio.delete({
      where: {
        id,
      },
      select: portfolioSelect,
    });
  }
}
