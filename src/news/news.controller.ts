import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ExecutionContext,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { News } from './news.entity';
import { Public } from 'src/authentication/authentication.decorator';
import { Admin } from 'src/authorization/authorization.decorator';
import { CreateNews } from './dto/createNews.dto';
import { UpdateNews } from './dto/updateNews.dto';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Public()
  @Get()
  async getNews(@Query() query): Promise<News[]> {
    return this.newsService.getNews(query);
  }

  @Public()
  @Get('/:id')
  async getNewsById(@Param('id') id: string): Promise<News> {
    return this.newsService.getNewsById(id);
  }

  @Admin()
  @Post()
  async createNews(@Req() request, @Body() news: CreateNews): Promise<News> {
    if (!news.title || !news.body) {
      throw new BadRequestException('provide title and body');
    }
    return this.newsService.createNews({
      title: news.title,
      body: news.body,
      thumbnail: news.thumbnail,
      creator: { connect: { id: request.jwt.userId } },
      company: news.companyId ? { connect: { id: news.companyId } } : undefined,
    });
  }

  @Admin()
  @Patch('/:id')
  async updateNews(
    @Req() request,
    @Param('id') id: string,
    @Body() news: UpdateNews,
  ): Promise<News> {
    return this.newsService.updateNews(id, {
      title: news.title,
      body: news.body,
      thumbnail: news.thumbnail,
      company: news.companyId ? { connect: { id: news.companyId } } : undefined,
    });
  }

  @Admin()
  @Delete('/:id')
  async deleteNews(@Param('id') id: string): Promise<News> {
    return this.newsService.deleteNews(id);
  }
}
