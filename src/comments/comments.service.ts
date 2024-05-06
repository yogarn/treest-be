import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Comment } from './comments.entity';
import { commentSelect } from './utils/commentSelect';
import { Prisma } from '@prisma/client';

@Injectable()
export class CommentsService {
  constructor(private prismaService: PrismaService) {}

  async getComments(): Promise<Comment[]> {
    return this.prismaService.comment.findMany({
      select: commentSelect,
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
