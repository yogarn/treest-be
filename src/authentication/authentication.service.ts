import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenticationService {
    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService
    ) {}

    async signIn(username: string, password: string) {
        const user = await this.prismaService.user.findUniqueOrThrow({
            where: {
                username
            }
        });
        if (!bcrypt.compareSync(password, user.password)) {
            throw new UnauthorizedException('username or password did not match');
        }
        const payload = {
            userId: user.id
        }
        return {
            accessToken: await this.jwtService.signAsync(payload)
        }
    }
}
