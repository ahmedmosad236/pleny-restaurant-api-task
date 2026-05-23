import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Restaurant, RestaurantDocument } from './schemas/restaurant.schema';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import slugify from 'slugify';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurant.name)
    private restaurantModel: Model<RestaurantDocument>,
  ) {}

 async findAll(query: PaginationDto) {
  const page = query.page || 1;
  const limit = query.limit || 10;

  const skip = (page - 1) * limit;

  const filter: any = {};
  if (query.cuisine) {
    filter.cuisines = { $in: [query.cuisine] };
  }

  const [data, total] = await Promise.all([
    this.restaurantModel.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 }),
    this.restaurantModel.countDocuments(filter),
  ]);

  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}
async findById(id: string) {
  const restaurant = await this.restaurantModel.findById(id);

  if (!restaurant) {
    throw new NotFoundException('Restaurant not found');
  }

  return restaurant;
}

async findBySlug(slug: string) {
  const restaurant = await this.restaurantModel.findOne({ slug });

  if (!restaurant) {
    throw new NotFoundException('Restaurant not found');
  }

  return restaurant;
}

async findNearby(lat: number, lng: number) {
  return this.restaurantModel.aggregate([
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [lng, lat],
        },
        distanceField: 'distance',
        maxDistance: 1000, 
        spherical: true,
      },
    },
  ]);
}

  async create(dto: CreateRestaurantDto) {
  const slug = slugify(dto.nameEn, {
    lower: true,
    strict: true,
  });

  const existing = await this.restaurantModel.findOne({ slug });

  if (existing) {
    throw new Error('Restaurant already exists');
  }

  const restaurant = new this.restaurantModel({
    ...dto,
    slug,
    location: {
      type: 'Point',
      coordinates: dto.location,
    },
  });

  return restaurant.save();
}
}