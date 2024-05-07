import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Strength } from './strengths.entity';
import { Prisma } from '@prisma/client';
import { strengthSelect } from './utils/strengthSelect';
import { StrengthQuery } from './utils/strengthQuery';

@Injectable()
export class StrengthsService {
  constructor(private prismaService: PrismaService) {}

  async getStrengths(query: StrengthQuery): Promise<Strength[]> {
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

    return await this.prismaService.strength.findMany({
      skip,
      take,
      select: strengthSelect,
      where: filter,
      orderBy,
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
