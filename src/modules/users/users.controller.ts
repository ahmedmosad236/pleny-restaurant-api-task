import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get('recommendations/:userId')
  @ApiOperation({ summary: 'Get restaurant recommendations for a user' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  getRecommendations(@Param('userId') userId: string) {
    return this.usersService.getRecommendations(userId);
  }
}
