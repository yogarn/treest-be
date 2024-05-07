import { Injectable } from '@nestjs/common';
import { Portfolio } from './portfolios.entity';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { portfolioSelect } from './utils/portfolioSelect';
import { PortfolioQuery } from './utils/portfolioQuery';

@Injectable()
export class PortfoliosService {
  constructor(private prismaService: PrismaService) {}

  async getPortfolios(query: PortfolioQuery): Promise<Portfolio[]> {
    let filter: any = {};
    let orderBy: any = {};

    let take = parseInt(query.limit);
    let page = parseInt(query.page);

    if (!take) {
      take = parseInt(process.env.DEFAULT_LIMIT);
    }

    if (!page) {
      page = 1;
    }

    const skip = (page - 1) * take >= 0 ? (page - 1) * take : 0;

    if (
      query.title ||
      query.detail ||
      query.companyId ||
      query.before ||
      query.after
    ) {
      filter.OR = [];
      if (query.title) {
        filter.OR.push({ title: { search: query.title } });
      }
      if (query.detail) {
        filter.OR.push({ detail: { search: query.detail } });
      }
      if (query.companyId) {
        filter.OR.push({ companyId: { search: query.companyId } });
      }
      if (query.before) {
        filter.OR.push({ createdAt: { lte: new Date(query.before) } });
      }
      if (query.after) {
        filter.OR.push({ createdAt: { gte: new Date(query.after) } });
      }
    }

    if (query.sort) {
      let sortOrder = 'desc';
      if (query.sort.startsWith('-')) {
        query.sort = query.sort.substring(1);
        sortOrder = 'asc';
      }
      orderBy[query.sort] = sortOrder;
    }

    return await this.prismaService.portfolio.findMany({
      skip,
      take,
      select: portfolioSelect,
      where: filter,
      orderBy,
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
