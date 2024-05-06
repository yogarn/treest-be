import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Strength } from './strengths.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class StrengthsService {
    constructor(private prismaService: PrismaService) {}

    async getStrengths(): Promise<Strength[]> {
        return await this.prismaService.strength.findMany({
            include: {
                company: true
            }
        });
    }

    async getStrength(id: string): Promise<Strength> {
        return await this.prismaService.strength.findUniqueOrThrow({
            where: {
                id
            },
            include: {
                company: true
            }
        });
    }

    async createStrength(strength: Prisma.StrengthCreateInput): Promise<Strength> {
        return await this.prismaService.strength.create({
            data: strength,
            include: {
                company: true
              },
        })
    }

    async updateStrength(id: string, strength: Prisma.StrengthUpdateInput): Promise<Strength> {
        return await this.prismaService.strength.update({
            where: {
                id
            },
            data: strength,
            include: {
                company: true
            }
        })
    }

    async deleteStrength(id: string): Promise<Strength> {
        return await this.prismaService.strength.delete({
            where: {
                id
            },
            include: {
                company: true
            }
        })
    }
}
