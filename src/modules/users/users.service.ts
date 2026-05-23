import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Follow, FollowDocument } from '../follows/schemas/follow.schema';

@Injectable()
export class UsersService {
    constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,

    @InjectModel(Follow.name)
    private followModel: Model<FollowDocument>,
  ) {}

  create(data: any) {
    return this.userModel.create(data);
  }

  findAll() {
    return this.userModel.find();
  }

  async getRecommendations(userId: string) {
  const userObjectId = new mongoose.Types.ObjectId(userId);

  // 1️⃣ get current user
  const currentUser = await this.userModel.findById(userObjectId);

  if (!currentUser) {
    throw new Error('User not found');
  }

  // 2️⃣ aggregation
  const similarUsers = await this.userModel.aggregate([
    {
      $match: {
        _id: { $ne: userObjectId },
        favoriteCuisines: {
          $in: currentUser.favoriteCuisines,
        },
      },
    },
  ]);

  const similarUserIds = similarUsers.map((u) => u._id);

  const restaurants = await this.followModel.aggregate([
    {
      $match: {
        userId: { $in: similarUserIds },
      },
    },
    {
      $lookup: {
        from: 'restaurants',
        localField: 'restaurantId',
        foreignField: '_id',
        as: 'restaurant',
      },
    },
    {
      $unwind: '$restaurant',
    },
    {
      $replaceRoot: {
        newRoot: '$restaurant',
      },
    },
  ]);

  return {
    similarUsers,
    recommendedRestaurants: restaurants,
  };
}
}