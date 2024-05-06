import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { News } from './news.entity';
import { Prisma } from '@prisma/client';
import { newsSelect } from './utils/newsSelect';

@Injectable()
export class NewsService {
  constructor(private prismaService: PrismaService) {}

  async getNews(): Promise<News[]> {
    return await this.prismaService.news.findMany({
      select: newsSelect,
    });
  }

  async getNewsById(id: string): Promise<News> {
    return await this.prismaService.news.findUniqueOrThrow({
      where: {
        id,
      },
      select: newsSelect,
    });
  }

  async createNews(news: Prisma.NewsCreateInput): Promise<News> {
    return await this.prismaService.news.create({
      data: news,
      select: newsSelect,
    });
  }

  async updateNews(id: string, news: Prisma.NewsUpdateInput): Promise<News> {
    return await this.prismaService.news.update({
      where: {
        id,
      },
      data: news,
      select: newsSelect,
    });
  }

  async deleteNews(id: string): Promise<News> {
    return await this.prismaService.news.delete({
      where: {
        id,
      },
      select: newsSelect,
    });
  }
}
