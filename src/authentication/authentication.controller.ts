import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { SignIn } from './dto/signIn.dto';
import { AuthenticationService } from './authentication.service';

@Controller('authentication')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Post()
  async signIn(@Body() user: SignIn): Promise<{ accessToken: string }> {
    if (!user.username || !user.password) {
      throw new BadRequestException('provide username and password');
    }
    return await this.authenticationService.signIn(
      user.username,
      user.password,
    );
  }
}
