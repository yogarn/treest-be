import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from './comments.entity';
import { Admin } from 'src/authorization/authorization.decorator';
import { CreateComment } from './dto/createComment.dto';
import { UpdateComment } from './dto/updateComment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Admin()
  @Get()
  async getComments(): Promise<Comment[]> {
    return await this.commentsService.getComments();
  }

  @Get('/:id')
  async getComment(@Param('id') id: string): Promise<Comment> {
    return await this.commentsService.getComment(id);
  }

  @Post()
  async createComment(@Req() req, @Body() comment: CreateComment): Promise<Comment> {
    if (!comment.newsId || !comment.content) {
        throw new BadRequestException('provide newsId and content');
    }
    return await this.commentsService.createComment({
      user: { connect: { id: req.jwt.userId } },
      news: { connect: { id: comment.newsId } },
      content: comment.content,
    });
  }

  @Patch('/:id')
  async updateComment(@Param('id') id: string, @Body() comment: UpdateComment): Promise<Comment> {
    return await this.commentsService.updateComment(id, comment);
  }

  @Delete('/:id')
  async deleteComment(@Param('id') id: string): Promise<Comment> {
    return await this.commentsService.deleteComment(id);
  }
}
