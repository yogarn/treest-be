import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { News } from './news.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class NewsService {
  constructor(private prismaService: PrismaService) {}

  async getNews(): Promise<News[]> {
    return await this.prismaService.news.findMany({
      include: {
        creator: true,
      },
    });
  }

  async getNewsById(id: string): Promise<News> {
    return await this.prismaService.news.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        creator: true,
      },
    });
  }

  async createNews(news: Prisma.NewsCreateInput): Promise<News> {
    return await this.prismaService.news.create({
      data: news,
      include: {
        creator: true,
      },
    });
  }

  async updateNews(id: string, news: Prisma.NewsUpdateInput): Promise<News> {
    return await this.prismaService.news.update({
      where: {
        id,
      },
      data: news,
      include: {
        creator: true,
      },
    });
  }

  async deleteNews(id: string): Promise<News> {
    return await this.prismaService.news.delete({
      where: {
        id,
      },
      include: {
        creator: true,
      },
    });
  }
}
