import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Company } from './companies.entity';
import { Prisma } from '@prisma/client';
import { companySelect } from './utils/companySelect';

@Injectable()
export class CompaniesService {
  constructor(private prismaService: PrismaService) {}

  async getCompanies(): Promise<Company[]> {
    return await this.prismaService.company.findMany({
      select: companySelect
    });
  }

  async getCompany(id: string): Promise<Company> {
    return await this.prismaService.company.findUniqueOrThrow({
      where: {
        id,
      },
      select: companySelect
    });
  }

  async createCompany(company: Prisma.CompanyCreateInput): Promise<Company> {
    return await this.prismaService.company.create({
      data: company,
      select: companySelect
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
      select: companySelect
    });
  }

  async deleteCompany(id: string): Promise<Company> {
    return await this.prismaService.company.delete({
      where: {
        id,
      },
      select: companySelect
    });
  }
}
