import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Comment } from './comments.entity';
import { commentSelect } from './utils/commentSelect';
import { Prisma } from '@prisma/client';
import { CommentQuery } from './utils/commentQuery';

@Injectable()
export class CommentsService {
  constructor(private prismaService: PrismaService) {}

  async getComments(query: CommentQuery): Promise<Comment[]> {
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

    if (query.newsId || query.userId || query.before || query.after) {
      filter.OR = [];
      if (query.newsId) {
        filter.OR.push({ newsId: { search: query.newsId } });
      }
      if (query.userId) {
        filter.OR.push({ userId: { search: query.userId } });
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

    return this.prismaService.comment.findMany({
      skip,
      take,
      select: commentSelect,
      where: filter,
      orderBy,
    });
  }

  async getComment(id: string): Promise<Comment> {
    return this.prismaService.comment.findUniqueOrThrow({
      where: {
        id,
      },
      select: commentSelect,
    });
  }

  async createComment(comment: Prisma.CommentCreateInput): Promise<Comment> {
    return this.prismaService.comment.create({
      data: comment,
      select: commentSelect,
    });
  }

  async updateComment(
    id: string,
    comment: Prisma.CommentUpdateInput,
  ): Promise<Comment> {
    return this.prismaService.comment.update({
      where: {
        id,
      },
      data: comment,
      select: commentSelect,
    });
  }

  async deleteComment(id: string): Promise<Comment> {
    return this.prismaService.comment.delete({
      where: { id },
      select: commentSelect,
    });
  }
}
