import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { News } from './news.entity';
import { Prisma } from '@prisma/client';
import { newsSelect } from './utils/newsSelect';
import { NewsQuery } from './utils/newsQuery';

@Injectable()
export class NewsService {
  constructor(private prismaService: PrismaService) {}

  async getNews(query: NewsQuery): Promise<News[]> {
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

    if (query.title || query.creatorId || query.before || query.after) {
      filter.OR = [];
      if (query.title) {
        filter.OR.push({ title: { search: query.title } });
      }
      if (query.creatorId) {
        filter.OR.push({ creatorId: { search: query.creatorId } });
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

    return await this.prismaService.news.findMany({
      skip,
      take,
      select: newsSelect,
      where: filter,
      orderBy,
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
