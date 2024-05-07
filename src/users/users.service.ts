import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { User } from './users.entity';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { userSelect } from './utils/userSelect';
import { UserQuery } from './utils/userQuery';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async getUsers(query: UserQuery): Promise<User[]> {
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

    if (
      query.username ||
      query.name ||
      query.isAdmin ||
      query.before ||
      query.after
    ) {
      filter.OR = [];
      if (query.username) {
        filter.OR.push({ username: { search: query.username } });
      }
      if (query.name) {
        filter.OR.push({ name: { search: query.name } });
      }
      if (query.isAdmin) {
        filter.OR.push({ isAdmin: query.isAdmin === 'true' });
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

    return await this.prismaService.user.findMany({
      skip,
      take,
      select: userSelect,
      where: filter,
      orderBy,
    });
  }

  async getUserById(id: string): Promise<User> {
    return await this.prismaService.user.findUniqueOrThrow({
      where: {
        id,
      },
      select: userSelect,
    });
  }

  async getUserByUsername(username: string): Promise<User> {
    return await this.prismaService.user.findUniqueOrThrow({
      where: {
        username,
      },
      select: userSelect,
    });
  }

  async createUser(user: Prisma.UserCreateInput): Promise<User> {
    user.password = await bcrypt.hash(user.password, 10);

    return await this.prismaService.user.create({
      data: user,
      select: userSelect,
    });
  }

  async updateUser(id: string, user: Prisma.UserUpdateInput): Promise<User> {
    if (user.password) {
      user.password = await bcrypt.hash(user.password.toString(), 10);
    }

    return await this.prismaService.user.update({
      where: {
        id,
      },
      data: user,
      select: userSelect,
    });
  }

  async deleteUser(id: string): Promise<User> {
    return await this.prismaService.user.delete({
      where: {
        id,
      },
      select: userSelect,
    });
  }
}
