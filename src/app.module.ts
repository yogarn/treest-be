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
import { CompaniesModule } from './companies/companies.module';
import { StrengthModule } from './strength/strengths.module';
import { PortfoliosModule } from './portfolios/portfolios.module';
import { NewsModule } from './news/news.module';
import { CommentsModule } from './comments/comments.module';
import { StorageModule } from './storage/storage.module';

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
  imports: [UsersModule, PrismaModule, AuthenticationModule, AuthorizationModule, CompaniesModule, StrengthModule, PortfoliosModule, NewsModule, CommentsModule, StorageModule],
})
export class AppModule {}
