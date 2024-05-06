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
  async getNews(): Promise<News[]> {
    return this.newsService.getNews();
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
    });
  }

  @Admin()
  @Delete('/:id')
  async deleteNews(@Param('id') id: string): Promise<News> {
    return this.newsService.deleteNews(id);
  }
}
