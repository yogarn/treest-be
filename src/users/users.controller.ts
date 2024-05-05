import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { CreateUser } from './dto/createUser.dto';
import { UpdateUser } from './dto/updateUser.dto';
import { Public } from 'src/authentication/authentication.decorator';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    async getUsers(): Promise<User[]> {
        return await this.usersService.getUsers();
    }

    @Get('/:id')
    async getUserById(@Param('id') id: string): Promise<User> {
        return await this.usersService.getUserById(id);
    }

    @Public()
    @Post()
    async createUser(@Body() userDto: CreateUser): Promise<User> {
        if (!userDto.username || !userDto.password || !userDto.name) {
            throw new BadRequestException('provide username, password, and name');
        }

        return await this.usersService.createUser({
            username: userDto.username,
            password: userDto.password,
            name: userDto.name,
        });
    }

    @Patch('/:id')
    async updateUser(@Param('id') id: string, @Body() userDto: UpdateUser): Promise<User> {
        return await this.usersService.updateUser(id, {
            username: userDto.username,
            password: userDto.password,
            name: userDto.name,
        });
    }

    @Delete('/:id')
    async deleteUser(@Param('id') id: string) {
        return await this.usersService.deleteUser(id);
    }
}
