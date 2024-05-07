import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Company } from './companies.entity';
import { Prisma } from '@prisma/client';
import { companySelect } from './utils/companySelect';
import { CompanyQuery } from './utils/companyQuery';

@Injectable()
export class CompaniesService {
  constructor(private prismaService: PrismaService) {}

  async getCompanies(query: CompanyQuery): Promise<Company[]> {
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
      query.name ||
      query.description ||
      query.tagline ||
      query.founderId ||
      query.coFounderId ||
      query.stockSymbol ||
      query.before ||
      query.after
    ) {
      filter.OR = [];
      if (query.name) {
        filter.OR.push({ name: { search: query.name } });
      }
      if (query.description) {
        filter.OR.push({ description: { search: query.description } });
      }
      if (query.tagline) {
        filter.OR.push({ tagline: { search: query.tagline } });
      }
      if (query.founderId) {
        filter.OR.push({ founderId: { search: query.founderId } });
      }
      if (query.coFounderId) {
        filter.OR.push({ coFounderId: { search: query.coFounderId } });
      }
      if (query.stockSymbol) {
        filter.OR.push({ stockSymbol: { search: query.stockSymbol } });
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

    return await this.prismaService.company.findMany({
      skip,
      take,
      select: companySelect,
      where: filter,
      orderBy,
    });
  }

  async getCompany(id: string): Promise<Company> {
    return await this.prismaService.company.findUniqueOrThrow({
      where: {
        id,
      },
      select: companySelect,
    });
  }

  async createCompany(company: Prisma.CompanyCreateInput): Promise<Company> {
    return await this.prismaService.company.create({
      data: company,
      select: companySelect,
    });
  }

  async updateCompany(
    id: string,
    company: Prisma.CompanyUpdateInput,
  ): Promise<Company> {
    return await this.prismaService.company.update({
      where: {
        id,
      },
      data: company,
      select: companySelect,
    });
  }

  async deleteCompany(id: string): Promise<Company> {
    return await this.prismaService.company.delete({
      where: {
        id,
      },
      select: companySelect,
    });
  }
}
