import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Company } from './companies.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class CompaniesService {
  constructor(private prismaService: PrismaService) {}

  async getCompanies(): Promise<Company[]> {
    return await this.prismaService.company.findMany({
      include: {
        strengths: true,
        portfolios: true,
        founder: true,
        coFounder: true,
      },
    });
  }

  async getCompany(id: string): Promise<Company> {
    return await this.prismaService.company.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        strengths: true,
        portfolios: true,
        founder: true,
        coFounder: true,
      },
    });
  }

  async createCompany(company: Prisma.CompanyCreateInput): Promise<Company> {
    return await this.prismaService.company.create({
      data: company,
      include: {
        strengths: true,
        portfolios: true,
        founder: true,
        coFounder: true,
      },
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
      include: {
        strengths: true,
        portfolios: true,
        founder: true,
        coFounder: true,
      },
    });
  }

  async deleteCompany(id: string): Promise<Company> {
    return await this.prismaService.company.delete({
      where: {
        id,
      },
      include: {
        strengths: true,
        portfolios: true,
        founder: true,
        coFounder: true,
      },
    });
  }
}
