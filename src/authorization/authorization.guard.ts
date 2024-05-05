import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { IS_ADMIN_KEY } from './authorization.decorator';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prismaService: PrismaService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAdmin = this.reflector.getAllAndOverride<boolean>(IS_ADMIN_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!isAdmin) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = await this.prismaService.user.findUniqueOrThrow({
      where: {
        id: request.jwt.userId
      }
    });

    if (!user.isAdmin) {
      throw new UnauthorizedException('only admin can access this endpoint');
    }
    return true;
  }
}
