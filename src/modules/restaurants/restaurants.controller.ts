import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiParam } from '@nestjs/swagger';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@ApiTags('restaurants')
@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all restaurants with optional cuisine filter' })
  @ApiQuery({ name: 'cuisine', required: false, type: String, description: 'Filter by cuisine type' })
  findAll(@Query() query: PaginationDto) {
  return this.restaurantsService.findAll(query);
}

  @Get(':id')
  @ApiOperation({ summary: 'Get restaurant by ID' })
  @ApiParam({ name: 'id', description: 'Restaurant ID' })
  findById(@Param('id') id: string) {
    return this.restaurantsService.findById(id);
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get restaurant by slug' })
  @ApiParam({ name: 'slug', description: 'Restaurant slug' })
  findBySlug(@Param('slug') slug: string) {
    return this.restaurantsService.findBySlug(slug);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new restaurant' })
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantsService.create(createRestaurantDto);
  }

  @Get('nearby')
  @ApiOperation({ summary: 'Find nearby restaurants' })
  @ApiQuery({ name: 'lat', required: true, type: String, description: 'Latitude coordinate' })
  @ApiQuery({ name: 'lng', required: true, type: String, description: 'Longitude coordinate' })
  findNearby(
    @Query('lat') lat: string,
    @Query('lng') lng: string,
  ) {
    return this.restaurantsService.findNearby(
      Number(lat),
      Number(lng),
    );
  }
}