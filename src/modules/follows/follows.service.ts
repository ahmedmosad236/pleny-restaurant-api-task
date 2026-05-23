import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Follow, FollowDocument } from './schemas/follow.schema';

@Injectable()
export class FollowsService {
  constructor(
    @InjectModel(Follow.name)
    private followModel: Model<FollowDocument>,
  ) {}

  async follow(data: any) {
    const existing = await this.followModel.findOne({
      userId: data.userId,
      restaurantId: data.restaurantId,
    });

    if (existing) {
      throw new ConflictException('User already follows this restaurant');
    }

    return this.followModel.create(data);
  }
}