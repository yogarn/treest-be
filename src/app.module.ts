import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './database/prisma/prisma.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [UsersModule, PrismaModule, AuthenticationModule],
})
export class AppModule {}
