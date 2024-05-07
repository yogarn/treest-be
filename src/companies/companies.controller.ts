import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { Company } from './companies.entity';
import { Public } from 'src/authentication/authentication.decorator';
import { Admin } from 'src/authorization/authorization.decorator';
import { CreateCompany } from './dto/createCompany.dto';
import { UpdateCompany } from './dto/updateCompany.dto';

@Controller('companies')
export class CompaniesController {
  constructor(private companiesService: CompaniesService) {}

  @Public()
  @Get()
  async getCompanies(@Query() query): Promise<Company[]> {
    return this.companiesService.getCompanies(query);
  }

  @Public()
  @Get('/:id')
  async getCompany(@Param('id') id: string): Promise<Company> {
    return this.companiesService.getCompany(id);
  }

  @Admin()
  @Post()
  async createCompany(@Body() company: CreateCompany): Promise<Company> {
    if (
      !company.name ||
      !company.description ||
      !company.tagline ||
      !company.founderId ||
      !company.stockSymbol
    ) {
      throw new BadRequestException(
        'provide name, description, tagline, founderId, and stockSymbol',
      );
    }
    return await this.companiesService.createCompany({
      name: company.name,
      description: company.description,
      tagline: company.tagline,
      founder: { connect: { id: company.founderId } },
      stockSymbol: company.stockSymbol,
    });
  }

  @Admin()
  @Patch('/:id')
  async updateCompany(
    @Param('id') id: string,
    @Body() company: UpdateCompany,
  ): Promise<Company> {
    return await this.companiesService.updateCompany(id, {
      ...company,
      founder: company.founderId
        ? { connect: { id: company.founderId } }
        : undefined,
    });
  }

  @Admin()
  @Delete('/:id')
  async deleteCompany(@Param('id') id: string): Promise<Company> {
    return await this.companiesService.deleteCompany(id);
  }
}
