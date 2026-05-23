import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantsModule } from './modules/restaurants/restaurants.module';
import { UsersModule } from './modules/users/users.module';
import { FollowsModule } from './modules/follows/follows.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRoot(process.env.MONGO_URI as string),

    RestaurantsModule,

    UsersModule,

    FollowsModule,
  ],
})
export class AppModule {}