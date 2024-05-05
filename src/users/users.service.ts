import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { User } from './users.entity';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async getUsers(): Promise<User[]> {
    return await this.prismaService.user.findMany();
  }

  async getUserById(id: string): Promise<User> {
    return await this.prismaService.user.findFirst({
      where: {
        id
      }
    })
  }

  async getUserByUsername(username: string): Promise<User> {
    return await this.prismaService.user.findFirst({
      where: {
        username
      }
    })
  }

  async createUser(user: Prisma.UserCreateInput): Promise<User> {
    user.password = await bcrypt.hash(user.password, 10);
    
    return await this.prismaService.user.create({
      data: user
    })
  }

  async updateUser(id: string, user: Prisma.UserUpdateInput): Promise<User> {
    if (user.password) {
      user.password = await bcrypt.hash(user.password.toString(), 10);
    }

    return await this.prismaService.user.update({
      where: {
        id
      },
      data: user
    })
  }

  async deleteUser(id: string): Promise<User> {
    return await this.prismaService.user.delete({
      where: {
        id
      }
    })
  }
}
