import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './database/prisma/prisma.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from './authentication/authentication.guard';

@Module({
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
  ],
  imports: [UsersModule, PrismaModule, AuthenticationModule],
})
export class AppModule {}
