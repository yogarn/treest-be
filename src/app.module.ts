import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './database/prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationModule } from './authentication/authentication.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { AuthenticationGuard } from './authentication/authentication.guard';
import { AuthorizationGuard } from './authorization/authorization.guard';

@Module({
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AuthorizationGuard,
    },
  ],
  imports: [UsersModule, PrismaModule, AuthenticationModule, AuthorizationModule],
})
export class AppModule {}
