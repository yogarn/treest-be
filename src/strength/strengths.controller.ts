import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { StrengthsService } from './strengths.service';
import { Strength } from './strengths.entity';
import { Admin } from 'src/authorization/authorization.decorator';
import { Public } from 'src/authentication/authentication.decorator';
import { CreateStrength } from './dto/createStrength.dto';
import { connect } from 'http2';
import { UpdateStrength } from './dto/updateStrenth.dto';

@Controller('strengths')
export class StrengthsController {
  constructor(private strengthsService: StrengthsService) {}

  @Admin()
  @Get()
  async getStrengths(): Promise<Strength[]> {
    return await this.strengthsService.getStrengths();
  }

  @Public()
  @Get('/:id')
  async getStrength(@Param('id') id: string): Promise<Strength> {
    return await this.strengthsService.getStrength(id);
  }

  @Admin()
  @Post()
  async createStrength(@Body() strength: CreateStrength): Promise<Strength> {
    if (!strength.title || !strength.detail || !strength.companyId) {
      throw new BadRequestException('provide title, detail, and companyId');
    }
    return await this.strengthsService.createStrength({
      title: strength.title,
      detail: strength.detail,
      image: strength.image ? strength.image : null,
      company: { connect: { id: strength.companyId } },
    });
  }

  @Admin()
  @Patch('/:id')
  async updateStrength(
    @Param('id') id: string,
    @Body() strength: UpdateStrength,
  ): Promise<Strength> {
    return await this.strengthsService.updateStrength(id, {
      title: strength.title,
      detail: strength.detail,
      image: strength.image,
      company: strength.companyId
        ? { connect: { id: strength.companyId } }
        : undefined,
    });
  }

  @Admin()
  @Delete('/:id')
  async deleteStrength(@Param('id') id: string): Promise<Strength> {
    return await this.strengthsService.deleteStrength(id);
  }
}
