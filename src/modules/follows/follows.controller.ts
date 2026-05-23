import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FollowsService } from './follows.service';
import { CreateFollowDto } from './dto/create-follow.dto';

@ApiTags('follows')
@Controller('follows')
export class FollowsController {
  constructor(private readonly followsService: FollowsService) {}

  @Post()
  @ApiOperation({ summary: 'Follow a restaurant' })
  follow(@Body() createFollowDto: CreateFollowDto) {
    return this.followsService.follow(createFollowDto);
  }
}