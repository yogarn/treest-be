import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PortfoliosService } from './portfolios.service';
import { Admin } from 'src/authorization/authorization.decorator';
import { Portfolio } from './portfolios.entity';
import { CreatePortfolio } from './dto/createPortfolio.dto';
import { UpdatePortfolio } from './dto/updatePortfolio.dto';

@Controller('portfolios')
export class PortfoliosController {
  constructor(private portfoliosService: PortfoliosService) {}

  @Admin()
  @Get()
  async getPortfolios(): Promise<Portfolio[]> {
    return await this.portfoliosService.getPortfolios();
  }

  @Get('/:id')
  async getPortofolio(@Param('id') id: string): Promise<Portfolio> {
    return await this.portfoliosService.getPortfolio(id);
  }

  @Admin()
  @Post()
  async createPortfolio(
    @Body() portfolio: CreatePortfolio,
  ): Promise<Portfolio> {
    if (!portfolio.title || !portfolio.detail || !portfolio.companyId) {
        throw new BadRequestException('provide title, detail, and companyId');
    }
    return await this.portfoliosService.createPortfolio({
      title: portfolio.title,
      detail: portfolio.detail,
      image: portfolio.image,
      company: { connect: { id: portfolio.companyId } },
    });
  }

  @Admin()
  @Patch('/:id')
  async updatePortfolio(@Param('id') id: string, @Body() portfolio: UpdatePortfolio): Promise<Portfolio> {
    return await this.portfoliosService.updatePortfolio(id, {
        title: portfolio.title,
        detail: portfolio.detail,
        image: portfolio.image,
        company: portfolio.companyId ? { connect: { id: portfolio.companyId } } : undefined
      });
  }

  @Admin()
  @Delete('/:id')
  async deletePortfolio(@Param('id') id: string): Promise<Portfolio> {
    return await this.portfoliosService.deletePortfolio(id);
  }
}
